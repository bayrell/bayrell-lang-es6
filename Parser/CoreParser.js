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
BayrellLang.Parser.CoreParser = class extends Runtime.ContextObject{
	/**
	 * Parser result
	 */
	/**
	 * Tab space count
	 */
	/**
	 * Current content of the file
	 */
	/**
	 * Size of the content
	 */
	/**
	 * Current file name
	 */
	/**
	 * Current token
	 */
	/**
	 * Next token
	 */
	/**
	 * Token stack
	 */
	/**
	 * Constructor
	 */
	constructor(context){
		if (context == undefined) context=null;
		super(context);
		this.current_token = this.createToken();
		this.next_token = this.createToken();
		this._token_stack = new Runtime.Vector();
	}
	/**
	 * Destructor
	 */
	destructor(){
	}
	/**
	 * Get tab size
	 * @return {int}
	 */
	getTabSize(){
		return this.tab_space_count;
	}
	/**
	 * Set content of the file
	 * @param {string} content - content
	 */
	setContent(content){
		this._content = content;
		this._content_size = Runtime.rs.strlen(this._content);
	}
	/**
	 * Get content of the file
	 * @return {string}
	 */
	getContent(){
		return this._content;
	}
	/**
	 * Get char of the content
	 * @return {char}
	 */
	getContentPos(pos){
		return this._content[pos];
	}
	/**
	 * Get content size
	 * @return {int}
	 */
	getContentSize(){
		return this._content_size;
	}
	/**
	 * Get content string
	 * @return {int} pos
	 * @return {int} len 
	 * @return {string}
	 */
	getContentString(pos, len){
		return Runtime.rs.substr(this._content, pos, len);
	}
	/**
	 * Set new file name
	 * @param {string} file_name
	 */
	setFileName(file_name){
		this._file_name = file_name;
	}
	/**
	 * Get file name
	 * @return {string}
	 */
	getFileName(file_name){
		return this._file_name;
	}
	/**
	 * Read token
	 * @param {BayrellLang.ParserToken} token
	 */
	readAnyNextToken(){
		this.current_token.assign(this.next_token);
		try{
			this.next_token.readNextToken();
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
		return this.current_token;
	}
	/**
	 * Read token
	 * @param {BayrellLang.ParserToken} token
	 */
	readNextToken(tp, error_message){
		if (tp == undefined) tp="base";
		if (error_message == undefined) error_message="Base token";
		if (this.lookNextTokenType() != tp){
			throw this.nextTokenExpected(error_message);
		}
		return this.readAnyNextToken();
	}
	/**
	 * Return true if EOF
	 * @param boolean
	 */
	isEOF(){
		return this.next_token.isEOF();
	}
	/**
	 * Throws expected error
	 */
	nextTokenExpected(message){
		var start_line = this.next_token.start_line;
		var start_col = this.next_token.start_col;
		if (message == "\n"){
			return new BayrellLang.Parser.Exceptions.ParserExpected("new line", start_line, start_col, "", this.context());
		}
		else {
			return new BayrellLang.Parser.Exceptions.ParserExpected(message, start_line, start_col, "", this.context());
		}
	}
	/**
	 * Throws expected error
	 */
	parserExpected(message){
		var start_line = this.next_token.start_line;
		var start_col = this.next_token.start_col;
		return new BayrellLang.Parser.Exceptions.ParserExpected(message, start_line, start_col, "", this.context());
	}
	/**
	 * Throws expected error
	 */
	parserError(message){
		var start_line = this.next_token.start_line;
		var start_col = this.next_token.start_col;
		return new BayrellLang.Parser.Exceptions.ParserLinePosError(message, start_line, start_col, "", -1, this.context());
	}
	/**
	 * Return next token
	 * @return {string} - Content of the next token
	 */
	lookNextToken(){
		return this.next_token.token;
	}
	/**
	 * Return next token type
	 * @return {string} - Token type
	 */
	lookNextTokenType(){
		return this.next_token.tp;
	}
	/**
	 * Find next token
	 * @param {string} token - Content of next token
	 * @param {string} tp - Type of the token
	 * @return {bool} - Return true if next token is equal token and tp
	 */
	findNextToken(token, tp){
		if (tp == undefined) tp="base";
		return this.next_token.token == token && this.next_token.tp == tp;
	}
	/**
	 * Find next token
	 * @param {Vector<string>} tokens - Vector of next token
	 * @param {string} tp - Type of the token
	 * @return int - Return -1 if token does not match
	 */
	findNextTokenVector(tokens, tp){
		if (tp == undefined) tp="base";
		if (this.next_token.tp != tp){
			return -1;
		}
		return tokens.indexOf(this.next_token.token);
	}
	/**
	 * Find next string
	 * @param {string} str - Find string
	 * @return {bool} - Return true if string found
	 */
	findNextString(str){
		return this.current_token.findString(str);
	}
	/**
	 * Read string until next string is not equal find_str. Throws error if EOF.
	 * @param {string} str - Find string
	 * @return {bool} - Return true if string found
	 */
	readUntilString(str, flag_read_last){
		if (flag_read_last == undefined) flag_read_last=true;
		var s = this.current_token.readUntilString(str, flag_read_last);
		this.assignCurrentToken(this.current_token);
		return s;
	}
	/**
	 * Check next string == look_str
	 * @param {string} look_str
	 */
	matchNextToken(look_str, tp){
		if (tp == undefined) tp="base";
		if (this.findNextToken(look_str, tp)){
			this.readAnyNextToken();
			return ;
		}
		throw this.nextTokenExpected(look_str);
	}
	/**
	 * Check next string == look_str
	 * @param {string} look_str
	 */
	matchNextString(look_str){
		if (this.current_token.findString(look_str)){
			var s = this.current_token.moveString(look_str);
			this.assignCurrentToken(this.current_token);
			return ;
		}
		throw this.nextTokenExpected(look_str);
	}
	/**
	 * Tokens Fabric
	 * @return BayrellLang.ParserToken
	 */
	createToken(){
		return new BayrellLang.Parser.ParserToken(this.context(), this);
	}
	/**
	 * Push token
	 */
	pushToken(new_token){
		if (new_token == undefined) new_token=null;
		var res = new BayrellLang.Parser.TokenPair(this.current_token, this.next_token);
		this._token_stack.push(res);
		if (new_token == null){
			this.current_token = Runtime.rtl._clone(this.current_token);
			this.next_token = Runtime.rtl._clone(this.next_token);
		}
		else {
			this.current_token = Runtime.rtl._clone(this.current_token);
			new_token.assign(this.current_token);
			new_token.readNextToken();
			this.next_token = new_token;
		}
	}
	/**
	 * Pop token
	 */
	popToken(){
		return this._token_stack.pop();
	}
	/**
	 * Pop token and assign
	 */
	popRollbackToken(){
		var res = this.popToken();
		this.current_token = res.current_token;
		this.next_token = res.next_token;
	}
	/**
	 * Assign current token
	 */
	assignCurrentToken(new_token){
		if (new_token == undefined) new_token=null;
		this.current_token.assign(new_token);
		this.next_token.assign(new_token);
		this.next_token.readNextToken();
	}
	/**
	 * Assign next token
	 */
	assignNextToken(new_token){
		if (new_token == undefined) new_token=null;
		this.next_token.assign(new_token);
	}
	/**
	 * Pop and assign next token
	 */
	popRestoreToken(){
		var old_current_token = this.current_token;
		var old_next_token = this.next_token;
		var res = this.popToken();
		this.current_token = res.current_token;
		this.next_token = res.next_token;
		this.current_token.assign(old_current_token);
		this.next_token.assign(old_current_token);
		this.next_token.readNextToken();
	}
	/**
	 * Reset parser to default settings
	 */
	resetParser(){
		this.the_result = null;
		this.current_token.reset();
		this.next_token.reset();
		this.readAnyNextToken();
	}
	/**
	 * Parser function
	 */
	runParser(){
	}
	/**
	 * Parse content
	 */
	parseContent(){
		this.resetParser();
		this.runParser();
	}
	/**
	 * Parse string
	 * @param {string} s
	 */
	parseString(s){
		this.setContent(s);
		this.parseContent();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Parser.CoreParser";}
	static getCurrentNamespace(){return "BayrellLang.Parser";}
	static getCurrentClassName(){return "BayrellLang.Parser.CoreParser";}
	static getParentClassName(){return "Runtime.ContextObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.the_result = null;
		this.tab_space_count = 4;
		this._content = "";
		this._content_size = 0;
		this._file_name = "";
		this.current_token = null;
		this.next_token = null;
		this._token_stack = null;
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(BayrellLang.Parser.Interfaces.ParserInterface);
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
BayrellLang.Parser.CoreParser.__static_implements__ = [];
BayrellLang.Parser.CoreParser.__static_implements__.push(BayrellLang.Parser.Interfaces.ParserInterface)