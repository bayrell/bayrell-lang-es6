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
BayrellLang.CoreTranslator = class extends Runtime.ContextObject{
	/**
	 * Push new level
	 */
	pushOneLine(level){
		if (level == undefined) level=true;
		this.one_lines.push(level);
	}
	/**
	 * Pop level
	 */
	popOneLine(){
		return this.one_lines.pop();
	}
	/**
	 * Returns true if is one line
	 */
	isOneLine(){
		return this.one_lines.last(false);
	}
	/**
	 * Begin operation
	 */
	beginOperation(){
		this.is_operation_stack.push(this.is_operation);
		this.is_operation = true;
		this.current_opcode_level = 0;
		return this.is_operation_stack.last(false);
	}
	/**
	 * End operation
	 */
	endOperation(){
		if (this.is_operation_stack.count() > 0){
			this.is_operation = this.is_operation_stack.pop();
		}
		else {
			this.is_operation = false;
		}
	}
	/**
	 * Returns true if is operation
	 */
	isOperation(){
		return this.is_operation;
	}
	/**
	 * Set max opcode level
	 */
	setMaxOpCodeLevel(){
		this.current_opcode_level = this.max_opcode_level;
	}
	/**
	 * Set opcode level
	 */
	setOpCodeLevel(opcode_level){
		this.current_opcode_level = opcode_level;
	}
	/**
	 * Output string witch brackets
	 */
	o(s, current_opcode_level){
		if (this.is_operation == false){
			return s;
		}
		if (current_opcode_level > this.current_opcode_level){
			return "("+Runtime.rtl.toString(s)+")";
		}
		return s;
	}
	/**
	 * Output operation
	 */
	op(op_code, op, opcode_level){
		var res = "";
		res += this.o(this.translateRun(op_code.value1), opcode_level);
		res += " "+Runtime.rtl.toString(op)+" ";
		res += this.o(this.translateRun(op_code.value2), opcode_level);
		this.current_opcode_level = opcode_level;
		return res;
	}
	/**
	 * Output string witch levels
	 */
	s(s){
		if (this.isOneLine()){
			return s;
		}
		var arr = Runtime.rs.explode("\n", s);
		arr = arr.map((item) => {
			return Runtime.rtl.toString(this.indent)+Runtime.rtl.toString(item);
		});
		var s = Runtime.rs.implode("\n", arr);
		return Runtime.rtl.toString(s)+Runtime.rtl.toString(this.crlf);
	}
	/**
	 * Output string with new line
	 */
	n(s){
		if (this.isOneLine()){
			return s;
		}
		return Runtime.rtl.toString(s)+Runtime.rtl.toString(this.crlf);
	}
	/**
	 * Returns CRLF
	 */
	getCRLF(){
		if (this.isOneLine()){
			return "";
		}
		return this.crlf;
	}
	OpAdd(op_code){
		return "";
	}
	OpAnd(op_code){
		return "";
	}
	OpAssign(op_code){
		return "";
	}
	OpAssignDeclare(op_code){
		return "";
	}
	OpBitAnd(op_code){
		return "";
	}
	OpBitNot(op_code){
		return "";
	}
	OpBitOr(op_code){
		return "";
	}
	OpBitXor(op_code){
		return "";
	}
	OpBreak(op_code){
		return "";
	}
	OpCall(op_code){
		return "";
	}
	OpClassDeclare(op_code){
		return "";
	}
	OpClassName(op_code){
		return "";
	}
	OpClone(op_code){
		return "";
	}
	OpComment(op_code){
		return "";
	}
	OpCompare(op_code){
		return "";
	}
	OpConcat(op_code){
		return "";
	}
	OpContinue(op_code){
		return "";
	}
	OpDelete(op_code){
		return "";
	}
	OpDiv(op_code){
		return "";
	}
	OpDynamic(op_code){
		return "";
	}
	OpFlags(op_code){
		return "";
	}
	OpFor(op_code){
		return "";
	}
	OpFunctionArrowDeclare(op_code){
		return "";
	}
	OpFunctionDeclare(op_code){
		return "";
	}
	OpHexNumber(op_code){
		return "";
	}
	OpIdentifier(op_code){
		return "";
	}
	OpIf(op_code){
		return "";
	}
	OpInterfaceDeclare(op_code){
		return "";
	}
	OpMethod(op_code){
		return "";
	}
	OpMod(op_code){
		return "";
	}
	OpMult(op_code){
		return "";
	}
	OpNamespace(op_code){
		return "";
	}
	OpNew(op_code){
		return "";
	}
	OpNope(op_code){
		return "";
	}
	OpNot(op_code){
		return "";
	}
	OpNumber(op_code){
		return "";
	}
	OpOr(op_code){
		return "";
	}
	OpPostDec(op_code){
		return "";
	}
	OpPostInc(op_code){
		return "";
	}
	OpPow(op_code){
		return "";
	}
	OpPreDec(op_code){
		return "";
	}
	OpPreInc(op_code){
		return "";
	}
	OpPreprocessorSwitch(op_code){
		return "";
	}
	OpReturn(op_code){
		return "";
	}
	OpShiftLeft(op_code){
		return "";
	}
	OpShiftRight(op_code){
		return "";
	}
	OpStatic(op_code){
		return "";
	}
	OpString(op_code){
		return "";
	}
	OpStringItem(op_code){
		return "";
	}
	OpStructDeclare(op_code){
		return "";
	}
	OpSub(op_code){
		return "";
	}
	OpTemplateIdentifier(op_code){
		return "";
	}
	OpTernary(op_code){
		return "";
	}
	OpThrow(op_code){
		return "";
	}
	OpTryCatch(op_code){
		return "";
	}
	OpUse(op_code){
		return "";
	}
	OpWhile(op_code){
		return "";
	}
	/* =========================== HTML OP Codes ========================== */
	OpHtmlJson(op_code){
		return "";
	}
	OpHtmlRaw(op_code){
		return "";
	}
	OpHtmlTag(op_code){
		return "";
	}
	OpHtmlView(op_code){
		return "";
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateChilds(childs){
		if (childs == null){
			return "";
		}
		var res = "";
		var code_str = "";
		var flag = true;
		for (var i = 0; i < childs.count(); i++){
			this.setOpCodeLevel(0);
			code_str = this.translateRun(childs.item(i));
			if (code_str == ""){
				continue;
			}
			res += this.n(code_str);
		}
		return Runtime.rs.trim(res);
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateItem(op_code){
		if (op_code instanceof BayrellLang.OpCodes.OpNope){
			return this.translateChilds(op_code.childs);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpInterfaceDeclare){
			return this.OpInterfaceDeclare(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpStructDeclare){
			return this.OpStructDeclare(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpAdd){
			return this.OpAdd(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpAnd){
			return this.OpAnd(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpAssign){
			return this.OpAssign(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpAssignDeclare){
			return this.OpAssignDeclare(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpBitAnd){
			return this.OpBitAnd(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpBitNot){
			return this.OpBitNot(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpBitOr){
			return this.OpBitOr(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpBitXor){
			return this.OpBitXor(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpBreak){
			return this.OpBreak(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpCall){
			return this.OpCall(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpClassDeclare){
			return this.OpClassDeclare(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpClassName){
			return this.OpClassName(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpClone){
			return this.OpClone(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpComment){
			return this.OpComment(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpCompare){
			return this.OpCompare(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpConcat){
			return this.OpConcat(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpContinue){
			return this.OpContinue(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpDelete){
			return this.OpDelete(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpDiv){
			return this.OpDiv(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpDynamic){
			return this.OpDynamic(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpFlags){
			return this.OpFlags(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpFor){
			return this.OpFor(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpFunctionArrowDeclare){
			return this.OpFunctionArrowDeclare(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpFunctionDeclare){
			return this.OpFunctionDeclare(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpHexNumber){
			return this.OpHexNumber(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpIdentifier){
			return this.OpIdentifier(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpMap){
			return this.OpMap(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpMethod){
			return this.OpMethod(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpIf){
			return this.OpIf(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpMod){
			return this.OpMod(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpMult){
			return this.OpMult(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpNamespace){
			return this.OpNamespace(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpNew){
			return this.OpNew(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpNope){
			return this.OpNope(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpNot){
			return this.OpNot(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpNumber){
			return this.OpNumber(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpOr){
			return this.OpOr(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpPostDec){
			return this.OpPostDec(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpPostInc){
			return this.OpPostInc(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpPow){
			return this.OpPow(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpPreDec){
			return this.OpPreDec(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpPreInc){
			return this.OpPreInc(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpPreprocessorSwitch){
			return this.OpPreprocessorSwitch(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpReturn){
			return this.OpReturn(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpShiftLeft){
			return this.OpShiftLeft(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpShiftRight){
			return this.OpShiftRight(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpStatic){
			return this.OpStatic(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpString){
			return this.OpString(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpStringItem){
			return this.OpStringItem(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpSub){
			return this.OpSub(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpTemplateIdentifier){
			return this.OpTemplateIdentifier(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpTernary){
			return this.OpTernary(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpThrow){
			return this.OpThrow(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpTryCatch){
			return this.OpTryCatch(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpUse){
			return this.OpUse(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpVector){
			return this.OpVector(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpWhile){
			return this.OpWhile(op_code);
		}
		else if (op_code instanceof OpHtmlJson){
			return this.OpHtmlJson(op_code);
		}
		else if (op_code instanceof OpHtmlRaw){
			return this.OpHtmlRaw(op_code);
		}
		else if (op_code instanceof OpHtmlTag){
			return this.OpHtmlTag(op_code);
		}
		else if (op_code instanceof OpHtmlText){
			return this.OpString(op_code);
		}
		else if (op_code instanceof OpHtmlView){
			return this.OpHtmlView(op_code);
		}
		return "";
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateRun(op_code){
		this.op_code_stack.push(op_code);
		var res = this.translateItem(op_code);
		this.op_code_stack.pop();
		return res;
	}
	/**
	 * Reset translator to default settings
	 */
	resetTranslator(){
		this.is_operation = false;
		this.current_opcode_level = 0;
		this.max_opcode_level = 100;
		this.is_operation_stack = new Runtime.Vector();
		this.op_code_stack = new Runtime.Vector();
		this.one_lines = new Runtime.Vector();
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translate(op_code){
		this.resetTranslator();
		return this.translateRun(op_code);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.CoreTranslator";}
	static getCurrentClassName(){return "BayrellLang.CoreTranslator";}
	static getParentClassName(){return "Runtime.ContextObject";}
	_init(){
		super._init();
		this.is_operation_stack = null;
		this.op_code_stack = null;
		this.one_lines = null;
		this.current_opcode_level = 0;
		this.max_opcode_level = 100;
		this.is_operation = false;
		this.indent = "\t";
		this.space = " ";
		this.crlf = "\n";
	}
}