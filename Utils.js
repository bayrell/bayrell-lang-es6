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
BayrellLang.Utils = class extends Runtime.ContextObject{
	/**
	 * Transcompile one language to other
	 * @string string parser_factory_name
	 * @string string translator_factory_name
	 * @string string source
	 * @return string
	 */
	static getAST(context, parser_factory, source){
		var parser = parser_factory.newInstance(context);
		parser.parseString(source);
		var code_tree = parser.getAST();
		return code_tree;
	}
	/**
	 * Transcompile one language to other
	 * @string string parser_factory_name
	 * @string string translator_factory_name
	 * @string string source
	 * @return string
	 */
	static translateAST(context, translator_factory, code_tree){
		var translator = translator_factory.newInstance(context);
		var res = translator.translateOpCode(code_tree);
		return res;
	}
	/**
	 * Transcompile one language to other
	 * @string string parser_factory_name
	 * @string string translator_factory_name
	 * @string string source
	 * @return string
	 */
	static translateSource(context, parser_factory, translator_factory, source){
		var parser = parser_factory.newInstance(context);
		var translator = translator_factory.newInstance(context);
		parser.parseString(source);
		var code_tree = parser.getAST();
		var res = translator.translateOpCode(code_tree);
		return res;
	}
	/**
	 * Transcompile Bayrell language to other
	 * @string string translator_factory_name
	 * @string string source
	 * @return string
	 */
	static translateBay(context, translator_factory, source){
		var translator = translator_factory.newInstance(context);
		var parser = new BayrellLang.LangBay.ParserBay(context);
		parser.parseString(source);
		var code_tree = parser.getAST();
		var res = translator.translateOpCode(code_tree);
		return res;
	}
	/**
	 * Transcompile Bayrell language to other
	 * @string FactoryInterface parser_factory
	 * @string FactoryInterface translator_factory
	 * @string string src_file_name
	 * @string string dest_file_name
	 */
	static translateFile(context, parser_factory, translator_factory, src_file_name, dest_file_name){
		/*
		#switch
		#case ifcode NODEJS then
		var fsModule = require('fs');
		var shellModule = require('shelljs');
		var content = fsModule.readFileSync(src_file_name, {encoding : 'utf8'}).toString();
		#endswitch
		*/
		var file_system = context.createProvider("default:fs");
		var content = file_system.readFile(src_file_name);
		var res = BayrellLang.Utils.translateSource(context, parser_factory, translator_factory, content);
		var dir = BayrellCommon.Utils.dirname(dest_file_name);
		file_system.makeDir(dir);
		file_system.saveFile(dest_file_name, res);
		/*
		#switch
		#case ifcode NODEJS then
		if (!fsModule.existsSync(dir)){
			shellModule.mkdir('-p', dirpath);
		}
		fsModule.writeFileSync(dest_file_name, res, {encoding : 'utf8'});
		#endswitch
		*/
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Utils";}
	static getCurrentNamespace(){return "BayrellLang";}
	static getCurrentClassName(){return "BayrellLang.Utils";}
	static getParentClassName(){return "Runtime.ContextObject";}
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