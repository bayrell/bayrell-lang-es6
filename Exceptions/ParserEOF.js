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
Bayrell.Lang.Exceptions.ParserEOF = function(ctx, context, prev)
{
	Bayrell.Lang.Exceptions.ParserUnknownError.call(this, ctx, "ERROR_PARSER_EOF", Bayrell.Lang.LangConstant.ERROR_PARSER_EOF, context, prev);
};
Bayrell.Lang.Exceptions.ParserEOF.prototype = Object.create(Bayrell.Lang.Exceptions.ParserUnknownError.prototype);
Bayrell.Lang.Exceptions.ParserEOF.prototype.constructor = Bayrell.Lang.Exceptions.ParserEOF;
Object.assign(Bayrell.Lang.Exceptions.ParserEOF.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.Exceptions.ParserEOF)
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
		return "Bayrell.Lang.Exceptions.ParserEOF";
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserEOF, Bayrell.Lang.Exceptions.ParserUnknownError);
Object.assign(Bayrell.Lang.Exceptions.ParserEOF,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserEOF";
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
			"class_name": "Bayrell.Lang.Exceptions.ParserEOF",
			"name": "Bayrell.Lang.Exceptions.ParserEOF",
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
Runtime.rtl.defClass(Bayrell.Lang.Exceptions.ParserEOF);