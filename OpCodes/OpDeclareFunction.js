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
Bayrell.Lang.OpCodes.OpDeclareFunction = function(ctx)
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
	isStatic: function(ctx)
	{
		return this.flags != null && (this.flags.isFlag(ctx, "static") || this.flags.isFlag(ctx, "lambda") || this.flags.isFlag(ctx, "pure"));
	},
	/**
	 * Returns true if is flag
	 */
	isFlag: function(ctx, flag_name)
	{
		return this.flags != null && this.flags.isFlag(ctx, flag_name);
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.op = "op_function";
		this.name = "";
		this.annotations = null;
		this.comments = null;
		this.args = null;
		this.vars = null;
		this.result_type = null;
		this.expression = null;
		this.value = null;
		this.flags = null;
		this.is_context = true;
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			this.op = o.op;
			this.name = o.name;
			this.annotations = o.annotations;
			this.comments = o.comments;
			this.args = o.args;
			this.vars = o.vars;
			this.result_type = o.result_type;
			this.expression = o.expression;
			this.value = o.value;
			this.flags = o.flags;
			this.is_context = o.is_context;
		}
		Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "op")this.op = v;
		else if (k == "name")this.name = v;
		else if (k == "annotations")this.annotations = v;
		else if (k == "comments")this.comments = v;
		else if (k == "args")this.args = v;
		else if (k == "vars")this.vars = v;
		else if (k == "result_type")this.result_type = v;
		else if (k == "expression")this.expression = v;
		else if (k == "value")this.value = v;
		else if (k == "flags")this.flags = v;
		else if (k == "is_context")this.is_context = v;
		else Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "name")return this.name;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "args")return this.args;
		else if (k == "vars")return this.vars;
		else if (k == "result_type")return this.result_type;
		else if (k == "expression")return this.expression;
		else if (k == "value")return this.value;
		else if (k == "flags")return this.flags;
		else if (k == "is_context")return this.is_context;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
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
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
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
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "op") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comments") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "args") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vars") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "result_type") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flags") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_context") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpDeclareFunction",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpDeclareFunction);