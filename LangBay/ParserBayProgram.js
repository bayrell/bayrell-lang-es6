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
Bayrell.Lang.LangBay.ParserBayProgram = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayProgram.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.LangBay.ParserBayProgram)
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
		return "Bayrell.Lang.LangBay.ParserBayProgram";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayProgram,
{
	/**
	 * Read namespace
	 */
	readNamespace: function(ctx, parser)
	{
		var token = null;
		var name = null;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "namespace");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readEntityName(ctx, parser, false);
		parser = res[0];
		name = res[1];
		var current_namespace_name = Runtime.rs.join(ctx, ".", name.names);
		var current_namespace = new Bayrell.Lang.OpCodes.OpNamespace(ctx, Runtime.Dict.from({"name":current_namespace_name,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
		parser = parser.copy(ctx, { "current_namespace": current_namespace });
		parser = parser.copy(ctx, { "current_namespace_name": current_namespace_name });
		return Runtime.Collection.from([parser,current_namespace]);
	},
	/**
	 * Read use
	 */
	readUse: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var name = null;
		var alias = "";
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "use");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readEntityName(ctx, parser, false);
		parser = res[0];
		name = res[1];
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "as")
		{
			var parser_value = null;
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = res[0];
			parser_value = res[1];
			alias = parser_value.value;
		}
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpUse(ctx, Runtime.Dict.from({"name":Runtime.rs.join(ctx, ".", name.names),"alias":alias,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read class body
	 */
	readClassBody: function(ctx, parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "}";
		var look = null;
		var token = null;
		var items = new Runtime.Vector(ctx);
		parser = parser.copy(ctx, { "skip_comments": false });
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		parser = parser.copy(ctx, { "skip_comments": true });
		while (!token.eof && token.content != end_tag)
		{
			var item = null;
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(ctx, parser);
				parser = res[0];
				item = res[1];
				if (item != null)
				{
					items.push(ctx, item);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(ctx, parser);
				parser = res[0];
				item = res[1];
				items.push(ctx, item);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				var res = parser.parser_preprocessor.constructor.readPreprocessor(ctx, parser);
				parser = res[0];
				item = res[1];
				if (item != null)
				{
					items.push(ctx, item);
				}
			}
			else if (token.content == "#ifdef")
			{
				var res = parser.parser_preprocessor.constructor.readPreprocessorIfDef(ctx, parser, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_CLASS_BODY);
				parser = res[0];
				item = res[1];
				if (item != null)
				{
					items.push(ctx, item);
				}
			}
			else
			{
				var flags = null;
				var res = parser.parser_operator.constructor.readFlags(ctx, parser);
				parser = res[0];
				flags = res[1];
				if (parser.parser_operator.constructor.tryReadFunction(ctx, parser.clone(ctx), true, flags))
				{
					var res = parser.parser_operator.constructor.readDeclareFunction(ctx, parser, true);
					parser = res[0];
					item = res[1];
					if (item.expression != null)
					{
						var res = parser.parser_base.constructor.matchToken(ctx, parser, ";");
						parser = res[0];
					}
				}
				else
				{
					var res = parser.parser_operator.constructor.readAssign(ctx, parser);
					parser = res[0];
					item = res[1];
					var res = parser.parser_base.constructor.matchToken(ctx, parser, ";");
					parser = res[0];
				}
				item = item.copy(ctx, { "flags": flags });
				if (item != null)
				{
					items.push(ctx, item);
				}
			}
			parser = parser.copy(ctx, { "skip_comments": false });
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			parser = parser.copy(ctx, { "skip_comments": true });
		}
		return Runtime.Collection.from([parser,items.toCollection(ctx)]);
	},
	/**
	 * Class body analyze
	 */
	classBodyAnalyze: function(ctx, parser, arr)
	{
		var names = new Runtime.Map(ctx);
		var vars = new Runtime.Vector(ctx);
		var functions = new Runtime.Vector(ctx);
		var items = new Runtime.Vector(ctx);
		var annotations = new Runtime.Vector(ctx);
		var comments = new Runtime.Vector(ctx);
		var fn_create = null;
		var fn_destroy = null;
		for (var i = 0;i < arr.count(ctx);i++)
		{
			var item = arr.item(ctx, i);
			if (item instanceof Bayrell.Lang.OpCodes.OpAnnotation)
			{
				annotations.push(ctx, item);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpComment)
			{
				comments.push(ctx, item);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpAssign)
			{
				for (var j = 0;j < item.values.count(ctx);j++)
				{
					var assign_value = item.values.item(ctx, j);
					var value_name = assign_value.var_name;
					if (names.has(ctx, value_name))
					{
						throw new Bayrell.Lang.Exceptions.ParserError(ctx, "Dublicate identifier " + Runtime.rtl.toStr(value_name), assign_value.caret_start.clone(ctx), parser.file_name)
					}
					names.set(ctx, value_name, true);
				}
				item = item.copy(ctx, Runtime.Dict.from({"annotations":annotations.toCollection(ctx),"comments":comments.toCollection(ctx)}));
				vars.push(ctx, item);
				annotations.clear(ctx);
				comments.clear(ctx);
			}
			else if (item instanceof Bayrell.Lang.OpCodes.OpDeclareFunction)
			{
				item = item.copy(ctx, Runtime.Dict.from({"annotations":annotations.toCollection(ctx),"comments":comments.toCollection(ctx)}));
				if (names.has(ctx, item.name))
				{
					throw new Bayrell.Lang.Exceptions.ParserError(ctx, "Dublicate identifier " + Runtime.rtl.toStr(item.name), item.caret_start.clone(ctx), parser.file_name)
				}
				names.set(ctx, item.name, true);
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
					functions.push(ctx, item);
				}
				annotations.clear(ctx);
				comments.clear(ctx);
			}
			else
			{
				items.push(ctx, item);
			}
		}
		items.appendVector(ctx, comments);
		return Runtime.Dict.from({"annotations":annotations.toCollection(ctx),"comments":comments.toCollection(ctx),"functions":functions.toCollection(ctx),"items":items.toCollection(ctx),"vars":vars.toCollection(ctx),"fn_create":fn_create,"fn_destroy":fn_destroy});
	},
	/**
	 * Read class
	 */
	readClass: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var template = null;
		var is_declare = false;
		var is_static = false;
		var is_struct = false;
		var class_kind = "";
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		if (token.content == "static")
		{
			parser = look.clone(ctx);
			is_static = true;
		}
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "declare")
		{
			parser = look.clone(ctx);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			is_declare = true;
		}
		if (token.content == "class")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "class");
			parser = res[0];
			class_kind = Bayrell.Lang.OpCodes.OpDeclareClass.KIND_CLASS;
		}
		else if (token.content == "struct")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "struct");
			parser = res[0];
			class_kind = Bayrell.Lang.OpCodes.OpDeclareClass.KIND_STRUCT;
		}
		else if (token.content == "interface")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "interface");
			parser = res[0];
			class_kind = Bayrell.Lang.OpCodes.OpDeclareClass.KIND_INTERFACE;
		}
		else
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "class");
		}
		var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
		parser = res[0];
		op_code = res[1];
		var class_name = op_code.value;
		/* Set class name */
		parser = parser.copy(ctx, { "current_class_name": class_name });
		parser = parser.copy(ctx, { "current_class_kind": class_kind });
		/* Register module in parser */
		parser = parser.copy(ctx, { "uses": parser.uses.setIm(ctx, class_name, parser.current_namespace_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(class_name)) });
		var save_uses = parser.uses;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "<")
		{
			template = new Runtime.Vector(ctx);
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "<");
			parser = res[0];
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ">")
			{
				var parser_value = null;
				var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
				parser = res[0];
				parser_value = res[1];
				template.push(ctx, parser_value);
				parser = parser.copy(ctx, { "uses": parser.uses.setIm(ctx, parser_value.value, parser_value.value) });
				var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
				look = res[0];
				token = res[1];
				if (token.content != ">")
				{
					var res = parser.parser_base.constructor.matchToken(ctx, parser, ",");
					parser = res[0];
					var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
					look = res[0];
					token = res[1];
				}
			}
			var res = parser.parser_base.constructor.matchToken(ctx, parser, ">");
			parser = res[0];
		}
		var class_extends = null;
		var class_implements = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "extends")
		{
			var res = parser.parser_base.constructor.readTypeIdentifier(ctx, look.clone(ctx));
			parser = res[0];
			class_extends = res[1];
		}
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "implements")
		{
			class_implements = new Runtime.Vector(ctx);
			var res = parser.parser_base.constructor.readTypeIdentifier(ctx, look.clone(ctx));
			parser = res[0];
			op_code = res[1];
			class_implements.push(ctx, op_code);
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			while (!token.eof && token.content == ",")
			{
				parser = look.clone(ctx);
				var res = parser.parser_base.constructor.readTypeIdentifier(ctx, look.clone(ctx));
				parser = res[0];
				op_code = res[1];
				class_implements.push(ctx, op_code);
				var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
				look = res[0];
				token = res[1];
			}
		}
		var arr = null;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "{");
		parser = res[0];
		var res = this.readClassBody(ctx, parser);
		parser = res[0];
		arr = res[1];
		var d = this.classBodyAnalyze(ctx, parser, arr);
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "}");
		parser = res[0];
		var current_class = new Bayrell.Lang.OpCodes.OpDeclareClass(ctx, Runtime.Dict.from({"kind":class_kind,"name":class_name,"is_static":is_static,"is_declare":is_declare,"class_extends":class_extends,"class_implements":(class_implements != null) ? class_implements.toCollection(ctx) : null,"template":(template != null) ? template.toCollection(ctx) : null,"vars":d.item(ctx, "vars"),"functions":d.item(ctx, "functions"),"fn_create":d.item(ctx, "fn_create"),"fn_destroy":d.item(ctx, "fn_destroy"),"items":d.item(ctx, "items"),"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}));
		/* Restore uses */
		parser = parser.copy(ctx, { "uses": save_uses });
		return Runtime.Collection.from([parser.copy(ctx, Runtime.Dict.from({"current_class":current_class})),current_class]);
	},
	/**
	 * Read program
	 */
	readProgram: function(ctx, parser, end_tag)
	{
		if (end_tag == undefined) end_tag = "";
		var look = null;
		var token = null;
		var op_code = null;
		var annotations = new Runtime.Vector(ctx);
		var comments = new Runtime.Vector(ctx);
		var items = new Runtime.Vector(ctx);
		parser = parser.copy(ctx, { "skip_comments": false });
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		parser = parser.copy(ctx, { "skip_comments": true });
		if (token.eof)
		{
			return Runtime.Collection.from([parser,null]);
		}
		while (!token.eof && (end_tag == "" || end_tag != "" && token.content == end_tag))
		{
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(ctx, parser);
				parser = res[0];
				op_code = res[1];
				if (op_code != null)
				{
					comments.push(ctx, op_code);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(ctx, parser);
				parser = res[0];
				op_code = res[1];
				annotations.push(ctx, op_code);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				/* Append comments */
				items.appendVector(ctx, comments);
				comments.clear(ctx);
				var res = parser.parser_preprocessor.constructor.readPreprocessor(ctx, parser);
				parser = res[0];
				op_code = res[1];
				if (op_code != null)
				{
					items.appendVector(ctx, comments);
					items.push(ctx, op_code);
				}
			}
			else if (token.content == "#ifdef")
			{
				/* Append comments */
				items.appendVector(ctx, comments);
				comments.clear(ctx);
				var res = parser.parser_preprocessor.constructor.readPreprocessorIfDef(ctx, parser, Bayrell.Lang.OpCodes.OpPreprocessorIfDef.KIND_PROGRAM);
				parser = res[0];
				op_code = res[1];
				if (op_code != null)
				{
					items.appendVector(ctx, comments);
					items.push(ctx, op_code);
				}
			}
			else if (token.content == "namespace")
			{
				/* Append comments */
				items.appendVector(ctx, comments);
				comments.clear(ctx);
				var res = this.readNamespace(ctx, parser);
				parser = res[0];
				op_code = res[1];
				items.push(ctx, op_code);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, ";");
				parser = res[0];
			}
			else if (token.content == "use")
			{
				/* Append comments */
				items.appendVector(ctx, comments);
				comments.clear(ctx);
				var res = this.readUse(ctx, parser);
				parser = res[0];
				op_code = res[1];
				var full_name = op_code.name;
				var short_name = "";
				if (op_code.alias == "")
				{
					short_name = Runtime.rs.explode(ctx, ".", full_name).last(ctx);
				}
				else
				{
					short_name = op_code.alias;
				}
				/* Register module in parser */
				parser = parser.copy(ctx, { "uses": parser.uses.setIm(ctx, short_name, full_name) });
				var res = parser.parser_base.constructor.matchToken(ctx, parser, ";");
				parser = res[0];
			}
			else if (token.content == "class" || token.content == "struct" || token.content == "static" || token.content == "declare" || token.content == "interface")
			{
				var item = null;
				var res = this.readClass(ctx, parser);
				parser = res[0];
				item = res[1];
				item = item.copy(ctx, Runtime.Dict.from({"annotations":annotations.toCollection(ctx),"comments":comments.toCollection(ctx)}));
				items.push(ctx, item);
				annotations.clear(ctx);
				comments.clear(ctx);
			}
			else
			{
				break;
			}
			parser = parser.copy(ctx, { "skip_comments": false });
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			parser = parser.copy(ctx, { "skip_comments": true });
		}
		items.appendVector(ctx, comments);
		return Runtime.Collection.from([parser,new Bayrell.Lang.OpCodes.OpModule(ctx, Runtime.Dict.from({"uses":parser.uses.toDict(ctx),"items":items.toCollection(ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
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
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayProgram",
			"name": "Bayrell.Lang.LangBay.ParserBayProgram",
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
Runtime.rtl.defClass(Bayrell.Lang.LangBay.ParserBayProgram);