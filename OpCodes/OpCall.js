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
BayrellLang.OpCodes.OpCall = class extends BayrellLang.OpCodes.BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpCall";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_call";
		this.value = null;
		this.args = null;
		this.is_await = false;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = Runtime.rtl.correct(value, "string", "op_call", "");
		else if (variable_name == "value") this.value = Runtime.rtl.correct(value, "BayrellLang.OpCodes.BaseOpCode", null, "");
		else if (variable_name == "args") this.args = Runtime.rtl.correct(value, "Runtime.Vector", null, "BayrellLang.OpCodes.BaseOpCode");
		else if (variable_name == "is_await") this.is_await = Runtime.rtl.correct(value, "bool", false, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "value") return this.value;
		else if (variable_name == "args") return this.args;
		else if (variable_name == "is_await") return this.is_await;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("value");
		names.push("args");
		names.push("is_await");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpCall";
	}
	/**
	 * Constructor
	 */
	constructor(value, args){
		if (value == undefined) value=null;
		if (args == undefined) args=null;
		super();
		this.value = value;
		this.args = args;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}