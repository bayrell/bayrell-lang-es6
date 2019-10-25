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
Bayrell.Lang.LangBay.ParserBayProgram = function(__ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayProgram.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayProgram)
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
		return "Bayrell.Lang.LangBay.ParserBayProgram";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayProgram,
{
	/**
	 * Read namespace
	 */
	readNamespace: function(__ctx, parser)
	{
		var token = null;
		var name = null;
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "namespace");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.readEntityName(__ctx, parser, false);
		parser = res[0];
		name = res[1];
		var current_namespace_name = Runtime.rs.join(__ctx, ".", name.names);
		var current_namespace = new Bayrell.Lang.OpCodes.OpNamespace(__ctx, Runtime.Dict.from({"name":current_namespace_name,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}));
		parser = parser.copy(__ctx, { "current_namespace": current_namespace });
		parser = parser.copy(__ctx, { "current_namespace_name": current_namespace_name });
		return Runtime.Collection.from([parser,current_namespace]);
	},
	/**
	 * Read use
	 */
	readUse: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var name = null;
		var alias = "";
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "use");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		var res = parser.parser_base.constructor.readEntityName(__ctx, parser, false);
		parser = res[0];
		name = res[1];
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "as")
		{
			var parser_value = null;
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
			parser = res[0];
			parser_value = res[1];
			alias = parser_value.value;
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpUse(__ctx, Runtime.Dict.from({"name":Runtime.rs.join(__ctx, ".", name.names),"alias":alias,"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/**
	 * Read class body
	 */
	readClassBody: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var items = new Runtime.Vector(__ctx);
		parser = parser.copy(__ctx, { "skip_comments": false });
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		parser = parser.copy(__ctx, { "skip_comments": true });
		while (!token.eof && token.content != "}")
		{
			var item = null;
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(__ctx, parser);
				parser = res[0];
				item = res[1];
				if (item != null)
				{
					items.push(__ctx, item);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(__ctx, parser);
				parser = res[0];
				item = res[1];
				items.push(__ctx, item);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				var res = parser.parser_preprocessor.constructor.readPreprocessor(__ctx, parser);
				parser = res[0];
				item = res[1];
				if (item != null)
				{
					items.push(__ctx, item);
				}
			}
			else
			{
				var flags = null;
				var res = parser.parser_operator.constructor.readFlags(__ctx, parser);
				parser = res[0];
				flags = res[1];
				if (parser.parser_operator.constructor.tryReadFunction(__ctx, parser.clone(__ctx), true, flags))
				{
					var res = parser.parser_operator.constructor.readDeclareFunction(__ctx, parser, true);
					parser = res[0];
					item = res[1];
					if (item.expression != null)
					{
						var res = parser.parser_base.constructor.matchToken(__ctx, parser, ";");
						parser = res[0];
					}
				}
				else
				{
					var res = parser.parser_operator.constructor.readAssign(__ctx, parser);
					parser = res[0];
					item = res[1];
					var res = parser.parser_base.constructor.matchToken(__ctx, parser, ";");
					parser = res[0];
				}
				item = item.copy(__ctx, { "flags": flags });
				if (item != null)
				{
					items.push(__ctx, item);
				}
			}
			parser = parser.copy(__ctx, { "skip_comments": false });
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			parser = parser.copy(__ctx, { "skip_comments": true });
		}
		return Runtime.Collection.from([parser,items.toCollection(__ctx)]);
	},
	/**
	 * Read class
	 */
	readClass: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var template = null;
		var is_declare = false;
		var is_static = false;
		var is_struct = false;
		var class_kind = "";
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		if (token.content == "static")
		{
			parser = look.clone(__ctx);
			is_static = true;
		}
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "declare")
		{
			parser = look.clone(__ctx);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			is_declare = true;
		}
		if (token.content == "class")
		{
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "class");
			parser = res[0];
			class_kind = Bayrell.Lang.OpCodes.OpDeclareClass.KIND_CLASS;
		}
		else if (token.content == "struct")
		{
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "struct");
			parser = res[0];
			class_kind = Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT;
		}
		else if (token.content == "interface")
		{
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "interface");
			parser = res[0];
			class_kind = Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE;
		}
		else
		{
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "class");
		}
		var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
		parser = res[0];
		op_code = res[1];
		var class_name = op_code.value;
		/* Set class name */
		parser = parser.copy(__ctx, { "current_class_name": class_name });
		parser = parser.copy(__ctx, { "current_class_kind": class_kind });
		/* Register module in parser */
		parser = parser.copy(__ctx, { "uses": parser.uses.setIm(__ctx, class_name, parser.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(class_name)) });
		var save_uses = parser.uses;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "<")
		{
			template = new Runtime.Vector(__ctx);
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, "<");
			parser = res[0];
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ">")
			{
				var parser_value = null;
				var res = parser.parser_base.constructor.readIdentifier(__ctx, parser);
				parser = res[0];
				parser_value = res[1];
				template.push(__ctx, parser_value);
				parser = parser.copy(__ctx, { "uses": parser.uses.setIm(__ctx, parser_value.value, parser_value.value) });
				var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
				if (token.content != ">")
				{
					var res = parser.parser_base.constructor.matchToken(__ctx, parser, ",");
					parser = res[0];
					var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
					look = res[0];
					token = res[1];
				}
			}
			var res = parser.parser_base.constructor.matchToken(__ctx, parser, ">");
			parser = res[0];
		}
		var class_extends = null;
		var class_implements = null;
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "extends")
		{
			var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, look.clone(__ctx));
			parser = res[0];
			class_extends = res[1];
		}
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		if (token.content == "implements")
		{
			class_implements = new Runtime.Vector(__ctx);
			var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, look.clone(__ctx));
			parser = res[0];
			op_code = res[1];
			class_implements.push(__ctx, op_code);
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content == ",")
			{
				parser = look.clone(__ctx);
				var res = parser.parser_base.constructor.readTypeIdentifier(__ctx, look.clone(__ctx));
				parser = res[0];
				op_code = res[1];
				class_implements.push(__ctx, op_code);
				var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
				look = res[0];
				token = res[1];
			}
		}
		var arr = null;
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "{");
		parser = res[0];
		var res = this.readClassBody(__ctx, parser);
		parser = res[0];
		arr = res[1];
		var names = new Runtime.Map(__ctx);
		var vars = new Runtime.Vector(__ctx);
		var functions = new Runtime.Vector(__ctx);
		var items = new Runtime.Vector(__ctx);
		var annotations = new Runtime.Vector(__ctx);
		var comments = new Runtime.Vector(__ctx);
		var fn_create = null;
		var fn_destroy = null;
		for (var i = 0;i < arr.count(__ctx);i++)
		{
			var item = arr.item(__ctx, i);
			if (item instanceof Bayrell.Lang.OpCodes.OpAnnotation)
			{
				annotations.push(__ctx, item);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpComment)
			{
				comments.push(__ctx, item);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpAssign)
			{
				for (var j = 0;j < item.values.count(__ctx);j++)
				{
					var assign_value = item.values.item(__ctx, j);
					var value_name = assign_value.var_name;
					if (names.has(__ctx, value_name))
					{
						throw new Bayrell.Lang.Exceptions.ParserError(__ctx, "Dublicate identifier " + Runtime.rtl.toStr(value_name), assign_value.caret_start.clone(__ctx), parser.file_name)
					}
					names.set(__ctx, value_name, true);
				}
				item = item.copy(__ctx, Runtime.Dict.from({"annotations":annotations.toCollection(__ctx),"comments":comments.toCollection(__ctx)}));
				vars.push(__ctx, item);
				annotations.clear(__ctx);
				comments.clear(__ctx);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
			{
				item = item.copy(__ctx, Runtime.Dict.from({"annotations":annotations.toCollection(__ctx),"comments":comments.toCollection(__ctx)}));
				if (names.has(__ctx, item.name))
				{
					throw new Bayrell.Lang.Exceptions.ParserError(__ctx, "Dublicate identifier " + Runtime.rtl.toStr(item.name), item.caret_start.clone(__ctx), parser.file_name)
				}
				names.set(__ctx, item.name, true);
				if (item.name == "constructor")
				{
					fn_create = item;
				}
				else if (item.name == "destructor")
				{
					fn_destroy = item;
				}
				else
				{
					functions.push(__ctx, item);
				}
				annotations.clear(__ctx);
				comments.clear(__ctx);
			}
			else
			{
				items.push(__ctx, item);
			}
		}
		items.appendVector(__ctx, comments);
		var res = parser.parser_base.constructor.matchToken(__ctx, parser, "}");
		parser = res[0];
		var current_class = new Bayrell.Lang.OpCodes.OpDeclareClass(__ctx, Runtime.Dict.from({"kind":class_kind,"name":class_name,"is_static":is_static,"is_declare":is_declare,"class_extends":class_extends,"class_implements":(class_implements != null) ? class_implements.toCollection(__ctx) : null,"template":(template != null) ? template.toCollection(__ctx) : null,"vars":vars.toCollection(__ctx),"functions":functions.toCollection(__ctx),"fn_create":fn_create,"fn_destroy":fn_destroy,"items":items.toCollection(__ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}));
		/* Restore uses */
		parser = parser.copy(__ctx, { "uses": save_uses });
		return Runtime.Collection.from([parser.copy(__ctx, Runtime.Dict.from({"current_class":current_class})),current_class]);
	},
	/**
	 * Read program
	 */
	readProgram: function(__ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var annotations = new Runtime.Vector(__ctx);
		var comments = new Runtime.Vector(__ctx);
		var items = new Runtime.Vector(__ctx);
		parser = parser.copy(__ctx, { "skip_comments": false });
		var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(__ctx);
		parser = parser.copy(__ctx, { "skip_comments": true });
		if (token.eof)
		{
			return Runtime.Collection.from([parser,null]);
		}
		while (!token.eof)
		{
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(__ctx, parser);
				parser = res[0];
				op_code = res[1];
				if (op_code != null)
				{
					comments.push(__ctx, op_code);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(__ctx, parser);
				parser = res[0];
				op_code = res[1];
				annotations.push(__ctx, op_code);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				/* Append comments */
				items.appendVector(__ctx, comments);
				comments.clear(__ctx);
				var res = parser.parser_preprocessor.constructor.readPreprocessor(__ctx, parser);
				parser = res[0];
				op_code = res[1];
				if (op_code != null)
				{
					items.appendVector(__ctx, comments);
					items.push(__ctx, op_code);
				}
			}
			else if (token.content == "namespace")
			{
				/* Append comments */
				items.appendVector(__ctx, comments);
				comments.clear(__ctx);
				var res = this.readNamespace(__ctx, parser);
				parser = res[0];
				op_code = res[1];
				items.push(__ctx, op_code);
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, ";");
				parser = res[0];
			}
			else if (token.content == "use")
			{
				/* Append comments */
				items.appendVector(__ctx, comments);
				comments.clear(__ctx);
				var res = this.readUse(__ctx, parser);
				parser = res[0];
				op_code = res[1];
				var full_name = op_code.name;
				var short_name = "";
				if (op_code.alias == "")
				{
					short_name = Runtime.rs.explode(__ctx, ".", full_name).last(__ctx);
				}
				else
				{
					short_name = op_code.alias;
				}
				/* Register module in parser */
				parser = parser.copy(__ctx, { "uses": parser.uses.setIm(__ctx, short_name, full_name) });
				var res = parser.parser_base.constructor.matchToken(__ctx, parser, ";");
				parser = res[0];
			}
			else if (token.content == "class" || token.content == "struct" || token.content == "static" || token.content == "declare" || token.content == "interface")
			{
				var item = null;
				var res = this.readClass(__ctx, parser);
				parser = res[0];
				item = res[1];
				item = item.copy(__ctx, Runtime.Dict.from({"annotations":annotations.toCollection(__ctx),"comments":comments.toCollection(__ctx)}));
				items.push(__ctx, item);
				annotations.clear(__ctx);
				comments.clear(__ctx);
			}
			else
			{
				break;
			}
			parser = parser.copy(__ctx, { "skip_comments": false });
			var res = parser.parser_base.constructor.readToken(__ctx, parser.clone(__ctx));
			look = res[0];
			token = res[1];
			parser = parser.copy(__ctx, { "skip_comments": true });
		}
		items.appendVector(__ctx, comments);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpModule(__ctx, Runtime.Dict.from({"uses":parser.uses.toDict(__ctx),"items":items.toCollection(__ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(__ctx)}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayProgram";
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
			"class_name": "Bayrell.Lang.LangBay.ParserBayProgram",
			"name": "Bayrell.Lang.LangBay.ParserBayProgram",
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
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayProgram);