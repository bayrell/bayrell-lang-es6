"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
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
if (typeof BayrellLang == 'undefined') BayrellLang = {};
if (typeof BayrellLang.LangBay == 'undefined') BayrellLang.LangBay = {};
BayrellLang.LangBay.ParserBayNameToken = class extends BayrellLang.Parser.ParserToken{
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar(ch){
		return Runtime.rs.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_.", Runtime.rs.strtolower(ch)) !== -1;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangBay.ParserBayNameToken";}
	static getCurrentNamespace(){return "BayrellLang.LangBay";}
	static getCurrentClassName(){return "BayrellLang.LangBay.ParserBayNameToken";}
	static getParentClassName(){return "BayrellLang.Parser.ParserToken";}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
BayrellLang.LangBay.ParserBayNameToken.TOKEN_NONE = "none";
BayrellLang.LangBay.ParserBayNameToken.TOKEN_BASE = "base";