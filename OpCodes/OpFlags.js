"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Language
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
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpFlags = function(__ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpFlags.prototype = Object.create(Runtime.CoreStruct.prototype);
Bayrell.Lang.OpCodes.OpFlags.prototype.constructor = Bayrell.Lang.OpCodes.OpFlags;
Object.assign(Bayrell.Lang.OpCodes.OpFlags.prototype,
{
	/**
	 * Read is Flag
	 */
	isFlag: function(__ctx, name)
	{
		if (!Bayrell.Lang.OpCodes.OpFlags.hasFlag(__ctx, name))
		{
			return false;
		}
		return this.takeValue(__ctx, "p_" + Runtime.rtl.toStr(name));
	},
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__p_async = false;
		if (a.indexOf("p_async") == -1) defProp(this, "p_async");
		this.__p_export = false;
		if (a.indexOf("p_export") == -1) defProp(this, "p_export");
		this.__p_static = false;
		if (a.indexOf("p_static") == -1) defProp(this, "p_static");
		this.__p_const = false;
		if (a.indexOf("p_const") == -1) defProp(this, "p_const");
		this.__p_public = false;
		if (a.indexOf("p_public") == -1) defProp(this, "p_public");
		this.__p_private = false;
		if (a.indexOf("p_private") == -1) defProp(this, "p_private");
		this.__p_protected = false;
		if (a.indexOf("p_protected") == -1) defProp(this, "p_protected");
		this.__p_declare = false;
		if (a.indexOf("p_declare") == -1) defProp(this, "p_declare");
		this.__p_serializable = false;
		if (a.indexOf("p_serializable") == -1) defProp(this, "p_serializable");
		this.__p_cloneable = false;
		if (a.indexOf("p_cloneable") == -1) defProp(this, "p_cloneable");
		this.__p_assignable = false;
		if (a.indexOf("p_assignable") == -1) defProp(this, "p_assignable");
		this.__p_memorize = false;
		if (a.indexOf("p_memorize") == -1) defProp(this, "p_memorize");
		this.__p_lambda = false;
		if (a.indexOf("p_lambda") == -1) defProp(this, "p_lambda");
		Runtime.CoreStruct.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Bayrell.Lang.OpCodes.OpFlags)
		{
			this.__p_async = o.__p_async;
			this.__p_export = o.__p_export;
			this.__p_static = o.__p_static;
			this.__p_const = o.__p_const;
			this.__p_public = o.__p_public;
			this.__p_private = o.__p_private;
			this.__p_protected = o.__p_protected;
			this.__p_declare = o.__p_declare;
			this.__p_serializable = o.__p_serializable;
			this.__p_cloneable = o.__p_cloneable;
			this.__p_assignable = o.__p_assignable;
			this.__p_memorize = o.__p_memorize;
			this.__p_lambda = o.__p_lambda;
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "p_async")this.__p_async = v;
		else if (k == "p_export")this.__p_export = v;
		else if (k == "p_static")this.__p_static = v;
		else if (k == "p_const")this.__p_const = v;
		else if (k == "p_public")this.__p_public = v;
		else if (k == "p_private")this.__p_private = v;
		else if (k == "p_protected")this.__p_protected = v;
		else if (k == "p_declare")this.__p_declare = v;
		else if (k == "p_serializable")this.__p_serializable = v;
		else if (k == "p_cloneable")this.__p_cloneable = v;
		else if (k == "p_assignable")this.__p_assignable = v;
		else if (k == "p_memorize")this.__p_memorize = v;
		else if (k == "p_lambda")this.__p_lambda = v;
		else Runtime.CoreStruct.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "p_async")return this.__p_async;
		else if (k == "p_export")return this.__p_export;
		else if (k == "p_static")return this.__p_static;
		else if (k == "p_const")return this.__p_const;
		else if (k == "p_public")return this.__p_public;
		else if (k == "p_private")return this.__p_private;
		else if (k == "p_protected")return this.__p_protected;
		else if (k == "p_declare")return this.__p_declare;
		else if (k == "p_serializable")return this.__p_serializable;
		else if (k == "p_cloneable")return this.__p_cloneable;
		else if (k == "p_assignable")return this.__p_assignable;
		else if (k == "p_memorize")return this.__p_memorize;
		else if (k == "p_lambda")return this.__p_lambda;
		return Runtime.CoreStruct.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.OpCodes.OpFlags";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpFlags, Runtime.CoreStruct);
Object.assign(Bayrell.Lang.OpCodes.OpFlags,
{
	/**
	 * Get flags
	 */
	getFlags: function(__ctx)
	{
		return Runtime.Collection.from(["async","export","static","const","public","private","declare","protected","serializable","cloneable","assignable","memorize","lambda"]);
	},
	/**
	 * Get flags
	 */
	hasFlag: function(__ctx, flag_name)
	{
		if (flag_name == "async" || flag_name == "export" || flag_name == "static" || flag_name == "const" || flag_name == "public" || flag_name == "private" || flag_name == "declare" || flag_name == "protected" || flag_name == "serializable" || flag_name == "cloneable" || flag_name == "assignable" || flag_name == "memorize" || flag_name == "lambda")
		{
			return true;
		}
		return false;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpFlags";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpFlags",
			"name": "Bayrell.Lang.OpCodes.OpFlags",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("p_async");
			a.push("p_export");
			a.push("p_static");
			a.push("p_const");
			a.push("p_public");
			a.push("p_private");
			a.push("p_protected");
			a.push("p_declare");
			a.push("p_serializable");
			a.push("p_cloneable");
			a.push("p_assignable");
			a.push("p_memorize");
			a.push("p_lambda");
		}
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
Runtime.rtl.defClass(Bayrell.Lang.OpCodes.OpFlags);