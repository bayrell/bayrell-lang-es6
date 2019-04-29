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
BayrellLang.OpCodes.OpHtmlTag = class extends BayrellLang.OpCodes.BaseOpCode{
	/**
	 * Find attribute by attr_name
	 * @param string attr_name
	 * @return OpHtmlAttribute
	 */
	findAttribute(attr_name){
		if (this.attributes == null){
			return null;
		}
		for (var i = 0; i < this.attributes.count(); i++){
			var item = this.attributes.item(i);
			if (item.key == attr_name){
				return item;
			}
		}
		return null;
	}
	/**
	 * Remove attribute by attr_name
	 * @param string attr_name
	 */
	removeAttribute(attr_name){
		this.attributes = this.attributes.filter((item) => {
			return item.key != attr_name;
		});
	}
	/**
	 * Set attribute by attr_name
	 * @param string attr_name
	 * @param mixed value
	 */
	setAttribute(attr_name, value){
		if (this.attributes == null){
			return ;
		}
		for (var i = 0; i < this.attributes.count(); i++){
			var item = this.attributes.item(i);
			if (item.key == attr_name){
				item.value = value;
				return ;
			}
		}
		this.attributes.push(new BayrellLang.OpCodes.OpHtmlAttribute((new Runtime.Map()).set("key", attr_name).set("value", value)));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpHtmlTag";}
	static getCurrentClassName(){return "BayrellLang.OpCodes.OpHtmlTag";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.op = "op_html_tag";
		this.tag_name = "";
		this.attributes = null;
		this.spreads = null;
		this.childs = null;
		this.is_plain = false;
	}
	assignObject(obj){
		if (obj instanceof BayrellLang.OpCodes.OpHtmlTag){
			this.op = Runtime.rtl._clone(obj.op);
			this.tag_name = Runtime.rtl._clone(obj.tag_name);
			this.attributes = Runtime.rtl._clone(obj.attributes);
			this.spreads = Runtime.rtl._clone(obj.spreads);
			this.childs = Runtime.rtl._clone(obj.childs);
			this.is_plain = Runtime.rtl._clone(obj.is_plain);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op")this.op = Runtime.rtl.convert(value,"string","op_html_tag","");
		else if (variable_name == "tag_name")this.tag_name = Runtime.rtl.convert(value,"string","","");
		else if (variable_name == "attributes")this.attributes = Runtime.rtl.convert(value,"Runtime.Vector",null,"BayrellLang.OpCodes.OpHtmlAttribute");
		else if (variable_name == "spreads")this.spreads = Runtime.rtl.convert(value,"Runtime.Vector",null,"mixed");
		else if (variable_name == "childs")this.childs = Runtime.rtl.convert(value,"Runtime.Vector",null,"BayrellLang.OpCodes.BaseOpCode");
		else if (variable_name == "is_plain")this.is_plain = Runtime.rtl.convert(value,"bool",false,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "tag_name") return this.tag_name;
		else if (variable_name == "attributes") return this.attributes;
		else if (variable_name == "spreads") return this.spreads;
		else if (variable_name == "childs") return this.childs;
		else if (variable_name == "is_plain") return this.is_plain;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("tag_name");
			names.push("attributes");
			names.push("spreads");
			names.push("childs");
			names.push("is_plain");
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