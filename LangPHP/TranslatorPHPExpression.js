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
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPExpression = function(__ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPExpression)
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPExpression";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression,
{
	/**
	 * Returns string
	 */
	toString: function(__ctx, s)
	{
		s = Runtime.re.replace(__ctx, "\\\\", "\\\\", s);
		s = Runtime.re.replace(__ctx, "\"", "\\\"", s);
		s = Runtime.re.replace(__ctx, "\n", "\\n", s);
		s = Runtime.re.replace(__ctx, "\r", "\\r", s);
		s = Runtime.re.replace(__ctx, "\t", "\\t", s);
		return "\"" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("\"");
	},
	/**
	 * To pattern
	 */
	toPattern: function(__ctx, t, pattern)
	{
		var names = this.findModuleNames(__ctx, t, pattern.entity_name.names);
		var e = Runtime.rs.join(__ctx, ".", names);
		var a = (pattern.template != null) ? pattern.template.map(__ctx, (__ctx, pattern) => 
		{
			return this.toPattern(__ctx, t, pattern);
		}) : null;
		var b = (a != null) ? ",\"t\":[" + Runtime.rtl.toStr(Runtime.rs.join(__ctx, ",", a)) + Runtime.rtl.toStr("]") : "";
		return "[\"e\"=>" + Runtime.rtl.toStr(this.toString(__ctx, e)) + Runtime.rtl.toStr(b) + Runtime.rtl.toStr("]");
	},
	/**
	 * Returns string
	 */
	rtlToStr: function(__ctx, t, s)
	{
		var module_name = this.getModuleName(__ctx, t, "rtl");
		return module_name + Runtime.rtl.toStr("::toStr(") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
	},
	/**
	 * Find module name
	 */
	findModuleName: function(__ctx, t, module_name)
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
		else if (t.modules.has(__ctx, module_name))
		{
			return t.modules.item(__ctx, module_name);
		}
		return module_name;
	},
	/**
	 * Returns module name
	 */
	findModuleNames: function(__ctx, t, names)
	{
		if (names.count(__ctx) > 0)
		{
			var module_name = names.first(__ctx);
			module_name = this.findModuleName(__ctx, t, module_name);
			if (module_name != "")
			{
				names = names.removeFirstIm(__ctx).prependCollectionIm(__ctx, Runtime.rs.split(__ctx, "\\.", module_name));
			}
		}
		return names;
	},
	/**
	 * Return module name
	 */
	getModuleName: function(__ctx, t, module_name)
	{
		module_name = this.findModuleName(__ctx, t, module_name);
		module_name = Runtime.rs.replace(__ctx, "\\.", "\\", module_name);
		return "\\" + Runtime.rtl.toStr(module_name);
	},
	/**
	 * Return module name
	 */
	getModuleNames: function(__ctx, t, names)
	{
		return "\\" + Runtime.rtl.toStr(Runtime.rs.join(__ctx, "\\", this.findModuleNames(__ctx, t, names)));
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(__ctx, t, op_code)
	{
		var names = this.findModuleNames(__ctx, t, op_code.entity_name.names);
		var s = "\\" + Runtime.rtl.toStr(Runtime.rs.join(__ctx, "\\", names));
		return Runtime.Collection.from([t,s]);
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(__ctx, t, op_code)
	{
		if (t.modules.has(__ctx, op_code.value) || op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.getModuleName(__ctx, t, module_name);
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
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT && op_code.value == "@")
		{
			return Runtime.Collection.from([t,"$__ctx"]);
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT && op_code.value == "_")
		{
			return Runtime.Collection.from([t,"$__ctx->translate"]);
		}
		var content = op_code.value;
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpNumber
	 */
	OpNumber: function(__ctx, t, op_code)
	{
		var content = op_code.value;
		if (op_code.negative)
		{
			content = "-" + Runtime.rtl.toStr(content);
			t = t.copy(__ctx, { "opcode_level": 15 });
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpString
	 */
	OpString: function(__ctx, t, op_code)
	{
		return Runtime.Collection.from([t,this.toString(__ctx, op_code.value)]);
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
		var module_name = this.getModuleName(__ctx, t, "Collection");
		content = module_name + Runtime.rtl.toStr("::from([") + Runtime.rtl.toStr(Runtime.rs.join(__ctx, ",", values)) + Runtime.rtl.toStr("])");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(__ctx, t, op_code, flag_array)
	{
		if (flag_array == undefined) flag_array = false;
		var content = "";
		var values = op_code.values.transition(__ctx, (__ctx, op_code, key) => 
		{
			var res = this.Expression(__ctx, t, op_code);
			t = res[0];
			var s = res[1];
			return this.toString(__ctx, key) + Runtime.rtl.toStr("=>") + Runtime.rtl.toStr(s);
		});
		var module_name = this.getModuleName(__ctx, t, "Dict");
		if (!flag_array)
		{
			content = module_name + Runtime.rtl.toStr("::from([") + Runtime.rtl.toStr(Runtime.rs.join(__ctx, ",", values)) + Runtime.rtl.toStr("])");
		}
		else
		{
			content = "[" + Runtime.rtl.toStr(Runtime.rs.join(__ctx, ",", values)) + Runtime.rtl.toStr("]");
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Dynamic
	 */
	Dynamic: function(__ctx, t, op_code, next_op_code)
	{
		if (next_op_code == undefined) next_op_code = null;
		if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			return this.OpIdentifier(__ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr)
		{
			var attrs = new Runtime.Vector(__ctx);
			var op_code_item = op_code;
			var op_code_next = op_code;
			var prev_kind = "";
			var s = "";
			while (op_code_next instanceof Bayrell.Lang.OpCodes.OpAttr)
			{
				attrs.push(__ctx, op_code_next);
				op_code_item = op_code_next;
				op_code_next = op_code_next.obj;
			}
			attrs = attrs.reverseIm(__ctx);
			if (op_code_next instanceof Bayrell.Lang.OpCodes.OpCall)
			{
				prev_kind = "var";
				var res = this.OpCall(__ctx, t, op_code_next);
				t = res[0];
				s = res[1];
			}
			else if (op_code_next instanceof Bayrell.Lang.OpCodes.OpNew)
			{
				prev_kind = "var";
				var res = this.OpNew(__ctx, t, op_code_next);
				t = res[0];
				s = "(" + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr(")");
			}
			else if (op_code_next instanceof Bayrell.Lang.OpCodes.OpIdentifier)
			{
				if (t.modules.has(__ctx, op_code_next.value) || op_code_next.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE)
				{
					prev_kind = "static";
					var res = this.OpIdentifier(__ctx, t, op_code_next);
					t = res[0];
					s = res[1];
				}
				else if (op_code_next.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF)
				{
					if (op_code_next.value == "static")
					{
						s = "static";
						prev_kind = "static";
					}
					else if (op_code_next.value == "self")
					{
						prev_kind = "static";
						s = this.getModuleName(__ctx, t, t.current_class_full_name);
					}
					else if (op_code_next.value == "this")
					{
						prev_kind = "var";
						s = "$this";
					}
				}
				else if (op_code_next.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT && op_code_next.value == "@")
				{
					prev_kind = "var";
					s = "$__ctx";
				}
				else if (op_code_next.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT && op_code_next.value == "_")
				{
					prev_kind = "var";
					s = "$__ctx->translate";
				}
				else
				{
					prev_kind = "var";
					s = "$" + Runtime.rtl.toStr(op_code_next.value);
				}
			}
			var attrs_sz = attrs.count(__ctx);
			for (var i = 0;i < attrs.count(__ctx);i++)
			{
				var attr = attrs.item(__ctx, i);
				var next_attr = attrs.get(__ctx, i + 1, null);
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
						else if (Runtime.rs.strtoupper(__ctx, attr_val) == attr_val)
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
						s += Runtime.rtl.toStr("->staticMethod(" + Runtime.rtl.toStr(this.toString(__ctx, attr.value.value)) + Runtime.rtl.toStr(")"));
					}
					prev_kind = "static";
				}
				else if (attr.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC)
				{
					var res = this.Expression(__ctx, t, attr.value);
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
			return this.OpCall(__ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			return this.OpPipe(__ctx, t, op_code);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * OpInc
	 */
	OpInc: function(__ctx, t, op_code)
	{
		var content = "";
		var res = this.Expression(__ctx, t, op_code.value);
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
	OpMath: function(__ctx, t, op_code)
	{
		var res = this.Expression(__ctx, t, op_code.value1);
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
			content = op + Runtime.rtl.toStr(t.o(__ctx, s1, opcode_level1, opcode_level));
		}
		else
		{
			var res = this.Expression(__ctx, t, op_code.value2);
			t = res[0];
			var opcode_level2 = res[0].opcode_level;
			var s2 = res[1];
			var op1 = t.o(__ctx, s1, opcode_level1, opcode_level);
			var op2 = t.o(__ctx, s2, opcode_level2, opcode_level);
			if (op_math == "~")
			{
				content = op1 + Runtime.rtl.toStr(" . ") + Runtime.rtl.toStr(this.rtlToStr(__ctx, t, op2));
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
		t = t.copy(__ctx, { "opcode_level": opcode_level });
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpNew
	 */
	OpNew: function(__ctx, t, op_code)
	{
		var content = "new ";
		var res = this.OpTypeIdentifier(__ctx, t, op_code.value);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		var flag = false;
		content += Runtime.rtl.toStr("(");
		if (t.current_function == null || t.current_function.is_context)
		{
			content += Runtime.rtl.toStr("$__ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(__ctx);i++)
		{
			var item = op_code.args.item(__ctx, i);
			var res = t.expression.constructor.Expression(__ctx, t, item);
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
	OpCall: function(__ctx, t, op_code)
	{
		var s = "";
		var flag = false;
		var res = this.Dynamic(__ctx, t, op_code.obj, op_code);
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
		if ((t.current_function == null || t.current_function.is_context) && op_code.is_context)
		{
			content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr("$__ctx"));
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(__ctx);i++)
		{
			var item = op_code.args.item(__ctx, i);
			var res = this.Expression(__ctx, t, item);
			t = res[0];
			var s = res[1];
			content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr(s));
			flag = true;
		}
		content += Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(__ctx, t, op_code)
	{
		var content = "";
		var var_name = "";
		var res = this.Expression(__ctx, t, op_code.obj, op_code);
		t = res[0];
		if (op_code.obj instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			var_name = res[1];
		}
		else
		{
			var res = t.constructor.addSaveOpCode(__ctx, t, Runtime.Dict.from({"op_code":op_code.obj,"var_content":res[1]}));
			t = res[0];
			var_name = res[1];
		}
		if (op_code.kind == Bayrell.Lang.OpCodes.OpPipe.KIND_METHOD)
		{
			content = "(" + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("->staticMethod(") + Runtime.rtl.toStr(this.toString(__ctx, op_code.method_name.value)) + Runtime.rtl.toStr("))");
		}
		else
		{
			var res = this.OpTypeIdentifier(__ctx, t, op_code.class_name);
			t = res[0];
			content = res[1] + Runtime.rtl.toStr("::") + Runtime.rtl.toStr(op_code.method_name.value);
		}
		var flag = false;
		content += Runtime.rtl.toStr("(");
		if (t.current_function.is_context && op_code.is_context)
		{
			content += Runtime.rtl.toStr("$__ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(__ctx);i++)
		{
			var item = op_code.args.item(__ctx, i);
			var res = this.Expression(__ctx, t, item);
			t = res[0];
			var s1 = res[1];
			content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr(s1));
			flag = true;
		}
		content += Runtime.rtl.toStr(((flag) ? ", " : "") + Runtime.rtl.toStr(var_name));
		content += Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassOf
	 */
	OpClassOf: function(__ctx, t, op_code)
	{
		var names = this.findModuleNames(__ctx, t, op_code.entity_name.names);
		var s = Runtime.rs.join(__ctx, ".", names);
		return Runtime.Collection.from([t,this.toString(__ctx, s)]);
	},
	/**
	 * OpTernary
	 */
	OpTernary: function(__ctx, t, op_code)
	{
		var content = "";
		t = t.copy(__ctx, { "opcode_level": 100 });
		var res = this.Expression(__ctx, t, op_code.condition);
		t = res[0];
		var condition = res[1];
		var res = this.Expression(__ctx, t, op_code.if_true);
		t = res[0];
		var if_true = res[1];
		var res = this.Expression(__ctx, t, op_code.if_false);
		t = res[0];
		var if_false = res[1];
		content += Runtime.rtl.toStr("(" + Runtime.rtl.toStr(condition) + Runtime.rtl.toStr(") ? ") + Runtime.rtl.toStr(if_true) + Runtime.rtl.toStr(" : ") + Runtime.rtl.toStr(if_false));
		t = t.copy(__ctx, { "opcode_level": 11 });
		/* OpTernary */
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpTypeConvert
	 */
	OpTypeConvert: function(__ctx, t, op_code)
	{
		var content = "";
		var res = this.Expression(__ctx, t, op_code.value);
		t = res[0];
		var value = res[1];
		content = "\\Runtime\\rtl::to(" + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(this.toPattern(__ctx, t, op_code.pattern)) + Runtime.rtl.toStr(")");
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpTernary
	 */
	OpDeclareFunction: function(__ctx, t, op_code)
	{
		var content = "";
		/* Set function name */
		var save_f = t.current_function;
		t = t.copy(__ctx, { "current_function": op_code });
		var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, op_code);
		var args = res[1];
		content += Runtime.rtl.toStr("function (" + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
		if (op_code.vars != null && op_code.vars.count(__ctx) > 0)
		{
			var vars = op_code.vars.map(__ctx, (__ctx, s) => 
			{
				return "&$" + Runtime.rtl.toStr(s);
			});
			content += Runtime.rtl.toStr(" use (" + Runtime.rtl.toStr(Runtime.rs.join(__ctx, ",", vars)) + Runtime.rtl.toStr(")"));
		}
		var res = t.operator.constructor.OpDeclareFunctionBody(__ctx, t, op_code);
		content += Runtime.rtl.toStr(res[1]);
		/* Restore function */
		t = t.copy(__ctx, { "current_function": save_f });
		/* OpTernary */
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Expression
	 */
	Expression: function(__ctx, t, op_code)
	{
		var content = "";
		t = t.copy(__ctx, { "opcode_level": 100 });
		if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
		{
			var res = this.OpIdentifier(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTypeIdentifier)
		{
			var res = this.OpTypeIdentifier(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpNumber)
		{
			var res = this.OpNumber(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpString)
		{
			var res = this.OpString(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCollection)
		{
			var res = this.OpCollection(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDict)
		{
			var res = this.OpDict(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpInc)
		{
			t = t.copy(__ctx, { "opcode_level": 16 });
			var res = this.OpInc(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpMath)
		{
			var res = this.OpMath(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpNew)
		{
			var res = this.OpNew(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr || op_code instanceof Bayrell.Lang.OpCodes.OpPipe)
		{
			var res = this.Dynamic(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpCall)
		{
			var res = this.OpCall(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpClassOf)
		{
			var res = this.OpClassOf(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTernary)
		{
			var res = this.OpTernary(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpTypeConvert)
		{
			var res = this.OpTypeConvert(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			var res = this.OpDeclareFunction(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlItems)
		{
			var res = t.html.constructor.OpHtmlItems(__ctx, t, op_code);
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
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPExpression",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPExpression",
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
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPExpression);