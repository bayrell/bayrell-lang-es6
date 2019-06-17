"use strict;"
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
if (typeof BayrellLang == 'undefined') BayrellLang = {};
if (typeof BayrellLang.Parser == 'undefined') BayrellLang.Parser = {};
if (typeof BayrellLang.Parser.Exceptions == 'undefined') BayrellLang.Parser.Exceptions = {};
BayrellLang.Parser.Exceptions.ParserEOF = class extends BayrellLang.Parser.Exceptions.ParserError{
	constructor(context, prev){
		if (prev == undefined) prev=null;
		if (context == null){
			context = Runtime.RuntimeUtils.globalContext();
		}
		super(context.translate("ERROR_PARSER_EOF"), BayrellLang.Parser.ParserConstant.ERROR_PARSER_EOF, context, prev);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Parser.Exceptions.ParserEOF";}
	static getCurrentNamespace(){return "BayrellLang.Parser.Exceptions";}
	static getCurrentClassName(){return "BayrellLang.Parser.Exceptions.ParserEOF";}
	static getParentClassName(){return "BayrellLang.Parser.Exceptions.ParserError";}
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