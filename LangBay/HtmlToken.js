"use strict;"
/*!
 *  Bayrell Template Engine
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
BayrellLang.LangBay.HtmlToken = class extends BayrellParser.ParserToken{
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		return new BayrellLang.LangBay.HtmlToken(this.context(), this.parser);
	}
	/**
	 * Returns special tokens
	 */
	static getSpecialTokens(){
		return (new Runtime.Vector()).push("...").push("@json{").push("@raw{").push("@{").push("<!--").push("-->").push("<!").push("</").push("/>").push("/*").push("*/");
	}
	/**
	 * Constructor
	 */
	constructor(context, parser){
		if (context == undefined) context=null;
		if (parser == undefined) parser=null;
		super(context, parser);
		this._special_tokens = BayrellLang.LangBay.HtmlToken.getSpecialTokens();
	}
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar(ch){
		return Runtime.rs.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_-", Runtime.rs.strtolower(ch)) !== -1;
	}
	/**
	 * Read comments
	 */
	readComment(open_tag){
		var res = "";
		var ch = "";
		var look = "";
		this.moveString(open_tag);
		while (!this.isEOF()){
			ch = this.lookChar();
			look = this.lookString(2);
			if (look == "*/"){
				break;
			}
			res += ch;
			this.moveChar(ch);
		}
		if (look == "*/"){
			this.moveString(look);
		}
		else {
			throw new BayrellParser.Exceptions.ParserEOF(this.context(), start_line, start_col);
		}
		return res;
	}
	/**
	 * Get next token without move cursor pos. Throws error if EOF.
	 * @param {BayrellParserToken} token
	 */
	readNextToken(){
		/* Init next token function */
		this.readNextTokenInit();
		this.skipSystemChar();
		this.initStartPos();
		/* Read comment */
		var look = this.lookString(2);
		if (look == "/*"){
			this.tp = BayrellLang.LangBay.HtmlToken.TOKEN_COMMENT;
			this.token = this.readComment(look);
			this.success = true;
			return ;
		}
		var pos = this.findVector(this._special_tokens);
		if (pos >= 0){
			this.tp = BayrellLang.LangBay.HtmlToken.TOKEN_BASE;
			this.token = this._special_tokens.item(pos);
			this.success = true;
			this.readString(Runtime.rs.strlen(this.token));
			return ;
		}
		this.readNextTokenBase();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangBay.HtmlToken";}
	static getParentClassName(){return "BayrellParser.ParserToken";}
	_init(){
		super._init();
		this.TOKEN_NONE = "none";
		this.TOKEN_BASE = "base";
		this.TOKEN_HTML = "html";
		this.TOKEN_STRING = "string";
		this.TOKEN_COMMENT = "comment";
		this._special_tokens = null;
	}
}
BayrellLang.LangBay.HtmlToken.TOKEN_NONE = "none";
BayrellLang.LangBay.HtmlToken.TOKEN_BASE = "base";
BayrellLang.LangBay.HtmlToken.TOKEN_HTML = "html";
BayrellLang.LangBay.HtmlToken.TOKEN_STRING = "string";
BayrellLang.LangBay.HtmlToken.TOKEN_COMMENT = "comment";