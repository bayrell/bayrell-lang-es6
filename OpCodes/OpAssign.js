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
Bayrell.Lang.OpCodes.OpAssign = function(__ctx)
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssign.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpAssign.prototype.constructor = Bayrell.Lang.OpCodes.OpAssign;
Object.assign(Bayrell.Lang.OpCodes.OpAssign.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__kind = "";
		if (a.indexOf("kind") == -1) defProp(this, "kind");
		this.__var_name = "";
		if (a.indexOf("var_name") == -1) defProp(this, "var_name");
		this.__flags = null;
		if (a.indexOf("flags") == -1) defProp(this, "flags");
		this.__pattern = null;
		if (a.indexOf("pattern") == -1) defProp(this, "pattern");
		this.__annotations = null;
		if (a.indexOf("annotations") == -1) defProp(this, "annotations");
		this.__comments = null;
		if (a.indexOf("comments") == -1) defProp(this, "comments");
		this.__values = null;
		if (a.indexOf("values") == -1) defProp(this, "values");
		this.__names = null;
		if (a.indexOf("names") == -1) defProp(this, "names");
		this.__expression = null;
		if (a.indexOf("expression") == -1) defProp(this, "expression");
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			this.__kind = o.__kind;
			this.__var_name = o.__var_name;
			this.__flags = o.__flags;
			this.__pattern = o.__pattern;
			this.__annotations = o.__annotations;
			this.__comments = o.__comments;
			this.__values = o.__values;
			this.__names = o.__names;
			this.__expression = o.__expression;
		}
		Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "kind")this.__kind = v;
		else if (k == "var_name")this.__var_name = v;
		else if (k == "flags")this.__flags = v;
		else if (k == "pattern")this.__pattern = v;
		else if (k == "annotations")this.__annotations = v;
		else if (k == "comments")this.__comments = v;
		else if (k == "values")this.__values = v;
		else if (k == "names")this.__names = v;
		else if (k == "expression")this.__expression = v;
		else Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "kind")return this.__kind;
		else if (k == "var_name")return this.__var_name;
		else if (k == "flags")return this.__flags;
		else if (k == "pattern")return this.__pattern;
		else if (k == "annotations")return this.__annotations;
		else if (k == "comments")return this.__comments;
		else if (k == "values")return this.__values;
		else if (k == "names")return this.__names;
		else if (k == "expression")return this.__expression;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.OpCodes.OpAssign";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpAssign, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpAssign,
{
	KIND_ASSIGN: "assign",
	KIND_DECLARE: "declare",
	KIND_STRUCT: "struct",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpAssign";
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
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": "Bayrell.Lang.OpCodes.OpAssign",
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
			a.push("kind");
			a.push("var_name");
			a.push("flags");
			a.push("pattern");
			a.push("annotations");
			a.push("comments");
			a.push("values");
			a.push("names");
			a.push("expression");
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
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpAssign);