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
Bayrell.Lang.CoreTranslator = function(ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
Bayrell.Lang.CoreTranslator.prototype = Object.create(Runtime.CoreStruct.prototype);
Bayrell.Lang.CoreTranslator.prototype.constructor = Bayrell.Lang.CoreTranslator;
Object.assign(Bayrell.Lang.CoreTranslator.prototype,
{
	/**
	 * Find save op code
	 */
	findSaveOpCode: function(ctx, op_code)
	{
		return this.save_op_codes.findItem(ctx, Runtime.lib.equalAttr(ctx, "op_code", op_code));
	},
	/**
	 * Increment indent level
	 */
	levelInc: function(ctx)
	{
		return this.copy(ctx, Runtime.Dict.from({"indent_level":this.indent_level + 1}));
	},
	/**
	 * Decrease indent level
	 */
	levelDec: function(ctx)
	{
		return this.copy(ctx, Runtime.Dict.from({"indent_level":this.indent_level - 1}));
	},
	/**
	 * Output content with indent
	 */
	s: function(ctx, s, content)
	{
		if (content == undefined) content = null;
		if (s == "")
		{
			return "";
		}
		if (content === "")
		{
			return s;
		}
		return this.crlf + Runtime.rtl.toStr(Runtime.rs.str_repeat(ctx, this.indent, this.indent_level)) + Runtime.rtl.toStr(s);
	},
	/**
	 * Output content with indent
	 */
	s2: function(ctx, s)
	{
		return this.crlf + Runtime.rtl.toStr(Runtime.rs.str_repeat(ctx, this.indent, this.indent_level)) + Runtime.rtl.toStr(s);
	},
	/**
	 * Output content with opcode level
	 */
	o: function(ctx, s, opcode_level_in, opcode_level_out)
	{
		if (opcode_level_in < opcode_level_out)
		{
			return "(" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr(")");
		}
		return s;
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.current_namespace_name = "";
		this.current_class_name = "";
		this.current_class_full_name = "";
		this.current_class_extends_name = "";
		this.current_class = null;
		this.current_function = null;
		this.modules = null;
		this.vars = null;
		this.save_vars = null;
		this.save_op_codes = null;
		this.save_op_code_inc = 0;
		this.is_static_function = false;
		this.is_operation = false;
		this.opcode_level = 0;
		this.indent_level = 0;
		this.indent = "\t";
		this.crlf = "\n";
		this.flag_struct_check_types = false;
		this.preprocessor_flags = null;
		Runtime.CoreStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.CoreTranslator)
		{
			this.current_namespace_name = o.current_namespace_name;
			this.current_class_name = o.current_class_name;
			this.current_class_full_name = o.current_class_full_name;
			this.current_class_extends_name = o.current_class_extends_name;
			this.current_class = o.current_class;
			this.current_function = o.current_function;
			this.modules = o.modules;
			this.vars = o.vars;
			this.save_vars = o.save_vars;
			this.save_op_codes = o.save_op_codes;
			this.save_op_code_inc = o.save_op_code_inc;
			this.is_static_function = o.is_static_function;
			this.is_operation = o.is_operation;
			this.opcode_level = o.opcode_level;
			this.indent_level = o.indent_level;
			this.indent = o.indent;
			this.crlf = o.crlf;
			this.flag_struct_check_types = o.flag_struct_check_types;
			this.preprocessor_flags = o.preprocessor_flags;
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "current_namespace_name")this.current_namespace_name = v;
		else if (k == "current_class_name")this.current_class_name = v;
		else if (k == "current_class_full_name")this.current_class_full_name = v;
		else if (k == "current_class_extends_name")this.current_class_extends_name = v;
		else if (k == "current_class")this.current_class = v;
		else if (k == "current_function")this.current_function = v;
		else if (k == "modules")this.modules = v;
		else if (k == "vars")this.vars = v;
		else if (k == "save_vars")this.save_vars = v;
		else if (k == "save_op_codes")this.save_op_codes = v;
		else if (k == "save_op_code_inc")this.save_op_code_inc = v;
		else if (k == "is_static_function")this.is_static_function = v;
		else if (k == "is_operation")this.is_operation = v;
		else if (k == "opcode_level")this.opcode_level = v;
		else if (k == "indent_level")this.indent_level = v;
		else if (k == "indent")this.indent = v;
		else if (k == "crlf")this.crlf = v;
		else if (k == "flag_struct_check_types")this.flag_struct_check_types = v;
		else if (k == "preprocessor_flags")this.preprocessor_flags = v;
		else Runtime.CoreStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "current_namespace_name")return this.current_namespace_name;
		else if (k == "current_class_name")return this.current_class_name;
		else if (k == "current_class_full_name")return this.current_class_full_name;
		else if (k == "current_class_extends_name")return this.current_class_extends_name;
		else if (k == "current_class")return this.current_class;
		else if (k == "current_function")return this.current_function;
		else if (k == "modules")return this.modules;
		else if (k == "vars")return this.vars;
		else if (k == "save_vars")return this.save_vars;
		else if (k == "save_op_codes")return this.save_op_codes;
		else if (k == "save_op_code_inc")return this.save_op_code_inc;
		else if (k == "is_static_function")return this.is_static_function;
		else if (k == "is_operation")return this.is_operation;
		else if (k == "opcode_level")return this.opcode_level;
		else if (k == "indent_level")return this.indent_level;
		else if (k == "indent")return this.indent;
		else if (k == "crlf")return this.crlf;
		else if (k == "flag_struct_check_types")return this.flag_struct_check_types;
		else if (k == "preprocessor_flags")return this.preprocessor_flags;
		return Runtime.CoreStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.CoreTranslator";
	},
});
Object.assign(Bayrell.Lang.CoreTranslator, Runtime.CoreStruct);
Object.assign(Bayrell.Lang.CoreTranslator,
{
	/**
	 * Translate BaseOpCode
	 */
	translate: function(ctx, t, op_code)
	{
		return "";
	},
	/**
	 * Inc save op code
	 */
	nextSaveOpCode: function(ctx, t)
	{
		return "__v" + Runtime.rtl.toStr(t.save_op_code_inc);
	},
	/**
	 * Inc save op code
	 */
	incSaveOpCode: function(ctx, t)
	{
		var var_name = this.nextSaveOpCode(ctx, t);
		var save_op_code_inc = t.save_op_code_inc + 1;
		t = t.copy(ctx, Runtime.Dict.from({"save_op_code_inc":save_op_code_inc}));
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Add save op code
	 */
	addSaveOpCode: function(ctx, t, data)
	{
		var var_name = data.get(ctx, "var_name", "");
		var content = data.get(ctx, "content", "");
		var var_content = data.get(ctx, "var_content", "");
		var save_op_code_inc = t.save_op_code_inc;
		if (var_name == "" && content == "")
		{
			var_name = this.nextSaveOpCode(ctx, t);
			data = data.setIm(ctx, "var_name", var_name);
			save_op_code_inc += 1;
		}
		var s = new Bayrell.Lang.SaveOpCode(ctx, data);
		t = t.copy(ctx, Runtime.Dict.from({"save_op_codes":t.save_op_codes.pushIm(ctx, s),"save_op_code_inc":save_op_code_inc}));
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Clear save op code
	 */
	clearSaveOpCode: function(ctx, t)
	{
		t = t.copy(ctx, { "save_op_codes": new Runtime.Collection(ctx) });
		t = t.copy(ctx, { "save_op_code_inc": 0 });
		return t;
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(ctx, t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		var content = "";
		for (var i = 0;i < t.save_op_codes.count(ctx);i++)
		{
			if (i < save_op_code_value)
			{
				continue;
			}
			var save = t.save_op_codes.item(ctx, i);
			var s = (save.content == "") ? t.s(ctx, "var " + Runtime.rtl.toStr(save.var_name) + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(save.var_content) + Runtime.rtl.toStr(";")) : save.content;
			content += Runtime.rtl.toStr(s);
		}
		return content;
	},
	/**
	 * Call f and return result with save op codes
	 */
	saveOpCodeCall: function(ctx, t, f, args)
	{
		/* Clear save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		var res = Runtime.rtl.apply(ctx, f, args.unshiftIm(ctx, t));
		t = res[0];
		var value = res[1];
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(ctx, t, save_op_codes.count(ctx));
		/* Restore save op codes */
		t = t.copy(ctx, { "save_op_codes": save_op_codes });
		t = t.copy(ctx, { "save_op_code_inc": save_op_code_inc });
		return Runtime.Collection.from([t,save,value]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
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
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": "Bayrell.Lang.CoreTranslator",
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
			a.push("current_namespace_name");
			a.push("current_class_name");
			a.push("current_class_full_name");
			a.push("current_class_extends_name");
			a.push("current_class");
			a.push("current_function");
			a.push("modules");
			a.push("vars");
			a.push("save_vars");
			a.push("save_op_codes");
			a.push("save_op_code_inc");
			a.push("is_static_function");
			a.push("is_operation");
			a.push("opcode_level");
			a.push("indent_level");
			a.push("indent");
			a.push("crlf");
			a.push("flag_struct_check_types");
			a.push("preprocessor_flags");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "current_namespace_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_full_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_extends_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_function") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vars") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_vars") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_op_codes") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_op_code_inc") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_static_function") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_operation") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "opcode_level") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "indent_level") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "indent") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "crlf") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flag_struct_check_types") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "preprocessor_flags") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
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
Runtime.rtl.defClass(Bayrell.Lang.CoreTranslator);