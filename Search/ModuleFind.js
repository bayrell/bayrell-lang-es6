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
BayrellLang.Search.ModuleFind = class extends Runtime.CoreStruct{
	/* Item search */
	/**
	 * Returns ModuleDescriptionPath
	 */
	static getParentModule(module_name){
		var __memorize_value = Runtime.rtl._memorizeValue("BayrellLang.Search.ModuleFind::getParentModule", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var pos = Runtime.rs.strpos(module_name, "/");
		var parent_module_name = module_name;
		if (pos >= 0){
			parent_module_name = Runtime.rs.substr(module_name, 0, pos);
		}
		var __memorize_value = parent_module_name;
		Runtime.rtl._memorizeSave("BayrellLang.Search.ModuleFind::getParentModule", arguments, __memorize_value);
		return __memorize_value;
	}
	/**
	 * Returns ModuleDescriptionPath
	 */
	static getModuleDescriptionPath(item){
		if (item.submodule){
			return Runtime.rtl.toString(item.module_path)+"/ModuleDescription.bay";
		}
		return Runtime.rtl.toString(item.module_path)+"/bay/ModuleDescription.bay";
	}
	/**
	 * Split module
	 */
	static create(search_path, module_name){
		var submodule = false;
		var parent_module_name = "";
		var sub_module_name = "";
		var module_path = "";
		var module_path_description = "";
		var arr = Runtime.rs.explode("/", module_name);
		if (arr.count() >= 2){
			submodule = true;
			parent_module_name = arr.item(0);
			arr = arr.removeFirstIm();
			sub_module_name = Runtime.rs.implode("/", arr);
			module_path = Runtime.rtl.toString(search_path)+"/"+Runtime.rtl.toString(parent_module_name)+"/bay/"+Runtime.rtl.toString(sub_module_name);
			module_path_description = Runtime.rtl.toString(module_path)+"/ModuleDescription.bay";
		}
		else {
			parent_module_name = arr.item(0);
			module_path = Runtime.rtl.toString(search_path)+"/"+Runtime.rtl.toString(module_name);
			module_path_description = Runtime.rtl.toString(module_path)+"/bay/ModuleDescription.bay";
		}
		return new BayrellLang.Search.ModuleFind((new Runtime.Map()).set("module_name", module_name).set("module_path", module_path).set("submodule", submodule).set("parent_module_name", parent_module_name).set("sub_module_name", sub_module_name).set("module_path_description", module_path_description));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Search.ModuleFind";}
	static getCurrentNamespace(){return "BayrellLang.Search";}
	static getCurrentClassName(){return "BayrellLang.Search.ModuleFind";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__module_name = "";
		if (names.indexOf("module_name") == -1)Object.defineProperty(this, "module_name", { get: function() { return this.__module_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("module_name") }});
		this.__module_path = "";
		if (names.indexOf("module_path") == -1)Object.defineProperty(this, "module_path", { get: function() { return this.__module_path; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("module_path") }});
		this.__module_path_description = "";
		if (names.indexOf("module_path_description") == -1)Object.defineProperty(this, "module_path_description", { get: function() { return this.__module_path_description; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("module_path_description") }});
		this.__parent_module_name = "";
		if (names.indexOf("parent_module_name") == -1)Object.defineProperty(this, "parent_module_name", { get: function() { return this.__parent_module_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("parent_module_name") }});
		this.__sub_module_name = "";
		if (names.indexOf("sub_module_name") == -1)Object.defineProperty(this, "sub_module_name", { get: function() { return this.__sub_module_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("sub_module_name") }});
		this.__submodule = false;
		if (names.indexOf("submodule") == -1)Object.defineProperty(this, "submodule", { get: function() { return this.__submodule; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("submodule") }});
		this.__item_name = "";
		if (names.indexOf("item_name") == -1)Object.defineProperty(this, "item_name", { get: function() { return this.__item_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("item_name") }});
		this.__file_name = "";
		if (names.indexOf("file_name") == -1)Object.defineProperty(this, "file_name", { get: function() { return this.__file_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("file_name") }});
		this.__file_path = "";
		if (names.indexOf("file_path") == -1)Object.defineProperty(this, "file_path", { get: function() { return this.__file_path; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("file_path") }});
	}
	assignObject(obj){
		if (obj instanceof BayrellLang.Search.ModuleFind){
			this.__module_name = obj.__module_name;
			this.__module_path = obj.__module_path;
			this.__module_path_description = obj.__module_path_description;
			this.__parent_module_name = obj.__parent_module_name;
			this.__sub_module_name = obj.__sub_module_name;
			this.__submodule = obj.__submodule;
			this.__item_name = obj.__item_name;
			this.__file_name = obj.__file_name;
			this.__file_path = obj.__file_path;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "module_name")this.__module_name = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "module_path")this.__module_path = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "module_path_description")this.__module_path_description = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "parent_module_name")this.__parent_module_name = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "sub_module_name")this.__sub_module_name = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "submodule")this.__submodule = Runtime.rtl.convert(value,"bool",false,"");
		else if (variable_name == "item_name")this.__item_name = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "file_name")this.__file_name = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "file_path")this.__file_path = Runtime.rtl.convert(value,"string","","");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "module_name") return this.__module_name;
		else if (variable_name == "module_path") return this.__module_path;
		else if (variable_name == "module_path_description") return this.__module_path_description;
		else if (variable_name == "parent_module_name") return this.__parent_module_name;
		else if (variable_name == "sub_module_name") return this.__sub_module_name;
		else if (variable_name == "submodule") return this.__submodule;
		else if (variable_name == "item_name") return this.__item_name;
		else if (variable_name == "file_name") return this.__file_name;
		else if (variable_name == "file_path") return this.__file_path;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("module_name");
			names.push("module_path");
			names.push("module_path_description");
			names.push("parent_module_name");
			names.push("sub_module_name");
			names.push("submodule");
			names.push("item_name");
			names.push("file_name");
			names.push("file_path");
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