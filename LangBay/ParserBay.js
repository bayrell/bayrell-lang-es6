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
BayrellLang.LangBay.ParserBay = class extends BayrellLang.CommonParser{
	/**
	 * Tokens Fabric
	 * @return BayrellParserToken
	 */
	createToken(){
		return new BayrellLang.LangBay.ParserBayToken(this.context(), this);
	}
	/**
	 * Get module name
	 */
	getModuleName(name){
		if (this.modules.has(name)){
			return this.modules.item(name);
		}
		return name;
	}
	/**
	 * Read double value and
	 * @return BaseOpCode
	 */
	readFixed(){
		var res = "";
		/* Try to read HEX Number */
		this.pushToken();
		try{
			res = this.matchHexNumber();
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof BayrellLang.Exceptions.HexNumberExpected){
					throw ex;
				}
				else if (ex instanceof BayrellParser.Exceptions.ParserError){
					res = null;
				}
				else {
					throw ex;
				}
			}
			else { throw _the_exception; }
		}
		if (res != null){
			this.popToken();
			return new BayrellLang.OpCodes.OpHexNumber(res);
		}
		else {
			this.popRollbackToken();
		}
		this.pushToken();
		try{
			res = this.matchDouble();
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof BayrellParser.Exceptions.ParserError){
					res = null;
				}
				else {
					throw ex;
				}
			}
			else { throw _the_exception; }
		}
		if (res != null){
			this.popToken();
			return new BayrellLang.OpCodes.OpNumber(res);
		}
		else {
			this.popRollbackToken();
		}
		if (this.lookNextTokenType() == BayrellLang.LangBay.ParserBayToken.TOKEN_STRING){
			return new BayrellLang.OpCodes.OpString(this.readAnyNextToken().token);
		}
		return null;
	}
	/**
	 * Read name
	 */
	readIdentifierName(){
		var res = this.lookNextToken();
		var s = Runtime.rs.charAt(res, 0);
		if (!this.isLetterChar(s) && s != "_"){
			throw this.parserError(this.translate("ERROR_PARSER_FIRST_CHAR_MUST_BE_LETTER"));
		}
		this.readNextToken();
		return res;
	}
	/**
	 * Read name
	 */
	readDynamicName(){
		/* Create new token */
		var next_token = new BayrellLang.LangBay.ParserBayNameToken(this.context(), this);
		this.pushToken(next_token);
		/* Get name */
		var name = next_token.token;
		/* Assign next token */
		this.popRollbackToken();
		this.assignCurrentToken(next_token);
		return name;
	}
	/**
	 * Read Identifier
	 * @return OpIdentifier
	 */
	readIdentifier(){
		var res = this.readIdentifierName();
		return new BayrellLang.OpCodes.OpIdentifier(res);
	}
	/**
	 * Read call args
	 * @return BaseOpCode
	 */
	readCallArgs(){
		var v = new Runtime.Vector();
		var op_code = this.readExpression();
		v.push(op_code);
		while (this.findNextToken(",")){
			this.matchNextToken(",");
			op_code = this.readExpression();
			v.push(op_code);
		}
		return v;
	}
	/**
	 * Read call body
	 * @return BaseOpCode
	 */
	readCallBody(){
		var v = null;
		this.matchNextToken("(");
		if (!this.findNextToken(")")){
			v = this.readCallArgs();
		}
		this.matchNextToken(")");
		return v;
	}
	/**
	 * Read new or await function
	 */
	readGroupExpression(){
		if (this.findNextToken("(")){
			this.matchNextToken("(");
			var op_code = this.readExpression();
			this.matchNextToken(")");
			return op_code;
		}
		return this.readIdentifier();
	}
	/**
	 * Read new instance
	 * @return BaseOpCode
	 */
	readNewInstance(){
		this.matchNextToken("new");
		var ident = this.readTemplateIdentifier();
		if (this.findNextToken("(")){
			var v = this.readCallBody();
			return new BayrellLang.OpCodes.OpNew(ident, v);
		}
		else if (this.findNextToken("{")){
			var v = this.readMap();
			return new BayrellLang.OpCodes.OpNew(ident, (new Runtime.Vector()).push(v));
		}
		return new BayrellLang.OpCodes.OpNew(ident);
	}
	/**
	 * Read call await
	 * @return BaseOpCode
	 */
	readCallAwait(){
		this.matchNextToken("await");
		var obj = this.readCallDynamic(true, true, true, false);
		var v = this.readCallBody();
		obj = new BayrellLang.OpCodes.OpCall(obj, v);
		obj.is_await = true;
		return obj;
	}
	/**
	 * Read clone
	 * @return BaseOpCode
	 */
	readClone(){
		this.matchNextToken("clone");
		var value = this.readExpression();
		return new BayrellLang.OpCodes.OpClone(value);
	}
	/**
	 * Read method
	 * @return BaseOpCode
	 */
	readMethod(){
		this.matchNextToken("method");
		if (this.findNextToken("(")){
			this.matchNextToken("(");
			var class_name = this.readExpression();
			this.matchNextToken(",");
			var method_name = this.readExpression();
			this.matchNextToken(")");
			return new BayrellLang.OpCodes.OpCall(new BayrellLang.OpCodes.OpStatic(new BayrellLang.OpCodes.OpIdentifier("rtl"), "method"), (new Runtime.Vector()).push(class_name).push(method_name));
		}
		var value = this.readCallDynamic(true, false, true, false);
		return new BayrellLang.OpCodes.OpMethod(value);
	}
	/**
	 * Read pipe
	 * @return BaseOpCode
	 */
	readPipe(){
		var item = null;
		var items = new Runtime.Vector();
		var is_return_value = false;
		var value = null;
		this.matchNextToken("pipe");
		this.matchNextToken("(");
		if (!this.findNextToken(")")){
			value = this.readExpression();
		}
		this.matchNextToken(")");
		while (this.findNextToken(">>")){
			this.matchNextToken(">>");
			if (this.findNextToken("method")){
				item = this.readMethod();
			}
			else if (this.findNextToken("value")){
				break;
			}
			else {
				item = this.readCallDynamic(true, true, true, true);
			}
			items.push(item);
		}
		if (this.findNextToken("value")){
			this.matchNextToken("value");
			is_return_value = true;
		}
		return new BayrellLang.OpCodes.OpPipe((new Runtime.Map()).set("value", value).set("items", items).set("is_return_value", is_return_value));
	}
	/**
	 * Read get class name
	 */
	readClassName(){
		if (this.findNextToken("class")){
			this.matchNextToken("class");
			this.matchNextToken("of");
			var value = this.readIdentifierName();
			return new BayrellLang.OpCodes.OpClassName(value);
		}
		if (this.findNextToken("classof")){
			this.matchNextToken("classof");
			var value = this.readIdentifierName();
			return new BayrellLang.OpCodes.OpClassName(value);
		}
		return null;
	}
	/**
	 * Read call dynamic
	 * @return BaseOpCode
	 */
	readCallDynamic(allow_dynamic, allow_bracket, allow_static, allow_call){
		if (allow_dynamic == undefined) allow_dynamic=true;
		if (allow_bracket == undefined) allow_bracket=true;
		if (allow_static == undefined) allow_static=true;
		if (allow_call == undefined) allow_call=true;
		var name = "";
		var can_static = true;
		var obj = this.readGroupExpression();
		var ident = null;
		while (this.findNextToken(".") && allow_dynamic || this.findNextToken("[") && allow_bracket || this.findNextToken("::") && allow_static || this.findNextToken("(") && allow_call){
			if (this.findNextToken(".") && allow_dynamic){
				this.matchNextToken(".");
				name = this.readIdentifierName();
				obj = new BayrellLang.OpCodes.OpDynamic(obj, name);
			}
			else if (this.findNextToken("[") && allow_bracket){
				this.matchNextToken("[");
				ident = this.readExpression();
				this.matchNextToken("]");
				obj = new BayrellLang.OpCodes.OpStringItem(obj, ident);
			}
			else if (this.findNextToken("::") && allow_static){
				if (!can_static){
					throw this.parserError(this.translate("ERROR_PARSER_STATIC_METHOD_IS_NOT_ALOWED_HERE"));
				}
				this.matchNextToken("::");
				name = this.readIdentifierName();
				obj = new BayrellLang.OpCodes.OpStatic(obj, name);
				can_static = false;
			}
			else if (this.findNextToken("(") && allow_call){
				var v = this.readCallBody();
				obj = new BayrellLang.OpCodes.OpCall(obj, v);
				can_static = false;
			}
		}
		return obj;
	}
	/**
	 * Read type identifier
	 * @return BaseOpCode
	 */
	readTemplateIdentifier(){
		var op_code1 = this.readCallDynamic(true, false, false, false);
		if (!this.findNextToken("<")){
			return op_code1;
		}
		var v = new Runtime.Vector();
		this.matchNextToken("<");
		while (true){
			var op_code2 = this.readCallDynamic(true, false, false, false);
			v.push(op_code2);
			if (this.findNextToken(",")){
				this.matchNextToken(",");
				continue;
			}
			break;
		}
		this.matchNextToken(">");
		return new BayrellLang.OpCodes.OpTemplateIdentifier(op_code1, v);
	}
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readVector(){
		var res = new BayrellLang.OpCodes.OpVector();
		this.matchNextToken("[");
		while (!this.findNextToken("]")){
			res.values.push(this.readExpression());
			if (this.findNextToken(",")){
				this.matchNextToken(",");
			}
		}
		this.matchNextToken("]");
		return res;
	}
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readMap(){
		var res = new BayrellLang.OpCodes.OpMap();
		this.matchNextToken("{");
		while (!this.findNextToken("}")){
			if (this.lookNextTokenType() != BayrellLang.LangBay.ParserBayToken.TOKEN_STRING){
				throw this.parserExpected("string");
			}
			var key = this.readAnyNextToken().token;
			this.matchNextToken(":");
			var value = this.readExpression();
			res.values.set(key, value);
			if (this.findNextToken(",")){
				this.matchNextToken(",");
			}
		}
		this.matchNextToken("}");
		return res;
	}
	/* ============== HTML Template Parser ============== */
	/**
	 * Read Html Comment
	 */
	readHtmlComment(){
		this.matchNextToken("<!--");
		var res_str = this.current_token.readUntilString("-->", false);
		this.assignCurrentToken(this.current_token);
		this.matchNextToken("-->");
		return new BayrellLang.OpCodes.OpHtmlText("<!--"+Runtime.rtl.toString(res_str)+"-->");
	}
	/**
	 * Read Html Doctype
	 */
	readHtmlDOCTYPE(){
		var s = this.current_token.readUntilString(">", false);
		this.assignCurrentToken(this.current_token);
		var res = new BayrellLang.OpCodes.OpHtmlText("<!"+Runtime.rtl.toString(Runtime.rs.trim(s))+">");
		this.matchNextToken(">");
		return res;
	}
	/**
	 * Add attribute
	 */
	addAttribute(attributes, attr){
		var pos = -1;
		for (var i = 0; i < attributes.count(); i++){
			if (attributes.item(i).key == attr.key){
				pos = i;
				break;
			}
		}
		if (pos == -1){
			attributes.push(attr);
		}
		else {
			attributes[i].value = new BayrellLang.OpCodes.OpConcat(attributes[i].value, new BayrellLang.OpCodes.OpString(" "));
			attributes[i].value = new BayrellLang.OpCodes.OpConcat(attributes[i].value, attr.value);
		}
	}
	/**
	 * Read Html Attributes
	 */
	readHtmlAttributes(op_code){
		if (this.findNextToken(">")){
			return null;
		}
		var spreads = new Runtime.Vector();
		var attributes = new Runtime.Vector();
		while (!this.findNextToken(">") && !this.findNextToken("/>")){
			if (this.findNextToken("...")){
				this.matchNextToken("...");
				var spread_name = this.readIdentifierName();
				spreads.push(spread_name);
				continue;
			}
			var spec_attr = false;
			var attr = new BayrellLang.OpCodes.OpHtmlAttribute();
			if (this.findNextToken("@")){
				spec_attr = true;
				this.matchNextToken("@");
				attr.key = "@"+Runtime.rtl.toString(this.readNextToken().token);
			}
			else {
				attr.key = this.readNextToken().token;
			}
			if (attr.key == "@lambda"){
				attr.value = this.readDeclareFunctionHeader(new BayrellLang.OpCodes.OpFunctionDeclare());
			}
			else if (this.findNextToken("=")){
				this.matchNextToken("=");
				if (this.findNextToken("'") || this.findNextToken("\"")){
					this.pushToken(new BayrellLang.LangBay.ParserBayToken(this.context(), this));
					attr.value = new BayrellLang.OpCodes.OpString(this.readAnyNextToken().token);
					this.popRestoreToken();
				}
				else if (this.findNextToken("@{") || this.findNextToken("{")){
					if (this.findNextToken("@{")){
						this.matchNextToken("@{");
					}
					else if (this.findNextToken("{")){
						this.matchNextToken("{");
					}
					this.pushToken(new BayrellLang.LangBay.ParserBayToken(this.context(), this));
					attr.value = this.readExpression();
					this.popRestoreToken();
					this.matchNextToken("}");
				}
				else {
					throw this.parserError("Unknown token "+Runtime.rtl.toString(this.next_token.token));
				}
			}
			else {
				attr.bracket = "\"";
				attr.value = new BayrellLang.OpCodes.OpString(attr.key);
			}
			this.addAttribute(attributes, attr);
		}
		op_code.spreads = spreads;
		op_code.attributes = attributes;
	}
	/**
	 * Read Html Expression
	 */
	readHtmlBlock(match_str, is_plain){
		if (is_plain == undefined) is_plain=false;
		var len_match = Runtime.rs.strlen(match_str);
		if (len_match == 0){
			return null;
		}
		var look_str = this.current_token.lookString(len_match);
		var childs = new Runtime.Vector();
		var special_tokens = BayrellLang.LangBay.HtmlToken.getSpecialTokens();
		special_tokens.removeValue("{");
		special_tokens.removeValue("@{");
		special_tokens.removeValue("@raw{");
		special_tokens.removeValue("@json{");
		/*special_tokens.removeValue("@code{");*/
		special_tokens.removeValue("<!--");
		var bracket_level = 0;
		var s = "";
		var is_next_html_token = false;
		var is_next_special_token = false;
		var is_prev_special_token = false;
		/* Main loop */
		while (look_str != "" && !this.current_token.isEOF() && (look_str != match_str || look_str == "}" && bracket_level > 0)){
			is_next_html_token = this.current_token.findString("<");
			is_next_special_token = this.current_token.findVector(special_tokens) != -1;
			var res = null;
			if (!is_plain){
				if (is_next_special_token || is_next_html_token){
					if (is_next_special_token || is_prev_special_token){
						s = Runtime.rs.trim(s, "\\t\\r\\n");
					}
					else {
						s = Runtime.rs.trim(s, "\\t\\r\\n");
					}
					if (s != ""){
						childs.push(new BayrellLang.OpCodes.OpHtmlText(s));
					}
					s = "";
					this.assignCurrentToken(this.current_token);
					res = this.readHtmlTag();
					is_prev_special_token = false;
				}
			}
			if (res == null){
				if (this.current_token.findString("{") || this.current_token.findString("@{") || this.current_token.findString("@raw{") || this.current_token.findString("@json{")){
					if (!is_plain){
						s = Runtime.rs.trim(s, "\\t\\r\\n");
					}
					if (s != ""){
						childs.push(new BayrellLang.OpCodes.OpHtmlText(s));
					}
					s = "";
					var is_raw = false;
					var is_json = false;
					var is_code = false;
					if (this.current_token.findString("@raw{")){
						is_raw = true;
						this.current_token.match("@raw{");
					}
					else if (this.current_token.findString("@json{")){
						is_json = true;
						this.current_token.match("@json{");
					}
					else if (this.current_token.findString("@code{")){
						is_code = true;
						this.current_token.match("@code{");
					}
					else if (this.current_token.findString("@{")){
						this.current_token.match("@{");
					}
					else if (this.current_token.findString("{")){
						this.current_token.match("{");
					}
					this.assignCurrentToken(this.current_token);
					this.pushToken(new BayrellLang.LangBay.ParserBayToken(this.context(), this));
					res = this.readExpression();
					if (is_raw){
						res = new BayrellLang.OpCodes.OpHtmlRaw(res);
					}
					else if (is_json){
						res = new BayrellLang.OpCodes.OpHtmlJson(res);
					}
					else if (is_code){
						res = new BayrellLang.OpCodes.OpHtmlRaw(res);
					}
					else {
						res = new BayrellLang.OpCodes.OpHtmlEscape(res);
					}
					this.popRestoreToken();
					this.matchNextToken("}");
					is_prev_special_token = true;
				}
			}
			if (res != null){
				childs.push(res);
			}
			else {
				var look = this.current_token.readChar();
				s = Runtime.rtl.toString(s)+Runtime.rtl.toString(look);
				if (look == "{"){
					bracket_level++;
				}
				else if (look == "}"){
					bracket_level--;
				}
			}
			look_str = this.current_token.lookString(len_match);
		}
		if (!is_plain){
			if (is_prev_special_token){
				s = Runtime.rs.trim(s, "\\t\\r\\n");
			}
			else {
				s = Runtime.rs.trim(s, "\\t\\r\\n");
			}
		}
		if (s != ""){
			childs.push(new BayrellLang.OpCodes.OpHtmlText(s));
		}
		this.assignCurrentToken(this.current_token);
		return childs;
	}
	/**
	 * Read Html tag
	 * @return BaseOpCode
	 */
	readHtmlTag(){
		if (this.lookNextTokenType() == BayrellLang.LangBay.ParserBayToken.TOKEN_COMMENT){
			return new BayrellLang.OpCodes.OpComment(this.readAnyNextToken().token);
		}
		else if (this.findNextToken("<!--")){
			return this.readHtmlComment();
		}
		else if (this.findNextToken("<!")){
			this.matchNextToken("<!");
			if (this.findNextString("DOCTYPE")){
				return this.readHtmlDOCTYPE();
			}
		}
		else if (this.findNextToken("<")){
			this.matchNextToken("<");
			if (this.findNextToken(">")){
				this.matchNextToken(">");
				var res = new BayrellLang.OpCodes.OpHtmlView(this.readHtmlBlock("</>"));
				if (res.childs != null && res.childs.count() == 1){
					res = res.childs.item(0);
				}
				this.matchNextToken("</");
				this.matchNextToken(">");
				return res;
			}
			var res = new BayrellLang.OpCodes.OpHtmlTag();
			res.tag_name = this.readNextToken().token;
			this.readHtmlAttributes(res);
			var childs_function = null;
			if (this.findNextToken("/>")){
				this.matchNextToken("/>");
			}
			else {
				this.matchNextToken(">");
				var close_tag = "</"+Runtime.rtl.toString(res.tag_name)+">";
				if (res.tag_name == "script" || res.tag_name == "pre" || res.tag_name == "textarea"){
					res.is_plain = true;
					res.childs = this.readHtmlBlock("</"+Runtime.rtl.toString(res.tag_name)+">", true);
				}
				else if (this.findNextToken("lambda") || this.findNextToken("pure")){
					this.assignCurrentToken(this.current_token);
					this.pushToken(new BayrellLang.LangBay.ParserBayToken(this.context(), this));
					childs_function = this.readDeclareFunction(false);
					this.popRestoreToken();
				}
				else {
					res.childs = this.readHtmlBlock("</");
				}
				this.matchNextToken("</");
				this.matchNextToken(res.tag_name);
				this.matchNextToken(">");
			}
			if (childs_function != null){
				res.setAttribute("@lambda", childs_function);
				if (res.childs){
					res.childs.clear();
				}
			}
			else {
				var op_code = res.findAttribute("@lambda");
				if (op_code != null && op_code.value instanceof BayrellLang.OpCodes.OpFunctionDeclare){
					op_code.value.is_lambda = true;
					if (res.childs != null){
						op_code.value.childs = res.childs.copy();
						res.childs.clear();
					}
				}
			}
			return res;
		}
		return null;
	}
	/**
	 * Read Html
	 * @return BaseOpCode
	 */
	readHtml(){
		/* Skip comments */
		var old_skip_comments = this.skip_comments;
		this.skip_comments = false;
		/* Push new token */
		this.pushToken(new BayrellLang.LangBay.HtmlToken(this.context(), this));
		/* Read Html tag */
		this.current_token.skipSystemChar();
		/* Read Html View */
		var res = new BayrellLang.OpCodes.OpHtmlView();
		res.childs = new Runtime.Vector();
		while (this.findNextToken("<") || this.findNextToken("<!")){
			res.childs.push(this.readHtmlTag());
		}
		if (res.childs == null){
			this.popRestoreToken();
			return null;
		}
		if (res.childs.count() == 0){
			this.popRestoreToken();
			return null;
		}
		this.popRestoreToken();
		this.skip_comments = old_skip_comments;
		return res;
	}
	/**
	 * Read CSS Selector
	 */
	readCssSelector(look){
		var s = "";
		s = this.current_token.readUntilVector((new Runtime.Vector()).push(",").push("%").push("{"));
		if (s == ""){
			return "";
		}
		if (look != "%"){
			return s;
		}
		var pos = 0;
		var sz = Runtime.rs.strlen(s);
		var class_name = Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name);
		/* Read class name */
		if (s[0] == "("){
			while (pos < sz && s[pos] != ")"){
				pos++;
			}
			class_name = Runtime.rs.substr(s, 1, pos - 1);
			class_name = this.getModuleName(class_name);
			s = Runtime.rs.substr(s, pos + 1);
		}
		pos = 0;
		sz = Runtime.rs.strlen(s);
		while (pos < sz && s[pos] != " " && s[pos] != "." && s[pos] != ":" && s[pos] != "["){
			pos++;
		}
		/* Get component name and postfix */
		var name = "";
		var postfix = "";
		if (pos == sz){
			name = s;
		}
		else {
			name = Runtime.rs.substr(s, 0, pos);
			postfix = Runtime.rs.substr(s, pos, sz - pos);
		}
		var hash = "-"+Runtime.rtl.toString(Runtime.RuntimeUtils.getCssHash(class_name));
		return Runtime.rtl.toString(name)+Runtime.rtl.toString(hash)+Runtime.rtl.toString(postfix);
	}
	/**
	 * Add OpCode
	 * @return BaseOpCode
	 */
	readCssAddOpCode(current_op_code, s, new_op_code){
		if (s != ""){
			if (current_op_code == null){
				current_op_code = new BayrellLang.OpCodes.OpString(s);
			}
			else {
				current_op_code = new BayrellLang.OpCodes.OpConcat(current_op_code, new BayrellLang.OpCodes.OpString(s));
			}
		}
		if (new_op_code != null){
			current_op_code = new BayrellLang.OpCodes.OpConcat(current_op_code, new_op_code);
		}
		return current_op_code;
	}
	/**
	 * Read CSS
	 * @return BaseOpCode
	 */
	readCss(){
		this.matchNextToken("{");
		var op_code = null;
		var s = "";
		var look_str = this.current_token.lookString(1);
		var match_str = "}";
		var bracket_level = 0;
		var flag_is_media = false;
		var flag_is_css_body = false;
		/* Main loop */
		while (look_str != "" && !this.current_token.isEOF() && (look_str != match_str || look_str == "}" && bracket_level > 0)){
			var look = this.current_token.readChar();
			if (look == "$"){
				this.assignCurrentToken(this.current_token);
				this.pushToken(new BayrellLang.LangBay.ParserBayToken(this.context(), this));
				if (this.findNextToken("{")){
					this.matchNextToken("{");
					op_code = this.readCssAddOpCode(op_code, s, this.readExpressionElement());
					s = "";
					this.matchNextToken("}");
				}
				else {
					var name = this.readIdentifierName();
					op_code = this.readCssAddOpCode(op_code, s, new BayrellLang.OpCodes.OpIdentifier(name));
					s = "";
				}
				this.popRestoreToken();
			}
			else if ((look == "." || look == "%") && !flag_is_media && !flag_is_css_body){
				s = Runtime.rtl.toString(s)+"."+Runtime.rtl.toString(this.readCssSelector(look));
			}
			else if (look != "\t" && look != "\n" && look != "\r"){
				s = Runtime.rtl.toString(s)+Runtime.rtl.toString(look);
			}
			if (look == "@" && this.current_token.lookString(5) == "media"){
				flag_is_media = true;
			}
			if (look == "{"){
				if (!flag_is_media){
					flag_is_css_body = true;
				}
				flag_is_media = false;
				bracket_level++;
			}
			else if (look == "}"){
				flag_is_css_body = false;
				bracket_level--;
			}
			look_str = this.current_token.lookString(1);
		}
		this.assignCurrentToken(this.current_token);
		op_code = this.readCssAddOpCode(op_code, s, null);
		this.matchNextToken("}");
		return op_code;
	}
	/* ============== Read Expression ============== */
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readExpressionElement(){
		if (this.findNextToken("@") && this.next_token.lookString(3) == "css"){
			this.matchNextToken("@");
			this.matchNextToken("css");
			return this.readCss();
		}
		else if (this.findNextToken("new")){
			return this.readNewInstance();
		}
		else if (this.findNextToken("clone")){
			return this.readClone();
		}
		else if (this.findNextToken("class")){
			return this.readClassName();
		}
		else if (this.findNextToken("classof")){
			return this.readClassName();
		}
		else if (this.findNextToken("method")){
			return this.readMethod();
		}
		else if (this.findNextToken("pipe")){
			return this.readPipe();
		}
		else if (this.findNextToken("[")){
			return this.readVector();
		}
		else if (this.findNextToken("{")){
			return this.readMap();
		}
		var op_code = this.readFixed();
		if (op_code != null){
			return op_code;
		}
		return this.readCallDynamic(true, true, true, true);
	}
	/**
	 * Read postfix
	 * @return BaseOpCode
	 */
	readExpressionPostfix(){
		var op_code = this.readExpressionElement();
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			return new BayrellLang.OpCodes.OpPostInc(op_code);
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			return new BayrellLang.OpCodes.OpPostDec(op_code);
		}
		return op_code;
	}
	/**
	 * Read prefix
	 * @return BaseOpCode
	 */
	readExpressionPrefix(){
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			return new BayrellLang.OpCodes.OpPreInc(this.readExpressionPostfix());
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			return new BayrellLang.OpCodes.OpPreDec(this.readExpressionPostfix());
		}
		return this.readExpressionPostfix();
	}
	/**
	 * Read bit NOT
	 * @return BaseOpCode
	 */
	readExpressionBitNot(){
		if (this.findNextToken("!")){
			this.matchNextToken("!");
			return new BayrellLang.OpCodes.OpBitNot(this.readExpressionPrefix());
		}
		return this.readExpressionPrefix();
	}
	/**
	 * Read pow
	 * @return BaseOpCode
	 */
	readExpressionPow(){
		var op_code = this.readExpressionBitNot();
		while (this.findNextToken("**")){
			this.matchNextToken("**");
			op_code = new BayrellLang.OpCodes.OpPow(op_code, this.readExpressionBitNot());
		}
		return op_code;
	}
	/**
	 * Read arithmetic multiply and divide
	 * @return BaseOpCode
	 */
	readExpressionFactor(){
		/* Read first opcode */
		var op_code = this.readExpressionPow();
		while (this.findNextToken("*") || this.findNextToken("/") || this.findNextToken("%")){
			if (this.findNextToken("*")){
				this.matchNextToken("*");
				op_code = new BayrellLang.OpCodes.OpMult(op_code, this.readExpressionPow());
			}
			else if (this.findNextToken("/")){
				this.matchNextToken("/");
				op_code = new BayrellLang.OpCodes.OpDiv(op_code, this.readExpressionPow());
			}
			else if (this.findNextToken("%")){
				this.matchNextToken("%");
				op_code = new BayrellLang.OpCodes.OpMod(op_code, this.readExpressionPow());
			}
			else {
				throw this.nextTokenExpected("\"*\", \"/\" or \"%\"");
			}
		}
		return op_code;
	}
	/**
	 * Read arithmetic expression
	 * @return BaseOpCode
	 */
	readExpressionArithmetic(){
		/* Read first opcode */
		var op_code = this.readExpressionFactor();
		while (this.findNextToken("+") || this.findNextToken("-")){
			if (this.findNextToken("+")){
				this.matchNextToken("+");
				op_code = new BayrellLang.OpCodes.OpAdd(op_code, this.readExpressionFactor());
			}
			else if (this.findNextToken("-")){
				this.matchNextToken("-");
				op_code = new BayrellLang.OpCodes.OpSub(op_code, this.readExpressionFactor());
			}
			else {
				throw this.nextTokenExpected("\"+\" or \"-\"");
			}
		}
		return op_code;
	}
	/**
	 * Read shift
	 * @return BaseOpCode
	 */
	readExpressionShift(){
		/* Read first opcode */
		var op_code = this.readExpressionArithmetic();
		while (this.findNextToken("<<") || this.findNextToken(">>")){
			if (this.findNextToken("<<")){
				this.matchNextToken("<<");
				op_code = new BayrellLang.OpCodes.OpShiftLeft(op_code, this.readExpressionArithmetic());
			}
			else if (this.findNextToken(">>")){
				this.matchNextToken(">>");
				op_code = new BayrellLang.OpCodes.OpShiftRight(op_code, this.readExpressionArithmetic());
			}
			else {
				throw this.nextTokenExpected("\"<<\" or \">>\"");
			}
		}
		return op_code;
	}
	/**
	 * Read concat string
	 * @return BaseOpCode
	 */
	readExpressionConcat(){
		/* Read first opcode */
		var op_code = this.readExpressionShift();
		while (this.findNextToken("~")){
			this.matchNextToken("~");
			op_code = new BayrellLang.OpCodes.OpConcat(op_code, this.readExpressionShift());
		}
		return op_code;
	}
	/**
	 * Read compare
	 * @return BaseOpCode
	 */
	readExpressionCompare1(){
		/* Read first opcode */
		var op_code = this.readExpressionConcat();
		while (this.findNextToken("<") || this.findNextToken("<=") || this.findNextToken(">") || this.findNextToken(">=") || this.findNextToken("in") || this.findNextToken("instanceof") || this.findNextToken("implements")){
			var cond = this.readNextToken().token;
			op_code = new BayrellLang.OpCodes.OpCompare(cond, op_code, this.readExpressionConcat());
		}
		return op_code;
	}
	/**
	 * Read compare
	 * @return BaseOpCode
	 */
	readExpressionCompare2(){
		/* Read first opcode */
		var op_code = this.readExpressionCompare1();
		while (this.findNextToken("==") || this.findNextToken("===") || this.findNextToken("!=") || this.findNextToken("!==")){
			var cond = this.readNextToken().token;
			op_code = new BayrellLang.OpCodes.OpCompare(cond, op_code, this.readExpressionCompare1());
		}
		return op_code;
	}
	/**
	 * Read bit AND
	 * @return BaseOpCode
	 */
	readExpressionBitAnd(){
		/* Read first opcode */
		var op_code = this.readExpressionCompare2();
		while (this.findNextToken("&")){
			this.matchNextToken("&");
			op_code = new BayrellLang.OpCodes.OpBitAnd(op_code, this.readExpressionCompare2());
		}
		return op_code;
	}
	/**
	 * Read bit XOR
	 * @return BaseOpCode
	 */
	readExpressionBitXor(){
		/* Read first opcode */
		var op_code = this.readExpressionBitAnd();
		while (this.findNextToken("^")){
			this.matchNextToken("^");
			op_code = new BayrellLang.OpCodes.OpBitXor(op_code, this.readExpressionBitAnd());
		}
		return op_code;
	}
	/**
	 * Read bit OR
	 * @return BaseOpCode
	 */
	readExpressionBitOr(){
		/* Read first opcode */
		var op_code = this.readExpressionBitXor();
		while (this.findNextToken("|")){
			this.matchNextToken("|");
			op_code = new BayrellLang.OpCodes.OpBitOr(op_code, this.readExpressionBitXor());
		}
		return op_code;
	}
	/**
	 * Read NOT
	 * @return BaseOpCode
	 */
	readExpressionNot(){
		if (this.findNextToken("not")){
			this.matchNextToken("not");
			return new BayrellLang.OpCodes.OpNot(this.readExpressionBitOr());
		}
		return this.readExpressionBitOr();
	}
	/**
	 * Read AND
	 * @return BaseOpCode
	 */
	readExpressionAnd(){
		/* Read first opcode */
		var op_code = this.readExpressionNot();
		while (this.findNextToken("and")){
			this.matchNextToken("and");
			op_code = new BayrellLang.OpCodes.OpAnd(op_code, this.readExpressionNot());
		}
		return op_code;
	}
	/**
	 * Read OR
	 * @return BaseOpCode
	 */
	readExpressionOr(){
		/* Read first opcode */
		var op_code = this.readExpressionAnd();
		while (this.findNextToken("or")){
			this.matchNextToken("or");
			op_code = new BayrellLang.OpCodes.OpOr(op_code, this.readExpressionAnd());
		}
		return op_code;
	}
	/**
	 * Read ternary operator
	 * @return BaseOpCode
	 */
	readExpressionTernary(){
		/* Read first opcode */
		var op_code = this.readExpressionOr();
		if (this.findNextToken("?")){
			this.matchNextToken("?");
			var if_true = this.readExpressionOr();
			this.matchNextToken(":");
			var if_false = this.readExpressionOr();
			return new BayrellLang.OpCodes.OpTernary(op_code, if_true, if_false);
		}
		return op_code;
	}
	/**
	 * Read expression
	 * @return BaseOpCode
	 */
	readExpression(){
		if (this.findNextToken("<")){
			return this.readHtml();
		}
		this.pushToken();
		var is_lambda = false;
		if (this.findNextToken("lambda")){
			is_lambda = true;
			this.matchNextToken("lambda");
		}
		else if (this.findNextToken("pure")){
			this.matchNextToken("pure");
		}
		var res = null;
		res = this.readDeclareFunction(false, false);
		if (res != null){
			this.popToken();
			return res;
		}
		try{
			res = this.readOpCopyStruct();
		}catch(_the_exception){
			if (_the_exception instanceof BayrellParser.Exceptions.ParserError){
				var ex = _the_exception;
				res = null;
			}
			else { throw _the_exception; }
		}
		if (res != null){
			this.popToken();
			return res;
		}
		this.popRollbackToken();
		var old_skip_comments = this.skip_comments;
		this.skip_comments = true;
		res = this.readExpressionTernary();
		this.skip_comments = old_skip_comments;
		return res;
	}
	/**
	 * Read copy struct
	 * @return BaseOpCode
	 */
	readOpCopyStruct(){
		var name = this.readIdentifierName();
		this.matchNextToken("<=");
		var item = this.readExpression();
		return new BayrellLang.OpCodes.OpCopyStruct((new Runtime.Map()).set("name", name).set("item", item));
	}
	/* ============== Read Operators ============== */
	/**
	 * Read operator assign
	 * @return BaseOpCode
	 */
	readOperatorAssign(){
		var op_type = null;
		var op_ident = null;
		var op_ident_name = "";
		var op_exp = null;
		var success = false;
		var v = (new Runtime.Vector()).push("=").push("~=").push("+=").push("-=").push("<=");
		/* Read assign */
		success = false;
		this.pushToken();
		try{
			op_ident = this.readCallDynamic(true, true, true, false);
			if (this.findNextTokenVector(v) != -1){
				success = true;
			}
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof BayrellParser.Exceptions.ParserError){
					success = false;
				}
				else {
					throw ex;
				}
			}
			else { throw _the_exception; }
		}
		if (success){
			var pos = this.findNextTokenVector(v);
			var op_name = v.item(pos);
			this.matchNextToken(op_name);
			if (op_name == "<="){
				this.popRollbackToken();
				return this.readOpCopyStruct();
			}
			this.popToken();
			if (this.findNextToken("await")){
				op_exp = this.readCallAwait();
			}
			else {
				op_exp = this.readExpression();
			}
			return new BayrellLang.OpCodes.OpAssign(op_ident, op_exp, op_name);
		}
		this.popRollbackToken();
		/* Read declare */
		this.pushToken();
		try{
			op_type = this.readTemplateIdentifier();
			op_ident_name = this.readIdentifierName();
			success = true;
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof BayrellParser.Exceptions.ParserError){
					success = false;
				}
				else {
					throw ex;
				}
			}
			else { throw _the_exception; }
		}
		if (success){
			this.popToken();
			if (this.findNextToken("=")){
				this.matchNextToken("=");
				if (this.findNextToken("await")){
					op_exp = this.readCallAwait();
				}
				else {
					op_exp = this.readExpression();
				}
			}
			return new BayrellLang.OpCodes.OpAssignDeclare(op_type, op_ident_name, op_exp);
		}
		this.popRollbackToken();
		return null;
	}
	/**
	 * Read operator if
	 * @return BaseOpCode
	 */
	readOperatorIf(){
		var old_skip_comments = this.skip_comments;
		this.skip_comments = true;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var if_else = new Runtime.Vector();
		/* Read condition */
		this.matchNextToken("if");
		this.matchNextToken("(");
		condition = this.readExpression();
		this.matchNextToken(")");
		/* Read if true operators block */
		if (this.findNextToken("{")){
			this.matchNextToken("{");
			if_true = this.readOperatorsBlock();
			this.matchNextToken("}");
		}
		else {
			if_true = new Runtime.Vector();
			if_true.push(this.readOperator());
		}
		while (this.findNextToken("elseif") || this.findNextToken("else")){
			if (this.findNextToken("else")){
				this.matchNextToken("else");
				if (this.findNextToken("if")){
					var op_if_else = new BayrellLang.OpCodes.OpIfElse();
					this.matchNextToken("if");
					this.matchNextToken("(");
					op_if_else.condition = this.readExpression();
					this.matchNextToken(")");
					if (this.findNextToken("{")){
						this.matchNextToken("{");
						op_if_else.if_true = this.readOperatorsBlock();
						this.matchNextToken("}");
					}
					else {
						op_if_else.if_true = new Runtime.Vector();
						op_if_else.if_true.push(this.readOperator());
					}
					if_else.push(op_if_else);
				}
				else {
					if (this.findNextToken("{")){
						this.matchNextToken("{");
						if_false = this.readOperatorsBlock();
						this.matchNextToken("}");
					}
					else {
						if_false = new Runtime.Vector();
						if_false.push(this.readOperator());
					}
					break;
				}
			}
			else if (this.findNextToken("elseif")){
				var op_if_else = new BayrellLang.OpCodes.OpIfElse();
				this.matchNextToken("elseif");
				this.matchNextToken("(");
				op_if_else.condition = this.readExpression();
				this.matchNextToken(")");
				if (this.findNextToken("{")){
					this.matchNextToken("{");
					op_if_else.if_true = this.readOperatorsBlock();
					this.matchNextToken("}");
					if_else.push(op_if_else);
				}
				else {
					op_if_else.if_true = new Runtime.Vector();
					op_if_else.if_true.push(this.readOperator());
				}
			}
		}
		this.skip_comments = old_skip_comments;
		return new BayrellLang.OpCodes.OpIf(condition, if_true, if_false, if_else);
	}
	/**
	 * Read operator while
	 * @return BaseOpCode
	 */
	readOperatorWhile(){
		var condition = null;
		var childs = null;
		/* Read condition */
		this.matchNextToken("while");
		this.matchNextToken("(");
		condition = this.readExpression();
		this.matchNextToken(")");
		/* Read operators block */
		this.matchNextToken("{");
		childs = this.readOperatorsBlock();
		this.matchNextToken("}");
		return new BayrellLang.OpCodes.OpWhile(condition, childs);
	}
	/**
	 * Read operator for
	 * @return BaseOpCode
	 */
	readOperatorFor(){
		var loop_condition = null;
		var loop_init = null;
		var loop_inc = null;
		var childs = null;
		/* Read loop header */
		this.matchNextToken("for");
		this.matchNextToken("(");
		loop_init = this.readOperatorAssign();
		this.matchNextToken(";");
		loop_condition = this.readExpression();
		this.matchNextToken(";");
		loop_inc = this.readExpression();
		this.matchNextToken(")");
		/* Read operators block */
		this.matchNextToken("{");
		childs = this.readOperatorsBlock();
		this.matchNextToken("}");
		return new BayrellLang.OpCodes.OpFor(loop_condition, loop_init, loop_inc, childs);
	}
	/**
	 * Read operator try
	 * @return BaseOpCode
	 */
	readOperatorTry(){
		var op_try = null;
		var op_catch = new Runtime.Vector();
		/* Read try block */
		this.matchNextToken("try");
		this.matchNextToken("{");
		op_try = this.readOperatorsBlock();
		this.matchNextToken("}");
		/* Read catch */
		while (this.findNextToken("catch")){
			var try_catch_child = new BayrellLang.OpCodes.OpTryCatchChilds();
			this.matchNextToken("catch");
			this.matchNextToken("(");
			try_catch_child.op_type = this.readTemplateIdentifier();
			try_catch_child.op_ident = this.readIdentifier();
			this.matchNextToken(")");
			this.matchNextToken("{");
			try_catch_child.childs = this.readOperatorsBlock();
			this.matchNextToken("}");
			op_catch.push(try_catch_child);
		}
		return new BayrellLang.OpCodes.OpTryCatch(op_try, op_catch);
	}
	/**
	 * Read operator return
	 * @return BaseOpCode
	 */
	readOperatorReturn(){
		this.matchNextToken("return");
		var value = null;
		if (!this.findNextToken(";")){
			value = this.readExpression();
		}
		this.matchNextToken(";");
		return new BayrellLang.OpCodes.OpReturn(value);
	}
	/**
	 * Read operator throw
	 * @return BaseOpCode
	 */
	readOperatorThrow(){
		this.matchNextToken("throw");
		var value = this.readExpression();
		this.matchNextToken(";");
		return new BayrellLang.OpCodes.OpThrow(value);
	}
	/**
	 * Read operator delete
	 * @return BaseOpCode
	 */
	readOperatorDelete(){
		this.matchNextToken("delete");
		var value = this.readCallDynamic(true, true, false, false);
		this.matchNextToken(";");
		return new BayrellLang.OpCodes.OpDelete(value);
	}
	/**
	 * Read postfix
	 * @return BaseOpCode
	 */
	readOperatorPostfix(){
		this.pushToken();
		try{
			var op_code = this.readExpressionElement();
		}catch(_the_exception){
			if (_the_exception instanceof BayrellParser.Exceptions.ParserError){
				var ex = _the_exception;
				this.popRollbackToken();
				return null;
			}
			else { throw _the_exception; }
		}
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			this.popToken();
			return new BayrellLang.OpCodes.OpPostInc(op_code);
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			this.popToken();
			return new BayrellLang.OpCodes.OpPostDec(op_code);
		}
		this.popRollbackToken();
		return null;
	}
	/**
	 * Read prefix
	 * @return BaseOpCode
	 */
	readOperatorPrefix(){
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			return new BayrellLang.OpCodes.OpPreInc(this.readExpressionPostfix());
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			return new BayrellLang.OpCodes.OpPreDec(this.readExpressionPostfix());
		}
		return null;
	}
	/**
	 * Read operator 
	 * @return BaseOpCode
	 */
	readOperator(){
		var res = null;
		if (this.findNextToken(";")){
			this.matchNextToken(";");
			return null;
		}
		else if (this.lookNextTokenType() == BayrellLang.LangBay.ParserBayToken.TOKEN_COMMENT){
			return new BayrellLang.OpCodes.OpComment(this.readAnyNextToken().token);
		}
		else if (this.findNextToken("await")){
			res = this.readCallAwait();
			this.matchNextToken(";");
			return res;
		}
		else if (this.findNextToken("if")){
			return this.readOperatorIf();
		}
		else if (this.findNextToken("while")){
			return this.readOperatorWhile();
		}
		else if (this.findNextToken("for")){
			return this.readOperatorFor();
		}
		else if (this.findNextToken("try")){
			return this.readOperatorTry();
		}
		else if (this.findNextToken("return")){
			return this.readOperatorReturn();
		}
		else if (this.findNextToken("throw")){
			return this.readOperatorThrow();
		}
		else if (this.findNextToken("delete")){
			return this.readOperatorDelete();
		}
		else if (this.findNextToken("break")){
			this.matchNextToken("break");
			this.matchNextToken(";");
			return new BayrellLang.OpCodes.OpBreak();
		}
		else if (this.findNextToken("continue")){
			this.matchNextToken("continue");
			this.matchNextToken(";");
			return new BayrellLang.OpCodes.OpContinue();
		}
		else if (this.findNextTokenPreprocessor()){
			return this.readPreprocessor();
		}
		res = this.readOperatorAssign();
		if (res){
			this.matchNextToken(";");
			return res;
		}
		res = this.readOperatorPrefix();
		if (res){
			this.matchNextToken(";");
			return res;
		}
		res = this.readOperatorPostfix();
		if (res){
			this.matchNextToken(";");
			return res;
		}
		res = this.readExpressionElement();
		this.matchNextToken(";");
		return res;
		/*return this.readCallDynamic(true, true, true, true);*/
	}
	/**
	 * Read operator block
	 * @return BaseOpCode
	 */
	readOperatorsBlock(){
		var res = new Runtime.Vector();
		var match_bracket = false;
		if (this.findNextToken("{")){
			this.matchNextToken("{");
			match_bracket = true;
		}
		var op_code = null;
		while (!this.findNextToken("}") && !this.isEOF()){
			op_code = this.readOperator();
			if (op_code != null){
				res.push(op_code);
			}
		}
		if (match_bracket){
			this.matchNextToken("}");
		}
		return res;
	}
	/* ============== Read Class ============== */
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readOperatorNamespace(){
		this.matchNextToken("namespace");
		var name = this.readDynamicName();
		this.current_namespace = name;
		this.matchNextToken(";");
		return new BayrellLang.OpCodes.OpNamespace(name);
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readOperatorUse(){
		this.matchNextToken("use");
		var name = this.readDynamicName();
		var alias_name = "";
		if (this.findNextToken("as")){
			this.matchNextToken("as");
			alias_name = this.readIdentifierName();
		}
		this.matchNextToken(";");
		if (alias_name != ""){
			this.modules.set(alias_name, name);
		}
		else {
			var arr = Runtime.rs.explode(".", name);
			var last_name = arr.pop();
			this.modules.set(last_name, name);
		}
		return new BayrellLang.OpCodes.OpUse(name, alias_name);
	}
	/**
	 * Read flags
	 * @return OpFlags
	 */
	readFlags(){
		var flags = null;
		var flags_vector = BayrellLang.OpCodes.OpFlags.getFlags();
		if (this.findNextTokenVector(flags_vector) != -1){
			flags = new BayrellLang.OpCodes.OpFlags();
			while (this.findNextTokenVector(flags_vector) != -1){
				if (!flags.assignFlag(this.lookNextToken())){
					throw this.parserError("Unknown flag '"+Runtime.rtl.toString(this.lookNextToken())+"'");
				}
				this.readNextToken();
			}
		}
		if (flags_vector != null){
		}
		return flags;
	}
	/**
	 * Read annotation
	 */
	readAnnotation(){
		this.matchNextToken("@");
		var op_annotation = new BayrellLang.OpCodes.OpAnnotation();
		op_annotation.kind = this.readTemplateIdentifier();
		op_annotation.options = this.readMap();
		if (this.annotations == null){
			this.annotations = new Runtime.Vector();
		}
		this.annotations.push(op_annotation);
	}
	/**
	 * Read declare class arguments
	 * @return BaseOpCode
	 */
	readFunctionsArguments(){
		var args = new Runtime.Vector();
		this.matchNextToken("(");
		while (!this.findNextToken(")") && !this.isEOF()){
			var op_code = this.readOperatorAssign();
			if (op_code instanceof BayrellLang.OpCodes.OpAssign){
				throw this.parserError("Assign are not alowed here");
			}
			else if (op_code instanceof BayrellLang.OpCodes.OpAssignDeclare){
				args.push(op_code);
			}
			if (this.findNextToken(",")){
				this.matchNextToken(",");
				continue;
			}
			break;
		}
		this.matchNextToken(")");
		return args;
	}
	/**
	 * Read declare class function
	 * @return BaseOpCode
	 */
	readDeclareFunctionHeader(res){
		res.args = this.readFunctionsArguments();
		/* Read use variables*/
		if (this.findNextToken("use")){
			this.matchNextToken("use");
			this.matchNextToken("(");
			while (!this.findNextToken(")") && !this.isEOF()){
				var name = this.readIdentifierName();
				res.use_variables.push(name);
				if (this.findNextToken(",")){
					this.matchNextToken(",");
				}
				else {
					break;
				}
			}
			this.matchNextToken(")");
		}
		return res;
	}
	/**
	 * Read declare class function
	 * @return BaseOpCode
	 */
	readDeclareFunction(read_name, is_declare_function){
		if (read_name == undefined) read_name=true;
		if (is_declare_function == undefined) is_declare_function=false;
		var res = new BayrellLang.OpCodes.OpFunctionDeclare();
		res.is_lambda = false;
		this.pushToken();
		try{
			res.result_type = this.readTemplateIdentifier();
		}catch(_the_exception){
			if (_the_exception instanceof BayrellParser.Exceptions.ParserError){
				var ex = _the_exception;
				this.popRollbackToken();
				return null;
			}
			else { throw _the_exception; }
		}
		if (read_name){
			res.name = this.readIdentifierName();
		}
		if (!this.findNextToken("(")){
			this.popRollbackToken();
			return null;
		}
		try{
			res.args = this.readFunctionsArguments();
		}catch(_the_exception){
			if (_the_exception instanceof BayrellParser.Exceptions.ParserError){
				var ex = _the_exception;
				this.popRollbackToken();
				return null;
			}
			else { throw _the_exception; }
		}
		/* Read use variables*/
		if (this.findNextToken("use")){
			this.matchNextToken("use");
			this.matchNextToken("(");
			while (!this.findNextToken(")") && !this.isEOF()){
				var name = this.readIdentifierName();
				res.use_variables.push(name);
				if (this.findNextToken(",")){
					this.matchNextToken(",");
				}
				else {
					break;
				}
			}
			this.matchNextToken(")");
		}
		if (this.findNextToken("=>")){
			res.is_lambda = true;
			this.matchNextToken("=>");
			if (this.findNextToken("return")){
				this.matchNextToken("return");
			}
			this.popToken();
			this.pushToken();
			try{
				var flags = null;
				flags = this.readFlags();
				res.return_function = this.readDeclareFunction(false, is_declare_function);
				if (res.return_function != null){
					res.return_function.flags = flags;
				}
			}catch(_the_exception){
				if (_the_exception instanceof BayrellParser.Exceptions.ParserError){
					var ex = _the_exception;
					res.return_function = null;
				}
				else { throw _the_exception; }
			}
			if (res.return_function == null){
				this.popRollbackToken();
			}
			else {
				this.popToken();
			}
			if (res.return_function == null){
				var op_item;
				try{
					op_item = this.readExpression();
				}catch(_the_exception){
					if (_the_exception instanceof BayrellParser.Exceptions.ParserError){
						var ex = _the_exception;
						op_item = null;
					}
					else { throw _the_exception; }
				}
				if (op_item != null){
					res.childs = (new Runtime.Vector()).push(op_item);
				}
			}
			if (res.return_function == null && res.childs == null){
				this.matchNextToken(";");
			}
			return res;
		}
		else if (is_declare_function){
			this.matchNextToken(";");
		}
		else if (this.findNextToken("{")){
			this.matchNextToken("{");
			res.childs = this.readOperatorsBlock();
			this.matchNextToken("}");
		}
		else {
			this.popRollbackToken();
			return null;
		}
		this.popToken();
		return res;
	}
	/**
	 * Read class body
	 */
	readClassBody(res){
		if (this.findNextToken(";")){
			this.matchNextToken(";");
			return ;
		}
		var flags = null;
		var op_code = null;
		if (this.findNextTokenPreprocessor()){
			op_code = this.readPreprocessor();
			res.childs.push(op_code);
			return ;
		}
		else if (this.lookNextTokenType() == BayrellLang.LangBay.ParserBayToken.TOKEN_COMMENT){
			op_code = new BayrellLang.OpCodes.OpComment(this.readAnyNextToken().token);
			res.childs.push(op_code);
			return ;
		}
		flags = this.readFlags();
		this.readClassBodyContent(res, flags);
	}
	/**
	 * Read class body content
	 */
	readClassBodyContent(res, flags){
		var op_code = null;
		var is_declare_function = false;
		if (flags != null && flags.p_declare || this.is_interface){
			is_declare_function = true;
		}
		if (this.findNextToken("@")){
			this.readAnnotation();
			return ;
		}
		if (flags == null){
			flags = new BayrellLang.OpCodes.OpFlags();
			flags.assignValue("public", true);
		}
		else {
			if (!flags.isFlag("protected") && !flags.isFlag("private")){
				flags.assignValue("public", true);
			}
		}
		var is_lambda = false;
		if (flags != null){
			if (flags.isFlag("lambda")){
				is_lambda = true;
			}
		}
		op_code = this.readDeclareFunction(true, is_declare_function);
		if (op_code && op_code instanceof BayrellLang.OpCodes.OpFunctionDeclare){
			op_code.annotations = this.annotations;
			op_code.flags = flags;
			if (is_lambda){
				flags.assignValue("static", true);
			}
			if (op_code.isFlag("pure")){
				flags.assignValue("static", true);
			}
			res.childs.push(op_code);
			this.annotations = null;
			return ;
		}
		op_code = this.readOperatorAssign();
		if (op_code instanceof BayrellLang.OpCodes.OpAssign){
			throw this.parserError("Assign are not alowed here");
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpAssignDeclare){
			op_code.annotations = this.annotations;
			op_code.flags = flags;
			res.childs.push(op_code);
			this.matchNextToken(";");
			this.annotations = null;
			return ;
		}
		throw this.parserError("Unknown operator");
	}
	/**
	 * Read class header
	 * @return BaseOpCode
	 */
	readClassHead(res){
		res.class_name = this.readIdentifierName();
		this.current_class_name = res.class_name;
		if (this.findNextToken("<")){
			this.matchNextToken("<");
			while (true){
				var op_code2 = this.readCallDynamic(true, false, false, false);
				res.class_template.push(op_code2);
				if (this.findNextToken(",")){
					this.matchNextToken(",");
					continue;
				}
				break;
			}
			this.matchNextToken(">");
		}
		if (this.findNextToken("extends")){
			this.matchNextToken("extends");
			res.class_extends = this.readIdentifier();
			if (this.findNextToken("<")){
				this.matchNextToken("<");
				while (true){
					this.readCallDynamic(true, false, false, false);
					if (this.findNextToken(",")){
						this.matchNextToken(",");
						continue;
					}
					break;
				}
				this.matchNextToken(">");
			}
		}
		if (this.findNextToken("implements")){
			this.matchNextToken("implements");
			while (!this.findNextToken("{") && !this.isEOF()){
				res.class_implements.push(this.readDynamicName());
				if (this.findNextToken(",")){
					this.matchNextToken(",");
					continue;
				}
				break;
			}
		}
		this.matchNextToken("{");
		while (!this.findNextToken("}") && !this.isEOF()){
			this.readClassBody(res);
		}
		this.matchNextToken("}");
	}
	/**
	 * Read class
	 * @return BaseOpCode
	 */
	readDeclareClass(class_flags){
		var res = new BayrellLang.OpCodes.OpClassDeclare();
		this.matchNextToken("class");
		this.readClassHead(res);
		res.flags = class_flags;
		return res;
	}
	/**
	 * Read interface
	 * @return BaseOpCode
	 */
	readDeclareInterface(class_flags){
		var res = new BayrellLang.OpCodes.OpInterfaceDeclare();
		this.matchNextToken("interface");
		this.is_interface = true;
		this.readClassHead(res);
		this.is_interface = false;
		res.flags = class_flags;
		return res;
	}
	/**
	 * Read struct
	 * @return BaseOpCode
	 */
	readDeclareStruct(class_flags){
		var res = new BayrellLang.OpCodes.OpStructDeclare();
		this.matchNextToken("struct");
		this.readClassHead(res);
		res.flags = class_flags;
		return res;
	}
	/**
	 * Prepocessor
	 */
	findNextTokenPreprocessor(){
		var token = this.lookNextToken();
		if (this.lookNextTokenType() == BayrellLang.LangBay.ParserBayToken.TOKEN_BASE && (token == "#switch" || token == "#ifcode")){
			return true;
		}
		return false;
	}
	/**
	 * Read prepocessors block
	 */
	readPreprocessor(){
		if (this.findNextToken("#switch")){
			var childs = new Runtime.Vector();
			var comment;
			var pos;
			this.matchNextToken("#switch");
			var v = (new Runtime.Vector()).push("#case").push("#endswitch");
			while (this.findNextToken("#case")){
				this.matchNextToken("#case");
				this.matchNextToken("ifcode");
				var op_case = new BayrellLang.OpCodes.OpPreprocessorCase();
				op_case.condition = this.readExpression();
				if (!this.findNextToken("then")){
					throw this.nextTokenExpected("then");
				}
				op_case.value = Runtime.rs.trim(this.next_token.readUntilVector(v));
				childs.push(op_case);
				this.readAnyNextToken();
				pos = this.findNextTokenVector(v);
				if (pos == -1){
					throw this.parserError("Unknown preprocessor token "+Runtime.rtl.toString(this.lookNextToken()));
				}
			}
			this.matchNextToken("#endswitch");
			return new BayrellLang.OpCodes.OpPreprocessorSwitch(childs);
		}
		else if (this.findNextToken("#ifcode")){
			this.matchNextToken("#endifcode");
		}
		else {
			throw this.parserError("Unknown preprocessor token "+Runtime.rtl.toString(this.lookNextToken()));
		}
	}
	/**
	 * Read program
	 * @return BaseOpCode
	 */
	readProgram(){
		var op_code = null;
		var res = new Runtime.Vector();
		while (!this.isEOF()){
			if (this.lookNextTokenType() == BayrellLang.LangBay.ParserBayToken.TOKEN_COMMENT){
				res.push(new BayrellLang.OpCodes.OpComment(this.readAnyNextToken().token));
				continue;
			}
			else if (this.findNextToken("namespace")){
				res.push(this.readOperatorNamespace());
				continue;
			}
			else if (this.findNextToken("use")){
				res.push(this.readOperatorUse());
				continue;
			}
			else if (this.findNextTokenPreprocessor()){
				res.push(this.readPreprocessor());
				continue;
			}
			if (this.findNextToken("@")){
				this.readAnnotation();
				continue;
			}
			var flags = this.readFlags();
			var is_class = this.findNextToken("class");
			var is_interface = this.findNextToken("interface");
			var is_struct = this.findNextToken("struct");
			if (is_class || is_interface || is_struct){
				var annotations = this.annotations;
				this.annotations = null;
				var op_code = null;
				if (is_class){
					op_code = this.readDeclareClass(flags);
				}
				else if (is_interface){
					op_code = this.readDeclareInterface(flags);
				}
				else if (is_struct){
					op_code = this.readDeclareStruct(flags);
				}
				op_code.annotations = annotations;
				res.push(op_code);
			}
			else {
				throw this.parserError("Unknown token "+Runtime.rtl.toString(this.lookNextToken()));
			}
		}
		return res;
	}
	/**
	 * Reset parser to default settings
	 */
	resetParser(){
		super.resetParser();
		this.modules = new Runtime.Map();
	}
	/**
	 * Parser function
	 */
	runParser(){
		this._result = new BayrellLang.OpCodes.OpNope(this.readProgram());
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangBay.ParserBay";}
	static getCurrentClassName(){return "BayrellLang.LangBay.ParserBay";}
	static getParentClassName(){return "BayrellLang.CommonParser";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.current_namespace = "";
		this.current_class_name = "";
		this.is_interface = false;
		this.modules = null;
		this.annotations = null;
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