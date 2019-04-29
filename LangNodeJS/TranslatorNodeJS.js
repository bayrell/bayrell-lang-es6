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
if (typeof BayrellLang.LangNodeJS == 'undefined') BayrellLang.LangNodeJS = {};
BayrellLang.LangNodeJS.TranslatorNodeJS = class extends BayrellLang.LangES6.TranslatorES6{
	/**
	 * Get name
	 */
	getName(name){
		if (name == "parent"){
			return "super";
		}
		else if (name == "self"){
			return this.current_class_name;
		}
		else if (name == "static"){
			return "this";
		}
		return name;
	}
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		this.current_namespace = op_code.value;
		var arr = Runtime.rs.explode(".", this.current_namespace);
		this.current_module_name = arr.item(0);
		this.modules.clear();
		if (this.current_module_name != "Runtime"){
			return "var rtl = require('bayrell-runtime-nodejs').rtl;"+Runtime.rtl.toString(this.s("var Map = require('bayrell-runtime-nodejs').Map;"))+Runtime.rtl.toString(this.s("var Dict = require('bayrell-runtime-nodejs').Dict;"))+Runtime.rtl.toString(this.s("var Vector = require('bayrell-runtime-nodejs').Vector;"))+Runtime.rtl.toString(this.s("var Collection = require('bayrell-runtime-nodejs').Collection;"))+Runtime.rtl.toString(this.s("var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;"));
		}
		return "";
	}
	/**
	 * Use
	 */
	OpUse(op_code){
		var res = "";
		var lib_name = op_code.value;
		var var_name = "m_"+Runtime.rtl.toString(Runtime.re.replace("\\.", "_", lib_name));
		var arr1 = Runtime.rs.explode(".", lib_name);
		var arr2 = Runtime.rs.explode(".", this.current_namespace);
		var sz_arr1 = arr1.count();
		var sz_arr2 = arr2.count();
		if (sz_arr1 < 2){
			return "";
		}
		var class_name = arr1.getLastItem();
		if (op_code.alias_name != ""){
			class_name = op_code.alias_name;
		}
		this.modules.set(class_name, lib_name);
		/* If same modules */
		if (arr1.item(0) == arr2.item(0)){
			var pos = 0;
			while (pos < sz_arr1 && pos < sz_arr2 && arr1.item(pos) == arr2.item(pos)){
				pos++;
			}
			var js_path = "";
			if (pos == arr2.count()){
				js_path = "./";
			}
			else {
				for (var j = pos; j < sz_arr2; j++){
					js_path = Runtime.rtl.toString(js_path)+"../";
				}
			}
			var ch = "";
			for (var j = pos; j < sz_arr1; j++){
				js_path = Runtime.rtl.toString(js_path)+Runtime.rtl.toString(ch)+Runtime.rtl.toString(arr1.item(j));
				ch = "/";
			}
			var module_name = arr1.shift();
			var module_path = Runtime.rs.implode(".", arr1);
			js_path = Runtime.rtl.toString(js_path)+".js";
			res = "var "+Runtime.rtl.toString(class_name)+" = require('"+Runtime.rtl.toString(js_path)+"');";
		}
		else {
			var module_name = arr1.shift();
			var module_path = Runtime.rs.implode(".", arr1);
			if (module_name == "Runtime"){
				module_name = "BayrellRuntime";
			}
			if (module_name == "Core"){
				module_name = "BayrellCore";
			}
			module_name = Runtime.rtl.convertNodeJSModuleName(module_name);
			res = "var "+Runtime.rtl.toString(class_name)+" = require('"+Runtime.rtl.toString(module_name)+"')."+Runtime.rtl.toString(module_path)+";";
		}
		return res;
	}
	/**
	 * Class declare header
	 */
	OpClassDeclareHeader(op_code){
		var res = "";
		this.ui_struct_class_name.push(Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name));
		this.beginOperation();
		res += "class "+Runtime.rtl.toString(op_code.class_name);
		if (op_code.class_extends != ""){
			res += " extends "+Runtime.rtl.toString(this.translateRun(op_code.class_extends));
		}
		res += "{";
		this.endOperation();
		this.levelInc();
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpClassDeclareFooter(op_code){
		var res = "";
		/* Static variables */
		for (var i = 0; i < op_code.childs.count(); i++){
			var variable = op_code.childs.item(i);
			if (!(variable instanceof BayrellLang.OpCodes.OpAssignDeclare)){
				continue;
			}
			if (variable.flags != null && (variable.isFlag("static") || variable.isFlag("const"))){
				this.beginOperation();
				var s = Runtime.rtl.toString(op_code.class_name)+"."+Runtime.rtl.toString(variable.name)+" = "+Runtime.rtl.toString(this.translateRun(variable.value))+";";
				this.endOperation();
				res += this.s(s);
			}
		}
		/* Static implements */
		var class_implements = op_code.class_implements;
		if (class_implements != null && class_implements.count() > 0){
			var name = op_code.class_name;
			res += this.s(Runtime.rtl.toString(name)+".__static_implements__ = [];");
			for (var i = 0; i < class_implements.count(); i++){
				var value = class_implements.item(i);
				res += this.s(Runtime.rtl.toString(name)+".__static_implements__.push("+Runtime.rtl.toString(this.getName(value))+")");
			}
		}
		res += this.s("module.exports = "+Runtime.rtl.toString(op_code.class_name)+";");
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpClassDeclareFooterNew(op_code){
		var ch = "";
		var res = "";
		var current_namespace = "";
		var v = Runtime.rs.explode(".", this.current_namespace);
		res += this.s("module.exports = {};");
		for (var i = 0; i < v.count(); i++){
			if (i == 0){
				continue;
			}
			current_namespace += Runtime.rtl.toString(ch)+Runtime.rtl.toString(v.item(i));
			s = "if (typeof module.exports."+Runtime.rtl.toString(current_namespace)+" == 'undefined') "+"module.exports."+Runtime.rtl.toString(current_namespace)+" = {};";
			res += this.s(s);
			ch = ".";
		}
		if (current_namespace == ""){
			current_namespace = "module.exports";
		}
		else {
			current_namespace = "module.exports."+Runtime.rtl.toString(current_namespace);
		}
		res += this.s(Runtime.rtl.toString(current_namespace)+"."+Runtime.rtl.toString(op_code.class_name)+" = "+Runtime.rtl.toString(op_code.class_name));
		for (var i = 0; i < op_code.class_variables.count(); i++){
			var variable = op_code.class_variables.item(i);
			if (variable.flags != null && variable.flags.p_static == true){
				this.beginOperation();
				var s = Runtime.rtl.toString(current_namespace)+"."+Runtime.rtl.toString(op_code.class_name)+"."+Runtime.rtl.toString(variable.name)+" = "+Runtime.rtl.toString(this.translateRun(variable.value))+";";
				this.endOperation();
				res += this.s(s);
			}
		}
		/* Static implements */
		var class_implements = op_code.class_implements;
		if (class_implements != null && class_implements.count() > 0){
			var name = op_code.class_name;
			res += this.s(Runtime.rtl.toString(current_namespace)+"."+Runtime.rtl.toString(name)+".__static_implements__ = [];");
			for (var i = 0; i < class_implements.count(); i++){
				var value = class_implements.item(i);
				res += this.s(Runtime.rtl.toString(current_namespace)+"."+Runtime.rtl.toString(name)+".__static_implements__.push("+Runtime.rtl.toString(this.getName(value))+")");
			}
		}
		return res;
	}
	/**
	 * Calc preprocessor condition
	 */
	calcPreprocessorCondition(op_case){
		if (op_case.condition instanceof BayrellLang.OpCodes.OpIdentifier){
			if (op_case.condition.value == "JAVASCRIPT" || op_case.condition.value == "NODEJS"){
				return true;
			}
		}
		return false;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangNodeJS.TranslatorNodeJS";}
	static getCurrentClassName(){return "BayrellLang.LangNodeJS.TranslatorNodeJS";}
	static getParentClassName(){return "BayrellLang.LangES6.TranslatorES6";}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
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