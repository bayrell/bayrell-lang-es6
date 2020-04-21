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
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayExpression = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayExpression)
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangBay.ParserBayExpression";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression,
{
	/**
	 * Read bit not
	 */
	readBitNot: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		if (token.content == "!")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.readDynamic(ctx, look.clone(ctx));
			parser = res[0];
			op_code = res[1];
			return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"math":"!","caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
		}
		return parser.parser_base.constructor.readDynamic(ctx, parser);
	},
	/**
	 * Read bit shift
	 */
	readBitShift: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitNot(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == ">>" || token.content == "<<"))
		{
			math = token.content;
			var res = this.readBitNot(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read bit and
	 */
	readBitAnd: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitShift(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == "&")
		{
			math = token.content;
			var res = this.readBitShift(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read bit or
	 */
	readBitOr: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitAnd(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "|" || token.content == "xor"))
		{
			math = token.content;
			var res = this.readBitAnd(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read factor
	 */
	readFactor: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitOr(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "*" || token.content == "/" || token.content == "%" || token.content == "div" || token.content == "mod"))
		{
			math = token.content;
			var res = this.readBitOr(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read arithmetic
	 */
	readArithmetic: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readFactor(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "+" || token.content == "-"))
		{
			math = token.content;
			var res = this.readFactor(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read concat
	 */
	readConcat: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readArithmetic(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == "~")
		{
			math = token.content;
			var res = this.readArithmetic(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read compare
	 */
	readCompare: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readConcat(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var content = token.content;
		if (content == "===" || content == "!==" || content == "==" || content == "!=" || content == ">=" || content == "<=" || content == ">" || content == "<")
		{
			var math = token.content;
			var res = this.readConcat(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
			parser = look.clone(ctx);
		}
		else if (content == "is" || content == "implements" || content == "instanceof")
		{
			var math = token.content;
			var res = parser.parser_base.constructor.readTypeIdentifier(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
			parser = look.clone(ctx);
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read not
	 */
	readNot: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		if (token.content == "not")
		{
			var op_code = null;
			var start = parser.clone(ctx);
			var res = this.readCompare(ctx, look.clone(ctx));
			parser = res[0];
			op_code = res[1];
			return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"math":"not","caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
		}
		return this.readCompare(ctx, parser);
	},
	/**
	 * Read and
	 */
	readAnd: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readNot(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "and" || token.content == "&&"))
		{
			math = token.content;
			var res = this.readNot(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":"and","caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read or
	 */
	readOr: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readAnd(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var math = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "or" || token.content == "||"))
		{
			math = token.content;
			var res = this.readAnd(ctx, look);
			look = res[0];
			look_value = res[1];
			op_code = new Bayrell.Lang.OpCodes.OpMath(ctx, Runtime.Dict.from({"value1":op_code,"value2":look_value,"math":"or","caret_start":caret_start,"caret_end":look.caret.clone(ctx)}));
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read element
	 */
	readElement: function(ctx, parser)
	{
		/* Try to read function */
		if (parser.parser_operator.constructor.tryReadFunction(ctx, parser.clone(ctx), false))
		{
			return parser.parser_operator.constructor.readDeclareFunction(ctx, parser, false);
		}
		return this.readOr(ctx, parser);
	},
	/**
	 * Read ternary operation
	 */
	readTernary: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var res = this.readElement(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "?")
		{
			condition = op_code;
			var res = this.readOr(ctx, look);
			parser = res[0];
			if_true = res[1];
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			if (token.content == ":")
			{
				var res = this.readOr(ctx, look);
				parser = res[0];
				if_false = res[1];
			}
			op_code = new Bayrell.Lang.OpCodes.OpTernary(ctx, Runtime.Dict.from({"condition":condition,"if_true":if_true,"if_false":if_false,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read pipe call
	 */
	readPipeCall: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var is_context_call = true;
		var caret_start = parser.caret;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "@")
		{
			is_context_call = false;
			parser = look;
		}
		var args = null;
		var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		token = res[1];
		if (token.content == "(" || token.content == "{")
		{
			var res = parser.parser_base.constructor.readCallArgs(ctx, parser);
			parser = res[0];
			args = res[1];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpCall(ctx, Runtime.Dict.from({"obj":op_code,"args":args,"caret_start":caret_start,"caret_end":parser.caret,"is_context":is_context_call}))]);
	},
	/**
	 * Read pipe
	 */
	ExpressionPipe: function(ctx, parser)
	{
		var look = null;
		var look_token = null;
		var op_code = null;
		var res = this.readTernary(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start;
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = res[0];
		look_token = res[1];
		while (look_token.content == "->")
		{
			parser = look;
			var value = null;
			var kind = "";
			var is_async = false;
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			look = res[0];
			look_token = res[1];
			if (look_token.content == "await")
			{
				is_async = true;
				parser = look;
				var res = parser.parser_base.constructor.readToken(ctx, parser);
				look = res[0];
				look_token = res[1];
			}
			if (look_token.content == "attr")
			{
				parser = look;
				var res = this.readTernary(ctx, parser);
				parser = res[0];
				value = res[1];
				kind = Bayrell.Lang.OpCodes.OpPipe.KIND_ATTR;
			}
			else if (look_token.content == "monad")
			{
				parser = look;
				var res = parser.parser_base.constructor.readDynamic(ctx, parser);
				parser = res[0];
				value = res[1];
				kind = Bayrell.Lang.OpCodes.OpPipe.KIND_MONAD;
			}
			else if (look_token.content == "method")
			{
				parser = look;
				kind = Bayrell.Lang.OpCodes.OpPipe.KIND_METHOD;
				var res = this.readPipeCall(ctx, parser);
				parser = res[0];
				value = res[1];
			}
			else
			{
				kind = Bayrell.Lang.OpCodes.OpPipe.KIND_CALL;
				var res = parser.parser_base.constructor.readDynamic(ctx, parser);
				parser = res[0];
				value = res[1];
			}
			op_code = new Bayrell.Lang.OpCodes.OpPipe(ctx, Runtime.Dict.from({"obj":op_code,"kind":kind,"value":value,"is_async":is_async}));
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			look = res[0];
			look_token = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read expression
	 */
	readExpression: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "<")
		{
			return parser.parser_html.constructor.readHTML(ctx, parser);
		}
		else if (token.content == "@css")
		{
			return parser.parser_html.constructor.readCss(ctx, parser);
		}
		else if (token.content == "#ifdef")
		{
			return parser.parser_preprocessor.constructor.readPreprocessorIfDef(ctx, parser, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION);
		}
		return this.ExpressionPipe(ctx, parser);
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
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayExpression",
			"name": "Bayrell.Lang.LangBay.ParserBayExpression",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
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
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayExpression);