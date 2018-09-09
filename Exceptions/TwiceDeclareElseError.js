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
if (typeof BayrellLang.Exceptions == 'undefined') BayrellLang.Exceptions = {};
BayrellLang.Exceptions.TwiceDeclareElseError = class extends BayrellParser.Exceptions.ParserError{
	getClassName(){return "BayrellLang.Exceptions.TwiceDeclareElseError";}
	static getParentClassName(){return "BayrellParser.Exceptions.ParserError";}
	constructor(context, line, col, prev){
		if (prev == undefined) prev=null;
		if (context == null){
			context = Runtime.Utils.globalContext();
		}
		super(context, context.translate("ERROR_TWICE_DECLARE_ERROR"), BayrellLang.LangConstant.ERROR_TWICE_DECLARE_ERROR, prev);
		this.line = line;
		this.pos = col;
		this.buildMessage();
	}
}