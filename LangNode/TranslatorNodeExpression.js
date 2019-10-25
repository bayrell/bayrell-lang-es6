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
Bayrell.Lang.LangNode.TranslatorNodeExpression = function(__ctx)
{
	Bayrell.Lang.LangES6.TranslatorES6Expression.apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype = Object.create(Bayrell.Lang.LangES6.TranslatorES6Expression.prototype);
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNodeExpression;
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangNode.TranslatorNodeExpression)
		{
		}
		Bayrell.Lang.LangES6.TranslatorES6Expression.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		Bayrell.Lang.LangES6.TranslatorES6Expression.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return Bayrell.Lang.LangES6.TranslatorES6Expression.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeExpression";
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression, Bayrell.Lang.LangES6.TranslatorES6Expression);
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression,
{
	/**
	 * Returns string
	 */
	rtlToStr: function(__ctx, t, s)
	{
		return "use(\"Runtime.rtl\").toStr(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
	},
	/**
	 * Use module name
	 */
	useModuleName: function(__ctx, t, module_name)
	{
		module_name = this.findModuleName(__ctx, t, module_name);
		return "use(" + Runtime.rtl.toStr(this.toString(__ctx, module_name)) + Runtime.rtl.toStr(")");
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(__ctx, t, op_code)
	{
		if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT && op_code.value == "@")
		{
			return Runtime.Collection.from([t,"__ctx"]);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT && op_code.value == "_")
		{
			return Runtime.Collection.from([t,"__ctx.translate"]);
		}
		else if (t.modules.has(__ctx, op_code.value) || op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.findModuleName(__ctx, t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(__ctx, t, Runtime.Dict.from({"op_code":op_code,"var_content":this.useModuleName(__ctx, t, module_name)}));
				t = res[0];
				var var_name = res[1];
				return Runtime.Collection.from([t,var_name]);
			}
		}
		return Runtime.Collection.from([t,op_code.value]);
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(__ctx, t, op_code)
	{
		var var_name = "";
		if (op_code.entity_name.names.count(__ctx) > 0)
		{
			var module_name = op_code.entity_name.names.first(__ctx);
			var new_module_name = this.findModuleName(__ctx, t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(__ctx, t, Runtime.Dict.from({"var_content":this.useModuleName(__ctx, t, module_name)}));
				t = res[0];
				var_name = res[1];
			}
		}
		if (var_name == "")
		{
			var_name = Runtime.rs.join(__ctx, ".", op_code.entity_name.names);
		}
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(__ctx, t, op_code)
	{
		var content = "";
		var values = op_code.values.map(__ctx, (__ctx, op_code) => 
		{
			var res = this.Expression(__ctx, t, op_code);
			t = res[0];
			var s = res[1];
			return s;
		});
		content = this.useModuleName(__ctx, t, "Runtime.Collection") + Runtime.rtl.toStr(".from([") + Runtime.rtl.toStr(Runtime.rs.join(__ctx, ",", values)) + Runtime.rtl.toStr("])");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(__ctx, t, op_code)
	{
		var content = "";
		var values = op_code.values.transition(__ctx, (__ctx, op_code, key) => 
		{
			var res = this.Expression(__ctx, t, op_code);
			t = res[0];
			var s = res[1];
			return this.toString(__ctx, key) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(s);
		});
		content = this.useModuleName(__ctx, t, "Runtime.Dict") + Runtime.rtl.toStr(".from({") + Runtime.rtl.toStr(Runtime.rs.join(__ctx, ",", values)) + Runtime.rtl.toStr("})");
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeExpression";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Expression";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNodeExpression",
			"name": "Bayrell.Lang.LangNode.TranslatorNodeExpression",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
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
Runtime.rtl.defClass(Bayrell.Lang.LangNode.TranslatorNodeExpression);