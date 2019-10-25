"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpHtmlTag = function(__ctx)
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpHtmlTag.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpHtmlTag.prototype.constructor = Bayrell.Lang.OpCodes.OpHtmlTag;
Object.assign(Bayrell.Lang.OpCodes.OpHtmlTag.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__op = "op_html_tag";
		if (a.indexOf("op") == -1) defProp(this, "op");
		this.__tag_name = "";
		if (a.indexOf("tag_name") == -1) defProp(this, "tag_name");
		this.__op_code_name = null;
		if (a.indexOf("op_code_name") == -1) defProp(this, "op_code_name");
		this.__attrs = null;
		if (a.indexOf("attrs") == -1) defProp(this, "attrs");
		this.__spreads = null;
		if (a.indexOf("spreads") == -1) defProp(this, "spreads");
		this.__items = null;
		if (a.indexOf("items") == -1) defProp(this, "items");
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.OpHtmlTag)
		{
			this.__op = o.__op;
			this.__tag_name = o.__tag_name;
			this.__op_code_name = o.__op_code_name;
			this.__attrs = o.__attrs;
			this.__spreads = o.__spreads;
			this.__items = o.__items;
		}
		Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "op")this.__op = v;
		else if (k == "tag_name")this.__tag_name = v;
		else if (k == "op_code_name")this.__op_code_name = v;
		else if (k == "attrs")this.__attrs = v;
		else if (k == "spreads")this.__spreads = v;
		else if (k == "items")this.__items = v;
		else Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.__op;
		else if (k == "tag_name")return this.__tag_name;
		else if (k == "op_code_name")return this.__op_code_name;
		else if (k == "attrs")return this.__attrs;
		else if (k == "spreads")return this.__spreads;
		else if (k == "items")return this.__items;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.OpCodes.OpHtmlTag";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpHtmlTag, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpHtmlTag,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpHtmlTag";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpHtmlTag",
			"name": "Bayrell.Lang.OpCodes.OpHtmlTag",
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
			a.push("op");
			a.push("tag_name");
			a.push("op_code_name");
			a.push("attrs");
			a.push("spreads");
			a.push("items");
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
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpHtmlTag);