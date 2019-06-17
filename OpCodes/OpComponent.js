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
if (typeof BayrellLang.OpCodes == 'undefined') BayrellLang.OpCodes = {};
BayrellLang.OpCodes.OpComponent = class extends BayrellLang.OpCodes.BaseOpCode{
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpChilds){
			this.name = Runtime.rtl._clone(obj.name);
			this.alias = Runtime.rtl._clone(obj.alias);
			this.args = Runtime.rtl._clone(obj.args);
		}
		super.assign(obj);
	}
	/**
	 * Constructor
	 */
	constructor(name, alias, args){
		if (name == undefined) name="";
		if (alias == undefined) alias="";
		if (args == undefined) args=null;
		super();
		this.name = name;
		this.alias = alias;
		this.args = args;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpComponent";}
	static getCurrentNamespace(){return "BayrellLang.OpCodes";}
	static getCurrentClassName(){return "BayrellLang.OpCodes.OpComponent";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.op = "op_component";
		this.name = "";
		this.alias = "";
		this.args = null;
	}
	assignObject(obj){
		if (obj instanceof BayrellLang.OpCodes.OpComponent){
			this.op = Runtime.rtl._clone(obj.op);
			this.name = Runtime.rtl._clone(obj.name);
			this.alias = Runtime.rtl._clone(obj.alias);
			this.args = Runtime.rtl._clone(obj.args);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op")this.op = Runtime.rtl.convert(value,"string","op_component","");
		else if (variable_name == "name")this.name = Runtime.rtl.convert(value,"BayrellLang.OpCodes.BaseOpCode","","");
		else if (variable_name == "alias")this.alias = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "args")this.args = Runtime.rtl.convert(value,"Runtime.Map",null,"BayrellLang.OpCodes.BaseOpCode");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "alias") return this.alias;
		else if (variable_name == "args") return this.args;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("name");
			names.push("alias");
			names.push("args");
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