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
Bayrell.Lang.LangBay.ParserBayExpression = function(__ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayExpression)
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
		return "Bayrell.Lang.LangBay.ParserBayExpression";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression,
{
	/**
	 * Read bit not
	 */
	readBitNot: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		if (token.content == "!")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.readBaseItem(__ctx, look.clone(__ctx));
			parser = res[0];
			op_code = res[1];
			return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"math":"!","caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
		}
		return parser.parser_base.constructor.readBaseItem(__ctx, parser);
	},
	/**
	 * Read bit shift
	 */
	readBitShift: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitNot(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == ">>" || token.content == "<<"))
		{
			math = token.content;
			var res = this.readBitNot(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read bit and
	 */
	readBitAnd: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitShift(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == "&")
		{
			math = token.content;
			var res = this.readBitShift(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read bit or
	 */
	readBitOr: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitAnd(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "|" || token.content == "xor"))
		{
			math = token.content;
			var res = this.readBitAnd(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read factor
	 */
	readFactor: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitOr(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "*" || token.content == "/" || token.content == "%" || token.content == "div" || token.content == "mod"))
		{
			math = token.content;
			var res = this.readBitOr(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read arithmetic
	 */
	readArithmetic: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readFactor(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "+" || token.content == "-"))
		{
			math = token.content;
			var res = this.readFactor(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read concat
	 */
	readConcat: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readArithmetic(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == "~")
		{
			math = token.content;
			var res = this.readArithmetic(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read compare
	 */
	readCompare: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readConcat(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var content = token.content;
		if (content == "===" || content == "!==" || content == "==" || content == "!=" || content == ">=" || content == "<=" || content == ">" || content == "<")
		{
			var math = token.content;
			var res = this.readConcat(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
		}
		else if (content == "is" || content == "implements" || content == "instanceof")
		{
			var math = token.content;
			var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read not
	 */
	readNot: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		if (token.content == "not")
		{
			var op_code = null;
			var start = parser.clone(__ctx);
			var res = this.readCompare(__ctx, look.clone(__ctx));
			parser = res[0];
			op_code = res[1];
			return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"math":"not","caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
		}
		return this.readCompare(__ctx, parser);
	},
	/**
	 * Read and
	 */
	readAnd: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readNot(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "and" || token.content == "&&"))
		{
			math = token.content;
			var res = this.readNot(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":"and","caret_start":caret_start,"caret_end":look.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read or
	 */
	readOr: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readAnd(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "or" || token.content == "||"))
		{
			math = token.content;
			var res = this.readAnd(__ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(__ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":"or","caret_start":caret_start,"caret_end":look.caret.clone(__ctx)}));
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read element
	 */
	readElement: function(__ctx, parser)
	{
		/* Try to read function */
		if (parser.parser_operator.constructor.tryReadFunction(__ctx, parser.clone(__ctx), false))
		{
			return parser.parser_operator.constructor.readDeclareFunction(__ctx, parser, false);
		}
		return this.readOr(__ctx, parser);
	},
	/**
	 * Read ternary operation
	 */
	readTernary: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var res = this.readElement(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "?")
		{
			condition = op_code;
			var res = this.readOr(__ctx, look);
			parser = res[0];
			if_true = res[1];
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == ":")
			{
				var res = this.readOr(__ctx, look);
				parser = res[0];
				if_false = res[1];
			}
			op_code = new Bayrell.Lang.OpCodes.OpTernary(__ctx, Runtime.Dict.from({"condition":condition,"if_true":if_true,"if_false":if_false,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}));
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read expression
	 */
	readExpression: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "<")
		{
			return parser.parser_html.constructor.readHTML(__ctx, parser);
		}
		if (token.content == "@css")
		{
			return parser.parser_html.constructor.readCss(__ctx, parser);
		}
		return this.readTernary(__ctx, parser);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayExpression";
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
			"class_name": "Bayrell.Lang.LangBay.ParserBayExpression",
			"name": "Bayrell.Lang.LangBay.ParserBayExpression",
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
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayExpression);