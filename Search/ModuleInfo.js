"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof BayrellLang == 'undefined') BayrellLang = {};
if (typeof BayrellLang.Search == 'undefined') BayrellLang.Search = {};
BayrellLang.Search.ModuleInfo = class extends Runtime.CoreStruct{
	/**
	 * Find module info from collection by module_name
	 */
	static findModuleInfo(modules, module_name){
		var __memorize_value = Runtime.rtl._memorizeValue("BayrellLang.Search.ModuleInfo::findModuleInfo", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var pos = modules.find((item, module_name) => {
			return item.module_name == module_name;
		}, module_name);
		if (pos == -1){
			var __memorize_value = null;
			Runtime.rtl._memorizeSave("BayrellLang.Search.ModuleInfo::findModuleInfo", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = modules.item(pos);
		Runtime.rtl._memorizeSave("BayrellLang.Search.ModuleInfo::findModuleInfo", arguments, __memorize_value);
		return __memorize_value;
	}
	/**
	 * Returns required modules
	 */
	static getRequiredModules(info){
		var __memorize_value = Runtime.rtl._memorizeValue("BayrellLang.Search.ModuleInfo::getRequiredModules", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = info.requiredModules.keys();
		Runtime.rtl._memorizeSave("BayrellLang.Search.ModuleInfo::getRequiredModules", arguments, __memorize_value);
		return __memorize_value;
	}
	/**
	 * Returns module version
	 * @params OpFunctionDeclare op_code
	 * @return string
	 */
	static analyzeModuleVersion(op_code){
		if (op_code.is_lambda == true){
			var op_item = op_code.childs.get(0, null);
			if (op_item instanceof BayrellLang.OpCodes.OpString){
				return op_item.value;
			}
		}
		return "";
	}
	/**
	 * Returns required modules
	 * @params OpFunctionDeclare op_code
	 * @return Dict<string>
	 */
	static analyzeRequiredModules(op_code){
		var modules = new Runtime.Map();
		if (op_code.is_lambda == true){
			var op_item = op_code.childs.get(0, null);
			if (op_item instanceof BayrellLang.OpCodes.OpMap){
				var values = op_item.values;
				var keys = values.keys();
				for (var i = 0; i < keys.count(); i++){
					var module_name = keys.item(i);
					var value = values.item(module_name);
					if (value instanceof BayrellLang.OpCodes.OpString){
						modules.set(module_name, value.value);
					}
				}
			}
		}
		return modules.toDict();
	}
	/**
	 * Returns module files
	 * @params OpFunctionDeclare op_code
	 * @return Dict<string>
	 */
	static analyzeModuleFiles(op_code){
		var files = new Runtime.Vector();
		if (op_code.is_lambda == true){
			var items = op_code.childs.get(0, null);
			for (var i = 0; i < items.values.count(); i++){
				var op_item = items.values.item(i);
				if (op_item instanceof BayrellLang.OpCodes.OpString){
					files.push(op_item.value);
				}
			}
		}
		return files.toCollection();
	}
	/**
	 * Analyze Module OpCode ClassDeclare
	 */
	static analyzeOpClassDeclare(info, op_code, space, uses, modules){
		var interfaces = new Runtime.Vector();
		/* Parse module interfaces */
		for (var i = 0; i < op_code.class_implements.count(); i++){
			var name = op_code.class_implements.item(i);
			if (modules.has(name)){
				interfaces.push(modules.item(name));
			}
		}
		/* Parse module childs */
		for (var i = 0; i < op_code.childs.count(); i++){
			var op_item = op_code.childs.item(i);
			if (op_item instanceof BayrellLang.OpCodes.OpFunctionDeclare){
				if (op_item.name == "getModuleVersion"){
					var version = this.analyzeModuleVersion(op_item);
					info = info.copy( new Runtime.Map({ "version": version })  );
				}
				else if (op_item.name == "requiredModules"){
					var modules = this.analyzeRequiredModules(op_item);
					info = info.copy( new Runtime.Map({ "required_modules": modules })  );
				}
				else if (op_item.name == "getModuleFiles"){
					var files = this.analyzeModuleFiles(op_item);
					info = info.copy( new Runtime.Map({ "files": files })  );
				}
			}
		}
		info = info.copy((new Runtime.Map()).set("interfaces", interfaces.toCollection()));
		return info;
	}
	/**
	 * Analyze Module OpCode
	 */
	static analyzeOpCode(info){
		var op_code = info.op_code;
		if (!(op_code instanceof BayrellLang.OpCodes.OpNope)){
			return info;
		}
		var space = "";
		var uses = new Runtime.Vector();
		var modules = new Runtime.Map();
		for (var i = 0; i < op_code.childs.count(); i++){
			var item = op_code.childs.item(i);
			if (item instanceof BayrellLang.OpCodes.OpNamespace){
				space = item.value;
			}
			else if (item instanceof BayrellLang.OpCodes.OpUse){
				var alias_name = item.alias_name;
				if (alias_name == ""){
					var arr = Runtime.rs.explode(".", item.value);
					alias_name = arr.last();
				}
				uses.push(item.value);
				modules.set(alias_name, item.value);
			}
			else if (item instanceof BayrellLang.OpCodes.OpClassDeclare){
				info = this.analyzeOpClassDeclare(info, item, space, uses.toCollection(), modules.toDict());
			}
		}
		return info;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Search.ModuleInfo";}
	static getCurrentNamespace(){return "BayrellLang.Search";}
	static getCurrentClassName(){return "BayrellLang.Search.ModuleInfo";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__module_name = "";
		if (names.indexOf("module_name") == -1)Object.defineProperty(this, "module_name", { get: function() { return this.__module_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("module_name") }});
		this.__version = "";
		if (names.indexOf("version") == -1)Object.defineProperty(this, "version", { get: function() { return this.__version; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("version") }});
		this.__submodule = false;
		if (names.indexOf("submodule") == -1)Object.defineProperty(this, "submodule", { get: function() { return this.__submodule; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("submodule") }});
		this.__module_path = "";
		if (names.indexOf("module_path") == -1)Object.defineProperty(this, "module_path", { get: function() { return this.__module_path; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("module_path") }});
		this.__parent_module_name = "";
		if (names.indexOf("parent_module_name") == -1)Object.defineProperty(this, "parent_module_name", { get: function() { return this.__parent_module_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("parent_module_name") }});
		this.__sub_module_name = "";
		if (names.indexOf("sub_module_name") == -1)Object.defineProperty(this, "sub_module_name", { get: function() { return this.__sub_module_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("sub_module_name") }});
		this.__interfaces = null;
		if (names.indexOf("interfaces") == -1)Object.defineProperty(this, "interfaces", { get: function() { return this.__interfaces; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("interfaces") }});
		this.__required_modules = null;
		if (names.indexOf("required_modules") == -1)Object.defineProperty(this, "required_modules", { get: function() { return this.__required_modules; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("required_modules") }});
		this.__sub_modules = null;
		if (names.indexOf("sub_modules") == -1)Object.defineProperty(this, "sub_modules", { get: function() { return this.__sub_modules; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("sub_modules") }});
		this.__files = null;
		if (names.indexOf("files") == -1)Object.defineProperty(this, "files", { get: function() { return this.__files; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("files") }});
		this.__entities = null;
		if (names.indexOf("entities") == -1)Object.defineProperty(this, "entities", { get: function() { return this.__entities; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("entities") }});
		this.__op_code = null;
		if (names.indexOf("op_code") == -1)Object.defineProperty(this, "op_code", { get: function() { return this.__op_code; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("op_code") }});
	}
	assignObject(obj){
		if (obj instanceof BayrellLang.Search.ModuleInfo){
			this.__module_name = obj.__module_name;
			this.__version = obj.__version;
			this.__submodule = obj.__submodule;
			this.__module_path = obj.__module_path;
			this.__parent_module_name = obj.__parent_module_name;
			this.__sub_module_name = obj.__sub_module_name;
			this.__interfaces = obj.__interfaces;
			this.__required_modules = obj.__required_modules;
			this.__sub_modules = obj.__sub_modules;
			this.__files = obj.__files;
			this.__entities = obj.__entities;
			this.__op_code = obj.__op_code;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "module_name")this.__module_name = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "version")this.__version = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "submodule")this.__submodule = Runtime.rtl.convert(value,"bool",false,"");
		else if (variable_name == "module_path")this.__module_path = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "parent_module_name")this.__parent_module_name = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "sub_module_name")this.__sub_module_name = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "interfaces")this.__interfaces = Runtime.rtl.convert(value,"Runtime.Collection",null,"string");
		else if (variable_name == "required_modules")this.__required_modules = Runtime.rtl.convert(value,"Runtime.Dict",null,"string");
		else if (variable_name == "sub_modules")this.__sub_modules = Runtime.rtl.convert(value,"Runtime.Dict",null,"string");
		else if (variable_name == "files")this.__files = Runtime.rtl.convert(value,"Runtime.Collection",null,"string");
		else if (variable_name == "entities")this.__entities = Runtime.rtl.convert(value,"Runtime.Collection",null,"Runtime.Dict");
		else if (variable_name == "op_code")this.__op_code = Runtime.rtl.convert(value,"BayrellLang.OpCodes.BaseOpCode",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "module_name") return this.__module_name;
		else if (variable_name == "version") return this.__version;
		else if (variable_name == "submodule") return this.__submodule;
		else if (variable_name == "module_path") return this.__module_path;
		else if (variable_name == "parent_module_name") return this.__parent_module_name;
		else if (variable_name == "sub_module_name") return this.__sub_module_name;
		else if (variable_name == "interfaces") return this.__interfaces;
		else if (variable_name == "required_modules") return this.__required_modules;
		else if (variable_name == "sub_modules") return this.__sub_modules;
		else if (variable_name == "files") return this.__files;
		else if (variable_name == "entities") return this.__entities;
		else if (variable_name == "op_code") return this.__op_code;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("module_name");
			names.push("version");
			names.push("submodule");
			names.push("module_path");
			names.push("parent_module_name");
			names.push("sub_module_name");
			names.push("interfaces");
			names.push("required_modules");
			names.push("sub_modules");
			names.push("files");
			names.push("entities");
			names.push("op_code");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}