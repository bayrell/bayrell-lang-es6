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
BayrellLang.Search.ModuleSearchProvider = class extends Runtime.CoreStruct{
	/**
	 * Init ModuleSearchProvider
	 */
	static init(context, provider){
		var config = context.getConfig();
		var base_path = context.getBasePath();
		var cache = Runtime.RuntimeUtils.getItem(config, (new Runtime.Vector()).push("BayrellLang").push("cache"), "", "string");
		var search = Runtime.RuntimeUtils.getItem(config, (new Runtime.Vector()).push("BayrellLang").push("search"), (new Runtime.Vector()), "Runtime.Collection", "string");
		search = search.map((item) => {
			return Runtime.rtl.toString(base_path)+Runtime.rtl.toString(item);
		});
		provider = provider.copy((new Runtime.Map()).set("cache_path", Runtime.rtl.toString(base_path)+Runtime.rtl.toString(cache)).set("search_path", search));
		return provider;
	}
	/**
	 * Find module by path
	 * @param string search_path
	 * @param string module_name
	 */
	static findModuleByPath(context, search_path, module_name){
		var flag, fs, find;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				flag = false;
				fs = context.getProvider("default.fs");
				find = BayrellLang.Search.ModuleFind.create(search_path, module_name);
				async_ctx_0.jump("1");
				return (Runtime.rtl.method(fs.getClassName(), "fileExists"))(context, fs, find.module_path_description);
			}
			else if (async_jump_0 == "1"){
				flag = async_ctx_0.result();
				if (flag){
					return async_ctx_0.resolve(find);
				}
				return async_ctx_0.resolve(null);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Find module in search path
	 * @param ContextInterface context
	 * @param ModuleSearchProvider provider
	 * @param string module_name
	 * @return string Path to module
	 */
	static findModule(context, provider, module_name){
		var res, search_path, path, module_find;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				res = null;
				search_path = provider.search_path;
				i = 0;
				return async_ctx_0.jump("0.1");
			}
			else if (async_jump_0 == "0.0"){
				i++;
				return async_ctx_0.jump("0.1");
			}
			else if (async_jump_0 == "0.1"){
				if (i < search_path.count()){
					return async_ctx_0.jump("0.2");
				}
				return async_ctx_0.jump("1");
			}
			else if (async_jump_0 == "0.2"){
				path = search_path.item(i);
				async_ctx_0.jump("0.3");
				return this.findModuleByPath(context, path, module_name);
			}
			else if (async_jump_0 == "0.3"){
				module_find = async_ctx_0.result();
				if (module_find != null){
					res = module_find;
					return async_ctx_0.jump("1");
				}
				return async_ctx_0.jump("0.0");
			}
			else if (async_jump_0 == "1"){
				return async_ctx_0.resolve(res);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Find item in search path
	 * @param ContextInterface context
	 * @param ModuleSearchProvider provider
	 * @param string module_name
	 * @return string Path to module
	 */
	static findModuleItem(context, provider, item_name){
		var sz, i, ch, module_name, file_name, find, arr;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				sz = Runtime.rs.strlen(item_name);
				i = sz;
				while (i > 0){
					ch = item_name[i];
					if (ch == "." || ch == "/"){
						module_name = Runtime.rs.substr(item_name, 0, i);
						file_name = Runtime.rs.substr(item_name, i + 1);
						find = this.findModule(context, provider, module_name);
						if (find != null){
							arr = Runtime.rs.split((new Runtime.Vector()).push(".").push("/"), file_name);
							file_name = Runtime.rs.implode("/", arr);
							find = find.copy((new Runtime.Map()).set("item_name", item_name).set("file_name", file_name).set("file_path", Runtime.rtl.toString(find.module_path)+"/bay/"+Runtime.rtl.toString(file_name)+".bay"));
							return async_ctx_0.resolve(find);
						}
					}
					i--;
				}
				return async_ctx_0.resolve(null);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Read module and return ModuleInfo
	 * @param ContextInterface context
	 * @param ModuleSearchProvider provider
	 * @param string module_name
	 * @return ModuleInfo
	 */
	static readModuleFromCache(context, provider, module_name){
		var fs, module_cache_name, file_path, file_exists, json_str, info;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				fs = context.getProvider("default.fs");
				module_cache_name = Runtime.rs.replace("/", "|", module_name);
				file_path = Runtime.rtl.toString(provider.cache_path)+"/"+Runtime.rtl.toString(module_cache_name)+".json";
				async_ctx_0.jump("1");
				return (Runtime.rtl.method(fs.getClassName(), "fileExists"))(context, fs, file_path);
			}
			else if (async_jump_0 == "1"){
				file_exists = async_ctx_0.result();
				/*return null;*/
				if (file_exists){
					return async_ctx_0.jump("1.1");
				}
				return async_ctx_0.jump("2");
			}
			else if (async_jump_0 == "1.1"){
				async_ctx_0.jump("1.2");
				return (Runtime.rtl.method(fs.getClassName(), "readFile"))(context, fs, file_path);
			}
			else if (async_jump_0 == "1.2"){
				json_str = async_ctx_0.result();
				info = Runtime.RuntimeUtils.json_decode(json_str);
				if (info != null && info instanceof BayrellLang.Search.ModuleInfo){
					if (info.op_code != null){
						info = BayrellLang.Search.ModuleInfo.analyzeOpCode(info);
					}
					return async_ctx_0.resolve(info);
				}
				return async_ctx_0.jump("2");
			}
			else if (async_jump_0 == "2"){
				return async_ctx_0.resolve(null);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Save module to file cache
	 * @param ContextInterface context
	 * @param ModuleSearchProvider provider
	 * @param string module_name
	 * @return ModuleInfo
	 */
	static saveModuleToCache(context, provider, info){
		var fs, module_cache_name, file_path, json_str;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				fs = context.getProvider("default.fs");
				module_cache_name = Runtime.rs.replace("/", "|", info.module_name);
				file_path = Runtime.rtl.toString(provider.cache_path)+"/"+Runtime.rtl.toString(module_cache_name)+".json";
				/* Create cache folder */
				async_ctx_0.jump("1");
				return (Runtime.rtl.method(fs.getClassName(), "makeDir"))(context, fs, provider.cache_path, true);
			}
			else if (async_jump_0 == "1"){
				/* clear opcode */
				/*info <= op_code <= null;*/
				/* Save module info */
				json_str = Runtime.RuntimeUtils.json_encode(info, 1);
				async_ctx_0.jump("2");
				return (Runtime.rtl.method(fs.getClassName(), "saveFile"))(context, fs, file_path, json_str);
			}
			else if (async_jump_0 == "2"){
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Read module and return ModuleInfo
	 * @param ContextInterface context
	 * @param ModuleSearchProvider provider
	 * @param string module_name
	 * @return ModuleInfo
	 */
	static readModule(context, provider, module_name){
		var info, module_find, fs, file_description_path, source, op_code;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				info = null;
				/* Read module info from cache */
				async_ctx_0.jump("1");
				return this.readModuleFromCache(context, provider, module_name);
			}
			else if (async_jump_0 == "1"){
				info = async_ctx_0.result();
				if (info != null){
					return async_ctx_0.resolve(info);
				}
				async_ctx_0.jump("2");
				return this.findModule(context, provider, module_name);
			}
			else if (async_jump_0 == "2"){
				module_find = async_ctx_0.result();
				if (module_find == null){
					return async_ctx_0.resolve(null);
				}
				fs = context.getProvider("default.fs");
				file_description_path = (Runtime.rtl.method(module_find.getClassName(), "getModuleDescriptionPath"))(module_find);
				/* Parse module */
				async_ctx_0.jump("3");
				return (Runtime.rtl.method(fs.getClassName(), "readFile"))(context, fs, file_description_path);
			}
			else if (async_jump_0 == "3"){
				source = async_ctx_0.result();
				op_code = BayrellLang.Utils.getAST(context, new BayrellLang.LangBay.ParserBayFactory(), source);
				/* Create new ModuleInfo */
				info = new BayrellLang.Search.ModuleInfo();
				info = info.copy( new Runtime.Map({ "op_code": op_code })  );
				info = info.copy( new Runtime.Map({ "module_name": module_name })  );
				info = info.copy( new Runtime.Map({ "module_path": module_find.module_path })  );
				info = info.copy( new Runtime.Map({ "parent_module_name": module_find.parent_module_name })  );
				info = info.copy( new Runtime.Map({ "sub_module_name": module_find.sub_module_name })  );
				info = info.copy( new Runtime.Map({ "submodule": module_find.submodule })  );
				/* Analyze op code */
				info = BayrellLang.Search.ModuleInfo.analyzeOpCode(info);
				/*info <= op_code <= null;*/
				/* Save to cache */
				async_ctx_0.jump("4");
				return this.saveModuleToCache(context, provider, info);
			}
			else if (async_jump_0 == "4"){
				return async_ctx_0.resolve(info);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Returns list of the modules
	 */
	static _scanModules(context, provider, modules_list, res_list){
		var module_name, pos, info;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				i = 0;
				return async_ctx_0.jump("0.1");
			}
			else if (async_jump_0 == "0.0"){
				i++;
				return async_ctx_0.jump("0.1");
			}
			else if (async_jump_0 == "0.1"){
				if (i < modules_list.count()){
					return async_ctx_0.jump("0.2");
				}
				return async_ctx_0.jump("1");
			}
			else if (async_jump_0 == "0.2"){
				module_name = modules_list.item(i);
				pos = res_list.find((info, module_name) => {
					return info.module_name == module_name;
				}, module_name);
				if (pos != -1){
					return async_ctx_0.jump("0.0");
				}
				async_ctx_0.jump("2");
				return this.readModule(context, provider, module_name);
			}
			else if (async_jump_0 == "2"){
				info = async_ctx_0.result();
				if (info != null){
					res_list.push(info);
					if (info.required_modules != null){
						this._scanModules(context, provider, info.required_modules.keys(), res_list);
					}
				}
				return async_ctx_0.jump("0.0");
			}
			else if (async_jump_0 == "1"){
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Returns list of the modules
	 */
	static scanModules(context, provider, modules_list){
		var res_list, submodules, submodules_keys, module_name, pos, info;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				res_list = new Runtime.Vector();
				this._scanModules(context, provider, modules_list, res_list);
				/* Add submodules */
				submodules = this.getSubmodules(res_list.toCollection());
				submodules_keys = submodules.keys();
				for (i = 0; i < submodules_keys.count(); i++){
					module_name = submodules_keys.item(i);
					pos = res_list.find((info, module_name) => {
						return info.module_name == module_name;
					}, module_name);
					if (pos != -1){
						info = res_list.item(pos);
						info = info.copy( new Runtime.Map({ "sub_modules": submodules.item(module_name) })  );
						res_list.set(pos, info);
					}
				}
				/*rtl::dump(res_list);*/
				return async_ctx_0.resolve(res_list.toCollection());
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Returns submodules
	 */
	static getSubmodules(modules){
		var res = new Runtime.Map();
		for (var i = 0; i < modules.count(); i++){
			var info = modules.item(i);
			if (info.submodule){
				var arr = res.get(info.parent_module_name, null);
				if (arr == null){
					arr = new Runtime.Vector();
				}
				arr.push(info.module_name);
				res.set(info.parent_module_name, arr);
			}
		}
		res = res.map((key, item) => {
			return item.toCollection();
		});
		return res.toDict();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Search.ModuleSearchProvider";}
	static getCurrentNamespace(){return "BayrellLang.Search";}
	static getCurrentClassName(){return "BayrellLang.Search.ModuleSearchProvider";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__cache_path = "";
		if (names.indexOf("cache_path") == -1)Object.defineProperty(this, "cache_path", { get: function() { return this.__cache_path; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("cache_path") }});
		this.__search_path = null;
		if (names.indexOf("search_path") == -1)Object.defineProperty(this, "search_path", { get: function() { return this.__search_path; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("search_path") }});
	}
	assignObject(obj){
		if (obj instanceof BayrellLang.Search.ModuleSearchProvider){
			this.__cache_path = obj.__cache_path;
			this.__search_path = obj.__search_path;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "cache_path")this.__cache_path = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "search_path")this.__search_path = Runtime.rtl.convert(value,"Runtime.Collection",null,"string");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "cache_path") return this.__cache_path;
		else if (variable_name == "search_path") return this.__search_path;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("cache_path");
			names.push("search_path");
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