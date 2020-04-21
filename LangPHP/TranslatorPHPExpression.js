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
Bayrell.Lang.LangPHP.TranslatorPHPExpression = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPExpression)
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPExpression";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression,
{
	/**
	 * Returns string
	 */
	toString: function(ctx, s)
	{
		s = Runtime.re.replace(ctx, "\\\\", "\\\\", s);
		s = Runtime.re.replace(ctx, "\"", "\\\"", s);
		s = Runtime.re.replace(ctx, "\n", "\\n", s);
		s = Runtime.re.replace(ctx, "\r", "\\r", s);
		s = Runtime.re.replace(ctx, "\t", "\\t", s);
		return "\"" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("\"");
	},
	/**
	 * To pattern
	 */
	toPattern: function(ctx, t, pattern)
	{
		var names = this.findModuleNames(ctx, t, pattern.entity_name.names);
		var e = Runtime.rs.join(ctx, ".", names);
		var a = (pattern.template != null) ? pattern.template.map(ctx, (ctx, pattern) => 
		{
			return this.toPattern(ctx, t, pattern);
		}) : null;
		var b = (a != null) ? ",\"t\":[" + Runtime.rtl.toStr(Runtime.rs.join(ctx, ",", a)) + Runtime.rtl.toStr("]") : "";
		return "[\"e\"=>" + Runtime.rtl.toStr(this.toString(ctx, e)) + Runtime.rtl.toStr(b) + Runtime.rtl.toStr("]");
	},
	/**
	 * Returns string
	 */
	rtlToStr: function(ctx, t, s)
	{
		var module_name = this.getModuleName(ctx, t, "rtl");
		return module_name + Runtime.rtl.toStr("::toStr(") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
	},
	/**
	 * Find module name
	 */
	findModuleName: function(ctx, t, module_name)
	{
		if (module_name == "Collection")
		{
			return "Runtime.Collection";
		}
		else if (module_name == "Dict")
		{
			return "Runtime.Dict";
		}
		else if (module_name == "Map")
		{
			return "Runtime.Map";
		}
		else if (module_name == "Vector")
		{
			return "Runtime.Vector";
		}
		else if (module_name == "rs")
		{
			return "Runtime.rs";
		}
		else if (module_name == "rtl")
		{
			return "Runtime.rtl";
		}
		else if (module_name == "ArrayInterface")
		{
			return "ArrayAccess";
		}
		else if (t.modules.has(ctx, module_name))
		{
			return t.modules.item(ctx, module_name);
		}
		return module_name;
	},
	/**
	 * Returns module name
	 */
	findModuleNames: function(ctx, t, names)
	{
		if (names.count(ctx) > 0)
		{
			var module_name = names.first(ctx);
			module_name = this.findModuleName(ctx, t, module_name);
			if (module_name != "")
			{
				names = names.removeFirstIm(ctx).prependCollectionIm(ctx, Runtime.rs.split(ctx, "\\.", module_name));
			}
		}
		return names;
	},
	/**
	 * Return module name
	 */
	getModuleName: function(ctx, t, module_name)
	{
		module_name = this.findModuleName(ctx, t, module_name);
		module_name = Runtime.rs.replace(ctx, "\\.", "\\", module_name);
		return "\\" + Runtime.rtl.toStr(module_name);
	},
	/**
	 * Return module name
	 */
	getModuleNames: function(ctx, t, names)
	{
		return "\\" + Runtime.rtl.toStr(Runtime.rs.join(ctx, "\\", this.findModuleNames(ctx, t, names)));
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(ctx, t, op_code)
	{
		var names = this.findModuleNames(ctx, t, op_code.entity_name.names);
		var s = "\\" + Runtime.rtl.toStr(Runtime.rs.join(ctx, "\\", names));
		return Runtime.Collection.from([t,s]);
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(ctx, t, op_code)
	{
		if (op_code.value == "@")
		{
			return Runtime.Collection.from([t,"$ctx"]);
		}
		if (op_code.value == "_")
		{
			return Runtime.Collection.from([t,"($ctx->staticMethod('translate'))"]);
		}
		if (op_code.value == "log")
		{
			return Runtime.Collection.from([t,"var_dump"]);
		}
		if (t.modules.has(ctx, op_code.value) || op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.getModuleName(ctx, t, module_name);
			return Runtime.Collection.from([t,new_module_name]);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE)
		{
			var content = op_code.value;
			return Runtime.Collection.from([t,"$" + Runtime.rtl.toStr(content)]);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF)
		{
			var content = op_code.value;
			if (content == "this")
			{
				content = "$this";
			}
			return Runtime.Collection.from([t,content]);
		}
		var content = op_code.value;
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpNumber
	 */
	OpNumber: function(ctx, t, op_code)
	{
		var content = op_code.value;
		if (op_code.negative)
		{
			content = "-" + Runtime.rtl.toStr(content);
			t = t.copy(ctx, { "opcode_level": 15 });
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpString
	 */
	OpString: function(ctx, t, op_code)
	{
		return Runtime.Collection.from([t,this.toString(ctx, op_code.value)]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(ctx, t, op_code)
	{
		var content = "";
		var values = op_code.values.map(ctx, (ctx, op_code) => 
		{
			var res = this.Expression(ctx, t, op_code);
			t = res[0];
			var s = res[1];
			return s;
		});
		values = values.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		var module_name = this.getModuleName(ctx, t, "Collection");
		content = module_name + Runtime.rtl.toStr("::from([") + Runtime.rtl.toStr(Runtime.rs.join(ctx, ",", values)) + Runtime.rtl.toStr("])");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(ctx, t, op_code, flag_array)
	{
		if (flag_array == undefined) flag_array = false;
		var content = "";
		var values = op_code.values.transition(ctx, (ctx, op_code, key) => 
		{
			var res = this.Expression(ctx, t, op_code);
			t = res[0];
			var s = res[1];
			return this.toString(ctx, key) + Runtime.rtl.toStr("=>") + Runtime.rtl.toStr(s);
		});
		values = values.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		var module_name = this.getModuleName(ctx, t, "Dict");
		if (!flag_array)
		{
			content = module_name + Runtime.rtl.toStr("::from([") + Runtime.rtl.toStr(Runtime.rs.join(ctx, ",", values)) + Runtime.rtl.toStr("])");
		}
		else
		{
			content = "[" + Runtime.rtl.toStr(Runtime.rs.join(ctx, ",", values)) + Runtime.rtl.toStr("]");
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Dynamic
	 */
	Dynamic: function(ctx, t, op_code, next_op_code)
	{
		if (next_op_code == undefined) next_op_code = null;
		if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			return this.OpIdentifier(ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
		{
			var attrs = new Runtime.Vector(ctx);
			var op_code_item = op_code;
			var op_code_next = op_code;
			var prev_kind = "";
			var s = "";
			while (op_code_next instanceof Bayrell.Lang.OpCodes.OpAttr)
			{
				attrs.push(ctx, op_code_next);
				op_code_item = op_code_next;
				op_code_next = op_code_next.obj;
			}
			attrs = attrs.reverseIm(ctx);
			if (op_code_next instanceof Bayrell.Lang.OpCodes.OpCall)
			{
				prev_kind = "var";
				var res = this.OpCall(ctx, t, op_code_next);
				t = res[0];
				s = res[1];
			}
			else if (op_code_next instanceof Bayrell.Lang.OpCodes.OpNew)
			{
				prev_kind = "var";
				var res = this.OpNew(ctx, t, op_code_next);
				t = res[0];
				s = "(" + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr(")");
			}
			else if (op_code_next instanceof Bayrell.Lang.OpCodes.OpIdentifier)
			{
				if (op_code_next.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF)
				{
					if (op_code_next.value == "static")
					{
						s = "static";
						prev_kind = "static";
					}
					else if (op_code_next.value == "parent")
					{
						s = "parent";
						prev_kind = "static";
					}
					else if (op_code_next.value == "self")
					{
						prev_kind = "static";
						s = this.getModuleName(ctx, t, t.current_class_full_name);
					}
					else if (op_code_next.value == "this")
					{
						prev_kind = "var";
						s = "$this";
					}
				}
				else
				{
					var res = this.OpIdentifier(ctx, t, op_code_next);
					t = res[0];
					s = res[1];
					prev_kind = "var";
					if (t.modules.has(ctx, op_code_next.value) || op_code_next.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
					{
						prev_kind = "static";
					}
				}
			}
			var attrs_sz = attrs.count(ctx);
			for (var i = 0;i < attrs.count(ctx);i++)
			{
				var attr = attrs.item(ctx, i);
				var next_attr = attrs.get(ctx, i + 1, null);
				if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_ATTR)
				{
					s += Runtime.rtl.toStr("->" + Runtime.rtl.toStr(attr.value.value));
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_STATIC)
				{
					if (prev_kind == "static")
					{
						var attr_val = attr.value.value;
						if (i == attrs_sz - 1 && next_op_code instanceof Bayrell.Lang.OpCodes.OpCall)
						{
							s += Runtime.rtl.toStr("::" + Runtime.rtl.toStr(attr_val));
						}
						else if (Runtime.rs.strtoupper(ctx, attr_val) == attr_val)
						{
							s += Runtime.rtl.toStr("::" + Runtime.rtl.toStr(attr_val));
						}
						else
						{
							s += Runtime.rtl.toStr("::$" + Runtime.rtl.toStr(attr_val));
						}
					}
					else
					{
						s = s + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(attr.value.value);
					}
					prev_kind = "static";
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC)
				{
					var res = this.Expression(ctx, t, attr.value);
					t = res[0];
					s += Runtime.rtl.toStr("[" + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr("]"));
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_PIPE)
				{
					s += Runtime.rtl.toStr("->" + Runtime.rtl.toStr(attr.value.value));
				}
			}
			return Runtime.Collection.from([t,s]);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			return this.OpCall(ctx, t, op_code);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * OpInc
	 */
	OpInc: function(ctx, t, op_code)
	{
		var content = "";
		var res = this.Expression(ctx, t, op_code.value);
		t = res[0];
		var s = res[1];
		if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_PRE_INC)
		{
			content = "++$" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_PRE_DEC)
		{
			content = "--$" + Runtime.rtl.toStr(s);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_POST_INC)
		{
			content = "$" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("++");
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpInc.KIND_POST_DEC)
		{
			content = "$" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("--");
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpMath
	 */
	OpMath: function(ctx, t, op_code)
	{
		var res = this.Expression(ctx, t, op_code.value1);
		t = res[0];
		var opcode_level1 = res[0].opcode_level;
		var s1 = res[1];
		var op = "";
		var op_math = op_code.math;
		var opcode_level = 0;
		if (op_code.math == "!")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == ">>")
		{
			opcode_level = 12;
			op = ">>";
		}
		if (op_code.math == "<<")
		{
			opcode_level = 12;
			op = "<<";
		}
		if (op_code.math == "&")
		{
			opcode_level = 9;
			op = "&";
		}
		if (op_code.math == "xor")
		{
			opcode_level = 8;
			op = "^";
		}
		if (op_code.math == "|")
		{
			opcode_level = 7;
			op = "|";
		}
		if (op_code.math == "*")
		{
			opcode_level = 14;
			op = "*";
		}
		if (op_code.math == "/")
		{
			opcode_level = 14;
			op = "/";
		}
		if (op_code.math == "%")
		{
			opcode_level = 14;
			op = "%";
		}
		if (op_code.math == "div")
		{
			opcode_level = 14;
			op = "div";
		}
		if (op_code.math == "mod")
		{
			opcode_level = 14;
			op = "mod";
		}
		if (op_code.math == "+")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "-")
		{
			opcode_level = 13;
			op = "-";
		}
		if (op_code.math == "~")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "!")
		{
			opcode_level = 13;
			op = "!";
		}
		if (op_code.math == "===")
		{
			opcode_level = 10;
			op = "===";
		}
		if (op_code.math == "!==")
		{
			opcode_level = 10;
			op = "!==";
		}
		if (op_code.math == "==")
		{
			opcode_level = 10;
			op = "==";
		}
		if (op_code.math == "!=")
		{
			opcode_level = 10;
			op = "!=";
		}
		if (op_code.math == ">=")
		{
			opcode_level = 10;
			op = ">=";
		}
		if (op_code.math == "<=")
		{
			opcode_level = 10;
			op = "<=";
		}
		if (op_code.math == ">")
		{
			opcode_level = 10;
			op = ">";
		}
		if (op_code.math == "<")
		{
			opcode_level = 10;
			op = "<";
		}
		if (op_code.math == "is")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "instanceof")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "implements")
		{
			opcode_level = 10;
			op = "implements";
		}
		if (op_code.math == "not")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == "and")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "&&")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "or")
		{
			opcode_level = 5;
			op = "||";
		}
		if (op_code.math == "||")
		{
			opcode_level = 5;
			op = "||";
		}
		var content = "";
		if (op_code.math == "!" || op_code.math == "not")
		{
			content = op + Runtime.rtl.toStr(t.o(ctx, s1, opcode_level1, opcode_level));
		}
		else
		{
			var res = this.Expression(ctx, t, op_code.value2);
			t = res[0];
			var opcode_level2 = res[0].opcode_level;
			var s2 = res[1];
			var op1 = t.o(ctx, s1, opcode_level1, opcode_level);
			var op2 = t.o(ctx, s2, opcode_level2, opcode_level);
			if (op_math == "~")
			{
				content = op1 + Runtime.rtl.toStr(" . ") + Runtime.rtl.toStr(this.rtlToStr(ctx, t, op2));
			}
			else if (op_math == "implements")
			{
				content = op1 + Runtime.rtl.toStr(" instanceof ") + Runtime.rtl.toStr(op2);
			}
			else
			{
				content = op1 + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op) + Runtime.rtl.toStr(" ") + Runtime.rtl.toStr(op2);
			}
		}
		t = t.copy(ctx, { "opcode_level": opcode_level });
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpNew
	 */
	OpNew: function(ctx, t, op_code)
	{
		var content = "new ";
		var res = this.OpTypeIdentifier(ctx, t, op_code.value);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		var flag = false;
		content += Runtime.rtl.toStr("(");
		if (t.current_function == null || t.current_function.is_context)
		{
			content += Runtime.rtl.toStr("$ctx");
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
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(ctx, t, op_code)
	{
		var s = "";
		var flag = false;
		var res = this.Dynamic(ctx, t, op_code.obj, op_code);
		t = res[0];
		s = res[1];
		if (s == "parent")
		{
			var f_name = t.current_function.name;
			if (f_name == "constructor")
			{
				f_name = "__construct";
			}
			s = "parent::" + Runtime.rtl.toStr(f_name) + Runtime.rtl.toStr("(");
		}
		else
		{
			s += Runtime.rtl.toStr("(");
		}
		var content = s;
		if (op_code.obj instanceof Bayrell.Lang.OpCodes.OpIdentifier && op_code.obj.value == "_")
		{
			content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr("$ctx, $ctx"));
			flag = true;
		}
		else if ((t.current_function == null || t.current_function.is_context) && op_code.is_context)
		{
			content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr("$ctx"));
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(ctx);i++)
		{
			var item = op_code.args.item(ctx, i);
			var res = this.Expression(ctx, t, item);
			t = res[0];
			var s = res[1];
			content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassOf
	 */
	OpClassOf: function(ctx, t, op_code)
	{
		var names = this.findModuleNames(ctx, t, op_code.entity_name.names);
		var s = Runtime.rs.join(ctx, ".", names);
		return Runtime.Collection.from([t,this.toString(ctx, s)]);
	},
	/**
	 * OpTernary
	 */
	OpTernary: function(ctx, t, op_code)
	{
		var content = "";
		t = t.copy(ctx, { "opcode_level": 100 });
		var res = this.Expression(ctx, t, op_code.condition);
		t = res[0];
		var condition = res[1];
		var res = this.Expression(ctx, t, op_code.if_true);
		t = res[0];
		var if_true = res[1];
		var res = this.Expression(ctx, t, op_code.if_false);
		t = res[0];
		var if_false = res[1];
		content += Runtime.rtl.toStr("(" + Runtime.rtl.toStr(condition) + Runtime.rtl.toStr(") ? ") + Runtime.rtl.toStr(if_true) + Runtime.rtl.toStr(" : ") + Runtime.rtl.toStr(if_false));
		t = t.copy(ctx, { "opcode_level": 11 });
		/* OpTernary */
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(ctx, t, op_code)
	{
		var content = "";
		var var_name = "";
		var value = "";
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var_name = res[1];
		var items = new Runtime.Vector(ctx);
		var op_code_item = op_code;
		while (op_code_item instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			items.push(ctx, op_code_item);
			op_code_item = op_code_item.obj;
		}
		items = items.reverseIm(ctx);
		/* First item */
		var res = t.expression.constructor.Expression(ctx, t, op_code_item);
		t = res[0];
		value = res[1];
		var res = t.constructor.addSaveOpCode(ctx, t, Runtime.Dict.from({"content":t.s(ctx, var_name + Runtime.rtl.toStr(" = new \\Runtime\\Monad($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(");"))}));
		t = res[0];
		/* Output items */
		for (var i = 0;i < items.count(ctx);i++)
		{
			var s1 = "";
			var s2 = "";
			var op_item = items.item(ctx, i);
			if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_ATTR)
			{
				var res = this.Expression(ctx, t, op_item.value);
				t = res[0];
				value = res[1];
				s1 = var_name + Runtime.rtl.toStr("->attr($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
			}
			else if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_METHOD)
			{
				var value_attrs = "";
				value = this.toString(ctx, op_item.value.obj.value);
				if (op_item.value.args != null)
				{
					var flag = false;
					/*if ((t.current_function == null or t.current_function.is_context) and op_item.value.is_context)
					{
						value_attrs ~= "$ctx";
						flag = true;
					}*/
					for (var i = 0;i < op_item.value.args.count(ctx);i++)
					{
						var item = op_item.value.args.item(ctx, i);
						var res = this.Expression(ctx, t, item);
						t = res[0];
						var s = res[1];
						value_attrs += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr(s));
						flag = true;
					}
				}
				if (op_item.value.args != null)
				{
					value_attrs = "\\Runtime\\Collection::from([" + Runtime.rtl.toStr(value_attrs) + Runtime.rtl.toStr("])");
				}
				else
				{
					value_attrs = "null";
				}
				if (!op_item.is_async || op_item.is_async && t.current_function.isFlag(ctx, "async"))
				{
					s1 = var_name + Runtime.rtl.toStr("->callMethod($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(value_attrs) + Runtime.rtl.toStr(")");
				}
			}
			else if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_MONAD)
			{
				var res = this.Dynamic(ctx, t, op_item.value);
				t = res[0];
				value = res[1];
				s1 = var_name + Runtime.rtl.toStr("->monad($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
			}
			else if (op_item.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_CALL)
			{
				var res = this.Dynamic(ctx, t, op_item.value);
				t = res[0];
				value = res[1];
				s1 = var_name + Runtime.rtl.toStr("->call($ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
			}
			if (s1 != "")
			{
				var res = t.constructor.addSaveOpCode(ctx, t, Runtime.Dict.from({"content":t.s(ctx, var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s1) + Runtime.rtl.toStr(";"))}));
				t = res[0];
			}
		}
		return Runtime.Collection.from([t,var_name + Runtime.rtl.toStr("->value($ctx)")]);
	},
	/**
	 * OpTypeConvert
	 */
	OpTypeConvert: function(ctx, t, op_code)
	{
		var content = "";
		var res = this.Expression(ctx, t, op_code.value);
		t = res[0];
		var value = res[1];
		content = "\\Runtime\\rtl::to(" + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(this.toPattern(ctx, t, op_code.pattern)) + Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpTernary
	 */
	OpDeclareFunction: function(ctx, t, op_code)
	{
		var content = "";
		/* Set function name */
		var save_f = t.current_function;
		t = t.copy(ctx, { "current_function": op_code });
		var res = t.operator.constructor.OpDeclareFunctionArgs(ctx, t, op_code);
		var args = res[1];
		content += Runtime.rtl.toStr("function (" + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
		if (op_code.vars != null && op_code.vars.count(ctx) > 0)
		{
			var vars = op_code.vars.map(ctx, (ctx, s) => 
			{
				return "&$" + Runtime.rtl.toStr(s);
			});
			content += Runtime.rtl.toStr(" use (" + Runtime.rtl.toStr(Runtime.rs.join(ctx, ",", vars)) + Runtime.rtl.toStr(")"));
		}
		var res = t.operator.constructor.OpDeclareFunctionBody(ctx, t, op_code);
		content += Runtime.rtl.toStr(res[1]);
		/* Restore function */
		t = t.copy(ctx, { "current_function": save_f });
		/* OpTernary */
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Expression
	 */
	Expression: function(ctx, t, op_code)
	{
		var content = "";
		t = t.copy(ctx, { "opcode_level": 100 });
		if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			var res = this.OpIdentifier(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTypeIdentifier)
		{
			var res = this.OpTypeIdentifier(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpNumber)
		{
			var res = this.OpNumber(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpString)
		{
			var res = this.OpString(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCollection)
		{
			var res = this.OpCollection(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDict)
		{
			var res = this.OpDict(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpInc)
		{
			t = t.copy(ctx, { "opcode_level": 16 });
			var res = this.OpInc(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpMath)
		{
			var res = this.OpMath(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpNew)
		{
			var res = this.OpNew(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
		{
			var res = this.Dynamic(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			var res = this.OpCall(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpClassOf)
		{
			var res = this.OpClassOf(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			return this.OpPipe(ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTernary)
		{
			var res = this.OpTernary(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTypeConvert)
		{
			var res = this.OpTypeConvert(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			var res = this.OpDeclareFunction(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlItems)
		{
			var res = t.html.constructor.OpHtmlItems(ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			var res = t.operator.constructor.OpPreprocessorIfDef(ctx, t, op_code, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_EXPRESSION);
			t = res[0];
			content = res[1];
		}
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPExpression";
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
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPExpression",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPExpression",
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
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPExpression);