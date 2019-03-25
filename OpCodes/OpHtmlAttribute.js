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
BayrellLang.OpCodes.OpHtmlAttribute = class extends BayrellLang.OpCodes.BaseOpCode{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpHtmlAttribute";}
	static getCurrentClassName(){return "BayrellLang.OpCodes.OpHtmlAttribute";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_html_attribute";
		this.key = "";
		this.value = null;
	}
	assignObject(obj){
		if (obj instanceof BayrellLang.OpCodes.OpHtmlAttribute){
			this.op = Runtime.rtl._clone(obj.op);
			this.key = Runtime.rtl._clone(obj.key);
			this.value = Runtime.rtl._clone(obj.value);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op")this.op = Runtime.rtl.convert(value,"string","op_html_attribute","");
		else if (variable_name == "key")this.key = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "value")this.value = Runtime.rtl.convert(value,"mixed",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "key") return this.key;
		else if (variable_name == "value") return this.value;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("key");
			names.push("value");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}