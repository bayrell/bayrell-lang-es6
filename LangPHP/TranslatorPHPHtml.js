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
Bayrell.Lang.LangPHP.TranslatorPHPHtml = function(__ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangPHP.TranslatorPHPHtml)
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPHtml";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml,
{
	/**
	 * Is component
	 */
	isComponent: function(__ctx, tag_name)
	{
		var ch1 = Runtime.rs.substr(__ctx, tag_name, 0, 1);
		var ch2 = Runtime.rs.strtoupper(__ctx, ch1);
		return ch1 == "{" || ch1 == ch2;
	},
	/**
	 * Is single tag
	 */
	isSingleTag: function(__ctx, tag_name)
	{
		var tokens = Runtime.Collection.from(["img","meta","input","link","br"]);
		if (tokens.indexOf(__ctx, tag_name) == -1)
		{
			return false;
		}
		return true;
	},
	/**
	 * Translator html attr
	 */
	OpHtmlAttr: function(__ctx, t, attr)
	{
		if (attr.value instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
		{
			if (attr.value.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(__ctx, t, attr.value.value);
				t = res[0];
				return Runtime.Collection.from([t,res[1]]);
			}
			else if (attr.value.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(__ctx, t, attr.value.value);
				t = res[0];
				var value = res[1];
				value = "static::json_encode($__ctx, " + Runtime.rtl.toStr(value) + Runtime.rtl.toStr(")");
				return Runtime.Collection.from([t,value]);
			}
		}
		var res = t.expression.constructor.Expression(__ctx, t, attr.value);
		t = res[0];
		var value = res[1];
		return Runtime.Collection.from([t,value]);
	},
	/**
	 * Translator html component
	 */
	OpHtmlComponent: function(__ctx, t, op_code)
	{
		var res = t.constructor.incSaveOpCode(__ctx, t);
		t = res[0];
		var var_name = res[1];
		var content = "";
		var v_model = "null";
		var tag_name = op_code.tag_name;
		var module_name = "";
		if (op_code.op_code_name)
		{
			var res = t.expression.constructor.Expression(__ctx, t, op_code.op_code_name);
			t = res[0];
			module_name = res[1];
		}
		else
		{
			module_name = t.expression.constructor.toString(__ctx, t.expression.constructor.findModuleName(__ctx, t, op_code.tag_name));
		}
		var model = op_code.attrs.findItem(__ctx, Runtime.lib.equalAttr(__ctx, "key", "@model"));
		if (model)
		{
			var res = t.expression.constructor.Expression(__ctx, t, model.value);
			t = res[0];
			v_model = res[1];
		}
		else
		{
			var bind = op_code.attrs.findItem(__ctx, Runtime.lib.equalAttr(__ctx, "key", "@bind"));
			if (bind)
			{
				var res = t.expression.constructor.Expression(__ctx, t, bind.value);
				t = res[0];
				v_model = "$model[" + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr("]");
			}
		}
		content += Runtime.rtl.toStr(t.s(__ctx, "/* Component '" + Runtime.rtl.toStr(tag_name) + Runtime.rtl.toStr("' */")));
		content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr("_params = [];")));
		for (var i = 0;i < op_code.attrs.count(__ctx);i++)
		{
			var attr = op_code.attrs.item(__ctx, i);
			if (attr.key == "@bind")
			{
				continue;
			}
			if (attr.key == "@model")
			{
				continue;
			}
			var res = this.OpHtmlAttr(__ctx, t, attr);
			t = res[0];
			var attr_value = res[1];
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr("_params[") + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, attr.key)) + Runtime.rtl.toStr("] = ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(";")));
		}
		content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr("_content = \"\";")));
		var f = Runtime.rtl.method(__ctx, this.getCurrentClassName(__ctx), "OpHtmlItems");
		var res = t.constructor.saveOpCodeCall(__ctx, t, f, Runtime.Collection.from([op_code.items,var_name + Runtime.rtl.toStr("_content")]));
		t = res[0];
		content += Runtime.rtl.toStr(res[1]);
		/*content ~= t.s(var_name~"_content .= " ~ res[2] ~ ";");*/
		if (op_code.op_code_name)
		{
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr("_name = \\Runtime\\rtl::find_class(") + Runtime.rtl.toStr(module_name) + Runtime.rtl.toStr(");")));
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_name::render($__ctx, $layout,") + Runtime.rtl.toStr(v_model) + Runtime.rtl.toStr(",\\Runtime\\Dict::from(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_params),") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_content,$control);")));
		}
		else
		{
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr("_name = \\Runtime\\rtl::find_class(") + Runtime.rtl.toStr(module_name) + Runtime.rtl.toStr(");")));
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr(" = ") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_name::render($__ctx, $layout,") + Runtime.rtl.toStr(v_model) + Runtime.rtl.toStr(",\\Runtime\\Dict::from(") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_params),") + Runtime.rtl.toStr(var_name) + Runtime.rtl.toStr("_content,$control);")));
		}
		var res = t.constructor.addSaveOpCode(__ctx, t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(__ctx, t, op_code)
	{
		if (this.isComponent(__ctx, op_code.tag_name))
		{
			return this.OpHtmlComponent(__ctx, t, op_code);
		}
		var res = t.constructor.incSaveOpCode(__ctx, t);
		t = res[0];
		var var_name = res[1];
		var attr_s = "";
		var attrs = op_code.attrs.map(__ctx, (__ctx, attr) => 
		{
			var attr_value = "";
			var key = attr.key;
			if (key == "@class" && attr.value instanceof Bayrell.Lang.OpCodes.OpString)
			{
				return "class=" + Runtime.rtl.toStr("\"'.static::getCssName($__ctx, ") + Runtime.rtl.toStr(t.expression.constructor.toString(__ctx, attr.value.value)) + Runtime.rtl.toStr(").'\"");
			}
			if (key == "@model" && op_code.tag_name == "input")
			{
				key = "value";
			}
			if (key == "@bind" && op_code.tag_name == "input")
			{
				var res = t.expression.constructor.Expression(__ctx, t, attr.value);
				t = res[0];
				attr_value = "$model[" + Runtime.rtl.toStr(res[1]) + Runtime.rtl.toStr("]");
				key = "value";
			}
			var ch = Runtime.rs.substr(__ctx, key, 0, 1);
			if (ch == "@")
			{
				return "";
			}
			if (attr_value == "")
			{
				var res = this.OpHtmlAttr(__ctx, t, attr);
				t = res[0];
				attr_value = res[1];
			}
			return key + Runtime.rtl.toStr("=\"'.static::escapeAttr($__ctx, ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(").'\"");
		});
		attrs = attrs.filter(__ctx, (__ctx, s) => 
		{
			return s != "";
		});
		if (attrs.count(__ctx) > 0)
		{
			attr_s = " " + Runtime.rtl.toStr(Runtime.rs.join(__ctx, " ", attrs));
		}
		var content = "/* Element '" + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr("' */");
		if (this.isSingleTag(__ctx, op_code.tag_name))
		{
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr(" = '<") + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(attr_s) + Runtime.rtl.toStr(" />';")));
		}
		else
		{
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr(" = '<") + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(attr_s) + Runtime.rtl.toStr(">';")));
			var flag_value = false;
			if (op_code.tag_name == "textarea")
			{
				var model_attr = op_code.attrs.findItem(__ctx, Runtime.lib.equalAttr(__ctx, "key", "@model"));
				if (model_attr != null)
				{
					var res = this.OpHtmlAttr(__ctx, t, model_attr);
					t = res[0];
					var attr_value = res[1];
					if (model_attr instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
					{
						content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr(" .= ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(";")));
					}
					else
					{
						content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr(" .= static::escapeHtml($__ctx, ") + Runtime.rtl.toStr(attr_value) + Runtime.rtl.toStr(");")));
					}
					flag_value = true;
				}
			}
			if (!flag_value)
			{
				var f = Runtime.rtl.method(__ctx, this.getCurrentClassName(__ctx), "OpHtmlItems");
				var res = t.constructor.saveOpCodeCall(__ctx, t, f, Runtime.Collection.from([op_code.items,var_name]));
				t = res[0];
				content += Runtime.rtl.toStr(res[1]);
			}
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr(" .= '</") + Runtime.rtl.toStr(op_code.tag_name) + Runtime.rtl.toStr(">';")));
		}
		var res = t.constructor.addSaveOpCode(__ctx, t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return Runtime.Collection.from([t,var_name]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(__ctx, t, op_code, var_name)
	{
		if (var_name == undefined) var_name = "";
		if (op_code.items.count(__ctx) == 0)
		{
			return Runtime.Collection.from([t,""]);
		}
		var content = "";
		if (var_name == "")
		{
			var res = t.constructor.incSaveOpCode(__ctx, t);
			t = res[0];
			var var_name = res[1];
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr(" = \"\";")));
		}
		for (var i = 0;i < op_code.items.count(__ctx);i++)
		{
			var item = op_code.items.item(__ctx, i);
			var item_value = "";
			if (item instanceof Bayrell.Lang.OpCodes.OpHtmlContent)
			{
				item_value = t.expression.constructor.toString(__ctx, item.value);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpHtmlTag)
			{
				var res = this.OpHtmlTag(__ctx, t, item);
				t = res[0];
				item_value = res[1];
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpHtmlValue)
			{
				if (item.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(__ctx, t, item.value);
					t = res[0];
					item_value = res[1];
				}
				else if (item.kind == Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(__ctx, t, item.value);
					t = res[0];
					item_value = res[1];
					item_value = "static::json_encode($__ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
				}
			}
			else
			{
				var res = t.expression.constructor.Expression(__ctx, t, item);
				t = res[0];
				item_value = res[1];
				item_value = "static::escapeHtml($__ctx, " + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(")");
			}
			content += Runtime.rtl.toStr(t.s(__ctx, var_name + Runtime.rtl.toStr(" .= ") + Runtime.rtl.toStr(item_value) + Runtime.rtl.toStr(";")));
		}
		var res = t.constructor.addSaveOpCode(__ctx, t, Runtime.Dict.from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return Runtime.Collection.from([t,var_name]);
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
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPHtml",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPHtml",
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
Runtime.rtl.defClass(Bayrell.Lang.LangPHP.TranslatorPHPHtml);