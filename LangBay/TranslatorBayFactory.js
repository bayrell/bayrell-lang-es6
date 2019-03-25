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
BayrellLang.LangBay.TranslatorBayFactory = class extends Runtime.ContextObject{
	/**
	 * Returns new Instance
	 */
	newInstance(context){
		return new BayrellLang.LangBay.TranslatorBay(context);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangBay.TranslatorBayFactory";}
	static getCurrentClassName(){return "BayrellLang.LangBay.TranslatorBayFactory";}
	static getParentClassName(){return "Runtime.ContextObject";}
	_init(){
		super._init();
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(Runtime.Interfaces.FactoryInterface);
	}
}
BayrellLang.LangBay.TranslatorBayFactory.__static_implements__ = [];
BayrellLang.LangBay.TranslatorBayFactory.__static_implements__.push(Runtime.Interfaces.FactoryInterface)