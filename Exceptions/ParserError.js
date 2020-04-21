"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Parser Library.
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell.Lang.Exceptions == 'undefined') Bayrell.Lang.Exceptions = {};
Bayrell.Lang.Exceptions.ParserError = function(ctx, s, caret, file, code, context, prev)
{
	Bayrell.Lang.Exceptions.ParserUnknownError.call(this, ctx, s, code, context, prev);
	this.error_line = caret.y + 1;
	this.error_pos = caret.x + 1;
	this.error_file = file;
	this.updateError(ctx);
};
Bayrell.Lang.Exceptions.ParserError.prototype = Object.create(Bayrell.Lang.Exceptions.ParserUnknownError.prototype);
Bayrell.Lang.Exceptions.ParserError.prototype.constructor = Bayrell.Lang.Exceptions.ParserError;
Object.assign(Bayrell.Lang.Exceptions.ParserError.prototype,
{
	buildMessage: function(ctx)
	{
		var error_str = this.error_str;
		var file = this.getFileName(ctx);
		var line = this.getErrorLine(ctx);
		var pos = this.getErrorPos(ctx);
		if (line != -1)
		{
			error_str += Runtime.rtl.toStr(" at Ln:" + Runtime.rtl.toStr(line) + Runtime.rtl.toStr(((pos != "") ? ", Pos:" + Runtime.rtl.toStr(pos) : "")));
		}
		if (file != "")
		{
			error_str += Runtime.rtl.toStr(" in file:'" + Runtime.rtl.toStr(file) + Runtime.rtl.toStr("'"));
		}
		return error_str;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.Exceptions.ParserError)
		{
		}
		Bayrell.Lang.Exceptions.ParserUnknownError.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Bayrell.Lang.Exceptions.ParserUnknownError.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Bayrell.Lang.Exceptions.ParserUnknownError.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.Exceptions.ParserError";
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserError, Bayrell.Lang.Exceptions.ParserUnknownError);
Object.assign(Bayrell.Lang.Exceptions.ParserError,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserError";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserUnknownError";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.Exceptions.ParserError",
			"name": "Bayrell.Lang.Exceptions.ParserError",
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
Runtime.rtl.defClass(Bayrell.Lang.Exceptions.ParserError);