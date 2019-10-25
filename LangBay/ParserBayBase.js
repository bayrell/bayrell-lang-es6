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
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayBase = function(__ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayBase.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayBase)
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
	isChar: function(__ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos(__ctx, "qazwsxedcrfvtgbyhnujmikolp", Runtime.rs.strtolower(__ctx, ch)) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	isNumber: function(__ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos(__ctx, "0123456789", ch) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isHexChar: function(__ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos(__ctx, "0123456789abcdef", Runtime.rs.strtolower(__ctx, ch)) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	isStringOfNumbers: function(__ctx, s)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var sz = Runtime.rs.strlen(__ctx, s);
		for (var i = 0;i < sz;i++)
		{
			if (!this.isNumber(__ctx, Runtime.rs.charAt(__ctx, s, i)))
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
	isSystemType: function(__ctx, name)
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
	isIdentifier: function(__ctx, name)
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
		if (this.isNumber(__ctx, Runtime.rs.charAt(__ctx, name, 0)))
		{
			var __memorize_value = false;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var sz = Runtime.rs.strlen(__ctx, name);
		for (var i = 0;i < sz;i++)
		{
			var ch = Runtime.rs.charAt(__ctx, name, i);
			if (this.isChar(__ctx, ch) || this.isNumber(__ctx, ch) || ch == "_")
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
	isReserved: function(__ctx, name)
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
		if (name == "__ctx")
		{
			var __memorize_value = true;
			Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		if (Runtime.rs.substr(__ctx, name, 0, 3) == "__v")
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
	findIdentifier: function(__ctx, parser, name, caret)
	{
		var kind = "";
		if (parser.vars.has(__ctx, name))
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE;
		}
		else if (parser.uses.has(__ctx, name))
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_MODULE;
		}
		else if (this.isSystemType(__ctx, name))
		{
			kind = Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE;
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
		else if (parser.find_ident)
		{
			throw new Bayrell.Lang.Exceptions.ParserError(__ctx, "Unknown identifier '" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("'"), caret, parser.file_name)
		}
		return kind;
	},
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar: function(__ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		var __memorize_value = Runtime.rs.strpos(__ctx, "qazwsxedcrfvtgbyhnujmikolp0123456789_", Runtime.rs.strtolower(__ctx, ch)) !== -1;
		Runtime.rtl._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar: function(__ctx, ch)
	{
		var __memorize_value = Runtime.rtl._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments);
		if (__memorize_value != Runtime.rtl._memorize_not_found) return __memorize_value;
		if (Runtime.rs.ord(__ctx, ch) <= 32)
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
	nextX: function(__ctx, parser, ch, pos)
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
	nextY: function(__ctx, parser, ch, pos)
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
	next: function(__ctx, parser, s, x, y, pos)
	{
		var sz = Runtime.rs.strlen(__ctx, s);
		for (var i = 0;i < sz;i++)
		{
			var ch = Runtime.rs.substr(__ctx, s, i, 1);
			x = this.nextX(__ctx, parser, ch, x);
			y = this.nextY(__ctx, parser, ch, y);
			pos = pos + 1;
		}
		return Runtime.Collection.from([x,y,pos]);
	},
	/**
	 * Open comment
	 */
	isCommentOpen: function(__ctx, str, skip_comments)
	{
		return skip_comments && str == "/*";
	},
	/**
	 * Close comment
	 */
	isCommentClose: function(__ctx, str)
	{
		return str == "*/";
	},
	/**
	 * Skip char
	 */
	skipChar: function(__ctx, parser, content, start_pos)
	{
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		var skip_comments = parser.skip_comments;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new Bayrell.Lang.Exceptions.ParserEOF(__ctx)
		}
		var ch = Runtime.rs.charAt(__ctx, content.ref, pos);
		var ch2 = Runtime.rs.substr(__ctx, content.ref, pos, 2);
		while ((this.isSkipChar(__ctx, ch) || this.isCommentOpen(__ctx, ch2, skip_comments)) && pos < parser.content_sz)
		{
			if (this.isCommentOpen(__ctx, ch2, skip_comments))
			{
				ch2 = Runtime.rs.substr(__ctx, content.ref, pos, 2);
				while (!this.isCommentClose(__ctx, ch2) && pos < parser.content_sz)
				{
					x = this.nextX(__ctx, parser, ch, x);
					y = this.nextY(__ctx, parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					ch = Runtime.rs.charAt(__ctx, content.ref, pos);
					ch2 = Runtime.rs.substr(__ctx, content.ref, pos, 2);
				}
				if (this.isCommentClose(__ctx, ch2))
				{
					x = x + 2;
					pos = pos + 2;
				}
			}
			else
			{
				x = this.nextX(__ctx, parser, ch, x);
				y = this.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= parser.content_sz)
			{
				break;
			}
			ch = Runtime.rs.charAt(__ctx, content.ref, pos);
			ch2 = Runtime.rs.substr(__ctx, content.ref, pos, 2);
		}
		return new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read special token
	 */
	readSpecialToken: function(__ctx, parser, content, start_pos)
	{
		var pos = start_pos.pos;
		var s = "";
		s = Runtime.rs.substr(__ctx, content.ref, pos, 10);
		if (s == "#endswitch")
		{
			return s;
		}
		s = Runtime.rs.substr(__ctx, content.ref, pos, 7);
		if (s == "#ifcode" || s == "#switch")
		{
			return s;
		}
		s = Runtime.rs.substr(__ctx, content.ref, pos, 6);
		if (s == "#endif")
		{
			return s;
		}
		s = Runtime.rs.substr(__ctx, content.ref, pos, 5);
		if (s == "#case")
		{
			return s;
		}
		s = Runtime.rs.substr(__ctx, content.ref, pos, 4);
		if (s == "@css")
		{
			return s;
		}
		s = Runtime.rs.substr(__ctx, content.ref, pos, 3);
		if (s == "!==" || s == "===" || s == "#if")
		{
			return s;
		}
		s = Runtime.rs.substr(__ctx, content.ref, pos, 2);
		if (s == "==" || s == "!=" || s == "<=" || s == ">=" || s == "=>" || s == "|>" || s == "->" || s == "::" || s == "+=" || s == "-=" || s == "~=" || s == "**" || s == "<<" || s == ">>" || s == "++" || s == "--")
		{
			return s;
		}
		return "";
	},
	/**
	 * Read next token and return caret end
	 */
	nextToken: function(__ctx, parser, content, start_pos)
	{
		var is_first = true;
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new Bayrell.Lang.Exceptions.ParserEOF(__ctx)
		}
		var s = this.readSpecialToken(__ctx, parser, content, start_pos);
		if (s != "")
		{
			var sz = Runtime.rs.strlen(__ctx, s);
			for (var i = 0;i < sz;i++)
			{
				var ch = Runtime.rs.charAt(__ctx, s, i);
				x = this.nextX(__ctx, parser, ch, x);
				y = this.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
			}
			return new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
		}
		var ch = Runtime.rs.charAt(__ctx, content.ref, pos);
		if (!this.isTokenChar(__ctx, ch))
		{
			x = this.nextX(__ctx, parser, ch, x);
			y = this.nextY(__ctx, parser, ch, y);
			pos = pos + 1;
		}
		else
		{
			while (this.isTokenChar(__ctx, ch))
			{
				x = this.nextX(__ctx, parser, ch, x);
				y = this.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = Runtime.rs.charAt(__ctx, content.ref, pos);
			}
		}
		return new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read next token
	 */
	readToken: function(__ctx, parser)
	{
		var caret_start = null;
		var caret_end = null;
		var eof = false;
		try
		{
			caret_start = this.skipChar(__ctx, parser, parser.content, parser.caret.clone(__ctx));
			caret_end = this.nextToken(__ctx, parser, parser.content, caret_start);
		}
		catch (_ex)
		{
			if (_ex instanceof Bayrell.Lang.Exceptions.ParserEOF)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret.clone(__ctx);
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
		return Runtime.Collection.from([parser.copy(__ctx, Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.CoreToken(__ctx, Runtime.Dict.from({"content":Runtime.rs.substr(__ctx, parser.content.ref, caret_start.pos, caret_end.pos - caret_start.pos),"caret_start":caret_start,"caret_end":caret_end,"eof":eof}))]);
	},
	/**
	 * Match next token
	 */
	matchToken: function(__ctx, parser, next_token)
	{
		var token = null;
		/* Read token */
		var res = this.readToken(__ctx, parser);
		parser = res[0];
		token = res[1];
		if (next_token != token.content)
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, next_token, token.caret_start.clone(__ctx), parser.file_name)
		}
		return Runtime.Collection.from([parser,token]);
	},
	/**
	 * Match next string
	 */
	matchString: function(__ctx, parser, str1)
	{
		var caret = parser.caret.clone(__ctx);
		var sz = Runtime.rs.strlen(__ctx, str1);
		var str2 = Runtime.rs.substr(__ctx, parser.content.ref, caret.pos, sz);
		if (str1 != str2)
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, str1, caret, parser.file_name)
		}
		var res = this.next(__ctx, parser, str1, caret.x, caret.y, caret.pos);
		caret = new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":res[0],"y":res[1],"pos":res[2]}));
		parser = parser.copy(__ctx, { "caret": caret });
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read number
	 */
	readNumber: function(__ctx, parser)
	{
		var token = null;
		var start = parser.clone(__ctx);
		/* Read token */
		var res = this.readToken(__ctx, parser);
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		if (token.content == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Number", caret_start, parser.file_name)
		}
		if (!this.isStringOfNumbers(__ctx, token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Number", caret_start, parser.file_name)
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpNumber(__ctx, Runtime.Dict.from({"value":token.content,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read string
	 */
	readUntilStringArr: function(__ctx, parser, arr, flag_include)
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
		var search = (__ctx, pos) => 
		{
			for (var i = 0;i < arr.count(__ctx);i++)
			{
				var item = arr.item(__ctx, i);
				var sz = Runtime.rs.strlen(__ctx, item);
				var str = Runtime.rs.substr(__ctx, content.ref, pos, sz);
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
		var arr_pos = search(__ctx, pos);
		while (pos < content_sz && arr_pos == -1)
		{
			ch = Runtime.rs.charAt(__ctx, content.ref, pos);
			x = this.nextX(__ctx, parser, ch, x);
			y = this.nextY(__ctx, parser, ch, y);
			pos = pos + 1;
			if (pos >= content_sz)
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, Runtime.rs.join(__ctx, ",", arr), new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			arr_pos = search(__ctx, pos);
		}
		if (arr_pos == -1)
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "End of string", new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		if (!flag_include)
		{
			end_pos = pos;
		}
		else
		{
			var item = arr.item(__ctx, arr_pos);
			var sz = Runtime.rs.strlen(__ctx, item);
			for (var i = 0;i < sz;i++)
			{
				ch = Runtime.rs.charAt(__ctx, content.ref, pos);
				x = this.nextX(__ctx, parser, ch, x);
				y = this.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
			}
			end_pos = pos;
		}
		/* Return result */
		var caret_end = new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":x,"y":y,"pos":end_pos}));
		return Runtime.Collection.from([parser.copy(__ctx, Runtime.Dict.from({"caret":caret_end})),Runtime.rs.substr(__ctx, content.ref, start_pos, end_pos - start_pos)]);
	},
	/**
	 * Read string
	 */
	readString: function(__ctx, parser)
	{
		var token = null;
		var look = null;
		/* Read token */
		var res = this.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var str_char = token.content;
		/* Read begin string char */
		if (str_char != "'" && str_char != "\"")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "String", caret_start, parser.file_name)
		}
		var content = look.content;
		var content_sz = look.content_sz;
		var pos = look.caret.pos;
		var x = look.caret.x;
		var y = look.caret.y;
		/* Read string value */
		var value_str = "";
		var ch = Runtime.rs.charAt(__ctx, content.ref, pos);
		while (pos < content_sz && ch != str_char)
		{
			if (ch == "\\")
			{
				x = this.nextX(__ctx, parser, ch, x);
				y = this.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= content_sz)
				{
					throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "End of string", new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
				}
				var ch2 = Runtime.rs.charAt(__ctx, content.ref, pos);
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
				x = this.nextX(__ctx, parser, ch2, x);
				y = this.nextY(__ctx, parser, ch2, y);
				pos = pos + 1;
			}
			else
			{
				value_str += Runtime.rtl.toStr(ch);
				x = this.nextX(__ctx, parser, ch, x);
				y = this.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= content_sz)
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "End of string", new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			ch = Runtime.rs.charAt(__ctx, content.ref, pos);
		}
		/* Read end string char */
		if (ch != "'" && ch != "\"")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "End of string", new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		x = this.nextX(__ctx, parser, ch, x);
		y = this.nextY(__ctx, parser, ch, y);
		pos = pos + 1;
		/* Return result */
		var caret_end = new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
		return Runtime.Collection.from([parser.copy(__ctx, Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.OpCodes.OpString(__ctx, Runtime.Dict.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
	},
	/**
	 * Read comment
	 */
	readComment: function(__ctx, parser)
	{
		var start = parser.clone(__ctx);
		var token = null;
		var look = null;
		parser = parser.copy(__ctx, { "skip_comments": false });
		var res = Bayrell.Lang.LangBay.ParserBayBase.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		parser = parser.copy(__ctx, { "skip_comments": true });
		if (token.content == "/")
		{
			parser = look.clone(__ctx);
			var content = look.content;
			var content_sz = look.content_sz;
			var pos = look.caret.pos;
			var x = look.caret.x;
			var y = look.caret.y;
			var pos_start = pos;
			var ch = Runtime.rs.charAt(__ctx, content.ref, pos);
			var ch2 = Runtime.rs.substr(__ctx, content.ref, pos, 2);
			while (!this.isCommentClose(__ctx, ch2) && pos < content_sz)
			{
				x = this.nextX(__ctx, parser, ch, x);
				y = this.nextY(__ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = Runtime.rs.charAt(__ctx, content.ref, pos);
				ch2 = Runtime.rs.substr(__ctx, content.ref, pos, 2);
			}
			var pos_end = pos;
			if (this.isCommentClose(__ctx, ch2))
			{
				x = x + 2;
				pos = pos + 2;
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "End of comment", new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos})), start.file_name)
			}
			/* Return result */
			var value_str = Runtime.rs.substr(__ctx, content.ref, pos_start + 1, pos_end - pos_start - 1);
			var caret_end = new Bayrell.Lang.Caret(__ctx, Runtime.Dict.from({"x":x,"y":y,"pos":pos}));
			return Runtime.Collection.from([start.copy(__ctx, Runtime.Dict.from({"caret":caret_end})),new Bayrell.Lang.OpCodes.OpComment(__ctx, Runtime.Dict.from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		}
		return Runtime.Collection.from([parser,null]);
	},
	/**
	 * Read identifier
	 */
	readIdentifier: function(__ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var start = parser.clone(__ctx);
		var token = null;
		var look = null;
		var name = "";
		var res = Bayrell.Lang.LangBay.ParserBayBase.readToken(__ctx, parser);
		parser = res[0];
		token = res[1];
		if (token.content == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Identifier", token.caret_start.clone(__ctx), parser.file_name)
		}
		if (!this.isIdentifier(__ctx, token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Identifier", token.caret_start.clone(__ctx), parser.file_name)
		}
		if (this.isReserved(__ctx, token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Identifier " + Runtime.rtl.toStr(token.content) + Runtime.rtl.toStr(" is reserverd"), token.caret_start.clone(__ctx), parser.file_name)
		}
		name = token.content;
		var kind = "";
		if (find_ident)
		{
			kind = this.findIdentifier(__ctx, parser, name, token.caret_start.clone(__ctx));
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpIdentifier(__ctx, Runtime.Dict.from({"kind":kind,"value":name,"caret_start":token.caret_start.clone(__ctx),"caret_end":token.caret_end.clone(__ctx)}))]);
	},
	/**
	 * Read entity name
	 */
	readEntityName: function(__ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var ident = null;
		var names = new Runtime.Vector(__ctx);
		var res = parser.parser_base.constructor.readIdentifier(__ctx, parser, find_ident);
		parser = res[0];
		ident = res[1];
		var caret_start = ident.caret_start.clone(__ctx);
		var name = ident.value;
		names.push(__ctx, name);
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == ".")
		{
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, ".");
			parser = res[0];
			var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
			parser = res[0];
			ident = res[1];
			name = ident.value;
			names.push(__ctx, name);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpEntityName(__ctx, Runtime.Dict.from({"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx),"names":names.toCollection(__ctx)}))]);
	},
	/**
	 * Read type identifier
	 */
	readTypeIdentifier: function(__ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var start = parser.clone(__ctx);
		var look = null;
		var token = null;
		var op_code = null;
		var entity_name = null;
		var template = null;
		var res = this.readEntityName(__ctx, parser, find_ident);
		parser = res[0];
		entity_name = res[1];
		var caret_start = entity_name.caret_start.clone(__ctx);
		var res = this.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "<")
		{
			template = new Runtime.Vector(__ctx);
			var res = this.matchToken(__ctx, parser, "<");
			parser = res[0];
			var res = this.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ">")
			{
				var parser_value = null;
				var res = this.readTypeIdentifier(__ctx, parser);
				parser = res[0];
				parser_value = res[1];
				template.push(__ctx, parser_value);
				var res = this.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
				if (token.content != ">")
				{
					var res = this.matchToken(__ctx, parser, ",");
					parser = res[0];
					var res = this.readToken(__ctx, parser.clone(__ctx));
					look = res[0];
					token = res[1];
				}
			}
			var res = this.matchToken(__ctx, parser, ">");
			parser = res[0];
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpTypeIdentifier(__ctx, Runtime.Dict.from({"entity_name":entity_name,"template":(template) ? template.toCollection(__ctx) : null,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read collection
	 */
	readCollection: function(__ctx, parser)
	{
		var start = parser.clone(__ctx);
		var look = null;
		var token = null;
		var values = new Runtime.Vector(__ctx);
		var res = this.matchToken(__ctx, parser, "[");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = this.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != "]")
		{
			var parser_value = null;
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			parser_value = res[1];
			values.push(__ctx, parser_value);
			var res = this.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look.clone(__ctx);
				var res = this.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(__ctx, parser, "]");
		parser = res[0];
		token = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpCollection(__ctx, Runtime.Dict.from({"values":values.toCollection(__ctx),"caret_start":caret_start,"caret_end":token.caret_end.clone(__ctx)}))]);
	},
	/**
	 * Read collection
	 */
	readDict: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var values = new Runtime.Map(__ctx);
		var res = this.matchToken(__ctx, parser, "{");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = this.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != "}")
		{
			var parser_value = null;
			var res = this.readString(__ctx, parser);
			parser = res[0];
			parser_value = res[1];
			var key = parser_value.value;
			var res = this.matchToken(__ctx, parser, ":");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			parser_value = res[1];
			values.set(__ctx, key, parser_value);
			var res = this.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look.clone(__ctx);
				var res = this.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(__ctx, parser, "}");
		parser = res[0];
		token = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpDict(__ctx, Runtime.Dict.from({"values":values.toDict(__ctx),"caret_start":caret_start,"caret_end":token.caret_end.clone(__ctx)}))]);
	},
	/**
	 * Read fixed
	 */
	readFixed: function(__ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var look = null;
		var token = null;
		var start = parser.clone(__ctx);
		var flag_negative = false;
		var res = this.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Identifier", token.caret_start.clone(__ctx), look.file_name)
		}
		/* Negative number */
		if (token.content == "-")
		{
			flag_negative = true;
			var res = this.readToken(__ctx, look);
			look = res[0];
			token = res[1];
		}
		/* Read string */
		if (!flag_negative && (token.content == "'" || token.content == "\""))
		{
			return this.readString(__ctx, parser);
		}
		/* Read Collection */
		if (!flag_negative && token.content == "[")
		{
			return this.readCollection(__ctx, parser);
		}
		/* Read Dict */
		if (!flag_negative && token.content == "{")
		{
			return this.readDict(__ctx, parser);
		}
		/* Read Number */
		if (this.isStringOfNumbers(__ctx, token.content))
		{
			return Runtime.Collection.from([look,new Bayrell.Lang.OpCodes.OpNumber(__ctx, Runtime.Dict.from({"value":token.content,"caret_start":token.caret_start.clone(__ctx),"caret_end":look.caret.clone(__ctx),"negative":flag_negative}))]);
		}
		/* Read Identifier */
		if (!this.isIdentifier(__ctx, token.content))
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Identifier", token.caret_start.clone(__ctx), look.file_name)
		}
		var kind = "";
		if (find_ident)
		{
			kind = this.findIdentifier(__ctx, parser, token.content, token.caret_start.clone(__ctx));
		}
		return Runtime.Collection.from([look,new Bayrell.Lang.OpCodes.OpIdentifier(__ctx, Runtime.Dict.from({"kind":kind,"value":token.content,"caret_start":token.caret_start.clone(__ctx),"caret_end":look.caret.clone(__ctx)}))]);
	},
	/**
	 * Read call args
	 */
	readCallArgs: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var items = new Runtime.Vector(__ctx);
		var res = this.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			var res = this.readDict(__ctx, parser);
			parser = res[0];
			var d = res[1];
			items = Runtime.Collection.from([d]);
		}
		else if (token.content == "(")
		{
			var res = this.matchToken(__ctx, parser, "(");
			parser = res[0];
			var res = this.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ")")
			{
				var parser_value = null;
				var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
				parser = res[0];
				parser_value = res[1].clone(__ctx);
				items.push(__ctx, parser_value);
				var res = this.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
				if (token.content == ",")
				{
					parser = look.clone(__ctx);
					var res = this.readToken(__ctx, parser.clone(__ctx));
					look = res[0];
					token = res[1];
				}
			}
			var res = this.matchToken(__ctx, parser, ")");
			parser = res[0];
		}
		return Runtime.Collection.from([parser,items.toCollection(__ctx)]);
	},
	/**
	 * Read new instance
	 */
	readNew: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var args = Runtime.Collection.from([]);
		var res = this.matchToken(__ctx, parser, "new");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = this.readTypeIdentifier(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var res = this.readToken(__ctx, parser.clone(__ctx));
		token = res[1];
		if (token.content == "(" || token.content == "{")
		{
			var res = this.readCallArgs(__ctx, parser);
			parser = res[0];
			args = res[1];
		}
		else
		{
			this.matchToken(__ctx, parser.clone(__ctx), "(");
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpNew(__ctx, Runtime.Dict.from({"args":args,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read method
	 */
	readMethod: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var parser_value = null;
		var value1 = null;
		var value2 = null;
		var res = this.matchToken(__ctx, parser, "method");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = this.readTypeIdentifier(__ctx, parser);
		parser = res[0];
		value2 = res[1];
		var res = this.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var look_token = token.content;
		if (look_token != "." && look_token != "::")
		{
			throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "'.' or '::'", token.caret_start.clone(__ctx), look.file_name)
		}
		var res = this.readIdentifier(__ctx, look.clone(__ctx));
		parser = res[0];
		value2 = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpMethod(__ctx, Runtime.Dict.from({"value1":value1,"value2":value2,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read dynamic
	 */
	readDynamic: function(__ctx, parser, op_code)
	{
		if (op_code == undefined) op_code = null;
		var look = null;
		var token = null;
		var parser_items = null;
		var op_code_first = null;
		var is_await = false;
		var is_context_call = true;
		var caret_start = null;
		var f_next = (__ctx, s) => 
		{
			return s == "." || s == "::" || s == "->" || s == "|>" || s == "{" || s == "[" || s == "(" || s == "@";
		};
		if (op_code == null)
		{
			var res = this.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == "await")
			{
				caret_start = token.caret_start.clone(__ctx);
				is_await = true;
				parser = look.clone(__ctx);
			}
			var res = this.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (token.content == "@")
			{
				var res = this.readToken(__ctx, look.clone(__ctx));
				var look2 = res[0];
				var token2 = res[1];
				if (!f_next(__ctx, token2.content))
				{
					if (this.isIdentifier(__ctx, token2.content))
					{
						parser = look.clone(__ctx);
						is_context_call = false;
					}
				}
			}
			var res = this.readFixed(__ctx, parser, true);
			parser = res[0];
			op_code = res[1];
		}
		op_code_first = op_code;
		if (caret_start == null)
		{
			caret_start = op_code.caret_start.clone(__ctx);
		}
		if (op_code.kind == Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT)
		{
			is_context_call = false;
		}
		var res = this.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (f_next(__ctx, token.content))
		{
			if (op_code instanceof Bayrell.Lang.OpCodes.OpIdentifier)
			{
				if (op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_SYS_TYPE && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_VARIABLE && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_MODULE && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_CLASSREF && op_code.kind != Bayrell.Lang.OpCodes.OpIdentifier.KIND_CONTEXT)
				{
					throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Module or variable '" + Runtime.rtl.toStr(op_code.value) + Runtime.rtl.toStr("'"), op_code.caret_start.clone(__ctx), parser.file_name)
				}
			}
			else if (op_code instanceof Bayrell.Lang.OpCodes.OpNew)
			{
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Module or variable", op_code.caret_start.clone(__ctx), parser.file_name)
			}
		}
		while (!token.eof && f_next(__ctx, token.content))
		{
			var token_content = token.content;
			/* Static call */
			if (token_content == "(" || token_content == "{" || token_content == "@")
			{
				if (token_content == "@")
				{
					parser = look.clone(__ctx);
					is_context_call = false;
				}
				var res = this.readCallArgs(__ctx, parser);
				parser = res[0];
				parser_items = res[1];
				op_code = new Bayrell.Lang.OpCodes.OpCall(__ctx, Runtime.Dict.from({"obj":op_code,"args":parser_items,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx),"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "->" || token_content == "|>")
			{
				var kind = "";
				var class_name = null;
				var method_name = null;
				parser = look.clone(__ctx);
				if (token_content == "->")
				{
					var res = this.readToken(__ctx, parser.clone(__ctx));
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone(__ctx);
						is_context_call = false;
					}
					var res = this.readIdentifier(__ctx, parser);
					parser = res[0];
					method_name = res[1];
					kind = Bayrell.Lang.OpCodes.OpPipe.KIND_METHOD;
				}
				else if (token_content == "|>")
				{
					var res = this.readTypeIdentifier(__ctx, parser);
					parser = res[0];
					class_name = res[1];
					var res = this.matchToken(__ctx, parser, "::");
					parser = res[0];
					var res = this.readToken(__ctx, parser.clone(__ctx));
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone(__ctx);
						is_context_call = false;
					}
					var res = this.readIdentifier(__ctx, parser);
					parser = res[0];
					method_name = res[1];
					kind = Bayrell.Lang.OpCodes.OpPipe.KIND_LAMBDA;
				}
				var res = this.readCallArgs(__ctx, parser);
				parser = res[0];
				var args = res[1];
				op_code = new Bayrell.Lang.OpCodes.OpPipe(__ctx, Runtime.Dict.from({"kind":kind,"obj":op_code,"args":args,"class_name":class_name,"method_name":method_name,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx),"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "." || token_content == "::" || token_content == "[")
			{
				var kind = "";
				var look_value = null;
				parser = look.clone(__ctx);
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
					var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
					parser = res[0];
					look_value = res[1];
					var res = this.matchToken(__ctx, parser, "]");
					parser = res[0];
				}
				else
				{
					var res = this.readToken(__ctx, parser.clone(__ctx));
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone(__ctx);
						is_context_call = false;
					}
					var res = this.readIdentifier(__ctx, parser);
					parser = res[0];
					look_value = res[1];
				}
				op_code = new Bayrell.Lang.OpCodes.OpAttr(__ctx, Runtime.Dict.from({"kind":kind,"obj":op_code,"value":look_value,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}));
			}
			else
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Next attr", token.caret_start.clone(__ctx), parser.file_name)
			}
			var res = this.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			if (op_code instanceof Bayrell.Lang.OpCodes.OpAttr && op_code.kind == Bayrell.Lang.OpCodes.OpAttr.KIND_PIPE && token.content != "(" && token.content != "{")
			{
				throw new Bayrell.Lang.Exceptions.ParserExpected(__ctx, "Call", token.caret_start.clone(__ctx), parser.file_name)
			}
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read base item
	 */
	readBaseItem: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var flag_dynamic = false;
		var res = this.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var caret_start = look.caret.clone(__ctx);
		if (token.content == "new")
		{
			var res = this.readNew(__ctx, parser);
			parser = res[0];
			op_code = res[1];
			flag_dynamic = true;
		}
		else if (token.content == "method")
		{
			var res = this.readMethod(__ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "classof")
		{
			var res = this.readClassOf(__ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "classref")
		{
			var res = this.readClassRef(__ctx, parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "(")
		{
			var save_parser = look.clone(__ctx);
			parser = look.clone(__ctx);
			/* Try to read OpTypeConvert */
			try
			{
				var res = this.readTypeIdentifier(__ctx, parser);
				parser = res[0];
				var op_type = res[1];
				var res = this.readToken(__ctx, parser);
				parser = res[0];
				token = res[1];
				if (token.content == ")")
				{
					var res = this.readBaseItem(__ctx, parser);
					parser = res[0];
					op_code = res[1];
					return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpTypeConvert(__ctx, Runtime.Dict.from({"pattern":op_type,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
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
			parser = save_parser.clone(__ctx);
			var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
			parser = res[0];
			op_code = res[1];
			var res = this.matchToken(__ctx, parser, ")");
			parser = res[0];
			flag_dynamic = true;
		}
		else
		{
			flag_dynamic = true;
		}
		if (flag_dynamic)
		{
			var res = this.readDynamic(__ctx, parser, op_code);
			parser = res[0];
			op_code = res[1];
		}
		return Runtime.Collection.from([parser,op_code]);
	},
	/**
	 * Read classof
	 */
	readClassOf: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(__ctx, parser, "classof");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = this.readEntityName(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpClassOf(__ctx, Runtime.Dict.from({"entity_name":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read classref
	 */
	readClassRef: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(__ctx, parser, "classref");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_expression.constructor.readExpression(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpClassRef(__ctx, Runtime.Dict.from({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
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
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayBase",
			"name": "Bayrell.Lang.LangBay.ParserBayBase",
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
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayBase);