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
BayrellLang.Parser.ParserCursorPos = class extends Runtime.ContextObject{
	/**
	 * Current content of the file
	 */
	/**
	 * Current parser pos
	 */
	/**
	 * Current file line
	 */
	/**
	 * Current file column
	 */
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		return new BayrellLang.Parser.ParserCursorPos(this.context(), this.parser);
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof BayrellLang.Parser.ParserCursorPos){
			this.pos = obj.pos;
			this.line = obj.line;
			this.col = obj.col;
			this.parser = obj.parser;
		}
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assignObject(obj){
		this.assign(obj);
	}
	/**
	 * Return true if eof
	 * @param {bool}
	 */
	isEOF(){
		return this.pos >= this.parser.getContentSize();
	}
	/**
	 * Reset cursor
	 */
	reset(){
		this.pos = 0;
		this.line = 1;
		this.col = 1;
	}
	/**
	 * Constructor
	 */
	constructor(context, parser){
		if (context == undefined) context=null;
		if (parser == undefined) parser=null;
		super(context);
		this.parser = parser;
	}
	/**
	 * Destructor
	 */
	/*
	void destructor (){
		this.parser = null;
		parent::destructor();
	}
	*/
	/**
	 * Move cursor pos by char
	 * @param char ch
	 * @param int len
	 * @param int invert
	 */
	moveChar(ch, len, invert){
		if (len == undefined) len=1;
		if (invert == undefined) invert=1;
		if (ch == ""){
			return ;
		}
		if (ch == "\n"){
			this.line = this.line + invert * len;
			this.col = 1;
		}
		else if (ch == "\t"){
			this.col = this.col + this.parser.tab_space_count * invert * len;
		}
		else {
			this.col = this.col + invert * len;
		}
		this.pos = this.pos + invert * len;
	}
	/**
	 * Move pos by string
	 * @param {string} s
	 * @param {int} invert
	 */
	moveString(s, invert){
		if (invert == undefined) invert=1;
		var sz = Runtime.rs.strlen(s);
		for (var i = 0; i < sz; i++){
			this.moveChar(s[i], 1, invert);
		}
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Parser.ParserCursorPos";}
	static getCurrentNamespace(){return "BayrellLang.Parser";}
	static getCurrentClassName(){return "BayrellLang.Parser.ParserCursorPos";}
	static getParentClassName(){return "Runtime.ContextObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.parser = null;
		this.pos = 0;
		this.line = 1;
		this.col = 1;
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(Runtime.Interfaces.CloneableInterface);
	}
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
BayrellLang.Parser.ParserCursorPos.__static_implements__ = [];
BayrellLang.Parser.ParserCursorPos.__static_implements__.push(Runtime.Interfaces.CloneableInterface)