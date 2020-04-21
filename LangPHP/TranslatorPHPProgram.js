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
Bayrell.Lang.LangPHP.TranslatorPHPProgram = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPProgram.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPProgram)
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPProgram";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPProgram,
{
	/**
	 * OpNamespace
	 */
	OpNamespace: function(ctx, t, op_code)
	{
		var arr = Runtime.rs.split(ctx, "\\.", op_code.name);
		t = t.copy(ctx, { "current_namespace_name": op_code.name });
		return Runtime.Collection.from([t,t.s(ctx, "namespace " + Runtime.rtl.toStr(Runtime.rs.join(ctx, "\\", arr)) + Runtime.rtl.toStr(";"))]);
	},
	/**
	 * OpDeclareFunction
	 */
	OpDeclareFunction: function(ctx, t, op_code)
	{
		if (op_code.isFlag(ctx, "declare"))
		{
			return Runtime.Collection.from([t,""]);
		}
		var content = "";
		/* Set current function */
		t = t.copy(ctx, { "current_function": op_code });
		var s1 = "";
		var s2 = "";
		if (op_code.isStatic(ctx))
		{
			s1 += Runtime.rtl.toStr("static ");
			t = t.copy(ctx, { "is_static_function": true });
		}
		else
		{
			t = t.copy(ctx, { "is_static_function": false });
		}
		var res = t.operator.constructor.OpDeclareFunctionArgs(ctx, t, op_code);
		var args = res[1];
		s1 += Runtime.rtl.toStr("function " + Runtime.rtl.toStr(op_code.name) + Runtime.rtl.toStr("(") + Runtime.rtl.toStr(args) + Runtime.rtl.toStr(")"));
		if (t.current_class.kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			var res = t.operator.constructor.OpDeclareFunctionBody(ctx, t, op_code);
			s2 += Runtime.rtl.toStr(res[1]);
		}
		else
		{
			s2 += Runtime.rtl.toStr(";");
		}
		s1 = t.s(ctx, s1);
		/* Function comments */
		var res = t.operator.constructor.AddComments(ctx, t, op_code.comments, s1 + Runtime.rtl.toStr(s2));
		content += Runtime.rtl.toStr(res[1]);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpFunctionAnnotations
	 */
	OpFunctionAnnotations: function(ctx, t, f)
	{
		var content = "";
		if (f.flags.isFlag(ctx, "declare"))
		{
			return Runtime.Collection.from([t,content]);
		}
		if (f.annotations.count(ctx) == 0)
		{
			return Runtime.Collection.from([t,content]);
		}
		content += Runtime.rtl.toStr(t.s(ctx, "if ($field_name == " + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, f.name)) + Runtime.rtl.toStr(")")));
		t = t.levelInc(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "return new \\Runtime\\Annotations\\IntrospectionInfo($ctx, ["));
		t = t.levelInc(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "\"kind\"=>\\Runtime\\Annotations\\IntrospectionInfo::ITEM_METHOD,"));
		content += Runtime.rtl.toStr(t.s(ctx, "\"class_name\"=>" + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, t.current_class_full_name)) + Runtime.rtl.toStr(",")));
		content += Runtime.rtl.toStr(t.s(ctx, "\"name\"=>" + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, f.name)) + Runtime.rtl.toStr(",")));
		content += Runtime.rtl.toStr(t.s(ctx, "\"annotations\"=>\\Runtime\\Collection::from(["));
		t = t.levelInc(ctx);
		for (var j = 0;j < f.annotations.count(ctx);j++)
		{
			var annotation = f.annotations.item(ctx, j);
			var res = t.expression.constructor.OpTypeIdentifier(ctx, t, annotation.name);
			t = res[0];
			var name = res[1];
			var res = t.expression.constructor.OpDict(ctx, t, annotation.params, true);
			t = res[0];
			var params = res[1];
			content += Runtime.rtl.toStr(t.s(ctx, "new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("($ctx, ") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
		}
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "]),"));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "]);"));
		t = t.levelDec(ctx);
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassBodyItemMethodsList
	 */
	OpClassBodyItemMethodsList: function(ctx, t, item)
	{
		var content = "";
		if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			if (t.preprocessor_flags.has(ctx, item.condition.value))
			{
				for (var i = 0;i < item.items.count(ctx);i++)
				{
					var op_code = item.items.item(ctx, i);
					var res = this.OpClassBodyItemMethodsList(ctx, t, op_code);
					t = res[0];
					content += Runtime.rtl.toStr(res[1]);
				}
			}
		}
		else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			content += Runtime.rtl.toStr(t.s(ctx, t.expression.constructor.toString(ctx, item.name) + Runtime.rtl.toStr(",")));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpClassBodyItemAnnotations
	 */
	OpClassBodyItemAnnotations: function(ctx, t, item)
	{
		var content = "";
		if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
		{
			if (t.preprocessor_flags.has(ctx, item.condition.value))
			{
				for (var i = 0;i < item.items.count(ctx);i++)
				{
					var op_code = item.items.item(ctx, i);
					var res = this.OpClassBodyItemAnnotations(ctx, t, op_code);
					t = res[0];
					content += Runtime.rtl.toStr(res[1]);
				}
			}
		}
		else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
		{
			var res = this.OpFunctionAnnotations(ctx, t, item);
			t = res[0];
			content += Runtime.rtl.toStr(res[1]);
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassConstructor: function(ctx, t, op_code)
	{
		if (op_code.fn_create == null)
		{
			return Runtime.Collection.from([t,""]);
		}
		var open = "";
		var content = "";
		var save_t = t;
		/* Set function name */
		t = t.copy(ctx, { "current_function": op_code.fn_create });
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(ctx, t);
		open += Runtime.rtl.toStr(t.s(ctx, "function __construct("));
		var res = t.operator.constructor.OpDeclareFunctionArgs(ctx, t, op_code.fn_create);
		t = res[0];
		open += Runtime.rtl.toStr(res[1]);
		open += Runtime.rtl.toStr(")");
		open += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* Function body */
		var res = t.operator.constructor.Operators(ctx, t, (op_code.fn_create.expression) ? op_code.fn_create.expression : op_code.fn_create.value);
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		/* Constructor end */
		var save = t.constructor.outputSaveOpCode(ctx, t);
		if (save != "")
		{
			content = open + Runtime.rtl.toStr(t.s(ctx, save + Runtime.rtl.toStr(content)));
		}
		else
		{
			content = open + Runtime.rtl.toStr(content);
		}
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		return Runtime.Collection.from([save_t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBody: function(ctx, t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		t = t.constructor.clearSaveOpCode(ctx, t);
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		/* Static variables */
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE && op_code.vars != null)
		{
			for (var i = 0;i < op_code.vars.count(ctx);i++)
			{
				var variable = op_code.vars.item(ctx, i);
				if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
				{
					continue;
				}
				var is_static = variable.flags.isFlag(ctx, "static");
				var is_const = variable.flags.isFlag(ctx, "const");
				for (var j = 0;j < variable.values.count(ctx);j++)
				{
					var value = variable.values.item(ctx, j);
					var res = t.expression.constructor.Expression(ctx, t, value.expression);
					var s = (value.expression != null) ? res[1] : "null";
					if (is_static && is_const)
					{
						content += Runtime.rtl.toStr(t.s(ctx, "const " + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";")));
					}
					else if (is_static)
					{
						content += Runtime.rtl.toStr(t.s(ctx, "static $" + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr("=") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";")));
					}
					else if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
					{
						content += Runtime.rtl.toStr(t.s(ctx, "public $__" + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
					}
					else
					{
						content += Runtime.rtl.toStr(t.s(ctx, "public $" + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
					}
				}
			}
		}
		/* Constructor */
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			var res = this.OpDeclareClassConstructor(ctx, t, op_code);
			content += Runtime.rtl.toStr(res[1]);
		}
		/* Functions */
		if (op_code.functions != null)
		{
			for (var i = 0;i < op_code.functions.count(ctx);i++)
			{
				var f = op_code.functions.item(ctx, i);
				var res = this.OpDeclareFunction(ctx, t, f);
				t = res[0];
				content += Runtime.rtl.toStr(res[1]);
			}
		}
		/* Class items */
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var item = op_code.items.item(ctx, i);
			if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(ctx, t, item);
				content += Runtime.rtl.toStr(res[1]);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfDef)
			{
				var res = t.operator.constructor.OpPreprocessorIfDef(ctx, t, item, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_CLASS_BODY);
				content += Runtime.rtl.toStr(res[1]);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpPreprocessorSwitch)
			{
				for (var j = 0;j < item.items.count(ctx);j++)
				{
					var res = t.operator.constructor.OpPreprocessorIfCode(ctx, t, item.items.item(ctx, j));
					var s = res[1];
					if (s == "")
					{
						continue;
					}
					content += Runtime.rtl.toStr(res[1]);
				}
			}
		}
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			content += Runtime.rtl.toStr(t.s(ctx, "/* ======================= Class Init Functions ======================= */"));
		}
		/* Init variables */
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE && op_code.vars != null)
		{
			var vars = op_code.vars.filter(ctx, (ctx, variable) => 
			{
				return !variable.flags.isFlag(ctx, "static");
			});
			if (t.current_class_full_name != "Runtime.CoreObject" && vars.count(ctx) > 0)
			{
				content += Runtime.rtl.toStr(t.s(ctx, "function _init($ctx)"));
				content += Runtime.rtl.toStr(t.s(ctx, "{"));
				t = t.levelInc(ctx);
				if (t.current_class_extends_name != "")
				{
					content += Runtime.rtl.toStr(t.s(ctx, "parent::_init($ctx);"));
				}
				for (var i = 0;i < op_code.vars.count(ctx);i++)
				{
					var variable = op_code.vars.item(ctx, i);
					var is_static = variable.flags.isFlag(ctx, "static");
					if (is_static)
					{
						continue;
					}
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					var prefix = "";
					if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
					{
						prefix = "__";
					}
					else if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_CLASS)
					{
						prefix = "";
					}
					for (var j = 0;j < variable.values.count(ctx);j++)
					{
						var value = variable.values.item(ctx, j);
						var res = t.expression.constructor.Expression(ctx, t, value.expression);
						var s = (value.expression != null) ? res[1] : "null";
						content += Runtime.rtl.toStr(t.s(ctx, "$this->" + Runtime.rtl.toStr(prefix) + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(";")));
					}
				}
				t = t.levelDec(ctx);
				content += Runtime.rtl.toStr(t.s(ctx, "}"));
			}
			/* Struct */
			if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
			{
				/* Assign Object */
				content += Runtime.rtl.toStr(t.s(ctx, "function assignObject($ctx,$o)"));
				content += Runtime.rtl.toStr(t.s(ctx, "{"));
				t = t.levelInc(ctx);
				content += Runtime.rtl.toStr(t.s(ctx, "if ($o instanceof \\" + Runtime.rtl.toStr(Runtime.rs.replace(ctx, "\\.", "\\", t.current_class_full_name)) + Runtime.rtl.toStr(")")));
				content += Runtime.rtl.toStr(t.s(ctx, "{"));
				t = t.levelInc(ctx);
				for (var i = 0;i < op_code.vars.count(ctx);i++)
				{
					var variable = op_code.vars.item(ctx, i);
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					var is_const = variable.flags.isFlag(ctx, "const");
					var is_static = variable.flags.isFlag(ctx, "static");
					if (is_const || is_static)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count(ctx);j++)
					{
						var value = variable.values.item(ctx, j);
						content += Runtime.rtl.toStr(t.s(ctx, "$this->__" + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = $o->__") + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
					}
				}
				t = t.levelDec(ctx);
				content += Runtime.rtl.toStr(t.s(ctx, "}"));
				content += Runtime.rtl.toStr(t.s(ctx, "parent::assignObject($ctx,$o);"));
				t = t.levelDec(ctx);
				content += Runtime.rtl.toStr(t.s(ctx, "}"));
				/* Assign Value */
				content += Runtime.rtl.toStr(t.s(ctx, "function assignValue($ctx,$k,$v)"));
				content += Runtime.rtl.toStr(t.s(ctx, "{"));
				t = t.levelInc(ctx);
				var flag = false;
				for (var i = 0;i < op_code.vars.count(ctx);i++)
				{
					var variable = op_code.vars.item(ctx, i);
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					var is_const = variable.flags.isFlag(ctx, "const");
					var is_static = variable.flags.isFlag(ctx, "static");
					if (is_const || is_static)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count(ctx);j++)
					{
						var value = variable.values.item(ctx, j);
						if (t.flag_struct_check_types)
						{
							content += Runtime.rtl.toStr(t.s(ctx, ((flag) ? "else " : "") + Runtime.rtl.toStr("if ($k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("$this->__") + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = Runtime.rtl.to($v, null, ") + Runtime.rtl.toStr(this.toPattern(ctx, t, variable.pattern)) + Runtime.rtl.toStr(");")));
						}
						else
						{
							content += Runtime.rtl.toStr(t.s(ctx, ((flag) ? "else " : "") + Runtime.rtl.toStr("if ($k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, value.var_name)) + Runtime.rtl.toStr(")") + Runtime.rtl.toStr("$this->__") + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(" = $v;")));
						}
						flag = true;
					}
				}
				content += Runtime.rtl.toStr(t.s(ctx, ((flag) ? "else " : "") + Runtime.rtl.toStr("parent::assignValue($ctx,$k,$v);")));
				t = t.levelDec(ctx);
				content += Runtime.rtl.toStr(t.s(ctx, "}"));
				/* Take Value */
				content += Runtime.rtl.toStr(t.s(ctx, "function takeValue($ctx,$k,$d=null)"));
				content += Runtime.rtl.toStr(t.s(ctx, "{"));
				t = t.levelInc(ctx);
				var flag = false;
				for (var i = 0;i < op_code.vars.count(ctx);i++)
				{
					var variable = op_code.vars.item(ctx, i);
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					var is_const = variable.flags.isFlag(ctx, "const");
					var is_static = variable.flags.isFlag(ctx, "static");
					if (is_const || is_static)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count(ctx);j++)
					{
						var value = variable.values.item(ctx, j);
						content += Runtime.rtl.toStr(t.s(ctx, ((flag) ? "else " : "") + Runtime.rtl.toStr("if ($k == ") + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, value.var_name)) + Runtime.rtl.toStr(")return $this->__") + Runtime.rtl.toStr(value.var_name) + Runtime.rtl.toStr(";")));
						flag = true;
					}
				}
				content += Runtime.rtl.toStr(t.s(ctx, "return parent::takeValue($ctx,$k,$d);"));
				t = t.levelDec(ctx);
				content += Runtime.rtl.toStr(t.s(ctx, "}"));
			}
		}
		if (class_kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			/* Get class name function */
			content += Runtime.rtl.toStr(t.s(ctx, "function getClassName()"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, t.current_class_full_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
			/* Get current namespace function */
			content += Runtime.rtl.toStr(t.s(ctx, "static function getCurrentNamespace()"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, t.current_namespace_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
			/* Get current class name function */
			content += Runtime.rtl.toStr(t.s(ctx, "static function getCurrentClassName()"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, t.current_class_full_name)) + Runtime.rtl.toStr(";")));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
			/* Get parent class name function */
			content += Runtime.rtl.toStr(t.s(ctx, "static function getParentClassName()"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, t.expression.constructor.findModuleName(ctx, t, t.current_class_extends_name))) + Runtime.rtl.toStr(";")));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
			/* Class info */
			content += Runtime.rtl.toStr(t.s(ctx, "static function getClassInfo($ctx)"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			t = t.constructor.clearSaveOpCode(ctx, t);
			content += Runtime.rtl.toStr(t.s(ctx, "return new \\Runtime\\Annotations\\IntrospectionInfo($ctx, ["));
			t = t.levelInc(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "\"kind\"=>\\Runtime\\Annotations\\IntrospectionInfo::ITEM_CLASS,"));
			content += Runtime.rtl.toStr(t.s(ctx, "\"class_name\"=>" + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, t.current_class_full_name)) + Runtime.rtl.toStr(",")));
			content += Runtime.rtl.toStr(t.s(ctx, "\"name\"=>" + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, t.current_class_full_name)) + Runtime.rtl.toStr(",")));
			content += Runtime.rtl.toStr(t.s(ctx, "\"annotations\"=>\\Runtime\\Collection::from(["));
			t = t.levelInc(ctx);
			for (var j = 0;j < op_code.annotations.count(ctx);j++)
			{
				var annotation = op_code.annotations.item(ctx, j);
				var res = t.expression.constructor.OpTypeIdentifier(ctx, t, annotation.name);
				t = res[0];
				var name = res[1];
				var res = t.expression.constructor.OpDict(ctx, t, annotation.params, true);
				t = res[0];
				var params = res[1];
				content += Runtime.rtl.toStr(t.s(ctx, "new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("($ctx, ") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
			}
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "]),"));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "]);"));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
			/* Get fields list of the function */
			content += Runtime.rtl.toStr(t.s(ctx, "static function getFieldsList($ctx,$f)"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "$a = [];"));
			if (op_code.vars != null)
			{
				var vars = new Runtime.Map(ctx);
				for (var i = 0;i < op_code.vars.count(ctx);i++)
				{
					var variable = op_code.vars.item(ctx, i);
					var is_static = variable.flags.isFlag(ctx, "static");
					var is_serializable = variable.flags.isFlag(ctx, "serializable");
					var is_assignable = variable.flags.isFlag(ctx, "assignable");
					var has_annotation = variable.annotations != null && variable.annotations.count(ctx) > 0;
					if (is_static)
					{
						continue;
					}
					if (variable.kind != Bayrell.Lang.OpCodes.OpAssign.KIND_DECLARE)
					{
						continue;
					}
					if (class_kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
					{
						is_serializable = true;
						is_assignable = true;
					}
					if (is_serializable)
					{
						is_assignable = true;
					}
					var flag = 0;
					if (is_serializable)
					{
						flag = flag | 1;
					}
					if (is_assignable)
					{
						flag = flag | 2;
					}
					if (has_annotation)
					{
						flag = flag | 4;
					}
					if (flag != 0)
					{
						if (!vars.has(ctx, flag))
						{
							vars.set(ctx, flag, new Runtime.Vector(ctx));
						}
						var v = vars.item(ctx, flag);
						for (var j = 0;j < variable.values.count(ctx);j++)
						{
							var value = variable.values.item(ctx, j);
							v.push(ctx, value.var_name);
						}
					}
				}
				vars.each(ctx, (ctx, v, flag) => 
				{
					content += Runtime.rtl.toStr(t.s(ctx, "if (($f|" + Runtime.rtl.toStr(flag) + Runtime.rtl.toStr(")==") + Runtime.rtl.toStr(flag) + Runtime.rtl.toStr(")")));
					content += Runtime.rtl.toStr(t.s(ctx, "{"));
					t = t.levelInc(ctx);
					v.each(ctx, (ctx, varname) => 
					{
						content += Runtime.rtl.toStr(t.s(ctx, "$a[] = " + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, varname)) + Runtime.rtl.toStr(";")));
					});
					t = t.levelDec(ctx);
					content += Runtime.rtl.toStr(t.s(ctx, "}"));
				});
			}
			content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(ctx, t, "Runtime.Collection")) + Runtime.rtl.toStr("::from($a);")));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
			/* Get field info by name */
			content += Runtime.rtl.toStr(t.s(ctx, "static function getFieldInfoByName($ctx,$field_name)"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			if (op_code.vars != null)
			{
				for (var i = 0;i < op_code.vars.count(ctx);i++)
				{
					var variable = op_code.vars.item(ctx, i);
					var v = variable.values.map(ctx, (ctx, value) => 
					{
						return value.var_name;
					});
					v = v.map(ctx, (ctx, var_name) => 
					{
						return "$field_name == " + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, var_name));
					});
					t = t.constructor.clearSaveOpCode(ctx, t);
					content += Runtime.rtl.toStr(t.s(ctx, "if (" + Runtime.rtl.toStr(Runtime.rs.join(ctx, " or ", v)) + Runtime.rtl.toStr(") ") + Runtime.rtl.toStr("return new \\Runtime\\Annotations\\IntrospectionInfo($ctx, [")));
					t = t.levelInc(ctx);
					content += Runtime.rtl.toStr(t.s(ctx, "\"kind\"=>\\Runtime\\Annotations\\IntrospectionInfo::ITEM_FIELD,"));
					content += Runtime.rtl.toStr(t.s(ctx, "\"class_name\"=>" + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, t.current_class_full_name)) + Runtime.rtl.toStr(",")));
					content += Runtime.rtl.toStr(t.s(ctx, "\"name\"=> $field_name,"));
					content += Runtime.rtl.toStr(t.s(ctx, "\"annotations\"=>\\Runtime\\Collection::from(["));
					t = t.levelInc(ctx);
					for (var j = 0;j < variable.annotations.count(ctx);j++)
					{
						var annotation = variable.annotations.item(ctx, j);
						var res = t.expression.constructor.OpTypeIdentifier(ctx, t, annotation.name);
						t = res[0];
						var name = res[1];
						var res = t.expression.constructor.OpDict(ctx, t, annotation.params, true);
						t = res[0];
						var params = res[1];
						content += Runtime.rtl.toStr(t.s(ctx, "new " + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("($ctx, ") + Runtime.rtl.toStr(params) + Runtime.rtl.toStr("),")));
					}
					t = t.levelDec(ctx);
					content += Runtime.rtl.toStr(t.s(ctx, "]),"));
					t = t.levelDec(ctx);
					content += Runtime.rtl.toStr(t.s(ctx, "]);"));
				}
			}
			content += Runtime.rtl.toStr(t.s(ctx, "return null;"));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
			/* Get methods list of the function */
			content += Runtime.rtl.toStr(t.s(ctx, "static function getMethodsList($ctx)"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "$a = ["));
			t = t.levelInc(ctx);
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count(ctx);i++)
				{
					var f = op_code.functions.item(ctx, i);
					if (f.flags.isFlag(ctx, "declare"))
					{
						continue;
					}
					if (f.annotations.count(ctx) == 0)
					{
						continue;
					}
					content += Runtime.rtl.toStr(t.s(ctx, t.expression.constructor.toString(ctx, f.name) + Runtime.rtl.toStr(",")));
				}
			}
			if (op_code.items != null)
			{
				for (var i = 0;i < op_code.items.count(ctx);i++)
				{
					var item = op_code.items.item(ctx, i);
					var res = this.OpClassBodyItemMethodsList(ctx, t, item);
					t = res[0];
					content += Runtime.rtl.toStr(res[1]);
				}
			}
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "];"));
			content += Runtime.rtl.toStr(t.s(ctx, "return " + Runtime.rtl.toStr(t.expression.constructor.getModuleName(ctx, t, "Runtime.Collection")) + Runtime.rtl.toStr("::from($a);")));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
			/* Get method info by name */
			content += Runtime.rtl.toStr(t.s(ctx, "static function getMethodInfoByName($ctx,$field_name)"));
			content += Runtime.rtl.toStr(t.s(ctx, "{"));
			t = t.levelInc(ctx);
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count(ctx);i++)
				{
					var f = op_code.functions.item(ctx, i);
					var res = this.OpFunctionAnnotations(ctx, t, f);
					t = res[0];
					content += Runtime.rtl.toStr(res[1]);
				}
			}
			if (op_code.items != null)
			{
				for (var i = 0;i < op_code.items.count(ctx);i++)
				{
					var item = op_code.items.item(ctx, i);
					var res = this.OpClassBodyItemAnnotations(ctx, t, item);
					t = res[0];
					content += Runtime.rtl.toStr(res[1]);
				}
			}
			content += Runtime.rtl.toStr(t.s(ctx, "return null;"));
			t = t.levelDec(ctx);
			content += Runtime.rtl.toStr(t.s(ctx, "}"));
		}
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(ctx, t, op_code)
	{
		var content = "";
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClass: function(ctx, t, op_code)
	{
		if (op_code.is_declare)
		{
			return Runtime.Collection.from([t,""]);
		}
		var content = "";
		t = t.copy(ctx, { "current_class": op_code });
		t = t.copy(ctx, { "current_class_name": op_code.name });
		t = t.copy(ctx, { "current_class_full_name": t.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(t.current_class_name) });
		if (op_code.class_extends != null)
		{
			var extends_name = Runtime.rs.join(ctx, ".", op_code.class_extends.entity_name.names);
			t = t.copy(ctx, { "current_class_extends_name": extends_name });
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			t = t.copy(ctx, { "current_class_extends_name": "Runtime.CoreStruct" });
		}
		else if (op_code.kind == Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT)
		{
			t = t.copy(ctx, { "current_class_extends_name": "" });
		}
		if (op_code.kind != Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE)
		{
			if (op_code.class_extends != null)
			{
				content = "class " + Runtime.rtl.toStr(t.current_class_name) + Runtime.rtl.toStr(" extends ") + Runtime.rtl.toStr(t.expression.constructor.getModuleName(ctx, t, t.current_class_extends_name));
			}
			else
			{
				content = "class " + Runtime.rtl.toStr(t.current_class_name);
			}
		}
		else
		{
			content = "interface " + Runtime.rtl.toStr(t.current_class_name);
		}
		/* Add implements */
		if (op_code.class_implements != null && op_code.class_implements.count(ctx) > 0)
		{
			var arr = op_code.class_implements.map(ctx, (ctx, item) => 
			{
				return t.expression.constructor.getModuleNames(ctx, t, item.entity_name.names);
			});
			var s1 = Runtime.rs.join(ctx, ", ", arr);
			content += Runtime.rtl.toStr(" implements " + Runtime.rtl.toStr(s1));
		}
		/* Class body */
		var res = this.OpDeclareClassBody(ctx, t, op_code);
		content += Runtime.rtl.toStr(res[1]);
		/* Class comments */
		var res = t.operator.constructor.AddComments(ctx, t, op_code.comments, content);
		content = res[1];
		/* Class footer */
		var res = this.OpDeclareClassFooter(ctx, t, op_code);
		content += Runtime.rtl.toStr(res[1]);
		return Runtime.Collection.from([t,t.s(ctx, content)]);
	},
	/**
	 * Translate item
	 */
	translateItem: function(ctx, t, op_code)
	{
		if (op_code instanceof Bayrell.Lang.OpCodes.OpNamespace)
		{
			return this.OpNamespace(ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpDeclareClass)
		{
			return this.OpDeclareClass(ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpComment)
		{
			return t.operator.constructor.OpComment(ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorIfCode)
		{
			return t.operator.constructor.OpPreprocessorIfCode(ctx, t, op_code);
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpPreprocessorSwitch)
		{
			var content = "";
			for (var i = 0;i < op_code.items.count(ctx);i++)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(ctx, t, op_code.items.item(ctx, i));
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
			return Runtime.Collection.from([t,content]);
		}
		return Runtime.Collection.from([t,""]);
	},
	/**
	 * Translate program
	 */
	translateProgramHeader: function(ctx, t, op_code)
	{
		var content = "<?php";
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translate program
	 */
	translateProgram: function(ctx, t, op_code)
	{
		var content = "";
		if (op_code == null)
		{
			return Runtime.Collection.from([t,content]);
		}
		if (op_code.uses != null)
		{
			t = t.copy(ctx, { "modules": op_code.uses });
		}
		if (op_code.items != null)
		{
			var res = this.translateProgramHeader(ctx, t, op_code);
			content += Runtime.rtl.toStr(res[1]);
			for (var i = 0;i < op_code.items.count(ctx);i++)
			{
				var item = op_code.items.item(ctx, i);
				var res = this.translateItem(ctx, t, item);
				t = res[0];
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += Runtime.rtl.toStr(s);
			}
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPProgram";
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
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPProgram",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPProgram",
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
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPProgram);