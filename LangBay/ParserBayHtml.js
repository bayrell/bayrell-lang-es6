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
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayHtml = function(ctx)
{
	Runtime.CoreObject.apply(this, arguments);
};
Bayrell.Lang.LangBay.ParserBayHtml.prototype = Object.create(Runtime.CoreObject.prototype);
Bayrell.Lang.LangBay.ParserBayHtml.prototype.constructor = Bayrell.Lang.LangBay.ParserBayHtml;
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayHtml)
		{
		}
		Runtime.CoreObject.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Runtime.CoreObject.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime.CoreObject.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangBay.ParserBayHtml";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml, Runtime.CoreObject);
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml,
{
	/**
	 * Read css selector
	 */
	readCssSelector: function(ctx, parser)
	{
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var class_name = parser.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(parser.current_class_name);
		var ch = Runtime.rs.substr(ctx, content.ref, pos, 1);
		if (ch == "(")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
			var start_pos = pos;
			while (pos < content_sz && ch != ")")
			{
				pos = pos + 1;
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				ch = Runtime.rs.substr(ctx, content.ref, pos, 1);
			}
			class_name = Runtime.rs.substr(ctx, content.ref, start_pos, pos - start_pos);
			if (parser.uses.has(ctx, class_name))
			{
				class_name = parser.uses.item(ctx, class_name);
			}
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
		}
		var start_pos = pos;
		ch = Runtime.rs.substr(ctx, content.ref, pos, 1);
		while (pos < content_sz && ch != " " && ch != "," && ch != "." && ch != ":" && ch != "[" && ch != "{")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
			ch = Runtime.rs.substr(ctx, content.ref, pos, 1);
		}
		var postfix = Runtime.rs.substr(ctx, content.ref, start_pos, pos - start_pos);
		var selector = "." + Runtime.rtl.toStr(postfix) + Runtime.rtl.toStr("-") + Runtime.rtl.toStr(Runtime.RuntimeUtils.getCssHash(ctx, class_name));
		var caret = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		parser = parser.copy(ctx, { "caret": caret });
		return Runtime.Collection.from([parser,selector]);
	},
	/**
	 * Read css body
	 */
	readCssBody: function(ctx, parser)
	{
		var caret_start = parser.caret;
		var css_str = "";
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var bracket_level = 0;
		var start_pos = pos;
		var ch = Runtime.rs.substr(ctx, content.ref, pos, 1);
		while (pos < content_sz && (ch != "}" || ch == "}" && bracket_level > 0))
		{
			/* If html or  tag */
			if (ch == "%")
			{
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				/* Add value */
				var value = Runtime.rs.substr(ctx, content.ref, start_pos, pos - start_pos - 1);
				if (value != "")
				{
					css_str += Runtime.rtl.toStr(value);
				}
				/* Read CSS Selector */
				var caret = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				parser = parser.copy(ctx, { "caret": caret });
				var res = this.readCssSelector(ctx, parser);
				parser = res[0];
				var s = res[1];
				css_str += Runtime.rtl.toStr(s);
				/* Set pos, x, y */
				caret_start = parser.caret.clone(ctx);
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch == "@")
			{
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				var res = parser.parser_base.constructor.readUntilStringArr(ctx, parser, Runtime.Collection.from(["{"]), false);
				parser = res[0];
				var s1 = res[1];
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
				parser = res[0];
				var res = this.readCssBody(ctx, parser);
				parser = res[0];
				var s2 = res[1];
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
				parser = res[0];
				css_str += Runtime.rtl.toStr(s1 + Runtime.rtl.toStr("{") + Runtime.rtl.toStr(s2) + Runtime.rtl.toStr("}"));
				/* Set pos, x, y */
				caret_start = parser.caret.clone(ctx);
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch == "{")
			{
				/* Add value */
				var value = Runtime.rs.substr(ctx, content.ref, start_pos, pos - start_pos);
				if (value != "")
				{
					css_str += Runtime.rtl.toStr(value);
				}
				/* Read CSS Block */
				var caret = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				parser = parser.copy(ctx, { "caret": caret });
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
				parser = res[0];
				var res = parser.parser_base.constructor.readUntilStringArr(ctx, parser, Runtime.Collection.from(["}"]), false);
				parser = res[0];
				var s = res[1];
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
				parser = res[0];
				css_str += Runtime.rtl.toStr("{" + Runtime.rtl.toStr(s) + Runtime.rtl.toStr("}"));
				/* Set pos, x, y */
				caret_start = parser.caret.clone(ctx);
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			ch = Runtime.rs.substr(ctx, content.ref, pos, 1);
		}
		/* Push item */
		var value = Runtime.rs.substr(ctx, content.ref, start_pos, pos - start_pos);
		var caret = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		if (value != "")
		{
			css_str += Runtime.rtl.toStr(value);
		}
		parser = parser.copy(ctx, { "caret": caret });
		return Runtime.Collection.from([parser,css_str]);
	},
	/**
	 * Read css
	 */
	readCss: function(ctx, parser)
	{
		var caret_start = parser.caret.clone(ctx);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "@css");
		parser = res[0];
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
		parser = res[0];
		var res = this.readCssBody(ctx, parser);
		parser = res[0];
		var css_str = res[1];
		var caret = parser.caret;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
		parser = res[0];
		css_str = Runtime.rs.replace(ctx, "\t", "", css_str);
		css_str = Runtime.rs.replace(ctx, "\n", "", css_str);
		var op_code = new Bayrell.Lang.OpCodes.OpString(ctx, Runtime.Dict.from({"caret_start":caret,"caret_end":parser.caret.clone(ctx),"value":css_str}));
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read html value
	 */
	readHTMLValue: function(ctx, parser)
	{
		var item = null;
		var caret = parser.caret.clone(ctx);
		var content = parser.content;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var ch = Runtime.rs.substr(ctx, content.ref, pos, 1);
		if (ch == "<")
		{
			var res = this.readHTMLTag(ctx, parser);
			parser = res[0];
			item = res[1];
		}
		else if (ch == "{")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			item = res[1];
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
			parser = res[0];
		}
		else if (ch == "@")
		{
			x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
			y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
			pos = pos + 1;
			var ch3 = Runtime.rs.substr(ctx, content.ref, pos, 3);
			var ch4 = Runtime.rs.substr(ctx, content.ref, pos, 4);
			if (ch3 == "raw" || ch4 == "json" || ch4 == "html")
			{
				var res;
				if (ch3 == "raw")
				{
					res = parser.parser_base.constructor.next(ctx, parser, ch3, x, y, pos);
				}
				if (ch4 == "json")
				{
					res = parser.parser_base.constructor.next(ctx, parser, ch4, x, y, pos);
				}
				if (ch4 == "html")
				{
					res = parser.parser_base.constructor.next(ctx, parser, ch4, x, y, pos);
				}
				x = res[0];
				y = res[1];
				pos = res[2];
			}
			caret = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
			parser = parser.copy(ctx, { "caret": caret });
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			item = res[1];
			if (ch3 == "raw")
			{
				item = new Bayrell.Lang.OpCodes.OpHtmlValue(ctx, Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpHtmlValue.KIND_RAW,"value":item,"caret_start":caret,"caret_end":parser.caret.clone(ctx)}));
			}
			else if (ch4 == "json")
			{
				item = new Bayrell.Lang.OpCodes.OpHtmlValue(ctx, Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpHtmlValue.KIND_JSON,"value":item,"caret_start":caret,"caret_end":parser.caret.clone(ctx)}));
			}
			else if (ch4 == "html")
			{
				item = new Bayrell.Lang.OpCodes.OpHtmlValue(ctx, Runtime.Dict.from({"kind":Bayrell.Lang.OpCodes.OpHtmlValue.KIND_HTML,"value":item,"caret_start":caret,"caret_end":parser.caret.clone(ctx)}));
			}
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
			parser = res[0];
		}
		return Runtime.Collection.from([parser,item]);
	},
	/**
	 * Read html attribute key
	 */
	readHTMLAttrKey: function(ctx, parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var key = "";
		/* Look token */
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "@")
		{
			parser = look.clone(ctx);
			key = "@";
		}
		var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
		parser = res[0];
		ident = res[1];
		key += Runtime.rtl.toStr(ident.value);
		/* Read attr */
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (token.content == "-")
		{
			var res = parser.parser_base.constructor.readIdentifier(ctx, look.clone(ctx));
			parser = res[0];
			ident = res[1];
			key += Runtime.rtl.toStr("-" + Runtime.rtl.toStr(ident.value));
			/* Look next token */
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		/* Look token */
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == ":")
		{
			parser = look.clone(ctx);
			key += Runtime.rtl.toStr(":");
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = res[0];
			ident = res[1];
			key += Runtime.rtl.toStr(ident.value);
		}
		return Runtime.Collection.from([parser,key]);
	},
	/**
	 * Read html attribute value
	 */
	readHTMLAttrValue: function(ctx, parser)
	{
		var token = null;
		var look = null;
		var op_code = null;
		var ident = null;
		/* Look token */
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			op_code = res[1];
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
			parser = res[0];
		}
		else if (token.content == "@")
		{
			var res = this.readHTMLValue(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else
		{
			var res = parser.parser_base.constructor.readString(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read html attributes
	 */
	readHTMLAttrs: function(ctx, parser)
	{
		var items = new Runtime.Vector(ctx);
		var content = parser.content;
		var content_sz = parser.content_sz;
		var caret = parser.parser_base.constructor.skipChar(ctx, parser, content, parser.caret.clone(ctx));
		var ch = Runtime.rs.substr(ctx, content.ref, caret.pos, 1);
		while (ch != "/" && ch != ">" && caret.pos < content_sz)
		{
			var caret_start = caret;
			parser = parser.copy(ctx, { "caret": caret.clone(ctx) });
			var res = this.readHTMLAttrKey(ctx, parser);
			parser = res[0];
			var key = res[1];
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "=");
			parser = res[0];
			var res = this.readHTMLAttrValue(ctx, parser);
			parser = res[0];
			var value = res[1];
			items.push(ctx, new Bayrell.Lang.OpCodes.OpHtmlAttribute(ctx, Runtime.Dict.from({"key":key,"value":value,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)})));
			caret = parser.parser_base.constructor.skipChar(ctx, parser, content, parser.caret.clone(ctx));
			ch = Runtime.rs.substr(ctx, content.ref, caret.pos, 1);
			var ch2 = Runtime.rs.substr(ctx, content.ref, caret.pos, 2);
			if (ch2 == "/>")
			{
				break;
			}
		}
		return Runtime.Collection.from([parser,items.toCollection(ctx)]);
	},
	/**
	 * Read html template
	 */
	readHTMLContent: function(ctx, parser, end_tag)
	{
		var items = new Runtime.Vector(ctx);
		var item = null;
		var token = null;
		var look = null;
		var caret = null;
		var caret_start = parser.caret.clone(ctx);
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var start_pos = pos;
		var end_tag_sz = Runtime.rs.strlen(ctx, end_tag);
		var ch2 = Runtime.rs.substr(ctx, content.ref, pos, end_tag_sz);
		while (ch2 != end_tag && pos < content_sz)
		{
			var ch = Runtime.rs.substr(ctx, content.ref, pos, 1);
			/* If html or  tag */
			if (ch == "<" || ch == "{" || ch == "@")
			{
				var value = Runtime.rs.substr(ctx, content.ref, start_pos, pos - start_pos);
				caret = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
				value = Runtime.rs.trim(ctx, value, "\t\r\n");
				if (value != "")
				{
					item = new Bayrell.Lang.OpCodes.OpHtmlContent(ctx, Runtime.Dict.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.push(ctx, item);
				}
				/* Read HTML Value */
				parser = parser.copy(ctx, { "caret": caret });
				var res = this.readHTMLValue(ctx, parser);
				parser = res[0];
				item = res[1];
				items.push(ctx, item);
				/* Set pos, x, y */
				caret_start = parser.caret.clone(ctx);
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				x = parser.parser_base.constructor.nextX(ctx, parser, ch, x);
				y = parser.parser_base.constructor.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			ch2 = Runtime.rs.substr(ctx, content.ref, pos, end_tag_sz);
		}
		/* Push item */
		var value = Runtime.rs.substr(ctx, content.ref, start_pos, pos - start_pos);
		value = Runtime.rs.trim(ctx, value, "\t\r\n");
		caret = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		if (value != "")
		{
			item = new Bayrell.Lang.OpCodes.OpHtmlContent(ctx, Runtime.Dict.from({"value":value,"caret_start":caret_start,"caret_end":caret}));
			items.push(ctx, item);
		}
		return Runtime.Collection.from([parser.copy(ctx, Runtime.Dict.from({"caret":caret})),items]);
	},
	/**
	 * Read html tag
	 */
	readHTMLTag: function(ctx, parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var caret_items_start = null;
		var caret_items_end = null;
		var caret_start = parser.caret.clone(ctx);
		var items = null;
		var op_code_name = null;
		var is_single_flag = false;
		var op_code_flag = false;
		var tag_name = "";
		/* Tag start */
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
		parser = res[0];
		/* Look token */
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			op_code_flag = true;
			var caret1 = parser.caret.clone(ctx);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			op_code_name = res[1];
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
			parser = res[0];
			var caret2 = parser.caret.clone(ctx);
			tag_name = Runtime.rs.substr(ctx, parser.content.ref, caret1.pos, caret2.pos - caret1.pos);
		}
		else if (token.content == ">")
		{
			op_code_flag = true;
			tag_name = "";
		}
		else
		{
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser, false);
			parser = res[0];
			ident = res[1];
			tag_name = ident.value;
		}
		var res = this.readHTMLAttrs(ctx, parser);
		parser = res[0];
		var attrs = res[1];
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "/")
		{
			parser = look.clone(ctx);
			is_single_flag = true;
		}
		var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
		parser = res[0];
		if (!is_single_flag)
		{
			/* Read items */
			caret_items_start = parser.caret.clone(ctx);
			var res = this.readHTMLContent(ctx, parser, "</" + Runtime.rtl.toStr(tag_name));
			parser = res[0];
			var items = res[1];
			caret_items_end = parser.caret.clone(ctx);
			/* Tag end */
			if (op_code_flag)
			{
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "/");
				parser = res[0];
				if (tag_name)
				{
					var res = parser.parser_base.constructor.matchString(ctx, parser, tag_name);
					parser = res[0];
				}
				var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
				parser = res[0];
			}
			else
			{
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "/");
				parser = res[0];
				if (ident != null)
				{
					var res = parser.parser_base.constructor.matchToken(ctx, parser, ident.value);
					parser = res[0];
				}
				var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
				parser = res[0];
			}
		}
		var op_code = new Bayrell.Lang.OpCodes.OpHtmlTag(ctx, Runtime.Dict.from({"attrs":attrs,"tag_name":tag_name,"op_code_name":op_code_name,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx),"items":(items != null) ? new Bayrell.Lang.OpCodes.OpHtmlItems(ctx, Runtime.Dict.from({"caret_start":caret_items_start,"caret_end":caret_items_end,"items":items.toCollection(ctx)})) : null}));
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read html template
	 */
	readHTML: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var items = new Runtime.Vector(ctx);
		var caret_start = parser.caret.clone(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var ch2 = Runtime.rs.substr(ctx, parser.content.ref, parser.caret.pos, 2);
		while (!token.eof && token.content == "<" && ch2 != "</")
		{
			var res = this.readHTMLTag(ctx, parser);
			parser = res[0];
			var op_code = res[1];
			items.push(ctx, op_code);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			var caret = parser.parser_base.constructor.skipChar(ctx, parser, parser.content, parser.caret.clone(ctx));
			ch2 = Runtime.rs.substr(ctx, parser.content.ref, caret.pos, 2);
		}
		var op_code = new Bayrell.Lang.OpCodes.OpHtmlItems(ctx, Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret.clone(ctx),"items":items.toCollection(ctx)}));
		return Runtime.Collection.from([parser,op_code]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayHtml";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayHtml",
			"name": "Bayrell.Lang.LangBay.ParserBayHtml",
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
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayHtml);