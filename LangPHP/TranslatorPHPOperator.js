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
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPOperator = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPOperator.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPOperator)
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPOperator";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPOperator,
{
	/**
	 * OpAssign
	 */
	OpAssignStruct: function(ctx, t, op_code, pos)
	{
		if (pos == undefined) pos = 0;
		if (op_code.names.count(ctx) <= pos)
		{
			return t.expression.constructor.Expression(ctx, t, op_code.expression);
		}
		var names = op_code.names.slice(ctx, 0, pos).unshiftIm(ctx, op_code.var_name);
		var s = "$" + Runtime.rtl.toStr(Runtime.rs.join(ctx, "->", names));
		var name = op_code.names.item(ctx, pos);
		var res = this.OpAssignStruct(ctx, t, op_code, pos + 1);
		t = res[0];
		s += Runtime.rtl.toStr("->copy($ctx, [\"" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("\"=>") + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr("])"));
		return Runtime.Collection.from([t,s]);
	},
	/**
	 * OpAssign
	 */
	OpAssign: function(ctx, t, op_code, flag_indent)
	{
		if (flag_indent == undefined) flag_indent = true;
		var content = "";
		if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_ASSIGN || op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
		{
			for (var i = 0;i < op_code.values.count(ctx);i++)
			{
				var s = "";
				var op = "=";
				var item = op_code.values.item(ctx, i);
				if (item.expression == null)
				{
					continue;
				}
				if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
				{
					s = "$" + Runtime.rtl.toStr(item.var_name);
				}
				else
				{
					var res = t.expression.constructor.Dynamic(ctx, t, item.op_code);
					t = res[0];
					s = res[1];
					op = item.op;
				}
				if (item.expression != null)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.expression);
					t = res[0];
					if (op == "~=")
					{
						s += Runtime.rtl.toStr(" .= " + Runtime.rtl.toStr(t.expression.constructor.rtlToStr(ctx, t, res[1])));
					}
					else
					{
						s += Runtime.rtl.toStr(" " + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(res[1]));
					}
				}
				content += Runtime.rtl.toStr((flag_indent) ? t.s(ctx, s + Runtime.rtl.toStr(";")) : s + Runtime.rtl.toStr(";"));
				if (item.var_name != "" && t.save_vars.indexOf(ctx, item.var_name) == -1)
				{
					t = t.copy(ctx, { "save_vars": t.save_vars.pushIm(ctx, item.var_name) });
				}
			}
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpAssign.KIND_STRUCT)
		{
			var s = "$" + Runtime.rtl.toStr(op_code.var_name) + Runtime.rtl.toStr(" = ");
			var res = this.OpAssignStruct(ctx, t, op_code, 0);
			t = res[0];
			content = t.s(ctx, s + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr(";"));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDelete
	 */
	OpDelete: function(ctx, t, op_code)
	{
		var content = "";
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(ctx, t, op_code)
	{
		var content = "";
		var s1 = "";
		var s2 = "";
		var s3 = "";
		if (op_code.expr1 instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			var res = this.OpAssign(ctx, t, op_code.expr1, false);
			t = res[0];
			s1 = res[1];
		}
		else
		{
			var res = t.expression.constructor.Expression(ctx, t, op_code.expr1);
			t = res[0];
			s1 = res[1];
		}
		var res = t.expression.constructor.Expression(ctx, t, op_code.expr2);
		t = res[0];
		s2 = res[1];
		var res = t.expression.constructor.Expression(ctx, t, op_code.expr3);
		t = res[0];
		s3 = res[1];
		content = t.s(ctx, "for (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(s2) + Runtime.rtl.toStr(";") + Runtime.rtl.toStr(s3) + Runtime.rtl.toStr(")"));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = this.Operators(ctx, t, op_code.value);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(ctx, t, op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(ctx, t, op_code.condition);
		t = res[0];
		var s1 = res[1];
		content = t.s(ctx, "if (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(")"));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = this.Operators(ctx, t, op_code.if_true);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		for (var i = 0;i < op_code.if_else.count(ctx);i++)
		{
			var if_else = op_code.if_else.item(ctx, i);
			var res = t.expression.constructor.Expression(ctx, t, if_else.condition);
			t = res[0];
			var s2 = res[1];
			content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(s2) + Runtime.rtl.toStr(")")));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			var res = this.Operators(ctx, t, if_else.if_true);
			t = res[0];
			content += Runtime.rtl.toStr(res[1]);
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
		}
		if (op_code.if_false != null)
		{
			content += Runtime.rtl.toStr(t.s(ctx, "else"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			var res = this.Operators(ctx, t, op_code.if_false);
			t = res[0];
			content += Runtime.rtl.toStr(res[1]);
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(ctx, t, op_code)
	{
		var content = "";
		var s1 = "";
		if (op_code.expression)
		{
			var res = t.expression.constructor.Expression(ctx, t, op_code.expression);
			t = res[0];
			s1 = res[1];
		}
		if (t.current_function.flags != null && t.current_function.flags.isFlag(ctx, "memorize"))
		{
			var content = t.s(ctx, "$__memorize_value = " + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";"));
			content += Runtime.rtl.toStr(t.s(ctx, t.expression.constructor.getModuleName(ctx, t, "Runtime.rtl") + Runtime.rtl.toStr("::_memorizeSave(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(t.current_function.name) + Runtime.rtl.toStr("\", func_get_args(), $__memorize_value);")));
			content += Runtime.rtl.toStr(t.s(ctx, "return $__memorize_value;"));
			return Runtime.Collection.from([t,content]);
		}
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";")));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpThrow
	 */
	OpThrow: function(ctx, t, op_code)
	{
		var res = t.expression.constructor.Expression(ctx, t, op_code.expression);
		t = res[0];
		var content = t.s(ctx, "throw " + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr(";"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(ctx, t, op_code)
	{
		var content = "";
		content += Runtime.rtl.toStr(t.s(ctx, "try"));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = this.Operators(ctx, t, op_code.op_try);
		t = res[0];
		content += Runtime.rtl.toStr(t.s(ctx, res[1]));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "catch (\\Exception $_ex)"));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var s = "";
			var pattern = "";
			var item = op_code.items.item(ctx, i);
			var res = t.expression.constructor.OpTypeIdentifier(ctx, t, item.pattern);
			t = res[0];
			pattern += Runtime.rtl.toStr(res[1]);
			if (pattern != "\\var")
			{
				s = "if ($_ex instanceof " + Runtime.rtl.toStr(pattern) + Runtime.rtl.toStr(")");
			}
			else
			{
				s = "";
			}
			var flag = true;
			if (s == "")
			{
				flag = false;
			}
			if (flag || i > 0)
			{
				s += Runtime.rtl.toStr(t.s(ctx, "{"));
				t = t.levelInc(ctx);
			}
			s += Runtime.rtl.toStr((s != "") ? t.s(ctx, "$" + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = $_ex;")) : "$" + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = $_ex;"));
			var res = this.Operators(ctx, t, item.value);
			t = res[0];
			s += Runtime.rtl.toStr(res[1]);
			if (flag || i > 0)
			{
				t = t.levelDec(ctx);
				s += Runtime.rtl.toStr(t.s(ctx, "}"));
			}
			if (i != 0)
			{
				s = "else " + Runtime.rtl.toStr(s);
			}
			content += Runtime.rtl.toStr(t.s(ctx, s));
		}
		content += Runtime.rtl.toStr(t.s(ctx, "throw $_ex;"));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(ctx, t, op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(ctx, t, op_code.condition);
		t = res[0];
		var s1 = res[1];
		content += Runtime.rtl.toStr(t.s(ctx, "while (" + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = this.Operators(ctx, t, op_code.value);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpPreprocessorIfCode
	 */
	OpPreprocessorIfCode: function(ctx, t, op_code)
	{
		var content = "";
		if (t.preprocessor_flags.has(ctx, op_code.condition.value))
		{
			content = Runtime.rs.trim(ctx, op_code.content);
		}
		return Runtime.Collection.from([t,t.s(ctx, content)]);
	},
	/**
	 * OpPreprocessorIfDef
	 */
	OpPreprocessorIfDef: function(ctx, t, op_code, kind)
	{
		if (!t.preprocessor_flags.has(ctx, op_code.condition.value))
		{
			return Runtime.Collection.from([t,""]);
		}
		if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR)
		{
			return this.Operators(ctx, t, op_code.items);
		}
		else if (kind == Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION)
		{
			return t.expression.constructor.Expression(ctx, t, op_code.items);
		}
		var content = "";
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var item = op_code.items.item(ctx, i);
			if (item instanceof Bayrell.Lang.OpCodes.OpComment)
			{
				var res = t.operator.constructor.OpComment(ctx, t, item);
				t = res[0];
				content += Runtime.rtl.toStr(res[1]);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
			{
				var res = t.program.constructor.OpDeclareFunction(ctx, t, item);
				t = res[0];
				content += Runtime.rtl.toStr(res[1]);
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpComment
	 */
	OpComment: function(ctx, t, op_code)
	{
		var content = t.s(ctx, "/*" + Runtime.rtl.toStr(op_code.value) + Runtime.rtl.toStr("*/"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpComments
	 */
	OpComments: function(ctx, t, comments)
	{
		var content = "";
		for (var i = 0;i < comments.count(ctx);i++)
		{
			var res = this.OpComment(ctx, t, comments.item(ctx, i));
			content += Runtime.rtl.toStr(res[1]);
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpComments
	 */
	AddComments: function(ctx, t, comments, content)
	{
		if (comments && comments.count(ctx) > 0)
		{
			var res = this.OpComments(ctx, t, comments);
			var s = res[1];
			if (s != "")
			{
				content = s + Runtime.rtl.toStr(content);
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Operator
	 */
	Operator: function(ctx, t, op_code)
	{
		var content = "";
		/* Clear save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		if (op_code instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			var res = this.OpAssign(ctx, t, op_code);
			t = res[0];
			var content = res[1];
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(ctx, t, save_op_codes.count(ctx));
			if (save != "")
			{
				content = save + Runtime.rtl.toStr(content);
			}
			t = t.copy(ctx, { "save_op_codes": save_op_codes });
			t = t.copy(ctx, { "save_op_code_inc": save_op_code_inc });
			return Runtime.Collection.from([t,content]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAssignStruct)
		{
			var res = this.OpAssignStruct(ctx, t, op_code);
			t = res[0];
			var s1 = res[1];
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(ctx, t, save_op_codes.count(ctx));
			if (save != "")
			{
				content = save;
			}
			content += Runtime.rtl.toStr(t.s(ctx, "$" + Runtime.rtl.toStr(op_code.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";")));
			t = t.copy(ctx, { "save_op_codes": save_op_codes });
			t = t.copy(ctx, { "save_op_code_inc": save_op_code_inc });
			return Runtime.Collection.from([t,content]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpBreak)
		{
			content = t.s(ctx, "break;");
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			var res = t.expression.constructor.OpCall(ctx, t, op_code);
			t = res[0];
			content = t.s(ctx, res[1] + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpContinue)
		{
			content = t.s(ctx, "continue;");
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDelete)
		{
			var res = this.OpDelete(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpFor)
		{
			var res = this.OpFor(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpIf)
		{
			var res = this.OpIf(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			var res = t.expression.constructor.OpPipe(ctx, t, op_code, false);
			t = res[0];
			content = t.s(ctx, res[1] + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpReturn)
		{
			var res = this.OpReturn(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpThrow)
		{
			var res = this.OpThrow(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTryCatch)
		{
			var res = this.OpTryCatch(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpWhile)
		{
			var res = this.OpWhile(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpInc)
		{
			var res = t.expression.constructor.OpInc(ctx, t, op_code);
			t = res[0];
			content = t.s(ctx, res[1] + Runtime.rtl.toStr(";"));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
		{
			var res = this.OpPreprocessorIfCode(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			var res = this.OpPreprocessorIfDef(ctx, t, op_code, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_OPERATOR);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorSwitch)
		{
			for (var i = 0;i < op_code.items.count(ctx);i++)
			{
				var res = this.OpPreprocessorIfCode(ctx, t, op_code.items.item(ctx, i));
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpComment)
		{
			var res = this.OpComment(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(ctx, t, save_op_codes.count(ctx));
		if (save != "")
		{
			content = save + Runtime.rtl.toStr(content);
		}
		/* Restore save op codes */
		t = t.copy(ctx, { "save_op_codes": save_op_codes });
		t = t.copy(ctx, { "save_op_code_inc": save_op_code_inc });
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Operators
	 */
	Operators: function(ctx, t, op_code)
	{
		var content = "";
		var f1 = (ctx, op_code) => 
		{
			return op_code instanceof Bayrell.Lang.OpCodes.OpBreak || op_code instanceof Bayrell.Lang.OpCodes.OpCall || op_code instanceof Bayrell.Lang.OpCodes.OpContinue || op_code instanceof Bayrell.Lang.OpCodes.OpReturn || op_code instanceof Bayrell.Lang.OpCodes.OpThrow;
		};
		if (op_code instanceof Bayrell.Lang.OpCodes.OpItems)
		{
			for (var i = 0;i < op_code.items.count(ctx);i++)
			{
				var item = op_code.items.item(ctx, i);
				var res = this.Operator(ctx, t, item);
				t = res[0];
				content += Runtime.rtl.toStr(res[1]);
			}
		}
		else
		{
			var res = this.Operator(ctx, t, op_code);
			t = res[0];
			content += Runtime.rtl.toStr(res[1]);
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction Arguments
	 */
	OpDeclareFunctionArgs: function(ctx, t, f)
	{
		var content = "";
		if (f.args != null)
		{
			var flag = false;
			if (f.is_context)
			{
				content += Runtime.rtl.toStr("$ctx");
				flag = true;
			}
			for (var i = 0;i < f.args.count(ctx, i);i++)
			{
				var arg = f.args.item(ctx, i);
				var name = arg.name;
				var expr = "";
				if (arg.expression != null)
				{
					var res = t.expression.constructor.Expression(ctx, t, arg.expression);
					t = res[0];
					expr = res[1];
				}
				content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr("$") + Runtime.rtl.toStr(name) + Runtime.rtl.toStr(((expr != "") ? "=" + Runtime.rtl.toStr(expr) : "")));
				flag = true;
			}
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(ctx, t, f)
	{
		var save_t = t;
		var content = "";
		t = t.levelInc(ctx);
		if (f.value)
		{
			var res = t.operator.constructor.Operators(ctx, t, f.value);
			t = res[0];
			content += Runtime.rtl.toStr(res[1]);
		}
		else if (f.expression)
		{
			/* Clear save op codes */
			t = t.constructor.clearSaveOpCode(ctx, t);
			var res = t.expression.constructor.Expression(ctx, t, f.expression);
			t = res[0];
			var expr = res[1];
			var s = "";
			if (f.flags != null && f.flags.isFlag(ctx, "memorize"))
			{
				s = "$__memorize_value = " + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(";");
				s += Runtime.rtl.toStr(t.s(ctx, t.expression.constructor.getModuleName(ctx, t, "Runtime.rtl") + Runtime.rtl.toStr("::_memorizeSave(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(f.name) + Runtime.rtl.toStr("\", func_get_args(), $__memorize_value);")));
				s += Runtime.rtl.toStr(t.s(ctx, "return $__memorize_value;"));
			}
			else
			{
				s = t.s(ctx, "return " + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(";"));
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(ctx, t);
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(s);
		}
		if (f.flags != null && f.flags.isFlag(ctx, "memorize"))
		{
			var s = "";
			s += Runtime.rtl.toStr(t.s(ctx, "$__memorize_value = " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(ctx, t, "Runtime.rtl")) + Runtime.rtl.toStr("::_memorizeValue(\"") + Runtime.rtl.toStr(t.current_class_full_name) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(f.name) + Runtime.rtl.toStr("\", func_get_args());")));
			s += Runtime.rtl.toStr(t.s(ctx, "if ($__memorize_value != " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(ctx, t, "Runtime.rtl")) + Runtime.rtl.toStr("::$_memorize_not_found) return $__memorize_value;")));
			content = s + Runtime.rtl.toStr(content);
		}
		t = t.levelDec(ctx);
		content = t.s(ctx, "{") + Runtime.rtl.toStr(content);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		return Runtime.Collection.from([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPOperator";
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
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPOperator",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPOperator",
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
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPOperator);