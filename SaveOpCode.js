"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.SaveOpCode = function(__ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
Bayrell.Lang.SaveOpCode.prototype = Object.create(Runtime.CoreStruct.prototype);
Bayrell.Lang.SaveOpCode.prototype.constructor = Bayrell.Lang.SaveOpCode;
Object.assign(Bayrell.Lang.SaveOpCode.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__var_name = "";
		if (a.indexOf("var_name") == -1) defProp(this, "var_name");
		this.__var_content = "";
		if (a.indexOf("var_content") == -1) defProp(this, "var_content");
		this.__content = "";
		if (a.indexOf("content") == -1) defProp(this, "content");
		this.__op_code = null;
		if (a.indexOf("op_code") == -1) defProp(this, "op_code");
		Runtime.CoreStruct.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.SaveOpCode)
		{
			this.__var_name = o.__var_name;
			this.__var_content = o.__var_content;
			this.__content = o.__content;
			this.__op_code = o.__op_code;
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "var_name")this.__var_name = v;
		else if (k == "var_content")this.__var_content = v;
		else if (k == "content")this.__content = v;
		else if (k == "op_code")this.__op_code = v;
		else Runtime.CoreStruct.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "var_name")return this.__var_name;
		else if (k == "var_content")return this.__var_content;
		else if (k == "content")return this.__content;
		else if (k == "op_code")return this.__op_code;
		return Runtime.CoreStruct.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.SaveOpCode";
	},
});
Object.assign(Bayrell.Lang.SaveOpCode, Runtime.CoreStruct);
Object.assign(Bayrell.Lang.SaveOpCode,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.SaveOpCode";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.SaveOpCode",
			"name": "Bayrell.Lang.SaveOpCode",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("var_name");
			a.push("var_content");
			a.push("content");
			a.push("op_code");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.SaveOpCode);