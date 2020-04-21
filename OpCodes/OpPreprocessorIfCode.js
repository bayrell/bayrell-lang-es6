"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpPreprocessorIfCode = function(ctx)
{
	Bayrell.Lang.OpCodes.BaseOpCode.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpPreprocessorIfCode.prototype = Object.create(Bayrell.Lang.OpCodes.BaseOpCode.prototype);
Bayrell.Lang.OpCodes.OpPreprocessorIfCode.prototype.constructor = Bayrell.Lang.OpCodes.OpPreprocessorIfCode;
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorIfCode.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.op = "op_preprocessor_ifcode";
		this.condition = null;
		this.content = null;
		Bayrell.Lang.OpCodes.BaseOpCode.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
		{
			this.op = o.op;
			this.condition = o.condition;
			this.content = o.content;
		}
		Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "op")this.op = v;
		else if (k == "condition")this.condition = v;
		else if (k == "content")this.content = v;
		else Bayrell.Lang.OpCodes.BaseOpCode.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.op;
		else if (k == "condition")return this.condition;
		else if (k == "content")return this.content;
		return Bayrell.Lang.OpCodes.BaseOpCode.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.OpCodes.OpPreprocessorIfCode";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorIfCode, Bayrell.Lang.OpCodes.BaseOpCode);
Object.assign(Bayrell.Lang.OpCodes.OpPreprocessorIfCode,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpPreprocessorIfCode";
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
			"class_name": "Bayrell.Lang.OpCodes.OpPreprocessorIfCode",
			"name": "Bayrell.Lang.OpCodes.OpPreprocessorIfCode",
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
			a.push("condition");
			a.push("content");
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
			"class_name": "Bayrell.Lang.OpCodes.OpPreprocessorIfCode",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "condition") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpPreprocessorIfCode",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.OpCodes.OpPreprocessorIfCode",
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
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpPreprocessorIfCode);