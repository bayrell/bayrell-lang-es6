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
Bayrell.Lang.OpCodes.OpDeclareFunction = function(__ctx)
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareFunction.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpDeclareFunction.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareFunction;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction.prototype,
{
	/**
	 * Returns true if static function
	 */
	isStatic: function(__ctx)
	{
		return this.flags != null && this.flags.isFlag(__ctx, "static") || this.flags.isFlag(__ctx, "lambda");
	},
	/**
	 * Returns true if is flag
	 */
	isFlag: function(__ctx, flag_name)
	{
		return this.flags != null && this.flags.isFlag(__ctx, flag_name);
	},
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__op = "op_function";
		if (a.indexOf("op") == -1) defProp(this, "op");
		this.__name = "";
		if (a.indexOf("name") == -1) defProp(this, "name");
		this.__annotations = null;
		if (a.indexOf("annotations") == -1) defProp(this, "annotations");
		this.__comments = null;
		if (a.indexOf("comments") == -1) defProp(this, "comments");
		this.__args = null;
		if (a.indexOf("args") == -1) defProp(this, "args");
		this.__vars = null;
		if (a.indexOf("vars") == -1) defProp(this, "vars");
		this.__result_type = null;
		if (a.indexOf("result_type") == -1) defProp(this, "result_type");
		this.__expression = null;
		if (a.indexOf("expression") == -1) defProp(this, "expression");
		this.__value = null;
		if (a.indexOf("value") == -1) defProp(this, "value");
		this.__flags = null;
		if (a.indexOf("flags") == -1) defProp(this, "flags");
		this.__is_context = true;
		if (a.indexOf("is_context") == -1) defProp(this, "is_context");
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			this.__op = o.__op;
			this.__name = o.__name;
			this.__annotations = o.__annotations;
			this.__comments = o.__comments;
			this.__args = o.__args;
			this.__vars = o.__vars;
			this.__result_type = o.__result_type;
			this.__expression = o.__expression;
			this.__value = o.__value;
			this.__flags = o.__flags;
			this.__is_context = o.__is_context;
		}
		Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "op")this.__op = v;
		else if (k == "name")this.__name = v;
		else if (k == "annotations")this.__annotations = v;
		else if (k == "comments")this.__comments = v;
		else if (k == "args")this.__args = v;
		else if (k == "vars")this.__vars = v;
		else if (k == "result_type")this.__result_type = v;
		else if (k == "expression")this.__expression = v;
		else if (k == "value")this.__value = v;
		else if (k == "flags")this.__flags = v;
		else if (k == "is_context")this.__is_context = v;
		else Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.__op;
		else if (k == "name")return this.__name;
		else if (k == "annotations")return this.__annotations;
		else if (k == "comments")return this.__comments;
		else if (k == "args")return this.__args;
		else if (k == "vars")return this.__vars;
		else if (k == "result_type")return this.__result_type;
		else if (k == "expression")return this.__expression;
		else if (k == "value")return this.__value;
		else if (k == "flags")return this.__flags;
		else if (k == "is_context")return this.__is_context;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunction";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunction";
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
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
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
			a.push("name");
			a.push("annotations");
			a.push("comments");
			a.push("args");
			a.push("vars");
			a.push("result_type");
			a.push("expression");
			a.push("value");
			a.push("flags");
			a.push("is_context");
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
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpDeclareFunction);