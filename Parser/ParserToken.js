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
BayrellLang.Parser.ParserToken = class extends BayrellLang.Parser.ParserReader{
	/**
	 * Token content
	 */
	/**
	 * Token type
	 */
	/**
	 * Start pos of the current token
	 */
	/**
	 * Start current token line
	 */
	/**
	 * Start current token column
	 */
	/**
	 * The token is success readed
	 */
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		return new BayrellLang.Parser.ParserToken(this.context(), this.parser);
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof BayrellLang.Parser.ParserToken){
			this.tp = obj.tp;
			this.token = obj.token;
			this.success = obj.success;
			this.start_line = obj.start_line;
			this.start_col = obj.start_col;
		}
		super.assign(obj);
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assignObject(obj){
		this.assign(obj);
	}
	/**
	 * Reset cursor
	 */
	reset(){
		super.reset();
		this.token = "";
		this.tp = "";
		this.success = false;
	}
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar(ch){
		return Runtime.rs.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_", Runtime.rs.strtolower(ch)) !== -1;
	}
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar(ch){
		if (Runtime.rs.ord(ch) <= 32){
			return true;
		}
		return false;
	}
	/**
	 * Skip system char. Throws error if EOF.
	 */
	skipSystemChar(){
		var look = this.lookChar();
		while (this.isSkipChar(look) && !this.isEOF()){
			this.moveChar(look);
			look = this.lookChar();
			if (look == ""){
				break;
			}
		}
	}
	/**
	 * Assign new value of the start position
	 */
	initStartPos(){
		this.start_pos = this.pos;
		this.start_line = this.line;
		this.start_col = this.col;
	}
	/**
	 * Init read next token
	 */
	readNextTokenInit(){
		this.tp = BayrellLang.Parser.ParserToken.TOKEN_NONE;
		this.token = "";
		this.success = false;
		this.start_line = this.line;
		this.start_col = this.col;
		this.start_pos = this.pos;
		if (this.isEOF()){
			throw new BayrellLang.Parser.Exceptions.ParserEOF(this.context());
		}
	}
	/**
	 * Read base next token
	 */
	readNextTokenBase(){
		var look = this.lookChar();
		this.tp = BayrellLang.Parser.ParserToken.TOKEN_BASE;
		this.success = true;
		this.token = look;
		this.moveChar(look);
		if (this.isTokenChar(look)){
			try{
				look = this.lookChar();
				while (this.isTokenChar(look) && !this.isEOF()){
					this.token = Runtime.rtl.toString(this.token)+Runtime.rtl.toString(look);
					this.moveChar(look);
					look = this.lookChar();
				}
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
					if (e instanceof BayrellLang.Parser.Exceptions.ParserEOF){
					}
					else {
						throw e;
					}
				}
				else { throw _the_exception; }
			}
		}
	}
	/**
	 * Get next token without move cursor pos. Throws error if EOF.
	 * @param {BayrellLang.ParserToken} token
	 */
	readNextToken(){
		/* Init next token function */
		this.readNextTokenInit();
		this.skipSystemChar();
		this.initStartPos();
		/* Read base token */
		this.readNextTokenBase();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Parser.ParserToken";}
	static getCurrentNamespace(){return "BayrellLang.Parser";}
	static getCurrentClassName(){return "BayrellLang.Parser.ParserToken";}
	static getParentClassName(){return "BayrellLang.Parser.ParserReader";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.TOKEN_NONE = "none";
		this.TOKEN_BASE = "base";
		this.token = "";
		this.tp = "";
		this.start_pos = 0;
		this.start_line = 1;
		this.start_col = 1;
		this.success = false;
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
BayrellLang.Parser.ParserToken.TOKEN_NONE = "none";
BayrellLang.Parser.ParserToken.TOKEN_BASE = "base";