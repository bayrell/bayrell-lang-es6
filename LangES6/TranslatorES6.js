"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6 = function(ctx)
{
	Bayrell.Lang.CoreTranslator.apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6.prototype = Object.create(Bayrell.Lang.CoreTranslator.prototype);
Bayrell.Lang.LangES6.TranslatorES6.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.async_await = null;
		this.expression = null;
		this.html = null;
		this.operator = null;
		this.program = null;
		Bayrell.Lang.CoreTranslator.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangES6.TranslatorES6)
		{
			this.async_await = o.async_await;
			this.expression = o.expression;
			this.html = o.html;
			this.operator = o.operator;
			this.program = o.program;
		}
		Bayrell.Lang.CoreTranslator.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "async_await")this.async_await = v;
		else if (k == "expression")this.expression = v;
		else if (k == "html")this.html = v;
		else if (k == "operator")this.operator = v;
		else if (k == "program")this.program = v;
		else Bayrell.Lang.CoreTranslator.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "async_await")return this.async_await;
		else if (k == "expression")return this.expression;
		else if (k == "html")return this.html;
		else if (k == "operator")return this.operator;
		else if (k == "program")return this.program;
		return Bayrell.Lang.CoreTranslator.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangES6.TranslatorES6";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6, Bayrell.Lang.CoreTranslator);
Object.assign(Bayrell.Lang.LangES6.TranslatorES6,
{
	/**
	 * Reset translator
	 */
	reset: function(ctx, t)
	{
		return t.copy(ctx, Runtime.Dict.from({"value":"","current_namespace_name":"","modules":new Runtime.Dict(ctx),"async_await":new Bayrell.Lang.LangES6.TranslatorES6AsyncAwait(ctx),"expression":new Bayrell.Lang.LangES6.TranslatorES6Expression(ctx),"html":new Bayrell.Lang.LangES6.TranslatorES6Html(ctx),"operator":new Bayrell.Lang.LangES6.TranslatorES6Operator(ctx),"program":new Bayrell.Lang.LangES6.TranslatorES6Program(ctx),"save_vars":new Runtime.Collection(ctx),"save_op_codes":new Runtime.Collection(ctx),"save_op_code_inc":0,"preprocessor_flags":Runtime.Dict.from({"FRONTEND":true,"ES6":true,"JAVASCRIPT":true})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(ctx, t, op_code)
	{
		t = this.reset(ctx, t);
		return t.program.constructor.translateProgram(ctx, t, op_code);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6",
			"name": "Bayrell.Lang.LangES6.TranslatorES6",
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
			a.push("async_await");
			a.push("expression");
			a.push("html");
			a.push("operator");
			a.push("program");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "async_await") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "operator") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "program") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6",
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
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6);