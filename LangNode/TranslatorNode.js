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
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNode = function(__ctx)
{
	Bayrell.Lang.CoreTranslator.apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNode.prototype = Object.create(Bayrell.Lang.CoreTranslator.prototype);
Bayrell.Lang.LangNode.TranslatorNode.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNode;
Object.assign(Bayrell.Lang.LangNode.TranslatorNode.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__async_await = null;
		if (a.indexOf("async_await") == -1) defProp(this, "async_await");
		this.__expression = null;
		if (a.indexOf("expression") == -1) defProp(this, "expression");
		this.__html = null;
		if (a.indexOf("html") == -1) defProp(this, "html");
		this.__operator = null;
		if (a.indexOf("operator") == -1) defProp(this, "operator");
		this.__program = null;
		if (a.indexOf("program") == -1) defProp(this, "program");
		Bayrell.Lang.CoreTranslator.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangNode.TranslatorNode)
		{
			this.__async_await = o.__async_await;
			this.__expression = o.__expression;
			this.__html = o.__html;
			this.__operator = o.__operator;
			this.__program = o.__program;
		}
		Bayrell.Lang.CoreTranslator.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "async_await")this.__async_await = v;
		else if (k == "expression")this.__expression = v;
		else if (k == "html")this.__html = v;
		else if (k == "operator")this.__operator = v;
		else if (k == "program")this.__program = v;
		else Bayrell.Lang.CoreTranslator.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "async_await")return this.__async_await;
		else if (k == "expression")return this.__expression;
		else if (k == "html")return this.__html;
		else if (k == "operator")return this.__operator;
		else if (k == "program")return this.__program;
		return Bayrell.Lang.CoreTranslator.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangNode.TranslatorNode";
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNode, Bayrell.Lang.CoreTranslator);
Object.assign(Bayrell.Lang.LangNode.TranslatorNode,
{
	/**
	 * Reset translator
	 */
	reset: function(__ctx, t)
	{
		return t.copy(__ctx, Runtime.Dict.from({"value":"","current_namespace_name":"","modules":new Runtime.Dict(__ctx),"async_await":new Bayrell.Lang.LangES6.TranslatorES6AsyncAwait(__ctx),"expression":new Bayrell.Lang.LangNode.TranslatorNodeExpression(__ctx),"html":new Bayrell.Lang.LangES6.TranslatorES6Html(__ctx),"operator":new Bayrell.Lang.LangES6.TranslatorES6Operator(__ctx),"program":new Bayrell.Lang.LangNode.TranslatorNodeProgram(__ctx),"save_vars":new Runtime.Collection(__ctx),"save_op_codes":new Runtime.Collection(__ctx),"save_op_code_inc":0,"preprocessor_flags":Runtime.Dict.from({"NODEJS":true,"JAVASCRIPT":true})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(__ctx, t, op_code)
	{
		t = this.reset(__ctx, t);
		return t.program.constructor.translateProgram(__ctx, t, op_code);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNode";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": "Bayrell.Lang.LangNode.TranslatorNode",
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
			a.push("async_await");
			a.push("expression");
			a.push("html");
			a.push("operator");
			a.push("program");
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
Runtime.rtl.defClass(Bayrell.Lang.LangNode.TranslatorNode);