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
Bayrell.Lang.LangES6.TranslatorES6Html = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Html.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangES6.TranslatorES6Html)
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
		return "Bayrell.Lang.LangES6.TranslatorES6Html";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Html,
{
	/**
	 * Is component
	 */
	isComponent: function(ctx, tag_name)
	{
		if (tag_name == "")
		{
			return false;
		}
		var ch1 = Runtime.rs.substr(ctx, tag_name, 0, 1);
		var ch2 = Runtime.rs.strtoupper(ctx, ch1);
		return ch1 == "{" || ch1 == ch2;
	},
	/**
	 * Translator html value
	 */
	OpHtmlAttr: function(ctx, t, attr, item_pos)
	{
		var op_code = attr.value;
		if (attr instanceof Bayrell.Lang.OpCodes.OpString)
		{
			return Runtime.Collection.from([t,t.expression.constructor.toString(ctx, op_code.value)]);
		}
		if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
		{
			if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(ctx, t, op_code.value);
				t = res[0];
				var value = res[1];
				return Runtime.Collection.from([t,value]);
			}
			else if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(ctx, t, op_code.value);
				t = res[0];
				var value = res[1];
				value = t.expression.constructor.useModuleName(ctx, t, "RenderHelper") + Runtime.rtl.toStr(".json_encode(ctx, ") + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
				return Runtime.Collection.from([t,value]);
			}
		}
		var res = t.expression.constructor.Expression(ctx, t, op_code);
		t = res[0];
		var value = res[1];
		value = t.o(ctx, value, res[0].opcode_level, 13);
		return Runtime.Collection.from([t,value]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlAttrs: function(ctx, t, attrs, item_pos)
	{
		var attr_class = new Runtime.Vector(ctx);
		var attr_s = "null";
		var attr_key_value = "";
		var has_attr_key = false;
		var v_model = "";
		var model = attrs.findItem(ctx, Runtime.lib.equalAttr(ctx, "key", "@model"));
		if (!model)
		{
			var bind = attrs.findItem(ctx, Runtime.lib.equalAttr(ctx, "key", "@bind"));
			if (bind)
			{
				var res = t.expression.constructor.Expression(ctx, t, bind.value);
				t = res[0];
				v_model = "model[" + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr("]");
			}
		}
		var attrs = attrs.map(ctx, (ctx, attr) => 
		{
			var res = this.OpHtmlAttr(ctx, t, attr);
			t = res[0];
			var attr_value = res[1];
			var attr_key = attr.key;
			var ch = Runtime.rs.substr(ctx, attr_key, 0, 1);
			if (attr_key == "@class")
			{
				attr_class.push(ctx, "this.getCssName(ctx, " + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(")"));
				if (!has_attr_key && attr.value instanceof Bayrell.Lang.OpCodes.OpString)
				{
					var arr = Runtime.rs.split(ctx, " ", attr.value.value);
					attr_key_value = t.expression.constructor.toString(ctx, arr[0] + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(item_pos));
					has_attr_key = true;
				}
				return "";
			}
			else if (attr_key == "class")
			{
				attr_class.push(ctx, attr_value);
				return "";
			}
			else if (attr_key == "@key")
			{
				has_attr_key = true;
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = res[0];
				attr_value = res[1];
				attr_key_value = attr_value;
				return "";
			}
			if (Runtime.rs.substr(ctx, attr_key, 0, 7) == "@event:")
			{
				var event_name = Runtime.rs.substr(ctx, attr_key, 7);
				event_name = t.expression.constructor.findModuleName(ctx, t, event_name);
				attr_key = "@event:" + Runtime.rtl.toStr(event_name);
			}
			if (Runtime.rs.substr(ctx, attr_key, 0, 12) == "@eventAsync:")
			{
				var event_name = Runtime.rs.substr(ctx, attr_key, 12);
				event_name = t.expression.constructor.findModuleName(ctx, t, event_name);
				attr_key = "@eventAsync:" + Runtime.rtl.toStr(event_name);
			}
			if (attr_key == "@bind" && v_model != "")
			{
				var s = "";
				s = t.expression.constructor.toString(ctx, attr_key) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(",");
				s += Runtime.rtl.toStr(t.expression.constructor.toString(ctx, "@model") + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(v_model));
				return s;
			}
			return t.expression.constructor.toString(ctx, attr_key) + Runtime.rtl.toStr(":") + Runtime.rtl.toStr(attr_value);
		});
		attrs = attrs.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		if (attr_class.count(ctx) > 0)
		{
			attrs = attrs.pushIm(ctx, "\"class\":" + Runtime.rtl.toStr(Runtime.rs.join(ctx, " + \" \" + ", attr_class)));
		}
		if (attr_key_value != "")
		{
			attrs = attrs.pushIm(ctx, "\"@key\":" + Runtime.rtl.toStr(attr_key_value));
		}
		if (attrs.count(ctx) > 0)
		{
			attr_s = "{" + Runtime.rtl.toStr(Runtime.rs.join(ctx, ",", attrs)) + Runtime.rtl.toStr("}");
		}
		return Runtime.Collection.from([t,attr_s]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(ctx, t, op_code, item_pos, var_name)
	{
		var content = "";
		var content2 = "";
		var str_var_name = t.expression.constructor.toString(ctx, var_name);
		if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlContent)
		{
			var item_value = t.expression.constructor.toString(ctx, op_code.value);
			content += Runtime.rtl.toStr(t.s(ctx, "[__vnull, " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"text\", {\"content\": ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr("}, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
		{
			if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(ctx, t, op_code.value);
				t = res[0];
				var item_value = res[1];
				content += Runtime.rtl.toStr(t.s(ctx, "[__vnull, " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"raw\", {\"content\": ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr("}, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
			}
			else if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_HTML)
			{
				var res = t.expression.constructor.Expression(ctx, t, op_code.value);
				t = res[0];
				var item_value = res[1];
				content += Runtime.rtl.toStr(t.s(ctx, "[__vnull, " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"html\", {\"content\": ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr("}, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
			}
			else if (op_code.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(ctx, t, op_code.value);
				t = res[0];
				var item_value = res[1];
				item_value = "this.json_encode(ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
				content += Runtime.rtl.toStr(t.s(ctx, "[__vnull, " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"text\", {\"content\": ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr("}, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
			}
		}
		else if (op_code instanceof Bayrell.Lang.OpCodes.OpHtmlTag)
		{
			var new_var_name = "";
			var has_childs = op_code.items != null && op_code.items.items != null && op_code.items.items.count(ctx) > 0;
			var is_component = this.isComponent(ctx, op_code.tag_name);
			var res = this.OpHtmlAttrs(ctx, t, op_code.attrs, item_pos);
			t = res[0];
			var attrs = res[1];
			if (op_code.tag_name == "")
			{
				if (has_childs)
				{
					var res = t.constructor.incSaveOpCode(ctx, t);
					t = res[0];
					new_var_name = res[1];
					content += Runtime.rtl.toStr(t.s2(ctx, ""));
					content += Runtime.rtl.toStr(t.s(ctx, "/* Items */"));
					content += Runtime.rtl.toStr(t.s(ctx, "var " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr("; var ") + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr("_childs = [];")));
					content += Runtime.rtl.toStr(t.s(ctx, "[" + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"empty\", null, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
				}
				else
				{
					content += Runtime.rtl.toStr(t.s(ctx, "[__vnull, " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"empty\", null, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
				}
			}
			else if (is_component)
			{
				var tag_name = "";
				if (op_code.op_code_name)
				{
					var res = t.expression.constructor.Expression(ctx, t, op_code.op_code_name);
					t = res[0];
					tag_name = res[1];
				}
				else
				{
					tag_name = t.expression.constructor.toString(ctx, t.expression.constructor.findModuleName(ctx, t, op_code.tag_name));
				}
				if (has_childs)
				{
					var res = this.OpHtmlItems(ctx, t, op_code.items);
					t = res[0];
					var f = res[1];
					content += Runtime.rtl.toStr(t.s2(ctx, ""));
					content += Runtime.rtl.toStr(t.s(ctx, "/* Component '" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr("' */")));
					content += Runtime.rtl.toStr(t.s(ctx, "[__vnull, " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"component\", {\"name\": ") + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr(",\"attrs\": ") + Runtime.rtl.toStr(attrs) + Runtime.rtl.toStr(", \"layout\": layout, \"content\": ") + Runtime.rtl.toStr(f) + Runtime.rtl.toStr("}, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
					has_childs = false;
				}
				else
				{
					content += Runtime.rtl.toStr(t.s(ctx, "[__vnull, " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"component\", {\"name\": ") + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr(",\"attrs\": ") + Runtime.rtl.toStr(attrs) + Runtime.rtl.toStr(", \"layout\": layout}, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
				}
			}
			else
			{
				var tag_name = t.expression.constructor.toString(ctx, op_code.tag_name);
				if (has_childs)
				{
					var res = t.constructor.incSaveOpCode(ctx, t);
					t = res[0];
					new_var_name = res[1];
					content += Runtime.rtl.toStr(t.s2(ctx, ""));
					content += Runtime.rtl.toStr(t.s(ctx, "/* Element '" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr("' */")));
					content += Runtime.rtl.toStr(t.s(ctx, "var " + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr("; var ") + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr("_childs = [];")));
					content += Runtime.rtl.toStr(t.s(ctx, "[" + Runtime.rtl.toStr(new_var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"element\", {\"name\": ") + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr(",\"attrs\": ") + Runtime.rtl.toStr(attrs) + Runtime.rtl.toStr("}, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
				}
				else
				{
					content += Runtime.rtl.toStr(t.s(ctx, "[__vnull, " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"element\", {\"name\": ") + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr(",\"attrs\": ") + Runtime.rtl.toStr(attrs) + Runtime.rtl.toStr("}, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
				}
			}
			if (has_childs)
			{
				var res = this.OpHtmlChilds(ctx, t, op_code.items, new_var_name);
				t = res[0];
				content += Runtime.rtl.toStr(res[1]);
			}
		}
		else
		{
			var res = t.expression.constructor.Expression(ctx, t, op_code);
			t = res[0];
			var item_value = res[1];
			content += Runtime.rtl.toStr(t.s(ctx, "[__vnull, " + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs] = ") + Runtime.rtl.toStr("RenderDriver.insert(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_childs") + Runtime.rtl.toStr(", \"text\", {\"content\": ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr("}, ") + Runtime.rtl.toStr(item_pos) + Runtime.rtl.toStr(");")));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlChilds: function(ctx, t, op_code, control_name)
	{
		if (op_code == null || op_code.items.count(ctx) == 0)
		{
			return Runtime.Collection.from([t,""]);
		}
		var content = "";
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var item = op_code.items.item(ctx, i);
			var res = this.OpHtmlTag(ctx, t, item, i, control_name);
			t = res[0];
			content += Runtime.rtl.toStr(res[1]);
		}
		if (control_name != "control")
		{
			content += Runtime.rtl.toStr(t.s(ctx, "RenderDriver.patch(" + Runtime.rtl.toStr(control_name) + Runtime.rtl.toStr(", ") + Runtime.rtl.toStr(control_name) + Runtime.rtl.toStr("_childs);")));
		}
		return Runtime.Collection.from([t,content]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(ctx, t, op_code)
	{
		if (op_code == null || op_code.items.count(ctx) == 0)
		{
			return Runtime.Collection.from([t,""]);
		}
		/* Save op codes */
		var save_t = t;
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		t = t.constructor.clearSaveOpCode(ctx, t);
		var content = "";
		content += Runtime.rtl.toStr("(control) =>");
		content += Runtime.rtl.toStr(t.s(ctx, "{"));
		t = t.levelInc(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "var __vnull = null;"));
		content += Runtime.rtl.toStr(t.s(ctx, "var control_childs = [];"));
		var res = this.OpHtmlChilds(ctx, t, op_code, "control");
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		content += Runtime.rtl.toStr(t.s2(ctx, ""));
		content += Runtime.rtl.toStr(t.s(ctx, "return control_childs;"));
		t = t.levelDec(ctx);
		content += Runtime.rtl.toStr(t.s(ctx, "}"));
		/* Restore save op codes */
		t = t.copy(ctx, { "save_op_codes": save_op_codes });
		t = t.copy(ctx, { "save_op_code_inc": save_op_code_inc });
		return Runtime.Collection.from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Html";
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
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6Html",
			"name": "Bayrell.Lang.LangES6.TranslatorES6Html",
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
Runtime.rtl.defClass(Bayrell.Lang.LangES6.TranslatorES6Html);