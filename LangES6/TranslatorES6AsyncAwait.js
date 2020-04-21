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
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait = function(ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype = Object.create(Runtime.CoreStruct.prototype);
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.async_stack = new Runtime.Collection(ctx);
		this.pos = Runtime.Collection.from([0]);
		this.async_t = "__async_t";
		this.async_var = "__async_var";
		Runtime.CoreStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangES6.TranslatorES6AsyncAwait)
		{
			this.async_stack = o.async_stack;
			this.pos = o.pos;
			this.async_t = o.async_t;
			this.async_var = o.async_var;
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "async_stack")this.async_stack = v;
		else if (k == "pos")this.pos = v;
		else if (k == "async_t")this.async_t = v;
		else if (k == "async_var")this.async_var = v;
		else Runtime.CoreStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "async_stack")return this.async_stack;
		else if (k == "pos")return this.pos;
		else if (k == "async_t")return this.async_t;
		else if (k == "async_var")return this.async_var;
		return Runtime.CoreStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait, Runtime.CoreStruct);
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait,
{
	/**
	 * Returns current pos
	 */
	currentPos: function(ctx, t)
	{
		return t.expression.constructor.toString(ctx, Runtime.rs.join(ctx, ".", t.async_await.pos));
	},
	/**
	 * Returns current pos
	 */
	nextPos: function(ctx, t)
	{
		var pos = t.async_await.pos;
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": pos.setIm(ctx, pos.count(ctx) - 1, pos.last(ctx) + 1) }) });
		var res = t.expression.constructor.toString(ctx, Runtime.rs.join(ctx, ".", t.async_await.pos));
		return Runtime.Collection.from([t,res]);
	},
	/**
	 * Returns push pos
	 */
	pushPos: function(ctx, t)
	{
		var pos = t.async_await.pos;
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": pos.setIm(ctx, pos.count(ctx) - 1, pos.last(ctx) + 1).pushIm(ctx, 0) }) });
		var res = t.expression.constructor.toString(ctx, Runtime.rs.join(ctx, ".", t.async_await.pos));
		return Runtime.Collection.from([t,res]);
	},
	/**
	 * Returns inc pos
	 */
	levelIncPos: function(ctx, t)
	{
		var pos = t.async_await.pos;
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": pos.setIm(ctx, pos.count(ctx) - 1, pos.last(ctx)).pushIm(ctx, 0) }) });
		var res = t.expression.constructor.toString(ctx, Runtime.rs.join(ctx, ".", t.async_await.pos));
		return Runtime.Collection.from([t,res]);
	},
	/**
	 * Returns pop pos
	 */
	popPos: function(ctx, t)
	{
		var pos = t.async_await.pos.removeLastIm(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": pos.setIm(ctx, pos.count(ctx) - 1, pos.last(ctx) + 1) }) });
		var res = t.expression.constructor.toString(ctx, Runtime.rs.join(ctx, ".", t.async_await.pos));
		return Runtime.Collection.from([t,res]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(ctx, t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var s = "";
		var flag = false;
		if (s == "")
		{
			var res = t.expression.constructor.Dynamic(ctx, t, op_code.obj);
			t = res[0];
			s = res[1];
			if (s == "parent")
			{
				s = t.expression.constructor.useModuleName(ctx, t, t.current_class_extends_name);
				if (t.current_function.name != "constructor")
				{
					if (t.current_function.isStatic(ctx))
					{
						s += Runtime.rtl.toStr("." + Runtime.rtl.toStr(t.current_function.name));
					}
					else
					{
						s += Runtime.rtl.toStr(".prototype." + Runtime.rtl.toStr(t.current_function.name));
					}
				}
				s += Runtime.rtl.toStr(".call(this");
				flag = true;
			}
			else
			{
				s += Runtime.rtl.toStr("(");
			}
		}
		var content = s;
		if (t.current_function.is_context && op_code.is_context)
		{
			content += Runtime.rtl.toStr("ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(ctx);i++)
		{
			var item = op_code.args.item(ctx, i);
			var res = t.expression.constructor.Expression(ctx, t, item);
			t = res[0];
			var s = res[1];
			content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var res = this.nextPos(ctx, t);
		t = res[0];
		var next_pos = res[1];
		var async_t = t.async_await.async_t;
		content = t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(next_pos) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr(".call(ctx, ") + Runtime.rtl.toStr(content) + Runtime.rtl.toStr(",") + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, var_name)) + Runtime.rtl.toStr(");"));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(next_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.constructor.addSaveOpCode(ctx, t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		if (is_expression)
		{
			return Runtime.Collection.from([t,async_t + Runtime.rtl.toStr(".getVar(ctx, ") + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, var_name)) + Runtime.rtl.toStr(")")]);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(ctx, t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var content = "";
		var var_name = "";
		var flag = false;
		var res = t.expression.constructor.Expression(ctx, t, op_code.obj);
		t = res[0];
		var_name = res[1];
		if (op_code.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_METHOD)
		{
			content = var_name + Runtime.rtl.toStr(".constructor.") + Runtime.rtl.toStr(op_code.method_name.value);
		}
		else
		{
			var res = t.expression.constructor.OpTypeIdentifier(ctx, t, op_code.class_name);
			t = res[0];
			content = res[1] + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(op_code.method_name.value);
		}
		var flag = false;
		content += Runtime.rtl.toStr("(");
		if (t.current_function.is_context && op_code.is_context)
		{
			content += Runtime.rtl.toStr("ctx");
			flag = true;
		}
		content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr(var_name));
		flag = true;
		for (var i = 0;i < op_code.args.count(ctx);i++)
		{
			var item = op_code.args.item(ctx, i);
			var res = t.expression.constructor.Expression(ctx, t, item);
			t = res[0];
			var s1 = res[1];
			content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr(s1));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var res = this.nextPos(ctx, t);
		t = res[0];
		var next_pos = res[1];
		var async_t = t.async_await.async_t;
		content = t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(next_pos) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr(".call(ctx, ") + Runtime.rtl.toStr(content) + Runtime.rtl.toStr(",") + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, var_name)) + Runtime.rtl.toStr(");"));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(next_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.constructor.addSaveOpCode(ctx, t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		if (is_expression)
		{
			return Runtime.Collection.from([t,async_t + Runtime.rtl.toStr(".getVar(ctx, ") + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, var_name)) + Runtime.rtl.toStr(")")]);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(ctx, t, op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var res = this.pushPos(ctx, t);
		t = res[0];
		var start_pos = res[1];
		var res = this.popPos(ctx, t);
		save_t = res[0];
		var end_pos = res[1];
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.pushIm(ctx, new Bayrell.Lang.LangES6.AsyncAwait(ctx, Runtime.Dict.from({"start_pos":start_pos,"end_pos":end_pos}))) }) });
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* Start Loop */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* Loop Assign */
		if (op_code.expr1 instanceof Bayrell.Lang.OpCodes.OpAssign)
		{
			var res = t.constructor.saveOpCodeCall(ctx, t, t.operator.staticMethod("OpAssign"), Runtime.Collection.from([op_code.expr1]));
			t = res[0];
			var save = res[1];
			var value = res[2];
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(value);
		}
		else
		{
			var res = t.constructor.saveOpCodeCall(ctx, t, t.expression.staticMethod("Expression"), Runtime.Collection.from([op_code.expr1]));
			t = res[0];
			var save = res[1];
			var value = res[2];
			if (save != "")
			{
				content += Runtime.rtl.toStr(save);
			}
			content += Runtime.rtl.toStr(value);
		}
		/* Loop Expression */
		var res = this.nextPos(ctx, t);
		t = res[0];
		var loop_expression = res[1];
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(loop_expression) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* Loop Expression */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(loop_expression) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(ctx, t, t.expression.staticMethod("Expression"), Runtime.Collection.from([op_code.expr2]));
		t = res[0];
		var save = res[1];
		var value = res[2];
		if (save != "")
		{
			content += Runtime.rtl.toStr(save);
		}
		/* Loop condition */
		content += Runtime.rtl.toStr(t.s(ctx, "var " + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(";")));
		var res = this.nextPos(ctx, t);
		t = res[0];
		var start_loop = res[1];
		content += Runtime.rtl.toStr(t.s(ctx, "if (" + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(start_loop) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		/* Start Loop */
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* Loop */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(start_loop) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.expression.constructor.Expression(ctx, t, op_code.expr3);
		t = res[0];
		content += Runtime.rtl.toStr(t.s(ctx, res[1] + Runtime.rtl.toStr(";")));
		var res = t.operator.constructor.Operators(ctx, t, op_code.value);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		/* End Loop */
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(loop_expression) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* End Loop */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.removeLastIm(ctx) }) });
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": save_t.async_await.pos }) });
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpIfBlock
	 */
	OpIfBlock: function(ctx, t, condition, op_code, end_pos)
	{
		var content = "";
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(ctx, t, t.expression.staticMethod("Expression"), Runtime.Collection.from([condition]));
		t = res[0];
		var save = res[1];
		var value = res[2];
		if (save != "")
		{
			content += Runtime.rtl.toStr(save);
		}
		var res = this.nextPos(ctx, t);
		t = res[0];
		var start_if = res[1];
		var res = this.nextPos(ctx, t);
		t = res[0];
		var next_if = res[1];
		/* If condition */
		content += Runtime.rtl.toStr(t.s(ctx, "var " + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(";")));
		content += Runtime.rtl.toStr(t.s(ctx, "if (" + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(start_if) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(next_if) + Runtime.rtl.toStr(");")));
		/* Start Loop */
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* If true */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(start_if) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.operator.constructor.Operators(ctx, t, op_code);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		/* End if */
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* Next If */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(next_if) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(ctx, t, op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var if_true_pos = "";
		var if_false_pos = "";
		var res = this.pushPos(ctx, t);
		t = res[0];
		var start_pos = res[1];
		var res = this.popPos(ctx, t);
		save_t = res[0];
		var end_pos = res[1];
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* Start if */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* If true */
		var res = this.OpIfBlock(ctx, t, op_code.condition, op_code.if_true, end_pos);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		/* If else */
		for (var i = 0;i < op_code.if_else.count(ctx);i++)
		{
			var if_else = op_code.if_else.item(ctx, i);
			var res = this.OpIfBlock(ctx, t, if_else.condition, if_else.if_true, end_pos);
			t = res[0];
			content += Runtime.rtl.toStr(res[1]);
		}
		/* Else */
		if (op_code.if_false)
		{
			content += Runtime.rtl.toStr(t.s(ctx, "/* If false */"));
			var res = t.operator.constructor.Operators(ctx, t, op_code.if_false);
			t = res[0];
			content += Runtime.rtl.toStr(res[1]);
		}
		/* End if */
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* End if */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": save_t.async_await.pos }) });
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
		else
		{
			s1 = "null";
		}
		var async_t = t.async_await.async_t;
		content = t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".ret(ctx, ") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(");"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(ctx, t, op_code)
	{
		var save_t = null;
		var content = "";
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var res = this.nextPos(ctx, t);
		t = res[0];
		var start_pos = res[1];
		var res = this.nextPos(ctx, t);
		save_t = res[0];
		var end_pos = res[1];
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.pushIm(ctx, new Bayrell.Lang.LangES6.AsyncAwait(ctx, Runtime.Dict.from({"start_pos":start_pos,"end_pos":end_pos}))) }) });
		/* Start Try Catch */
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* Start Try */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = this.levelIncPos(ctx, t);
		t = res[0];
		var start_catch = res[1];
		content += Runtime.rtl.toStr(t.s(ctx, async_t + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".catch_push(") + Runtime.rtl.toStr(start_catch) + Runtime.rtl.toStr(");")));
		var res = t.operator.constructor.Operators(ctx, t, op_code.op_try);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		/* Start Catch */
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".catch_pop().jump(ctx, ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* Start Catch */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(start_catch) + Runtime.rtl.toStr(")")));
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
			if (pattern != "var")
			{
				s = "if (_ex instanceof " + Runtime.rtl.toStr(pattern) + Runtime.rtl.toStr(")");
			}
			else
			{
				s = "if (true)";
			}
			s += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			s += Runtime.rtl.toStr((s != "") ? t.s(ctx, "var " + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = _ex;")) : "var " + Runtime.rtl.toStr(item.name) + Runtime.rtl.toStr(" = _ex;"));
			var res = t.operator.constructor.Operators(ctx, t, item.value);
			t = res[0];
			s += Runtime.rtl.toStr(t.s(ctx, res[1]));
			t = t.levelDec(ctx);
			s += Runtime.rtl.toStr(t.s(ctx, "}"));
			if (i != 0)
			{
				s = "else " + Runtime.rtl.toStr(s);
			}
			content += Runtime.rtl.toStr(t.s(ctx, s));
		}
		content += Runtime.rtl.toStr(t.s(ctx, "else"));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "throw _ex;"));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		/* End Try Catch */
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* End Catch */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.removeLastIm(ctx) }) });
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": save_t.async_await.pos }) });
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(ctx, t, op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var res = this.pushPos(ctx, t);
		t = res[0];
		var start_pos = res[1];
		var res = this.popPos(ctx, t);
		save_t = res[0];
		var end_pos = res[1];
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.pushIm(ctx, new Bayrell.Lang.LangES6.AsyncAwait(ctx, Runtime.Dict.from({"start_pos":start_pos,"end_pos":end_pos}))) }) });
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* Start while */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(ctx, t, t.expression.staticMethod("Expression"), Runtime.Collection.from([op_code.condition]));
		t = res[0];
		var save = res[1];
		var value = res[2];
		if (save != "")
		{
			content += Runtime.rtl.toStr(save);
		}
		/* Loop condition */
		content += Runtime.rtl.toStr(t.s(ctx, "var " + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(";")));
		var res = this.nextPos(ctx, t);
		t = res[0];
		var start_loop = res[1];
		content += Runtime.rtl.toStr(t.s(ctx, "if (" + Runtime.rtl.toStr(async_var) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(start_loop) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(");")));
		/* Start Loop */
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* Loop while */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(start_loop) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		var res = t.operator.constructor.Operators(ctx, t, op_code.value);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		/* End Loop */
		content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".jump(ctx, ") + Runtime.rtl.toStr(start_pos) + Runtime.rtl.toStr(");")));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		content += Runtime.rtl.toStr(t.s(ctx, "/* End while */"));
		content += Runtime.rtl.toStr(t.s(ctx, "else if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(end_pos) + Runtime.rtl.toStr(")")));
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "async_stack": t.async_await.async_stack.removeLastIm(ctx) }) });
		t = t.copy(ctx, { "async_await": t.async_await.copy(ctx, { "pos": save_t.async_await.pos }) });
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(ctx, t, f)
	{
		var save_t = t;
		/* Save op codes */
		var save_vars = t.save_vars;
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		t = t.constructor.clearSaveOpCode(ctx, t);
		var async_t = t.async_await.async_t;
		t = t.levelInc(ctx);
		var s1 = t.s(ctx, "return (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(") =>"));
		s1 += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		s1 += Runtime.rtl.toStr(t.s(ctx, "if (" + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".pos(ctx) == ") + Runtime.rtl.toStr(this.currentPos(ctx, t)) + Runtime.rtl.toStr(")")));
		s1 += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		if (f.value)
		{
			var res = t.operator.constructor.Operators(ctx, t, f.value);
			t = res[0];
			s1 += Runtime.rtl.toStr(res[1]);
		}
		else if (f.expression)
		{
			var res = t.expression.constructor.Expression(ctx, t, f.expression);
			t = res[0];
			var expr = res[1];
			s1 += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".ret(ctx, ") + Runtime.rtl.toStr(expr) + Runtime.rtl.toStr(");")));
		}
		t = t.levelDec(ctx);
		s1 += Runtime.rtl.toStr(t.s(ctx, "}"));
		s1 += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(async_t) + Runtime.rtl.toStr(".ret_void(ctx);")));
		t = t.levelDec(ctx);
		s1 += Runtime.rtl.toStr(t.s(ctx, "};"));
		t = t.levelDec(ctx);
		/* Content */
		var content = "";
		content = t.s(ctx, "{");
		t = t.levelInc(ctx);
		if (t.save_vars.count(ctx) > 0)
		{
			content += Runtime.rtl.toStr(t.s(ctx, "var " + Runtime.rtl.toStr(Runtime.rs.join(ctx, ",", t.save_vars)) + Runtime.rtl.toStr(";")));
		}
		content += Runtime.rtl.toStr(s1);
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		/* Restore save op codes */
		t = t.copy(ctx, { "save_vars": save_vars });
		t = t.copy(ctx, { "save_op_codes": save_op_codes });
		t = t.copy(ctx, { "save_op_code_inc": save_op_code_inc });
		return Runtime.Collection.from([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
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
			a.push("async_stack");
			a.push("pos");
			a.push("async_t");
			a.push("async_var");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "async_stack") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pos") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "async_t") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "async_var") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
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
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait);