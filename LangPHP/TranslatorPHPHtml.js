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
Bayrell.Lang.LangPHP.TranslatorPHPHtml = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPHtml)
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPHtml";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml,
{
	/**
	 * Is component
	 */
	isComponent: function(ctx, tag_name)
	{
		var ch1 = Runtime.rs.substr(ctx, tag_name, 0, 1);
		var ch2 = Runtime.rs.strtoupper(ctx, ch1);
		return ch1 == "{" || ch1 == ch2;
	},
	/**
	 * Is single tag
	 */
	isSingleTag: function(ctx, tag_name)
	{
		var tokens = Runtime.Collection.from(["img","meta","input","link","br"]);
		if (tokens.indexOf(ctx, tag_name) == -1)
		{
			return false;
		}
		return true;
	},
	/**
	 * Translator html component
	 */
	OpHtmlComponent: function(ctx, t, op_code)
	{
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var content = "";
		var v_model = "null";
		var tag_name = op_code.tag_name;
		var module_name = "";
		if (op_code.op_code_name)
		{
			var res = t.expression.constructor.Expression(ctx, t, op_code.op_code_name);
			t = res[0];
			module_name = res[1];
		}
		else
		{
			module_name = t.expression.constructor.toString(ctx, t.expression.constructor.findModuleName(ctx, t, op_code.tag_name));
		}
		var model = op_code.attrs.findItem(ctx, Runtime.lib.equalAttr(ctx, "key", "@model"));
		if (model)
		{
			var res = t.expression.constructor.Expression(ctx, t, model.value);
			t = res[0];
			v_model = res[1];
		}
		else
		{
			var bind = op_code.attrs.findItem(ctx, Runtime.lib.equalAttr(ctx, "key", "@bind"));
			if (bind)
			{
				var res = t.expression.constructor.Expression(ctx, t, bind.value);
				t = res[0];
				v_model = "$model[" + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr("]");
			}
		}
		content += Runtime.rtl.toStr(t.s(ctx, "/* Component '" + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr("' */")));
		content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr("_params = [];")));
		for (var i = 0;i < op_code.attrs.count(ctx);i++)
		{
			var attr = op_code.attrs.item(ctx, i);
			if (attr.key == "@bind")
			{
				continue;
			}
			if (attr.key == "@model")
			{
				continue;
			}
			var res = this.OpHtmlAttr(ctx, t, attr);
			t = res[0];
			var attr_value = res[1];
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr("_params[") + Runtime.rtl.toStr(t.expression.constructor.toString(ctx, attr.key)) + Runtime.rtl.toStr("] = ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(";")));
		}
		content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr("_content = \"\";")));
		var f = Runtime.rtl.method(ctx, this.getCurrentClassName(ctx), "OpHtmlItems");
		var res = t.constructor.saveOpCodeCall(ctx, t, f, Runtime.Collection.from([op_code.items,var_name + Runtime.rtl.toStr("_content")]));
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		/*content ~= t.s(var_name~"_content .= " ~ res[2] ~ ";");*/
		if (op_code.op_code_name)
		{
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr("_name = \\Runtime\\rtl::find_class(") + Runtime.rtl.toStr(module_name) + Runtime.rtl.toStr(");")));
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_name::render($ctx, $layout,") + Runtime.rtl.toStr(v_model) + Runtime.rtl.toStr(",\\Runtime\\Dict::from(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_params),") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_content);")));
		}
		else
		{
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr("_name = \\Runtime\\rtl::find_class(") + Runtime.rtl.toStr(module_name) + Runtime.rtl.toStr(");")));
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_name::render($ctx, $layout,") + Runtime.rtl.toStr(v_model) + Runtime.rtl.toStr(",\\Runtime\\Dict::from(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_params),") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_content);")));
		}
		var res = t.constructor.addSaveOpCode(ctx, t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Translator html attr
	 */
	OpHtmlAttr: function(ctx, t, attr)
	{
		if (attr.value instanceof Bayrell.Lang.OpCodes.OpString)
		{
			return Runtime.Collection.from([t,t.expression.constructor.toString(ctx, attr.value.value)]);
		}
		if (attr.value instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
		{
			if (attr.value.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(ctx, t, attr.value.value);
				t = res[0];
				return Runtime.Collection.from([t,res[1]]);
			}
			else if (attr.value.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(ctx, t, attr.value.value);
				t = res[0];
				var value = res[1];
				value = "static::json_encode($ctx, " + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
				return Runtime.Collection.from([t,value]);
			}
		}
		var res = t.expression.constructor.Expression(ctx, t, attr.value);
		t = res[0];
		var value = res[1];
		value = t.o(ctx, value, res[0].opcode_level, 13);
		return Runtime.Collection.from([t,value]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(ctx, t, op_code)
	{
		if (this.isComponent(ctx, op_code.tag_name))
		{
			return this.OpHtmlComponent(ctx, t, op_code);
		}
		var attr_class = new Runtime.Vector(ctx);
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var attr_s = "";
		var attr_key_value = "";
		var has_attr_key = false;
		var attrs = op_code.attrs.map(ctx, (ctx, attr) => 
		{
			var attr_key = attr.key;
			var attr_value = "";
			if (attr_key == "@class")
			{
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = res[0];
				attr_value = res[1];
				attr_class.push(ctx, "static::getCssName($ctx, " + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(")"));
				if (!has_attr_key && attr.value instanceof Bayrell.Lang.OpCodes.OpString)
				{
					var arr = Runtime.rs.split(ctx, " ", attr.value.value);
					attr_key_value = t.expression.constructor.toString(ctx, arr[0]);
					has_attr_key = true;
				}
				return "";
			}
			else if (attr_key == "class")
			{
				t = t.copy(ctx, { "opcode_level": 1000 });
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = res[0];
				attr_value = res[1];
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
			if (attr_key == "@model" && op_code.tag_name == "input")
			{
				attr_key = "value";
			}
			if (attr_key == "@bind" && op_code.tag_name == "input")
			{
				var res = t.expression.constructor.Expression(ctx, t, attr.value);
				t = res[0];
				attr_value = "$model[" + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr("]");
				attr_key = "value";
			}
			var ch = Runtime.rs.substr(ctx, attr_key, 0, 1);
			if (ch == "@")
			{
				return "";
			}
			if (attr_value == "")
			{
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = res[0];
				attr_value = res[1];
			}
			return attr_key + Runtime.rtl.toStr("=\"'.static::escapeAttr($ctx, ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(").'\"");
		});
		attrs = attrs.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		if (attr_class.count(ctx) > 0)
		{
			attrs = attrs.pushIm(ctx, "class=" + Runtime.rtl.toStr("\"'.") + Runtime.rtl.toStr(Runtime.rs.join(ctx, ".\" \".", attr_class)) + Runtime.rtl.toStr(".'\""));
		}
		if (attrs.count(ctx) > 0)
		{
			attr_s = " " + Runtime.rtl.toStr(Runtime.rs.join(ctx, " ", attrs));
		}
		var content = "/* Element '" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr("' */");
		if (this.isSingleTag(ctx, op_code.tag_name))
		{
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr(" = '<") + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(attr_s) + Runtime.rtl.toStr(" />';")));
		}
		else
		{
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr(" = '<") + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(attr_s) + Runtime.rtl.toStr(">';")));
			var flag_value = false;
			if (op_code.tag_name == "textarea")
			{
				var model_attr = op_code.attrs.findItem(ctx, Runtime.lib.equalAttr(ctx, "key", "@model"));
				if (model_attr != null)
				{
					var res = this.OpHtmlAttr(ctx, t, model_attr);
					t = res[0];
					var attr_value = res[1];
					if (model_attr instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
					{
						content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr(" .= ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(";")));
					}
					else
					{
						content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr(" .= static::escapeHtml($ctx, ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(");")));
					}
					flag_value = true;
				}
			}
			if (!flag_value)
			{
				var f = Runtime.rtl.method(ctx, this.getCurrentClassName(ctx), "OpHtmlItems");
				var res = t.constructor.saveOpCodeCall(ctx, t, f, Runtime.Collection.from([op_code.items,var_name]));
				t = res[0];
				content += Runtime.rtl.toStr(res[1]);
			}
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr(" .= '</") + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(">';")));
		}
		var res = t.constructor.addSaveOpCode(ctx, t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(ctx, t, op_code, var_name)
	{
		if (var_name == undefined) var_name = "";
		if (op_code == null || op_code.items.count(ctx) == 0)
		{
			return Runtime.Collection.from([t,""]);
		}
		var content = "";
		if (var_name == "")
		{
			var res = t.constructor.incSaveOpCode(ctx, t);
			t = res[0];
			var var_name = res[1];
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr(" = \"\";")));
		}
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var item = op_code.items.item(ctx, i);
			var item_value = "";
			if (item instanceof Bayrell.Lang.OpCodes.OpHtmlContent)
			{
				item_value = t.expression.constructor.toString(ctx, item.value);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpHtmlTag)
			{
				var res = this.OpHtmlTag(ctx, t, item);
				t = res[0];
				item_value = res[1];
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
			{
				if (item.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = res[0];
					item_value = res[1];
				}
				else if (item.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_HTML)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = res[0];
					item_value = res[1];
					item_value = "static::toHtml($ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
				}
				else if (item.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = res[0];
					item_value = res[1];
					item_value = "static::json_encode($ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
				}
			}
			else
			{
				var res = t.expression.constructor.Expression(ctx, t, item);
				t = res[0];
				item_value = res[1];
				item_value = "static::escapeHtml($ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
			}
			content += Runtime.rtl.toStr(t.s(ctx, var_name + Runtime.rtl.toStr(" .= ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(";")));
		}
		var res = t.constructor.addSaveOpCode(ctx, t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return Runtime.Collection.from([t,"new \\Runtime\\RawString(" + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr(")")]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPHtml";
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
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPHtml",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPHtml",
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
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPHtml);