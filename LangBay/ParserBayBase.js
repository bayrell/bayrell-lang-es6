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
Bayrell.Lang.LangBay.ParserBayBase = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayBase.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayBase)
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
		return "Bayrell.Lang.LangBay.ParserBayBase";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayBase,
{
	/**
	 * Return true if is char
	 * @param char ch
	 * @return boolean
	 */
	isChar: function(ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos(ctx, "qazwsxedcrfvtgbyhnujmikolp", Runtime.rs.strtolower(ctx, ch)) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	isNumber: function(ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos(ctx, "0123456789", ch) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isHexChar: function(ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos(ctx, "0123456789abcdef", Runtime.rs.strtolower(ctx, ch)) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	isStringOfNumbers: function(ctx, s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var sz = Runtime.rs.strlen(ctx, s);
		for (var i = 0;i < sz;i++)
		{
			if (!this.isNumber(ctx, Runtime.rs.charAt(ctx, s, i)))
			{
				var __memorize_value = false;
				Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = true;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Is system type
	 */
	isSystemType: function(ctx, name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (name == "var")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "void")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "bool")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "byte")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "int")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "double")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "float")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "char")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "string")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "list")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "scalar")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "primitive")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "html")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Error")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Object")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "DateTime")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Collection")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Dict")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Vector")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Map")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rs")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rtl")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "ArrayInterface")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if name is identifier
	 */
	isIdentifier: function(ctx, name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (name == "")
		{
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "@")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		if (this.isNumber(ctx, Runtime.rs.charAt(ctx, name, 0)))
		{
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var sz = Runtime.rs.strlen(ctx, name);
		for (var i = 0;i < sz;i++)
		{
			var ch = Runtime.rs.charAt(ctx, name, i);
			if (this.isChar(ctx, ch) || this.isNumber(ctx, ch) || ch == "_")
			{
				continue;
			}
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = true;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if reserved words
	 */
	isReserved: function(ctx, name)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (name == "__async_t")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "__async_var")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		/*if (name == "__ctx") return true;*/
		/*if (name == "ctx") return true;*/
		if (Runtime.rs.substr(ctx, name, 0, 3) == "__v")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns kind of identifier or thrown Error
	 */
	findIdentifier: function(ctx, parser, name, caret)
	{
		var kind = "";
		if (parser.vars.has(ctx, name))
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE;
		}
		else if (parser.uses.has(ctx, name))
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_MODULE;
		}
		else if (this.isSystemType(ctx, name))
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE;
		}
		else if (name == "log")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_FUNCTION;
		}
		else if (name == "null" || name == "true" || name == "false")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONSTANT;
		}
		else if (name == "fn")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_FUNCTION;
		}
		else if (name == "@" || name == "_")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT;
		}
		else if (name == "static" || name == "self" || name == "this" || name == "parent")
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF;
		}
		return kind;
	},
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar: function(ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos(ctx, "qazwsxedcrfvtgbyhnujmikolp0123456789_", Runtime.rs.strtolower(ctx, ch)) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar: function(ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (Runtime.rs.ord(ctx, ch) <= 32)
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns next X
	 */
	nextX: function(ctx, parser, ch, pos)
	{
		if (ch == "\t")
		{
			return pos + parser.tab_size;
		}
		if (ch == "\n")
		{
			return 0;
		}
		return pos + 1;
	},
	/**
	 * Returns next Y
	 */
	nextY: function(ctx, parser, ch, pos)
	{
		if (ch == "\n")
		{
			return pos + 1;
		}
		return pos;
	},
	/**
	 * Returns next X
	 */
	next: function(ctx, parser, s, x, y, pos)
	{
		var sz = Runtime.rs.strlen(ctx, s);
		for (var i = 0;i < sz;i++)
		{
			var ch = Runtime.rs.substr(ctx, s, i, 1);
			x = this.nextX(ctx, parser, ch, x);
			y = this.nextY(ctx, parser, ch, y);
			pos = pos + 1;
		}
		return Runtime.Collection.from([x,y,pos]);
	},
	/**
	 * Open comment
	 */
	isCommentOpen: function(ctx, str, skip_comments)
	{
		return skip_comments && str == "/*";
	},
	/**
	 * Close comment
	 */
	isCommentClose: function(ctx, str)
	{
		return str == "*/";
	},
	/**
	 * Skip char
	 */
	skipChar: function(ctx, parser, content, start_pos)
	{
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		var skip_comments = parser.skip_comments;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new Bayrell.Lang.Exceptions.ParserEOF(ctx)
		}
		var ch = Runtime.rs.charAt(ctx, content.ref, pos);
		var ch2 = Runtime.rs.substr(ctx, content.ref, pos, 2);
		while ((this.isSkipChar(ctx, ch) || this.isCommentOpen(ctx, ch2, skip_comments)) && pos < parser.content_sz)
		{
			if (this.isCommentOpen(ctx, ch2, skip_comments))
			{
				ch2 = Runtime.rs.substr(ctx, content.ref, pos, 2);
				while (!this.isCommentClose(ctx, ch2) && pos < parser.content_sz)
				{
					x = this.nextX(ctx, parser, ch, x);
					y = this.nextY(ctx, parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					ch = Runtime.rs.charAt(ctx, content.ref, pos);
					ch2 = Runtime.rs.substr(ctx, content.ref, pos, 2);
				}
				if (this.isCommentClose(ctx, ch2))
				{
					x = x + 2;
					pos = pos + 2;
				}
			}
			else
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= parser.content_sz)
			{
				break;
			}
			ch = Runtime.rs.charAt(ctx, content.ref, pos);
			ch2 = Runtime.rs.substr(ctx, content.ref, pos, 2);
		}
		return new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read special token
	 */
	readSpecialToken: function(ctx, parser, content, start_pos)
	{
		var pos = start_pos.pos;
		var s = "";
		s = Runtime.rs.substr(ctx, content.ref, pos, 10);
		if (s == "#endswitch")
		{
			return s;
		}
		s = Runtime.rs.substr(ctx, content.ref, pos, 7);
		if (s == "#ifcode" || s == "#switch")
		{
			return s;
		}
		s = Runtime.rs.substr(ctx, content.ref, pos, 6);
		if (s == "#endif" || s == "#ifdef")
		{
			return s;
		}
		s = Runtime.rs.substr(ctx, content.ref, pos, 5);
		if (s == "#case")
		{
			return s;
		}
		s = Runtime.rs.substr(ctx, content.ref, pos, 4);
		if (s == "@css")
		{
			return s;
		}
		s = Runtime.rs.substr(ctx, content.ref, pos, 3);
		if (s == "!==" || s == "===" || s == "#if")
		{
			return s;
		}
		s = Runtime.rs.substr(ctx, content.ref, pos, 2);
		if (s == "==" || s == "!=" || s == "<=" || s == ">=" || s == "=>" || s == "->" || s == "::" || s == "+=" || s == "-=" || s == "~=" || s == "**" || s == "<<" || s == ">>" || s == "++" || s == "--")
		{
			return s;
		}
		return "";
	},
	/**
	 * Read next token and return caret end
	 */
	nextToken: function(ctx, parser, content, start_pos)
	{
		var is_first = true;
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new Bayrell.Lang.Exceptions.ParserEOF(ctx)
		}
		var s = this.readSpecialToken(ctx, parser, content, start_pos);
		if (s != "")
		{
			var sz = Runtime.rs.strlen(ctx, s);
			for (var i = 0;i < sz;i++)
			{
				var ch = Runtime.rs.charAt(ctx, s, i);
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			return new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
		}
		var ch = Runtime.rs.charAt(ctx, content.ref, pos);
		if (!this.isTokenChar(ctx, ch))
		{
			x = this.nextX(ctx, parser, ch, x);
			y = this.nextY(ctx, parser, ch, y);
			pos = pos + 1;
		}
		else
		{
			while (this.isTokenChar(ctx, ch))
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = Runtime.rs.charAt(ctx, content.ref, pos);
			}
		}
		return new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read next token
	 */
	readToken: function(ctx, parser)
	{
		var caret_start = null;
		var caret_end = null;
		var eof = false;
		try
		{
			caret_start = this.skipChar(ctx, parser, parser.content, parser.caret.clone(ctx));
			caret_end = this.nextToken(ctx, parser, parser.content, caret_start);
		}
		catch (_ex)
		{
			if (_ex instanceof Bayrell.Lang.Exceptions.ParserEOF)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret.clone(ctx);
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		return Runtime.Collection.from([parser.copy(ctx, Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.CoreToken(ctx, Runtime.Dict.from({"content":Runtime.rs.substr(ctx, parser.content.ref, caret_start.pos, caret_end.pos - caret_start.pos),"caret_start":caret_start,"caret_end":caret_end,"eof":eof}))]);
	},
	/**
	 * Look next token
	 */
	lookToken: function(ctx, parser, token)
	{
		var token_content = "";
		var content = parser.content;
		var caret_start = null;
		var caret_end = null;
		var sz = Runtime.rs.strlen(ctx, token);
		var eof = false;
		var find = false;
		try
		{
			caret_start = this.skipChar(ctx, parser, content, parser.caret.clone(ctx));
			var pos = caret_start.pos;
			var x = caret_start.x;
			var y = caret_start.y;
			token_content = Runtime.rs.substr(ctx, content.ref, pos, sz);
			if (token_content == token)
			{
				find = true;
			}
			var res = this.next(ctx, parser, token_content, x, y, pos);
			x = res[0];
			y = res[1];
			pos = res[2];
			caret_end = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
		}
		catch (_ex)
		{
			if (_ex instanceof Bayrell.Lang.Exceptions.ParserEOF)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret.clone(ctx);
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		return Runtime.Collection.from([parser.copy(ctx, Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.CoreToken(ctx, Runtime.Dict.from({"content":token_content,"caret_start":caret_start,"caret_end":caret_end,"eof":eof})),find]);
	},
	/**
	 * Match next token
	 */
	matchToken: function(ctx, parser, next_token)
	{
		var token = null;
		/* Look token */
		var res = this.lookToken(ctx, parser, next_token);
		parser = res[0];
		token = res[1];
		var find = res[2];
		if (!find)
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, next_token, token.caret_start.clone(ctx), parser.file_name)
		}
		return Runtime.Collection.from([parser,token]);
	},
	/**
	 * Match next string
	 */
	matchString: function(ctx, parser, str1)
	{
		var caret = parser.caret.clone(ctx);
		var sz = Runtime.rs.strlen(ctx, str1);
		var str2 = Runtime.rs.substr(ctx, parser.content.ref, caret.pos, sz);
		if (str1 != str2)
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, str1, caret, parser.file_name)
		}
		var res = this.next(ctx, parser, str1, caret.x, caret.y, caret.pos);
		caret = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":res[0],"y":res[1],"pos":res[2]}));
		parser = parser.copy(ctx, { "caret": caret });
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read number
	 */
	readNumber: function(ctx, parser)
	{
		var token = null;
		var start = parser.clone(ctx);
		/* Read token */
		var res = this.readToken(ctx, parser);
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		if (token.content == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Number", caret_start, parser.file_name)
		}
		if (!this.isStringOfNumbers(ctx, token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Number", caret_start, parser.file_name)
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpNumber(ctx, Runtime.Dict.from({"value":token.content,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read string
	 */
	readUntilStringArr: function(ctx, parser, arr, flag_include)
	{
		if (flag_include == undefined) flag_include = true;
		var token = null;
		var look = null;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		/* Search next string in arr */
		var search = (ctx, pos) => 
		{
			for (var i = 0;i < arr.count(ctx);i++)
			{
				var item = arr.item(ctx, i);
				var sz = Runtime.rs.strlen(ctx, item);
				var str = Runtime.rs.substr(ctx, content.ref, pos, sz);
				if (str == item)
				{
					return i;
				}
			}
			return -1;
		};
		/* Start and end positionss */
		var start_pos = pos;
		var end_pos = pos;
		/* Read string value */
		var ch = "";
		var arr_pos = search(ctx, pos);
		while (pos < content_sz && arr_pos == -1)
		{
			ch = Runtime.rs.charAt(ctx, content.ref, pos);
			x = this.nextX(ctx, parser, ch, x);
			y = this.nextY(ctx, parser, ch, y);
			pos = pos + 1;
			if (pos >= content_sz)
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, Runtime.rs.join(ctx, ",", arr), new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			arr_pos = search(ctx, pos);
		}
		if (arr_pos == -1)
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "End of string", new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		if (!flag_include)
		{
			end_pos = pos;
		}
		else
		{
			var item = arr.item(ctx, arr_pos);
			var sz = Runtime.rs.strlen(ctx, item);
			for (var i = 0;i < sz;i++)
			{
				ch = Runtime.rs.charAt(ctx, content.ref, pos);
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			end_pos = pos;
		}
		/* Return result */
		var caret_end = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":end_pos}));
		return Runtime.Collection.from([parser.copy(ctx, Runtime.Dict.from({"caret":caret_end})),Runtime.rs.substr(ctx, content.ref, start_pos, end_pos - start_pos)]);
	},
	/**
	 * Read string
	 */
	readString: function(ctx, parser)
	{
		var token = null;
		var look = null;
		/* Read token */
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var str_char = token.content;
		/* Read begin string char */
		if (str_char != "'" && str_char != "\"")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "String", caret_start, parser.file_name)
		}
		var content = look.content;
		var content_sz = look.content_sz;
		var pos = look.caret.pos;
		var x = look.caret.x;
		var y = look.caret.y;
		/* Read string value */
		var value_str = "";
		var ch = Runtime.rs.charAt(ctx, content.ref, pos);
		while (pos < content_sz && ch != str_char)
		{
			if (ch == "\\")
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= content_sz)
				{
					throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "End of string", new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
				}
				var ch2 = Runtime.rs.charAt(ctx, content.ref, pos);
				if (ch2 == "n")
				{
					value_str += Runtime.rtl.toStr("\n");
				}
				else if (ch2 == "r")
				{
					value_str += Runtime.rtl.toStr("\r");
				}
				else if (ch2 == "t")
				{
					value_str += Runtime.rtl.toStr("\t");
				}
				else if (ch2 == "\\")
				{
					value_str += Runtime.rtl.toStr("\\");
				}
				else if (ch2 == "'")
				{
					value_str += Runtime.rtl.toStr("'");
				}
				else if (ch2 == "\"")
				{
					value_str += Runtime.rtl.toStr("\"");
				}
				x = this.nextX(ctx, parser, ch2, x);
				y = this.nextY(ctx, parser, ch2, y);
				pos = pos + 1;
			}
			else
			{
				value_str += Runtime.rtl.toStr(ch);
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= content_sz)
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "End of string", new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			ch = Runtime.rs.charAt(ctx, content.ref, pos);
		}
		/* Read end string char */
		if (ch != "'" && ch != "\"")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "End of string", new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		x = this.nextX(ctx, parser, ch, x);
		y = this.nextY(ctx, parser, ch, y);
		pos = pos + 1;
		/* Return result */
		var caret_end = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		return Runtime.Collection.from([parser.copy(ctx, Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.OpCodes.OpString(ctx, Runtime.Dict.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
	},
	/**
	 * Read comment
	 */
	readComment: function(ctx, parser)
	{
		var start = parser.clone(ctx);
		var token = null;
		var look = null;
		parser = parser.copy(ctx, { "skip_comments": false });
		var res = Bayrell.Lang.LangBay.ParserBayBase.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		parser = parser.copy(ctx, { "skip_comments": true });
		if (token.content == "/")
		{
			parser = look.clone(ctx);
			var content = look.content;
			var content_sz = look.content_sz;
			var pos = look.caret.pos;
			var x = look.caret.x;
			var y = look.caret.y;
			var pos_start = pos;
			var ch = Runtime.rs.charAt(ctx, content.ref, pos);
			var ch2 = Runtime.rs.substr(ctx, content.ref, pos, 2);
			while (!this.isCommentClose(ctx, ch2) && pos < content_sz)
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = Runtime.rs.charAt(ctx, content.ref, pos);
				ch2 = Runtime.rs.substr(ctx, content.ref, pos, 2);
			}
			var pos_end = pos;
			if (this.isCommentClose(ctx, ch2))
			{
				x = x + 2;
				pos = pos + 2;
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "End of comment", new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), start.file_name)
			}
			/* Return result */
			var value_str = Runtime.rs.substr(ctx, content.ref, pos_start + 1, pos_end - pos_start - 1);
			var caret_end = new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
			return Runtime.Collection.from([start.copy(ctx, Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.OpCodes.OpComment(ctx, Runtime.Dict.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		}
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read identifier
	 */
	readIdentifier: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var start = parser.clone(ctx);
		var token = null;
		var look = null;
		var name = "";
		var res = Bayrell.Lang.LangBay.ParserBayBase.readToken(ctx, parser);
		parser = res[0];
		token = res[1];
		if (token.content == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Identifier", token.caret_start.clone(ctx), parser.file_name)
		}
		if (!this.isIdentifier(ctx, token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Identifier", token.caret_start.clone(ctx), parser.file_name)
		}
		if (this.isReserved(ctx, token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Identifier " + Runtime.rtl.toStr(token.content) + Runtime.rtl.toStr(" is reserverd"), token.caret_start.clone(ctx), parser.file_name)
		}
		name = token.content;
		var kind = this.findIdentifier(ctx, parser, name, token.caret_start);
		if (parser.find_ident && find_ident && kind == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserError(ctx, "Unknown identifier '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("'"), token.caret_start, parser.file_name)
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpIdentifier(ctx, Runtime.Dict.from({"kind":kind,"value":name,"caret_start":token.caret_start.clone(ctx),"caret_end":token.caret_end.clone(ctx)}))]);
	},
	/**
	 * Read entity name
	 */
	readEntityName: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var ident = null;
		var names = new Runtime.Vector(ctx);
		var res = parser.parser_base.constructor.readIdentifier(ctx, parser, find_ident);
		parser = res[0];
		ident = res[1];
		var caret_start = ident.caret_start.clone(ctx);
		var name = ident.value;
		names.push(ctx, name);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == ".")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, ".");
			parser = res[0];
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = res[0];
			ident = res[1];
			name = ident.value;
			names.push(ctx, name);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpEntityName(ctx, Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret.clone(ctx),"names":names.toCollection(ctx)}))]);
	},
	/**
	 * Read type identifier
	 */
	readTypeIdentifier: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var start = parser.clone(ctx);
		var look = null;
		var token = null;
		var op_code = null;
		var entity_name = null;
		var template = null;
		var res = this.readEntityName(ctx, parser, find_ident);
		parser = res[0];
		entity_name = res[1];
		var caret_start = entity_name.caret_start.clone(ctx);
		var flag_open_caret = false;
		var flag_end_caret = false;
		var res = this.lookToken(ctx, parser.clone(ctx), "<");
		look = res[0];
		token = res[1];
		flag_open_caret = res[2];
		if (flag_open_caret)
		{
			template = new Runtime.Vector(ctx);
			var res = this.matchToken(ctx, parser, "<");
			parser = res[0];
			var res = this.lookToken(ctx, parser.clone(ctx), ">");
			look = res[0];
			token = res[1];
			flag_end_caret = res[2];
			while (!token.eof && !flag_end_caret)
			{
				var parser_value = null;
				var res = this.readTypeIdentifier(ctx, parser);
				parser = res[0];
				parser_value = res[1];
				template.push(ctx, parser_value);
				var res = this.lookToken(ctx, parser.clone(ctx), ">");
				look = res[0];
				token = res[1];
				flag_end_caret = res[2];
				if (!flag_end_caret)
				{
					var res = this.matchToken(ctx, parser, ",");
					parser = res[0];
					var res = this.lookToken(ctx, parser.clone(ctx), ">");
					look = res[0];
					token = res[1];
					flag_end_caret = res[2];
				}
			}
			var res = this.matchToken(ctx, parser, ">");
			parser = res[0];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpTypeIdentifier(ctx, Runtime.Dict.from({"entity_name":entity_name,"template":(template) ? template.toCollection(ctx) : null,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read collection
	 */
	readCollection: function(ctx, parser)
	{
		var start = parser.clone(ctx);
		var look = null;
		var token = null;
		var values = new Runtime.Vector(ctx);
		var res = this.matchToken(ctx, parser, "[");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != "]")
		{
			var parser_value = null;
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			parser_value = res[1];
			values.push(ctx, parser_value);
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look.clone(ctx);
				var res = this.readToken(ctx, parser.clone(ctx));
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(ctx, parser, "]");
		parser = res[0];
		token = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpCollection(ctx, Runtime.Dict.from({"values":values.toCollection(ctx),"caret_start":caret_start,"caret_end":token.caret_end.clone(ctx)}))]);
	},
	/**
	 * Read collection
	 */
	readDict: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var values = new Runtime.Map(ctx);
		var res = this.matchToken(ctx, parser, "{");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != "}")
		{
			var parser_value = null;
			var res = this.readString(ctx, parser);
			parser = res[0];
			parser_value = res[1];
			var key = parser_value.value;
			var res = this.matchToken(ctx, parser, ":");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			parser_value = res[1];
			values.set(ctx, key, parser_value);
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look.clone(ctx);
				var res = this.readToken(ctx, parser.clone(ctx));
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(ctx, parser, "}");
		parser = res[0];
		token = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpDict(ctx, Runtime.Dict.from({"values":values.toDict(ctx),"caret_start":caret_start,"caret_end":token.caret_end.clone(ctx)}))]);
	},
	/**
	 * Read fixed
	 */
	readFixed: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var start = parser.clone(ctx);
		var flag_negative = false;
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Identifier", token.caret_start.clone(ctx), look.file_name)
		}
		/* Negative number */
		if (token.content == "-")
		{
			flag_negative = true;
			var res = this.readToken(ctx, look);
			look = res[0];
			token = res[1];
		}
		/* Read string */
		if (!flag_negative && (token.content == "'" || token.content == "\""))
		{
			return this.readString(ctx, parser);
		}
		/* Read Collection */
		if (!flag_negative && token.content == "[")
		{
			return this.readCollection(ctx, parser);
		}
		/* Read Dict */
		if (!flag_negative && token.content == "{")
		{
			return this.readDict(ctx, parser);
		}
		/* Read Number */
		if (this.isStringOfNumbers(ctx, token.content))
		{
			return Runtime.Collection.from([look,new Bayrell.Lang.OpCodes.OpNumber(ctx, Runtime.Dict.from({"value":token.content,"caret_start":token.caret_start.clone(ctx),"caret_end":look.caret.clone(ctx),"negative":flag_negative}))]);
		}
		return this.readIdentifier(ctx, parser, true);
	},
	/**
	 * Read call args
	 */
	readCallArgs: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var items = new Runtime.Vector(ctx);
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			var res = this.readDict(ctx, parser);
			parser = res[0];
			var d = res[1];
			items = Runtime.Collection.from([d]);
		}
		else if (token.content == "(")
		{
			var res = this.matchToken(ctx, parser, "(");
			parser = res[0];
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ")")
			{
				var parser_value = null;
				var res = parser.parser_expression.constructor.readExpression(ctx, parser);
				parser = res[0];
				parser_value = res[1].clone(ctx);
				items.push(ctx, parser_value);
				var res = this.readToken(ctx, parser.clone(ctx));
				look = res[0];
				token = res[1];
				if (token.content == ",")
				{
					parser = look.clone(ctx);
					var res = this.readToken(ctx, parser.clone(ctx));
					look = res[0];
					token = res[1];
				}
			}
			var res = this.matchToken(ctx, parser, ")");
			parser = res[0];
		}
		return Runtime.Collection.from([parser,items.toCollection(ctx)]);
	},
	/**
	 * Read new instance
	 */
	readNew: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var args = Runtime.Collection.from([]);
		var res = this.matchToken(ctx, parser, "new");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readTypeIdentifier(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var res = this.readToken(ctx, parser.clone(ctx));
		token = res[1];
		if (token.content == "(" || token.content == "{")
		{
			var res = this.readCallArgs(ctx, parser);
			parser = res[0];
			args = res[1];
		}
		else
		{
			this.matchToken(ctx, parser.clone(ctx), "(");
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpNew(ctx, Runtime.Dict.from({"args":args,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read method
	 */
	readMethod: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var parser_value = null;
		var value1 = null;
		var value2 = null;
		var res = this.matchToken(ctx, parser, "method");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readTypeIdentifier(ctx, parser);
		parser = res[0];
		value2 = res[1];
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var look_token = token.content;
		if (look_token != "." && look_token != "::")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "'.' or '::'", token.caret_start.clone(ctx), look.file_name)
		}
		var res = this.readIdentifier(ctx, look.clone(ctx));
		parser = res[0];
		value2 = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpMethod(ctx, Runtime.Dict.from({"value1":value1,"value2":value2,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read base item
	 */
	readBaseItem: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = look.caret.clone(ctx);
		if (token.content == "new")
		{
			var res = this.readNew(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "method")
		{
			var res = this.readMethod(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "classof")
		{
			var res = this.readClassOf(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "classref")
		{
			var res = this.readClassRef(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "(")
		{
			var save_parser = parser;
			parser = look;
			/* Try to read OpTypeConvert */
			try
			{
				var res = this.readTypeIdentifier(ctx, parser);
				parser = res[0];
				var op_type = res[1];
				var res = this.readToken(ctx, parser);
				parser = res[0];
				token = res[1];
				if (token.content == ")")
				{
					var res = this.readDynamic(ctx, parser);
					parser = res[0];
					op_code = res[1];
					return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpTypeConvert(ctx, Runtime.Dict.from({"pattern":op_type,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
				}
			}
			catch (_ex)
			{
				if (_ex instanceof Bayrell.Lang.Exceptions.ParserError)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
			/* Read Expression */
			var res = this.matchToken(ctx, save_parser, "(");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			op_code = res[1];
			var res = this.matchToken(ctx, parser, ")");
			parser = res[0];
		}
		else
		{
			var res = this.readFixed(ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read classof
	 */
	readClassOf: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(ctx, parser, "classof");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = this.readEntityName(ctx, parser);
		parser = res[0];
		op_code = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpClassOf(ctx, Runtime.Dict.from({"entity_name":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read classref
	 */
	readClassRef: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(ctx, parser, "classref");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_expression.constructor.readExpression(ctx, parser);
		parser = res[0];
		op_code = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpClassRef(ctx, Runtime.Dict.from({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read dynamic
	 */
	readDynamic: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var parser_items = null;
		var op_code = null;
		var op_code_first = null;
		var is_await = false;
		var is_context_call = true;
		var caret_start = null;
		var f_next = (ctx, s) => 
		{
			return s == "." || s == "::" || s == "{" || s == "[" || s == "(" || s == "@";
		};
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "await")
		{
			caret_start = token.caret_start.clone(ctx);
			is_await = true;
			parser = look.clone(ctx);
		}
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "@")
		{
			var res = this.readToken(ctx, look.clone(ctx));
			var look2 = res[0];
			var token2 = res[1];
			if (!f_next(ctx, token2.content))
			{
				if (this.isIdentifier(ctx, token2.content))
				{
					parser = look.clone(ctx);
					is_context_call = false;
				}
			}
		}
		var res = this.readBaseItem(ctx, parser);
		parser = res[0];
		op_code = res[1];
		op_code_first = op_code;
		if (caret_start == null)
		{
			caret_start = op_code.caret_start.clone(ctx);
		}
		if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT || op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_FUNCTION)
		{
			is_context_call = false;
		}
		var res = this.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (f_next(ctx, token.content))
		{
			if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
			{
				if (op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_FUNCTION && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_MODULE && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT)
				{
					throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Module or variable '" + Runtime.rtl.toStr(op_code.value) + Runtime.rtl.toStr("'"), op_code.caret_start.clone(ctx), parser.file_name)
				}
			}
			else if (op_code instanceof Bayrell.Lang.OpCodes.OpNew)
			{
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Module or variable", op_code.caret_start.clone(ctx), parser.file_name)
			}
		}
		while (!token.eof && f_next(ctx, token.content))
		{
			var token_content = token.content;
			/* Static call */
			if (token_content == "(" || token_content == "{" || token_content == "@")
			{
				if (token_content == "@")
				{
					parser = look.clone(ctx);
					is_context_call = false;
				}
				var res = this.readCallArgs(ctx, parser);
				parser = res[0];
				parser_items = res[1];
				op_code = new Bayrell.Lang.OpCodes.OpCall(ctx, Runtime.Dict.from({"obj":op_code,"args":parser_items,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx),"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "." || token_content == "::" || token_content == "[")
			{
				var kind = "";
				var look_value = null;
				parser = look.clone(ctx);
				is_context_call = true;
				if (token_content == ".")
				{
					kind = Bayrell.Lang.OpCodes.OpAttr.KIND_ATTR;
				}
				else if (token_content == "::")
				{
					kind = Bayrell.Lang.OpCodes.OpAttr.KIND_STATIC;
				}
				else if (token_content == "[")
				{
					kind = Bayrell.Lang.OpCodes.OpAttr.KIND_DYNAMIC;
				}
				if (token_content == "[")
				{
					var res = parser.parser_expression.constructor.readExpression(ctx, parser);
					parser = res[0];
					look_value = res[1];
					var res = this.matchToken(ctx, parser, "]");
					parser = res[0];
				}
				else
				{
					var res = this.readToken(ctx, parser.clone(ctx));
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone(ctx);
						is_context_call = false;
					}
					var res = this.readIdentifier(ctx, parser);
					parser = res[0];
					look_value = res[1];
				}
				op_code = new Bayrell.Lang.OpCodes.OpAttr(ctx, Runtime.Dict.from({"kind":kind,"obj":op_code,"value":look_value,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Next attr", token.caret_start.clone(ctx), parser.file_name)
			}
			var res = this.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr && op_code.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_PIPE && token.content != "(" && token.content != "{")
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(ctx, "Call", token.caret_start.clone(ctx), parser.file_name)
			}
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayBase";
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
			"class_name": "Bayrell.Lang.LangBay.ParserBayBase",
			"name": "Bayrell.Lang.LangBay.ParserBayBase",
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
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayBase);