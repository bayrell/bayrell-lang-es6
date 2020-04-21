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
Bayrell.Lang.CoreParser = function(ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
Bayrell.Lang.CoreParser.prototype = Object.create(Runtime.CoreStruct.prototype);
Bayrell.Lang.CoreParser.prototype.constructor = Bayrell.Lang.CoreParser;
Object.assign(Bayrell.Lang.CoreParser.prototype,
{
	/**
	 * Returns true if eof
	 */
	isEof: function(ctx)
	{
		return this.caret.pos >= this.content_sz;
	},
	_init: function(ctx)
	{
		this.tab_size = 4;
		this.file_name = "";
		this.content = null;
		this.content_sz = 0;
		this.caret = null;
		this.find_ident = true;
		Runtime.CoreStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.CoreParser)
		{
			this.tab_size = o.tab_size;
			this.file_name = o.file_name;
			this.content = o.content;
			this.content_sz = o.content_sz;
			this.caret = o.caret;
			this.find_ident = o.find_ident;
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "tab_size")this.tab_size = v;
		else if (k == "file_name")this.file_name = v;
		else if (k == "content")this.content = v;
		else if (k == "content_sz")this.content_sz = v;
		else if (k == "caret")this.caret = v;
		else if (k == "find_ident")this.find_ident = v;
		else Runtime.CoreStruct.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "tab_size")return this.tab_size;
		else if (k == "file_name")return this.file_name;
		else if (k == "content")return this.content;
		else if (k == "content_sz")return this.content_sz;
		else if (k == "caret")return this.caret;
		else if (k == "find_ident")return this.find_ident;
		return Runtime.CoreStruct.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.CoreParser";
	},
});
Object.assign(Bayrell.Lang.CoreParser, Runtime.CoreStruct);
Object.assign(Bayrell.Lang.CoreParser,
{
	/**
	 * Reset parser
	 */
	reset: function(ctx, parser)
	{
		return parser.copy(ctx, Runtime.Dict.from({"caret":new Bayrell.Lang.Caret(ctx, Runtime.Dict.from({})),"token":null}));
	},
	/**
	 * Set content
	 */
	setContent: function(ctx, parser, content)
	{
		return parser.copy(ctx, Runtime.Dict.from({"content":new Runtime.Reference(ctx, content),"content_sz":Runtime.rs.strlen(ctx, content)}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(ctx, parser, content)
	{
		parser = this.reset(ctx, parser);
		parser = this.setContent(ctx, parser, content);
		while (parser.caret.pos < parser.content_sz)
		{
			parser = parser.constructor.nextToken(ctx, parser);
		}
		return parser;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.CoreParser";
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
			"class_name": "Bayrell.Lang.CoreParser",
			"name": "Bayrell.Lang.CoreParser",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("tab_size");
			a.push("file_name");
			a.push("content");
			a.push("content_sz");
			a.push("caret");
			a.push("find_ident");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "tab_size") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "file_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content_sz") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "find_ident") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreParser",
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
Runtime.rtl.defClass(Bayrell.Lang.CoreParser);