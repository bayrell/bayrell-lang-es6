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
BayrellLang.LangConstant = class{
	getClassName(){return "BayrellLang.LangConstant";}
	static getParentClassName(){return "";}
}
BayrellLang.LangConstant.ERROR_END_OF_THE_STRING_EXPECTED = Runtime.RuntimeConstant.ERROR_MODULE_PARSER - 501;
BayrellLang.LangConstant.ERROR_PARSER_HEX_NUMBER_EXPECTED = Runtime.RuntimeConstant.ERROR_MODULE_PARSER - 502;
BayrellLang.LangConstant.ERROR_TWICE_DECLARE_ERROR = Runtime.RuntimeConstant.ERROR_MODULE_PARSER - 503;