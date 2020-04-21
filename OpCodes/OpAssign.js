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
Bayrell.Lang.OpCodes.OpAssign = function(ctx)
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpAssign.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpAssign.prototype.constructor = Bayrell.Lang.OpCodes.OpAssign;
Object.assign(Bayrell.Lang.OpCodes.OpAssign.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.kind = "";
		this.var_name = "";
		this.flags = null;
		this.pattern = null;
		this.annotations = null;
		this.comments = null;
		this.values = null;
		this.names = null;
		this.expression = null;
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			this.kind = o.kind;
			this.var_name = o.var_name;
			this.flags = o.flags;
			this.pattern = o.pattern;
			this.annotations = o.annotations;
			this.comments = o.comments;
			this.values = o.values;
			this.names = o.names;
			this.expression = o.expression;
		}
		Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "kind")this.kind = v;
		else if (k == "var_name")this.var_name = v;
		else if (k == "flags")this.flags = v;
		else if (k == "pattern")this.pattern = v;
		else if (k == "annotations")this.annotations = v;
		else if (k == "comments")this.comments = v;
		else if (k == "values")this.values = v;
		else if (k == "names")this.names = v;
		else if (k == "expression")this.expression = v;
		else Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "kind")return this.kind;
		else if (k == "var_name")return this.var_name;
		else if (k == "flags")return this.flags;
		else if (k == "pattern")return this.pattern;
		else if (k == "annotations")return this.annotations;
		else if (k == "comments")return this.comments;
		else if (k == "values")return this.values;
		else if (k == "names")return this.names;
		else if (k == "expression")return this.expression;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
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
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": "Bayrell.Lang.OpCodes.OpAssign",
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
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "KIND_ASSIGN") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_DECLARE") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "KIND_STRUCT") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "kind") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "var_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flags") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pattern") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "annotations") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "comments") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "values") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "names") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpAssign",
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
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpAssign);