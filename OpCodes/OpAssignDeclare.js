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
BayrellLang.OpCodes.OpAssignDeclare = class extends BayrellLang.OpCodes.BaseOpCode{
	/**
	 * Read is Flag
	 */
	isFlag(name){
		if (this.flags == null){
			return false;
		}
		if (!BayrellLang.OpCodes.OpFlags.hasFlag(name)){
			return false;
		}
		return this.flags.takeValue(name);
	}
	/**
	 * Has Annotations
	 */
	hasAnnotations(){
		return this.annotations != null && this.annotations.count() > 0;
	}
	/**
	 * Constructor
	 */
	constructor(tp, name, value){
		if (tp == undefined) tp=null;
		if (name == undefined) name=null;
		if (value == undefined) value=null;
		super();
		this.tp = tp;
		this.name = name;
		this.value = value;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpAssignDeclare";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_assign_declare";
		this.tp = null;
		this.name = null;
		this.value = null;
		this.flags = null;
		this.annotations = null;
	}
	assignObject(obj){
		if (obj instanceof BayrellLang.OpCodes.OpAssignDeclare){
			this.op = Runtime.rtl._clone(obj.op);
			this.tp = Runtime.rtl._clone(obj.tp);
			this.name = Runtime.rtl._clone(obj.name);
			this.value = Runtime.rtl._clone(obj.value);
			this.flags = Runtime.rtl._clone(obj.flags);
			this.annotations = Runtime.rtl._clone(obj.annotations);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = Runtime.rtl.correct(value, "string", "op_assign_declare", "");
		else if (variable_name == "tp") this.tp = Runtime.rtl.correct(value, "BayrellLang.OpCodes.BaseOpCode", null, "");
		else if (variable_name == "name") this.name = Runtime.rtl.correct(value, "string", null, "");
		else if (variable_name == "value") this.value = Runtime.rtl.correct(value, "BayrellLang.OpCodes.BaseOpCode", null, "");
		else if (variable_name == "flags") this.flags = Runtime.rtl.correct(value, "BayrellLang.OpCodes.OpFlags", null, "");
		else if (variable_name == "annotations") this.annotations = Runtime.rtl.correct(value, "Runtime.Vector", null, "BayrellLang.OpCodes.OpAnnotation");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "tp") return this.tp;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "value") return this.value;
		else if (variable_name == "flags") return this.flags;
		else if (variable_name == "annotations") return this.annotations;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names){
		names.push("op");
		names.push("tp");
		names.push("name");
		names.push("value");
		names.push("flags");
		names.push("annotations");
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}