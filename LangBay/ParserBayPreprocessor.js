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
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayPreprocessor = function(__ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayPreprocessor.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayPreprocessor)
		{
		}
	},
	assignValue: function(__ctx,k,v)
	{
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangBay.ParserBayPreprocessor";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayPreprocessor,
{
	/**
	 * Read namespace
	 */
	readPreprocessor: function(__ctx, parser)
	{
		var start = parser.clone(__ctx);
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "#switch")
		{
			return this.readPreprocessorSwitch(__ctx, start);
		}
		return null;
	},
	/**
	 * Read preprocessor switch
	 */
	readPreprocessorSwitch: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var items = new Runtime.Vector(__ctx);
		/* Save vars */
		var save_vars = parser.vars;
		parser = parser.copy(__ctx, { "vars": parser.vars.concat(__ctx, Runtime.Dict.from({"ES6":true,"NODEJS":true,"JAVASCRIPT":true,"PHP":true,"PYTHON3":true})) });
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "#switch");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (token.content == "#case")
		{
			parser = look.clone(__ctx);
			/* Skip ifcode */
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == "ifcode")
			{
				parser = look.clone(__ctx);
			}
			/* Read condition */
			var condition = null;
			parser = parser.copy(__ctx, { "find_ident": false });
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			condition = res[1];
			parser = parser.copy(__ctx, { "find_ident": true });
			/* Read then */
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "then");
			parser = res[0];
			token = res[1];
			/* Read content */
			var content = "";
			var caret_content = parser.caret.clone(__ctx);
			var res = parser.parser_base.constructor.readUntilStringArr(__ctx, parser, Runtime.Collection.from(["#case","#endswitch"]), false);
			parser = res[0];
			content = res[1];
			/* Look content */
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			var ifcode = new Bayrell.Lang.OpCodes.OpPreprocessorIfCode(__ctx, Runtime.Dict.from({"condition":condition,"content":content,"caret_start":caret_content,"caret_end":parser.caret.clone(__ctx)}));
			items.push(__ctx, ifcode);
		}
		/* Restore vars */
		parser = parser.copy(__ctx, { "vars": save_vars });
		/* read endswitch */
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "#endswitch");
		parser = res[0];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpPreprocessorSwitch(__ctx, Runtime.Dict.from({"items":items.toCollection(__ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayPreprocessor";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayPreprocessor",
			"name": "Bayrell.Lang.LangBay.ParserBayPreprocessor",
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
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayPreprocessor);