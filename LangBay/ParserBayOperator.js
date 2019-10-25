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
Bayrell.Lang.LangBay.ParserBayOperator = function(__ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayOperator.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayOperator)
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
		return "Bayrell.Lang.LangBay.ParserBayOperator";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayOperator,
{
	/**
	 * Read return
	 */
	readReturn: function(__ctx, parser)
	{
		var token = null;
		var op_code = null;
		var look = null;
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "return");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content != ";")
		{
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpReturn(__ctx, Runtime.Dict.from({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read delete
	 */
	readDelete: function(__ctx, parser)
	{
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "delete");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.readDynamic(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpDelete(__ctx, Runtime.Dict.from({"op_code":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read throw
	 */
	readThrow: function(__ctx, parser)
	{
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "throw");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpThrow(__ctx, Runtime.Dict.from({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read try
	 */
	readTry: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_try = null;
		var items = new Runtime.Vector(__ctx);
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "try");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		/* Try */
		var res = this.readOperators(__ctx, parser);
		parser = res[0];
		op_try = res[1];
		/* Catch */
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == "catch")
		{
			parser = look.clone(__ctx);
			var op_catch = null;
			var var_op_code = null;
			var pattern = null;
			var item_caret_start = token.caret_start.clone(__ctx);
			/* Read ident */
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "(");
			parser = res[0];
			var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, parser);
			parser = res[0];
			pattern = res[1];
			var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
			parser = res[0];
			var_op_code = res[1];
			var var_name = var_op_code.value;
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, ")");
			parser = res[0];
			/* Save vars */
			var save_vars = parser.vars;
			parser = parser.copy(__ctx, { "vars": parser.vars.setIm(__ctx, var_name, true) });
			/* Catch operators */
			var res = this.readOperators(__ctx, parser);
			parser = res[0];
			op_catch = res[1];
			/* Restore vars */
			parser = parser.copy(__ctx, { "vars": save_vars });
			var item = new Bayrell.Lang.OpCodes.OpTryCatchItem(__ctx, Runtime.Dict.from({"name":var_name,"pattern":pattern,"value":op_catch,"caret_start":item_caret_start,"caret_end":parser.caret.clone(__ctx)}));
			items.push(__ctx, item);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpTryCatch(__ctx, Runtime.Dict.from({"op_try":op_try,"items":items.toCollection(__ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read then
	 */
	readThen: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "then")
		{
			return Runtime.Collection.from([look,token]);
		}
		return Runtime.Collection.from([parser,token]);
	},
	/**
	 * Read do
	 */
	readDo: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "do")
		{
			return Runtime.Collection.from([look,token]);
		}
		return Runtime.Collection.from([parser,token]);
	},
	/**
	 * Read if
	 */
	readIf: function(__ctx, parser)
	{
		var look = null;
		var look2 = null;
		var token = null;
		var token2 = null;
		var if_condition = null;
		var if_true = null;
		var if_false = null;
		var if_else = new Runtime.Vector(__ctx);
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "if");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		/* Read expression */
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "(");
		parser = res[0];
		var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
		parser = res[0];
		if_condition = res[1];
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, ")");
		parser = res[0];
		var res = this.readThen(__ctx, parser);
		parser = res[0];
		/* If true */
		var res = this.readOperators(__ctx, parser);
		parser = res[0];
		if_true = res[1];
		/* Else */
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "else" || token.content == "elseif"))
		{
			var res = parser.parser_base.constructor.readToken(__ctx, look.clone(__ctx));
			look2 = res[0];
			token2 = res[1];
			if (token2.content == "elseif" || token2.content == "if")
			{
				var ifelse_condition = null;
				var ifelse_block = null;
				if (token.content == "elseif")
				{
					parser = look.clone(__ctx);
				}
				else if (token2.content == "if")
				{
					parser = look2.clone(__ctx);
				}
				/* Read expression */
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, "(");
				parser = res[0];
				var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
				parser = res[0];
				ifelse_condition = res[1];
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, ")");
				parser = res[0];
				var res = this.readThen(__ctx, parser);
				parser = res[0];
				var res = this.readOperators(__ctx, parser);
				parser = res[0];
				ifelse_block = res[1];
				if_else.push(__ctx, new Bayrell.Lang.OpCodes.OpIfElse(__ctx, Runtime.Dict.from({"condition":ifelse_condition,"if_true":ifelse_block,"caret_start":token2.caret_start.clone(__ctx),"caret_end":parser.caret.clone(__ctx)})));
			}
			else
			{
				var res = this.readOperators(__ctx, look.clone(__ctx));
				parser = res[0];
				if_false = res[1];
				break;
			}
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpIf(__ctx, Runtime.Dict.from({"condition":if_condition,"if_true":if_true,"if_false":if_false,"if_else":if_else.toCollection(__ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read For
	 */
	readFor: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var expr1 = null;
		var expr2 = null;
		var expr3 = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "for");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "(");
		parser = res[0];
		token = res[1];
		var res = this.readAssign(__ctx, parser);
		parser = res[0];
		expr1 = res[1];
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, ";");
		parser = res[0];
		token = res[1];
		var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
		parser = res[0];
		expr2 = res[1];
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, ";");
		parser = res[0];
		token = res[1];
		var res = this.readOperator(__ctx, parser);
		parser = res[0];
		expr3 = res[1];
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, ")");
		parser = res[0];
		token = res[1];
		var res = this.readOperators(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		/* Restore vars */
		parser = parser.copy(__ctx, { "vars": save_vars });
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpFor(__ctx, Runtime.Dict.from({"expr1":expr1,"expr2":expr2,"expr3":expr3,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read While
	 */
	readWhile: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var condition = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "while");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "(");
		parser = res[0];
		var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
		parser = res[0];
		condition = res[1];
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, ")");
		parser = res[0];
		var res = this.readDo(__ctx, parser);
		parser = res[0];
		token = res[1];
		var res = this.readOperators(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpWhile(__ctx, Runtime.Dict.from({"condition":condition,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read assign
	 */
	readAssign: function(__ctx, parser)
	{
		var start = parser.clone(__ctx);
		var save = null;
		var look = null;
		var token = null;
		var pattern = null;
		var op_code = null;
		var reg_name = null;
		var expression = null;
		var names = null;
		var values = null;
		var kind = Bayrell.Lang.OpCodes.OpAssign.KIND_ASSIGN;
		var var_name = "";
		var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone(__ctx);
		var_name = op_code.value;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "<=")
		{
			var arr = new Runtime.Vector(__ctx);
			while (!token.eof && token.content == "<=")
			{
				parser = look.clone(__ctx);
				save = parser.clone(__ctx);
				var res = parser.parser_base.constructor.readToken(__ctx, parser);
				parser = res[0];
				token = res[1];
				var name = token.content;
				var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
				if (token.content != "<=")
				{
					parser = save.clone(__ctx);
					break;
				}
				else
				{
					if (!parser.parser_base.constructor.isIdentifier(__ctx, name))
					{
						throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Identifier", save.caret.clone(__ctx), parser.file_name)
					}
					arr.push(__ctx, name);
				}
			}
			names = arr.toCollection(__ctx);
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			expression = res[1];
			return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpAssignStruct(__ctx, Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx),"expression":expression,"var_name":var_name,"names":names}))]);
		}
		if (token.content != "=" && token.content != "+=" && token.content != "-=" && token.content != "~=" && token.content != "." && token.content != "::" && token.content != "[")
		{
			var var_op_code = null;
			kind = Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE;
			values = new Runtime.Vector(__ctx);
			parser = start.clone(__ctx);
			var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, parser);
			parser = res[0];
			pattern = res[1];
			var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
			parser = res[0];
			var_op_code = res[1];
			var_name = var_op_code.value;
			/* Read expression */
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == "=")
			{
				var res = parser.parser_expression.constructor.readExpression(__ctx, look.clone(__ctx));
				parser = res[0];
				expression = res[1];
			}
			else
			{
				expression = null;
			}
			parser = parser.copy(__ctx, { "vars": parser.vars.setIm(__ctx, var_name, true) });
			values.push(__ctx, new Bayrell.Lang.OpCodes.OpAssignValue(__ctx, Runtime.Dict.from({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start.clone(__ctx),"caret_end":parser.caret.clone(__ctx)})));
			/* Look next token */
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content == ",")
			{
				var res = parser.parser_base.constructor.readIdentifier(__ctx, look.clone(__ctx));
				parser = res[0];
				var_op_code = res[1];
				var_name = var_op_code.value;
				/* Read expression */
				var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
				if (token.content == "=")
				{
					var res = parser.parser_expression.constructor.readExpression(__ctx, look.clone(__ctx));
					parser = res[0];
					expression = res[1];
				}
				else
				{
					expression = null;
				}
				parser = parser.copy(__ctx, { "vars": parser.vars.setIm(__ctx, var_name, true) });
				values.push(__ctx, new Bayrell.Lang.OpCodes.OpAssignValue(__ctx, Runtime.Dict.from({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start.clone(__ctx),"caret_end":parser.caret.clone(__ctx)})));
				var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
			}
			var_name = "";
			expression = null;
		}
		else
		{
			parser = start.clone(__ctx);
			kind = Bayrell.Lang.OpCodes.OpAssign.KIND_ASSIGN;
			var op = "";
			var res = parser.parser_base.constructor.readDynamic(__ctx, parser);
			parser = res[0];
			var op_code = res[1];
			var res = parser.parser_base.constructor.readToken(__ctx, parser);
			parser = res[0];
			token = res[1];
			if (token.content == "=" || token.content == "+=" || token.content == "-=" || token.content == "~=")
			{
				op = token.content;
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserError(__ctx, "Unknown operator " + Runtime.rtl.toStr(token.content), token.caret_start.clone(__ctx), parser.file_name)
			}
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			expression = res[1];
			values = Runtime.Collection.from([new Bayrell.Lang.OpCodes.OpAssignValue(__ctx, Runtime.Dict.from({"op_code":op_code,"expression":expression,"op":op}))]);
			var_name = "";
			expression = null;
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpAssign(__ctx, Runtime.Dict.from({"pattern":pattern,"values":(values != null) ? values.toCollection(__ctx) : null,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx),"expression":expression,"var_name":var_name,"names":names,"kind":kind}))]);
	},
	/**
	 * Read operator
	 */
	readInc: function(__ctx, parser)
	{
		var look = null;
		var look1 = null;
		var look2 = null;
		var token = null;
		var token1 = null;
		var token2 = null;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look1 = res[0];
		token1 = res[1];
		var caret_start = token1.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.readToken(__ctx, look1.clone(__ctx));
		look2 = res[0];
		token2 = res[1];
		var look1_content = token1.content;
		var look2_content = token2.content;
		if ((look1_content == "++" || look1_content == "--") && parser.parser_base.constructor.isIdentifier(__ctx, look2_content))
		{
			parser = look2.clone(__ctx);
			var op_code = new Bayrell.Lang.OpCodes.OpIdentifier(__ctx, Runtime.Dict.from({"value":look2_content,"caret_start":token2.caret_start.clone(__ctx),"caret_end":token2.caret_end.clone(__ctx)}));
			op_code = new Bayrell.Lang.OpCodes.OpInc(__ctx, Runtime.Dict.from({"kind":(look1_content == "++") ? Bayrell.Lang.OpCodes.OpInc.KIND_PRE_INC : Bayrell.Lang.OpCodes.OpInc.KIND_PRE_DEC,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}));
			return Runtime.Collection.from([parser,op_code]);
		}
		if ((look2_content == "++" || look2_content == "--") && parser.parser_base.constructor.isIdentifier(__ctx, look1_content))
		{
			parser = look2.clone(__ctx);
			var op_code = new Bayrell.Lang.OpCodes.OpIdentifier(__ctx, Runtime.Dict.from({"value":look1_content,"caret_start":token1.caret_start.clone(__ctx),"caret_end":token1.caret_end.clone(__ctx)}));
			op_code = new Bayrell.Lang.OpCodes.OpInc(__ctx, Runtime.Dict.from({"kind":(look2_content == "++") ? Bayrell.Lang.OpCodes.OpInc.KIND_POST_INC : Bayrell.Lang.OpCodes.OpInc.KIND_POST_DEC,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}));
			return Runtime.Collection.from([parser,op_code]);
		}
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read call function
	 */
	readCallFunction: function(__ctx, parser)
	{
		var op_code = null;
		var res = parser.parser_base.constructor.readDynamic(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		if (op_code instanceof Bayrell.Lang.OpCodes.OpCall || op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			return Runtime.Collection.from([parser,op_code]);
		}
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read operator
	 */
	readOperator: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		parser = parser.copy(__ctx, { "skip_comments": false });
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		parser = parser.copy(__ctx, { "skip_comments": true });
		if (token.content == "/")
		{
			return parser.parser_base.constructor.readComment(__ctx, parser);
		}
		else if (token.content == "#switch" || token.content == "#ifcode")
		{
			return parser.parser_preprocessor.constructor.readPreprocessor(__ctx, parser);
		}
		else if (token.content == "break")
		{
			return Runtime.Collection.from([look,new Bayrell.Lang.OpCodes.OpBreak(__ctx, Runtime.Dict.from({"caret_start":caret_start,"caret_end":look.caret}))]);
		}
		else if (token.content == "continue")
		{
			return Runtime.Collection.from([look,new Bayrell.Lang.OpCodes.OpContinue(__ctx, Runtime.Dict.from({"caret_start":caret_start,"caret_end":look.caret.clone(__ctx)}))]);
		}
		else if (token.content == "delete")
		{
			return this.readDelete(__ctx, parser);
		}
		else if (token.content == "return")
		{
			return this.readReturn(__ctx, parser);
		}
		else if (token.content == "throw")
		{
			return this.readThrow(__ctx, parser);
		}
		else if (token.content == "try")
		{
			return this.readTry(__ctx, parser);
		}
		else if (token.content == "if")
		{
			return this.readIf(__ctx, parser);
		}
		else if (token.content == "for")
		{
			return this.readFor(__ctx, parser);
		}
		else if (token.content == "while")
		{
			return this.readWhile(__ctx, parser);
		}
		var op_code = null;
		/* Read op inc */
		var res = this.readInc(__ctx, parser.clone(__ctx));
		look = res[0];
		op_code = res[1];
		if (op_code != null)
		{
			return res;
		}
		/* Read op call function */
		var res = this.readCallFunction(__ctx, parser.clone(__ctx));
		look = res[0];
		op_code = res[1];
		if (op_code != null)
		{
			return res;
		}
		return this.readAssign(__ctx, parser);
	},
	/**
	 * Read operators
	 */
	readOperators: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		if (token.content == "{")
		{
			var arr = new Runtime.Vector(__ctx);
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "{");
			parser = res[0];
			parser = parser.copy(__ctx, { "skip_comments": false });
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			parser = parser.copy(__ctx, { "skip_comments": true });
			while (!token.eof && token.content != "}")
			{
				var parser_value = null;
				var res = this.readOperator(__ctx, parser);
				parser = res[0];
				parser_value = res[1];
				if (parser_value != null)
				{
					arr.push(__ctx, parser_value);
				}
				parser = parser.copy(__ctx, { "skip_comments": false });
				var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
				parser = parser.copy(__ctx, { "skip_comments": true });
				if (token.content == ";")
				{
					parser = look.clone(__ctx);
					parser = parser.copy(__ctx, { "skip_comments": false });
					var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
					look = res[0];
					token = res[1];
					parser = parser.copy(__ctx, { "skip_comments": true });
				}
			}
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "}");
			parser = res[0];
			op_code = new Bayrell.Lang.OpCodes.OpItems(__ctx, Runtime.Dict.from({"items":arr.toCollection(__ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}));
		}
		else
		{
			var res = this.readOperator(__ctx, parser);
			parser = res[0];
			op_code = res[1];
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, ";");
			parser = res[0];
		}
		/* Restore vars */
		parser = parser.copy(__ctx, { "vars": save_vars });
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read flags
	 */
	readFlags: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var values = new Runtime.Map(__ctx);
		var current_flags = Bayrell.Lang.OpCodes.OpFlags.getFlags(__ctx);
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && current_flags.indexOf(__ctx, token.content) >= 0)
		{
			var flag = token.content;
			values.set(__ctx, "p_" + Runtime.rtl.toStr(flag), true);
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpFlags(__ctx, values)]);
	},
	/**
	 * Read function args
	 */
	readDeclareFunctionArgs: function(__ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var items = new Runtime.Vector(__ctx);
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "(");
		parser = res[0];
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != ")")
		{
			var arg_value = null;
			var arg_pattern = null;
			var arg_expression = null;
			var arg_start = parser;
			/* Arg type */
			var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, parser, find_ident);
			parser = res[0];
			arg_pattern = res[1];
			/* Arg name */
			var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
			parser = res[0];
			arg_value = res[1];
			var arg_name = arg_value.value;
			/* Arg expression */
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == "=")
			{
				parser = look.clone(__ctx);
				var save_vars = parser.vars;
				parser = parser.copy(__ctx, { "vars": new Runtime.Dict(__ctx) });
				var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
				parser = res[0];
				arg_expression = res[1];
				parser = parser.copy(__ctx, { "vars": save_vars });
			}
			/* Register variable in parser */
			parser = parser.copy(__ctx, { "vars": parser.vars.setIm(__ctx, arg_name, true) });
			items.push(__ctx, new Bayrell.Lang.OpCodes.OpDeclareFunctionArg(__ctx, Runtime.Dict.from({"pattern":arg_pattern,"name":arg_name,"expression":arg_expression,"caret_start":arg_pattern.caret_start.clone(__ctx),"caret_end":parser.caret.clone(__ctx)})));
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look.clone(__ctx);
				var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
			}
		}
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, ")");
		parser = res[0];
		return Runtime.Collection.from([parser,items.toCollection(__ctx)]);
	},
	/**
	 * Read function variables
	 */
	readDeclareFunctionUse: function(__ctx, parser, vars, find_ident)
	{
		if (vars == undefined) vars = null;
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var items = new Runtime.Vector(__ctx);
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "use")
		{
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "(");
			parser = res[0];
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ")")
			{
				var ident = null;
				var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
				parser = res[0];
				ident = res[1];
				var name = ident.value;
				if (vars != null && find_ident)
				{
					if (!vars.has(__ctx, name))
					{
						throw new Bayrell.Lang.Exceptions.ParserError(__ctx, "Unknown identifier '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("'"), ident.caret_start.clone(__ctx), parser.file_name)
					}
				}
				items.push(__ctx, name);
				var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
				if (token.content == ",")
				{
					parser = look.clone(__ctx);
					var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
					look = res[0];
					token = res[1];
				}
			}
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, ")");
			parser = res[0];
		}
		return Runtime.Collection.from([parser,items.toCollection(__ctx)]);
	},
	/**
	 * Read function
	 */
	readDeclareFunction: function(__ctx, parser, has_name)
	{
		if (has_name == undefined) has_name = true;
		var look = null;
		var parser_value = null;
		var op_code = null;
		var token = null;
		/* Clear vars */
		var save_vars = parser.vars;
		parser = parser.copy(__ctx, { "vars": new Runtime.Dict(__ctx) });
		var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, parser);
		parser = res[0];
		parser_value = res[1];
		var caret_start = parser_value.caret_start.clone(__ctx);
		var result_type = parser_value;
		var expression = null;
		var is_context = true;
		var name = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "@")
		{
			is_context = false;
			parser = look;
		}
		if (has_name)
		{
			var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
			parser = res[0];
			parser_value = res[1];
			var name = parser_value.value;
		}
		/* Read function arguments */
		var args = null;
		var res = this.readDeclareFunctionArgs(__ctx, parser);
		parser = res[0];
		args = res[1];
		/* Read function variables */
		var vars = null;
		var res = this.readDeclareFunctionUse(__ctx, parser, save_vars);
		parser = res[0];
		vars = res[1];
		/* Add variables */
		vars.each(__ctx, (__ctx, name) => 
		{
			parser = parser.copy(__ctx, { "vars": parser.vars.setIm(__ctx, name, true) });
		});
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "=>")
		{
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "=>");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			expression = res[1];
			op_code = null;
		}
		else if (token.content == "{")
		{
			var save = parser.clone(__ctx);
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "{");
			parser = res[0];
			var res = this.readOperators(__ctx, save);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == ";")
		{
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, ";");
			parser = res[0];
			expression = null;
			op_code = null;
		}
		/* Restore vars */
		parser = parser.copy(__ctx, { "vars": save_vars });
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpDeclareFunction(__ctx, Runtime.Dict.from({"args":args,"vars":vars,"name":name,"is_context":is_context,"result_type":result_type,"expression":expression,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Returns true if next is function
	 */
	tryReadFunction: function(__ctx, parser, has_name, flags)
	{
		if (has_name == undefined) has_name = true;
		if (flags == undefined) flags = null;
		var look = null;
		var parser_value = null;
		var token = null;
		/* Clear vars */
		var save_vars = parser.vars;
		parser = parser.copy(__ctx, { "vars": new Runtime.Dict(__ctx) });
		parser = parser.copy(__ctx, { "find_ident": false });
		var res = false;
		try
		{
			var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, parser, false);
			parser = res[0];
			parser_value = res[1];
			var caret_start = parser_value.caret_start.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == "@")
			{
				parser = look;
			}
			if (has_name)
			{
				var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
				parser = res[0];
			}
			var res = this.readDeclareFunctionArgs(__ctx, parser, false);
			parser = res[0];
			var res = this.readDeclareFunctionUse(__ctx, parser, null, false);
			parser = res[0];
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (flags != null && flags.p_declare || parser.current_class_kind == "interface")
			{
				if (token.content != ";")
				{
					throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Function", caret_start, parser.file_name)
				}
			}
			else if (token.content != "=>" && token.content != "{")
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Function", caret_start, parser.file_name)
			}
			res = true;
		}
		catch (_ex)
		{
			if (_ex instanceof Bayrell.Lang.Exceptions.ParserExpected)
			{
				var e = _ex;
				
				res = false;
			}
			else
			{
				throw _ex;
			}
		}
		/* Restore vars */
		parser = parser.copy(__ctx, { "vars": save_vars });
		parser = parser.copy(__ctx, { "find_ident": true });
		return res;
	},
	/**
	 * Read annotation
	 */
	readAnnotation: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var name = null;
		var params = null;
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "@");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, parser);
		parser = res[0];
		name = res[1];
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.readDict(__ctx, parser);
			parser = res[0];
			params = res[1];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpAnnotation(__ctx, Runtime.Dict.from({"name":name,"params":params}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayOperator";
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
			"class_name": "Bayrell.Lang.LangBay.ParserBayOperator",
			"name": "Bayrell.Lang.LangBay.ParserBayOperator",
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
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayOperator);