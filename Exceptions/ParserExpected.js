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
Bayrell.Lang.Exceptions.ParserExpected = function(ctx, s, caret, file, context, prev)
{
	Bayrell.Lang.Exceptions.ParserError.call(this, ctx, s + Runtime.rtl.toStr(" expected"), caret, file, Bayrell.Lang.LangConstant.ERROR_PARSER_EXPECTED, context, prev);
};
Bayrell.Lang.Exceptions.ParserExpected.prototype = Object.create(Bayrell.Lang.Exceptions.ParserError.prototype);
Bayrell.Lang.Exceptions.ParserExpected.prototype.constructor = Bayrell.Lang.Exceptions.ParserExpected;
Object.assign(Bayrell.Lang.Exceptions.ParserExpected.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof Bayrell.Lang.Exceptions.ParserExpected)
		{
		}
		Bayrell.Lang.Exceptions.ParserError.prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		Bayrell.Lang.Exceptions.ParserError.prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return Bayrell.Lang.Exceptions.ParserError.prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.Exceptions.ParserExpected";
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserExpected, Bayrell.Lang.Exceptions.ParserError);
Object.assign(Bayrell.Lang.Exceptions.ParserExpected,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserExpected";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserError";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.Exceptions.ParserExpected",
			"name": "Bayrell.Lang.Exceptions.ParserExpected",
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
Runtime.rtl.defClass(Bayrell.Lang.Exceptions.ParserExpected);