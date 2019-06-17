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
if (typeof BayrellLang.LangES6 == 'undefined') BayrellLang.LangES6 = {};
BayrellLang.LangES6.TranslatorES6 = class extends BayrellLang.CommonTranslator{
	/**
	 * Returns full class name
	 * @return string
	 */
	currentClassName(){
		return Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name);
	}
	/**
	 * Returns full class name
	 * @return string
	 */
	getCurrentFunctionName(){
		var c = this.function_stack.count();
		var last_function = this.function_stack.get(c - 1);
		return Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name)+"::"+Runtime.rtl.toString(last_function.name);
	}
	/**
	 * Returns UI struct class name
	 * @return string
	 */
	getUIStructClassName(){
		return this.ui_struct_class_name.last();
	}
	/**
	 * Returns true if function is async
	 * @return bool
	 */
	checkAwaitOpCode(op_code, kind){
		if (this.detectIsAwait(op_code)){
			this.is_async_opcode = true;
			if (kind == "while" || kind == "for"){
				this.is_async_opcode_while = true;
			}
			return true;
		}
		else {
			this.is_async_opcode = false;
			if (kind == "while" || kind == "for"){
				this.is_async_opcode_while = false;
			}
			return false;
		}
	}
	/**
	 * Returns true if function is async
	 * @return bool
	 */
	isAsyncF(){
		if (this.function_stack.count() == 0){
			return false;
		}
		return this.function_stack.last().is_async;
	}
	/**
	 * Returns true if function is async
	 * @return bool
	 */
	isAsync(){
		if (!this.isAsyncF()){
			return false;
		}
		return this.is_async_opcode;
	}
	/**
	 * Returns async ctx name
	 * @return string
	 */
	asyncContextName(){
		if (!this.isAsyncF()){
			return "";
		}
		return this.function_stack.last().async_ctx;
	}
	/**
	 * Returns async jump name
	 * @return string
	 */
	asyncJumpName(){
		if (!this.isAsyncF()){
			return "";
		}
		return this.function_stack.last().async_jump;
	}
	/**
	 * Returns async jump position
	 * @return string
	 */
	asyncJumpCurrent(){
		if (!this.isAsyncF()){
			return "";
		}
		var obj = this.function_stack.last();
		return obj.getJumpPos();
	}
	/**
	 * Returns async jump position
	 * @return string
	 */
	asyncJumpAdd(force){
		if (force == undefined) force=false;
		if (!this.isAsync() && !force){
			return "";
		}
		var obj = this.function_stack.last();
		obj.jumpAdd();
		return obj.getJumpPos();
	}
	/**
	 * Returns next jump position
	 * @return string
	 */
	asyncJumpNext(force){
		if (force == undefined) force=false;
		if (!this.isAsync() && !force){
			return "";
		}
		var obj = this.function_stack.last();
		return this.function_stack.last().getJumpNext();
	}
	/**
	 * Increment jump position's level 
	 */
	asyncJumpPush(force){
		if (force == undefined) force=false;
		if (!this.isAsync() && !force){
			return ;
		}
		var obj = this.function_stack.last();
		this.function_stack.last().jumpPush();
	}
	/**
	 * Decrement jump position's level
	 */
	asyncJumpPop(force){
		if (force == undefined) force=false;
		if (!this.isAsync() && !force){
			return ;
		}
		var obj = this.function_stack.last();
		this.function_stack.last().jumpPop();
	}
	/**
	 * Push stop jump positions for break and continue
	 */
	asyncPushStop(start_pos, end_pos){
		if (!this.isAsync()){
			return ;
		}
		var obj = this.function_stack.last();
		obj.stopPush(start_pos, end_pos);
	}
	/**
	 * Pop stop jump positions
	 */
	asyncPopStop(){
		if (!this.isAsync()){
			return ;
		}
		var obj = this.function_stack.last();
		obj.stopPop();
	}
	/**
	 * Returns begin async position
	 * @return string
	 */
	asyncBeginPos(){
		if (!this.isAsyncF()){
			return ;
		}
		var obj = this.function_stack.last();
		return obj.getAsyncBeginPos();
	}
	/**
	 * Returns end async position
	 * @return string
	 */
	asyncEndPos(){
		if (!this.isAsyncF()){
			return "";
		}
		var obj = this.function_stack.last();
		return obj.getAsyncEndPos();
	}
	/**
	 * Push function
	 * @string name - Function name
	 */
	functionPush(name, is_async){
		var obj = new BayrellLang.LangES6.FunctionStack();
		obj.name = name;
		obj.is_async = is_async;
		if (is_async){
			obj.async_ctx = "async_ctx_"+Runtime.rtl.toString(this.function_stack.count());
			obj.async_jump = "async_jump_"+Runtime.rtl.toString(this.function_stack.count());
			obj.async_jump_pos.push(0);
		}
		this.function_stack.push(obj);
	}
	/**
	 * Pop function
	 */
	functionPop(){
		this.function_stack.pop();
	}
	/**
	 * Get name
	 */
	getName(name){
		if (name == "parent"){
			return "super";
		}
		else if (name == "self"){
			return Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name);
		}
		else if (name == "static"){
			return "this";
		}
		else if (this.modules.has(name)){
			return this.modules.item(name);
		}
		return name;
	}
	/**
	 * Get module name
	 * @param string name
	 * @return string
	 */
	getModuleName(name){
		if (this.modules.has(name)){
			return this.modules.item(name);
		}
		return name;
	}
	/**
	 * Constructor
	 */
	constructor(context){
		if (context == undefined) context=null;
		super(context);
		this.modules = new Runtime.Map();
	}
	/**
	 * Escape string
	 */
	escapeString(s){
		s = Runtime.re.replace("\\\\", "\\\\", s);
		s = Runtime.re.replace("\"", "\\\"", s);
		s = Runtime.re.replace("\n", "\\n", s);
		s = Runtime.re.replace("\r", "\\r", s);
		s = Runtime.re.replace("\t", "\\t", s);
		return s;
	}
	/**
	 * Escape string
	 */
	convertString(s){
		return "\""+Runtime.rtl.toString(this.escapeString(s))+"\"";
	}
	/**
	 * Comment
	 */
	OpComment(op_code){
		return "/*"+Runtime.rtl.toString(op_code.value)+"*/";
	}
	/** =========================== Identifier ============================ */
	/**
	 * HexNumber
	 */
	OpHexNumber(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return op_code.value;
	}
	/**
	 * Identifier
	 */
	OpIdentifier(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return this.getName(op_code.value);
	}
	/**
	 * Number
	 */
	OpNumber(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return op_code.value;
	}
	/**
	 * String
	 */
	OpString(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return this.convertString(op_code.value);
	}
	/**
	 * OpStringItem
	 */
	OpStringItem(op_code){
		return Runtime.rtl.toString(this.translateRun(op_code.value1))+"["+Runtime.rtl.toString(this.s(this.translateRun(op_code.value2)))+Runtime.rtl.toString(this.s("]"));
	}
	/** ======================== Dynamic or static ======================== */
	/**
	 * Dynamic load
	 */
	OpDynamic(op_code){
		var res = Runtime.rtl.toString(this.o(this.translateRun(op_code.value), this.max_opcode_level))+"."+Runtime.rtl.toString(op_code.name);
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Static load
	 */
	OpStatic(op_code){
		var op_code_last = this.op_code_stack.last(null, -2);
		if (op_code.value instanceof BayrellLang.OpCodes.OpIdentifier && op_code_last instanceof BayrellLang.OpCodes.OpCall){
			if (op_code.value.value == "self"){
				return Runtime.rtl.toString(this.getName("self"))+"."+Runtime.rtl.toString(op_code.name);
				return "("+Runtime.rtl.toString(this.getName("rtl"))+".method("+Runtime.rtl.toString(this.getName("self"))+", "+Runtime.rtl.toString(this.convertString(op_code.name))+"))";
			}
			else if (!this.modules.has(op_code.value.value) && op_code.value.value != "rtl" && op_code.value.value != "parent" && op_code.value.value != "static"){
				return "("+Runtime.rtl.toString(this.getName("rtl"))+".method("+Runtime.rtl.toString(op_code.value.value)+".getClassName(), "+Runtime.rtl.toString(this.convertString(op_code.name))+"))";
			}
		}
		return Runtime.rtl.toString(this.translateRun(op_code.value))+"."+Runtime.rtl.toString(op_code.name);
	}
	/**
	 * Template Identifier
	 */
	OpTemplateIdentifier(op_code){
		return this.translateRun(op_code.t);
	}
	/** ============================ Operations ============================ */
	/**
	 * ADD
	 */
	OpAdd(op_code){
		return this.op(op_code, "+", 13);
	}
	/**
	 * AND
	 */
	OpAnd(op_code){
		return this.op(op_code, "&&", 6);
	}
	/**
	 * Bit AND
	 */
	OpBitAnd(op_code){
		return this.op(op_code, "&", 9);
	}
	/**
	 * Bit NOT
	 */
	OpBitNot(op_code){
		var res = "!"+Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		return res;
	}
	/**
	 * Bit OR
	 */
	OpBitOr(op_code){
		return this.op(op_code, "|", 7);
	}
	/**
	 * Bit XOR
	 */
	OpBitXor(op_code){
		return this.op(op_code, "^", 8);
	}
	/**
	 * Concat strings
	 */
	OpConcat(op_code){
		var res = "";
		if (op_code.value1 instanceof BayrellLang.OpCodes.OpConcat || op_code.value1 instanceof BayrellLang.OpCodes.OpString){
			res += this.o(this.s(this.translateRun(op_code.value1)), 13);
		}
		else {
			res += Runtime.rtl.toString(this.getName("rtl"))+".toString("+Runtime.rtl.toString(this.s(this.translateRun(op_code.value1)))+")";
		}
		res += this.s("+");
		if (op_code.value2 instanceof BayrellLang.OpCodes.OpConcat || op_code.value2 instanceof BayrellLang.OpCodes.OpString){
			res += this.o(this.s(this.translateRun(op_code.value2)), 13);
		}
		else {
			res += Runtime.rtl.toString(this.getName("rtl"))+".toString("+Runtime.rtl.toString(this.s(this.translateRun(op_code.value2)))+")";
		}
		this.current_opcode_level = 13;
		return res;
	}
	/**
	 * Divide
	 */
	OpDiv(op_code){
		return this.op(op_code, "/", 14);
	}
	/**
	 * Module
	 */
	OpMod(op_code){
		return this.op(op_code, "%", 14);
	}
	/**
	 * Multiply
	 */
	OpMult(op_code){
		return this.op(op_code, "*", 14);
	}
	/**
	 * New
	 */
	OpNew(op_code){
		var s = "";
		/* Function name */
		s += "new "+Runtime.rtl.toString(this.translateRun(op_code.value));
		/* Call arguments */
		this.current_opcode_level = this.max_opcode_level;
		var old_is_operation = this.is_operation;
		this.is_operation = true;
		s += "(";
		if (op_code.args != null){
			var ch = "";
			for (var i = 0; i < op_code.args.count(); i++){
				var op = op_code.args.item(i);
				s += Runtime.rtl.toString(ch)+Runtime.rtl.toString(this.s(this.translateRun(op)));
				ch = ", ";
			}
		}
		s += ")";
		this.is_operation = old_is_operation;
		this.current_opcode_level = 19;
		return s;
	}
	/**
	 * Not
	 */
	OpNot(op_code){
		var res = "!"+Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		return res;
	}
	/**
	 * Or
	 */
	OpOr(op_code){
		return this.op(op_code, "||", 5);
	}
	/**
	 * Post decrement
	 */
	OpPostDec(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 17))+"--"+Runtime.rtl.toString(semicolon);
		this.current_opcode_level = 17;
		return res;
	}
	/**
	 * Post increment
	 */
	OpPostInc(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 17))+"++"+Runtime.rtl.toString(semicolon);
		this.current_opcode_level = 17;
		return res;
	}
	/**
	 * Pow
	 */
	OpPow(op_code){
		return this.op(op_code, "**", 15);
	}
	/**
	 * Pre decrement
	 */
	OpPreDec(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "--"+Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 16))+Runtime.rtl.toString(semicolon);
		this.current_opcode_level = 16;
		return res;
	}
	/**
	 * Pre increment
	 */
	OpPreInc(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "++"+Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 16))+Runtime.rtl.toString(semicolon);
		this.current_opcode_level = 16;
		return res;
	}
	/**
	 * Bit shift left
	 */
	OpShiftLeft(op_code){
		return this.op(op_code, "<<", 12);
	}
	/**
	 * Bit shift right
	 */
	OpShiftRight(op_code){
		return this.op(op_code, ">>", 12);
	}
	/**
	 * Sub
	 */
	OpSub(op_code){
		return this.op(op_code, "-", 13);
	}
	/**
	 * Operator call function
	 */
	OpCall(op_code){
		var s = "";
		this.pushOneLine(true);
		/* Function name */
		var f = true;
		if (op_code.value instanceof BayrellLang.OpCodes.OpIdentifier){
			if (op_code.value.value == "parent" && this.function_stack.get(0).name != "constructor"){
				s += "super."+Runtime.rtl.toString(this.function_stack.get(0).name);
				f = false;
			}
		}
		if (f){
			var old_is_operation = this.is_operation;
			this.is_operation = true;
			s += this.translateRun(op_code.value);
			this.is_operation = old_is_operation;
		}
		this.current_opcode_level = this.max_opcode_level;
		var old_is_operation = this.is_operation;
		this.is_operation = true;
		s += "(";
		if (op_code.args != null){
			var ch = "";
			for (var i = 0; i < op_code.args.count(); i++){
				var op = op_code.args.item(i);
				s += Runtime.rtl.toString(ch)+Runtime.rtl.toString(this.s(this.translateRun(op)));
				ch = ", ";
			}
		}
		s += ")";
		this.is_operation = old_is_operation;
		/* semicolon */
		this.popOneLine();
		if (!this.is_operation){
			s += ";";
		}
		this.current_opcode_level = this.max_opcode_level;
		if (this.isAsyncF() && !this.is_async_await_op_call && op_code.is_await){
			var old_async_opcode = this.is_async_opcode;
			this.is_async_opcode = true;
			var res = "";
			var jump_pos_next = this.asyncJumpNext();
			res += Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_next))+");";
			res += this.s("return "+Runtime.rtl.toString(s));
			this.levelDec();
			res += this.s("}");
			res += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_next))+"){");
			this.levelInc();
			this.asyncJumpAdd();
			this.is_async_opcode = old_async_opcode;
			return res;
		}
		return s;
	}
	/**
	 * Operator call function
	 */
	OpCompare(op_code){
		if (op_code.condition == "implements"){
			return Runtime.rtl.toString(this.getName("rtl"))+".implements("+Runtime.rtl.toString(this.translateRun(op_code.value1))+", "+Runtime.rtl.toString(this.s(this.translateRun(op_code.value2)))+")";
		}
		this.current_opcode_level = 10;
		return this.op(op_code, op_code.condition, 10);
	}
	/**
	 * Operator call function
	 */
	OpTernary(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "("+Runtime.rtl.toString(this.translateRun(op_code.condition))+") ? "+"("+Runtime.rtl.toString(this.s(this.translateRun(op_code.if_true)))+") : "+"("+Runtime.rtl.toString(this.s(this.translateRun(op_code.if_false)))+")";
		this.current_opcode_level = 4;
		return res;
	}
	/**
	 * Copy struct
	 */
	copyStruct(op_code, names){
		var old_is_operation = this.beginOperation();
		var res = "";
		if (op_code.item instanceof BayrellLang.OpCodes.OpCopyStruct){
			names.push(op_code.name);
			var name = Runtime.rs.implode(".", names);
			res = Runtime.rtl.toString(name)+".copy( new "+Runtime.rtl.toString(this.getName("Map"))+"({ "+Runtime.rtl.toString(this.convertString(op_code.item.name))+": "+Runtime.rtl.toString(this.copyStruct(op_code.item, names))+" })  )";
		}
		else {
			res = this.translateItem(op_code.item);
		}
		this.endOperation(old_is_operation);
		return res;
	}
	/**
	 * Copy struct
	 */
	OpCopyStruct(op_code){
		if (this.is_operation){
			return this.copyStruct(op_code, (new Runtime.Vector()));
		}
		return Runtime.rtl.toString(op_code.name)+" = "+Runtime.rtl.toString(this.copyStruct(op_code, (new Runtime.Vector())))+";";
	}
	/**
	 * Pipe
	 */
	OpPipe(op_code){
		var res = "";
		res = Runtime.rtl.toString(this.getName("Maybe"))+".of("+Runtime.rtl.toString(this.translateItem(op_code.value))+")";
		if (op_code.items != null){
			for (var i = 0; i < op_code.items.count(); i++){
				var op_item = op_code.items.item(i);
				res += this.s(".map("+Runtime.rtl.toString(this.translateItem(op_item))+")");
			}
		}
		if (op_code.is_return_value){
			res += this.s(".value()");
		}
		return res;
	}
	/** ========================== Vector and Map ========================= */
	/**
	 * Vector
	 */
	OpVector(op_code){
		var res = "";
		res += "(new "+Runtime.rtl.toString(this.getName("Vector"))+"())";
		for (var i = 0; i < op_code.values.count(); i++){
			var item = op_code.values.item(i);
			this.current_opcode_level = this.max_opcode_level;
			res += this.s(".push("+Runtime.rtl.toString(this.translateRun(item))+")");
		}
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Map
	 */
	OpMap(op_code){
		var res = "";
		var keys = op_code.values.keys();
		res += "(new "+Runtime.rtl.toString(this.getName("Map"))+"())";
		for (var i = 0; i < keys.count(); i++){
			var key = keys.item(i);
			var item = op_code.values.item(key);
			this.current_opcode_level = this.max_opcode_level;
			res += this.s(".set("+Runtime.rtl.toString(Runtime.rs.json_encode(key))+", "+Runtime.rtl.toString(this.translateRun(item))+")");
		}
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Clone
	 */
	OpMethod(op_code){
		if (op_code.value instanceof BayrellLang.OpCodes.OpDynamic){
			var name = op_code.value.name;
			var obj = this.translateRun(op_code.value.value);
			if (obj == "this"){
				return Runtime.rtl.toString(obj)+"."+Runtime.rtl.toString(name)+".bind(this)";
			}
			return Runtime.rtl.toString(obj)+"."+Runtime.rtl.toString(name);
		}
		else if (op_code.value instanceof BayrellLang.OpCodes.OpStatic){
			var name = op_code.value.name;
			if (op_code.value.value.value == "self"){
				return Runtime.rtl.toString(this.getName("self"))+"."+Runtime.rtl.toString(name);
			}
			else if (!this.modules.has(op_code.value.value.value) && op_code.value.value.value != "rtl" && op_code.value.value.value != "parent" && op_code.value.value.value != "static"){
				return "("+Runtime.rtl.toString(this.getName("rtl"))+".method("+Runtime.rtl.toString(op_code.value.value.value)+".getClassName(), "+Runtime.rtl.toString(this.convertString(name))+"))";
			}
		}
		return this.translateRun(op_code.value);
	}
	/**
	 * Class name
	 */
	OpClassName(op_code){
		return this.convertString(this.modules.get(op_code.value, ""));
	}
	/** ============================ Operators ============================ */
	/**
	 * Assign
	 */
	OpAssignAwait(op_code){
		var res = "";
		var s = "";
		this.is_async_await_op_call = true;
		var old_is_operation = this.beginOperation();
		this.current_opcode_level = 0;
		this.levelInc();
		s = this.s(this.translateRun(op_code.value));
		this.levelDec();
		this.endOperation(old_is_operation);
		var jump_pos_next = this.asyncJumpNext(true);
		res += Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_next))+");";
		res += this.s("return "+Runtime.rtl.toString(s)+";");
		this.levelDec();
		res += this.s("}");
		res += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_next))+"){");
		this.levelInc();
		var old_is_operation = this.beginOperation();
		this.pushOneLine(true);
		if (op_code instanceof BayrellLang.OpCodes.OpAssign){
			s = this.translateRun(op_code.ident);
			if (op_code.op_name == "="){
				s += " = ";
			}
			else if (op_code.op_name == "~="){
				s += " += ";
			}
			else if (op_code.op_name == "+="){
				s += " += ";
			}
			else if (op_code.op_name == "-="){
				s += " -= ";
			}
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpAssignDeclare){
			s = Runtime.rtl.toString(op_code.name)+" = ";
		}
		s += Runtime.rtl.toString(this.asyncContextName())+".result();";
		this.popOneLine();
		this.endOperation(old_is_operation);
		this.asyncJumpAdd(true);
		res += this.s(s);
		this.is_async_await_op_call = false;
		return res;
	}
	/**
	 * Assign
	 */
	OpAssign(op_code){
		var is_async_f = this.isAsyncF();
		var is_async = false;
		if (is_async_f){
			if (op_code.value instanceof BayrellLang.OpCodes.OpCall){
				if (op_code.value.is_await){
					is_async = true;
				}
			}
		}
		if (is_async){
			return this.OpAssignAwait(op_code);
		}
		var old_is_operation = this.beginOperation();
		/* one line */
		this.pushOneLine(true);
		var res = this.translateRun(op_code.ident);
		this.popOneLine();
		if (op_code.op_name == "="){
			res += " = ";
		}
		else if (op_code.op_name == "~="){
			res += " += ";
		}
		else if (op_code.op_name == "+="){
			res += " += ";
		}
		else if (op_code.op_name == "-="){
			res += " -= ";
		}
		this.current_opcode_level = 0;
		this.levelInc();
		res += this.s(this.translateRun(op_code.value));
		this.levelDec();
		if (!old_is_operation){
			res += this.s(";");
		}
		this.endOperation(old_is_operation);
		return res;
	}
	/**
	 * Assign declare
	 */
	OpAssignDeclare(op_code){
		var is_async_f = this.isAsyncF();
		var is_async = false;
		if (is_async_f){
			if (op_code.value != null && op_code.value instanceof BayrellLang.OpCodes.OpCall){
				if (op_code.value.is_await){
					is_async = true;
				}
			}
		}
		if (is_async){
			return this.OpAssignAwait(op_code);
		}
		var res = "";
		var old_is_operation = this.beginOperation();
		if (op_code.value == null){
			if (is_async_f){
				this.endOperation(old_is_operation);
				return "";
			}
			this.pushOneLine(true);
			res = "var "+Runtime.rtl.toString(op_code.name);
			this.popOneLine();
		}
		else {
			this.pushOneLine(true);
			res = Runtime.rtl.toString((!is_async_f) ? ("var ") : (""))+Runtime.rtl.toString(op_code.name)+" = ";
			this.popOneLine();
			this.current_opcode_level = 0;
			this.levelInc();
			res += this.s(this.translateRun(op_code.value));
			this.levelDec();
		}
		if (!old_is_operation){
			res += this.s(";");
		}
		this.endOperation(old_is_operation);
		return res;
	}
	/**
	 * Break
	 */
	OpBreak(op_code){
		if (this.isAsyncF() && this.is_async_opcode_while){
			this.is_return = true;
			var pos = this.asyncEndPos();
			return "return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(pos))+");";
		}
		return "break;";
	}
	/**
	 * Clone
	 */
	OpClone(op_code){
		var old_is_operation = this.beginOperation();
		/* result */
		var s = Runtime.rtl.toString(this.getName("rtl"))+"._clone(";
		this.current_opcode_level = 0;
		s += this.s(this.translateRun(op_code.value));
		s += this.s(")");
		if (!old_is_operation){
			res += this.s(";");
		}
		this.endOperation(old_is_operation);
		return s;
	}
	/**
	 * Continue
	 */
	OpContinue(op_code){
		if (this.isAsyncF() && this.is_async_opcode_while){
			this.is_return = true;
			var pos = this.asyncBeginPos();
			return "return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(pos))+");";
		}
		return "continue;";
	}
	/**
	 * Delete
	 */
	OpDelete(op_code){
		return "";
	}
	/**
	 * For
	 */
	OpFor(op_code){
		var s = "";
		var jump_pos_begin = "";
		var jump_pos_first = "";
		var jump_pos_start = "";
		var jump_pos_end = "";
		var jump_pos_childs = "";
		/* Check await op_code*/
		var old_is_async_opcode = this.is_async_opcode;
		var old_is_async_opcode_while = this.is_async_opcode_while;
		this.checkAwaitOpCode(op_code, "for");
		/* OpFor async start */
		/*
		if (this.isAsync())
		{
			this.asyncJumpAdd();
			jump_pos_end = this.asyncJumpCurrent();
			
			s ~= this.translateRun(op_code.loop_init);
			s ~= this.s("return " ~ this.asyncContextName() ~ ".jump(" ~ this.convertString(jump_pos_end) ~ ");");
			this.levelDec();
			s ~= this.s("}");
			s ~= this.s("else if (" ~ this.asyncJumpName() ~ " == " ~ this.convertString(jump_pos_end) ~ "){");
			this.levelInc();
		}
		*/
		/* Async start */
		jump_pos_end = this.asyncJumpNext();
		this.asyncJumpPush();
		jump_pos_begin = this.asyncJumpCurrent();
		this.asyncJumpAdd();
		jump_pos_start = this.asyncJumpCurrent();
		/* Push stop jump positions for break and continue */
		this.asyncPushStop(jump_pos_begin, jump_pos_end);
		this.asyncJumpAdd();
		jump_pos_childs = this.asyncJumpCurrent();
		/* Header */
		if (this.isAsync()){
			s += this.translateRun(op_code.loop_init);
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_start))+");");
			this.levelDec();
			s += this.s("}");
			s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_begin))+"){");
			this.levelInc();
			s += this.s(this.translateRun(op_code.loop_inc));
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_start))+");");
			this.levelDec();
			s += this.s("}");
			s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_start))+"){");
			this.levelInc();
			this.beginOperation();
			var s1 = "if ("+Runtime.rtl.toString(this.translateRun(op_code.loop_condition))+"){";
			this.endOperation();
			s += this.s(s1);
		}
		else {
			this.beginOperation();
			s += "for ("+Runtime.rtl.toString(this.translateRun(op_code.loop_init))+"; "+Runtime.rtl.toString(this.translateRun(op_code.loop_condition))+"; "+Runtime.rtl.toString(this.translateRun(op_code.loop_inc))+"){";
			this.endOperation();
		}
		var op_code_childs = "";
		if (!this.isAsync()){
			this.levelInc();
		}
		for (var i = 0; i < op_code.childs.count(); i++){
			op_code_childs += this.s(this.translateRun(op_code.childs.item(i)));
		}
		if (!this.isAsync()){
			this.levelDec();
		}
		if (this.isAsync()){
			this.levelInc();
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_childs))+");");
			this.levelDec();
		}
		else {
			s += op_code_childs;
		}
		s += this.s("}");
		/* Async jump code */
		if (this.isAsync()){
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_end))+");");
			if (jump_pos_childs != ""){
				this.levelDec();
				s += this.s("}");
				s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_childs))+"){");
				this.levelInc();
				s += op_code_childs;
				s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_begin))+");");
			}
			this.levelDec();
			s += this.s("}");
			s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_end))+"){");
			this.levelInc();
		}
		this.is_async_opcode = old_is_async_opcode;
		this.is_async_opcode_while = old_is_async_opcode_while;
		/* Pop stop jump positions */
		this.asyncPopStop();
		this.asyncJumpPop();
		this.asyncJumpAdd();
		return s;
	}
	/**
	 * If
	 */
	OpIf(op_code){
		var s = "";
		var old_is_return = this.is_return;
		var jump_pos_true = "";
		var jump_pos_false = "";
		var jump_pos_begin = "";
		var jump_pos_end = "";
		var is_return_true = false;
		var is_return_false = false;
		var op_code_true = "";
		var op_code_false = "";
		var op_code_else = new Runtime.Vector();
		/* Check await op_code*/
		var old_is_async_opcode = this.is_async_opcode;
		var old_is_async_opcode_while = this.is_async_opcode_while;
		this.checkAwaitOpCode(op_code, "if");
		/* Condition */
		this.beginOperation();
		s += "if ("+Runtime.rtl.toString(this.translateRun(op_code.condition))+"){";
		this.endOperation();
		/* Increase level */
		jump_pos_end = this.asyncJumpNext();
		this.asyncJumpPush();
		jump_pos_begin = this.asyncJumpCurrent();
		/* If true */
		this.is_return = false;
		jump_pos_true = this.asyncJumpAdd();
		if (!this.isAsync()){
			this.levelInc();
		}
		for (var i = 0; i < op_code.if_true.count(); i++){
			op_code_true += this.s(this.translateRun(op_code.if_true.item(i)));
		}
		if (!this.isAsync()){
			this.levelDec();
		}
		if (this.isAsync()){
			is_return_true = this.is_return;
			this.levelInc();
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_true))+");");
			this.levelDec();
		}
		else {
			s += op_code_true;
		}
		s += this.s("}");
		/* If else */
		for (var i = 0; i < op_code.if_else.count(); i++){
			var if_else = op_code.if_else.item(i);
			this.beginOperation();
			var res = "else if ("+Runtime.rtl.toString(this.translateRun(if_else.condition))+"){";
			this.endOperation();
			s += this.s(res);
			this.is_return = false;
			var jump_pos = this.asyncJumpAdd();
			var code_else = "";
			if (!this.isAsync()){
				this.levelInc();
			}
			for (var j = 0; j < if_else.if_true.count(); j++){
				code_else += this.s(this.translateRun(if_else.if_true.item(j)));
			}
			if (!this.isAsync()){
				this.levelDec();
			}
			if (this.isAsync()){
				var is_return = this.is_return;
				op_code_else.push((new Runtime.Map()).set("jump_pos", jump_pos).set("is_return", is_return).set("op_code", code_else));
				this.levelInc();
				s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos))+");");
				this.levelDec();
			}
			else {
				s += code_else;
			}
			s += this.s("}");
		}
		/* If false */
		if (op_code.if_false != null){
			this.is_return = false;
			jump_pos_false = this.asyncJumpAdd();
			s += this.s("else {");
			if (!this.isAsync()){
				this.levelInc();
			}
			for (var i = 0; i < op_code.if_false.count(); i++){
				op_code_false += this.s(this.translateRun(op_code.if_false.item(i)));
			}
			if (!this.isAsync()){
				this.levelDec();
			}
			if (this.isAsync()){
				is_return_false = this.is_return;
				this.levelInc();
				s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_false))+");");
				this.levelDec();
			}
			else {
				s += op_code_false;
			}
			s += this.s("}");
		}
		if (this.isAsync()){
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_end))+");");
			if (jump_pos_true != ""){
				this.levelDec();
				s += this.s("}");
				s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_true))+"){");
				this.levelInc();
				s += op_code_true;
				if (!is_return_true){
					s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_end))+");");
				}
			}
			if (op_code_else.count() > 0){
				var op_code_else_sz = op_code_else.count();
				for (var i = 0; i < op_code_else_sz; i++){
					var item = op_code_else.item(i);
					var jump_pos = item.get("jump_pos", "-1", "string");
					var is_return = item.get("is_return", false, "bool");
					var op_code = item.get("op_code", "", "string");
					this.levelDec();
					s += this.s("}");
					s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos))+"){");
					this.levelInc();
					s += op_code;
					if (!is_return){
						s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_end))+");");
					}
				}
			}
			if (jump_pos_false != ""){
				this.levelDec();
				s += this.s("}");
				s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_false))+"){");
				this.levelInc();
				s += op_code_false;
				if (!is_return_false){
					s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_end))+");");
				}
			}
			this.levelDec();
			s += this.s("}");
			s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_end))+"){");
			this.levelInc();
		}
		this.is_async_opcode = old_is_async_opcode;
		this.is_async_opcode_while = old_is_async_opcode_while;
		/* Decrease level */
		this.asyncJumpPop();
		this.asyncJumpAdd();
		this.is_return = old_is_return;
		return s;
	}
	/**
	 * Return
	 */
	OpReturn(op_code){
		this.beginOperation();
		/* result */
		this.current_opcode_level = 0;
		this.levelInc();
		var s = this.s(this.translateRun(op_code.value));
		this.levelDec();
		this.endOperation();
		if (this.isAsyncF()){
			s = "return "+Runtime.rtl.toString(this.asyncContextName())+".resolve("+Runtime.rtl.toString(s)+");";
			this.is_return = true;
		}
		else if (this.current_function_is_memorize){
			var res = "var __memorize_value = "+Runtime.rtl.toString(s)+";";
			res += this.s(Runtime.rtl.toString(this.getName("rtl"))+"._memorizeSave("+Runtime.rtl.toString(this.convertString(this.getCurrentFunctionName()))+", arguments, __memorize_value);");
			res += this.s("return __memorize_value;");
			return res;
		}
		else {
			s = "return "+Runtime.rtl.toString(s)+";";
		}
		return s;
	}
	/**
	 * Throw
	 */
	OpThrow(op_code){
		this.beginOperation();
		/* result */
		var s = "throw ";
		this.current_opcode_level = 0;
		s += this.s(this.translateRun(op_code.value));
		s += ";";
		this.endOperation();
		return s;
	}
	/**
	 * Try Catch
	 */
	OpTryCatch(op_code){
		var s = "";
		/* Check await op_code*/
		var old_is_async_opcode = this.is_async_opcode;
		var old_is_async_opcode_while = this.is_async_opcode_while;
		this.checkAwaitOpCode(op_code, "try_catch");
		var jump_pos_catch = "";
		var jump_pos_end = "";
		if (this.isAsync()){
		}
		else {
			s += "try{";
			this.levelInc();
		}
		var op_code_try = "";
		for (var i = 0; i < op_code.op_try.count(); i++){
			op_code_try += this.s(this.translateRun(op_code.op_try.item(i)));
		}
		jump_pos_catch = this.asyncJumpNext();
		this.asyncJumpAdd();
		jump_pos_end = this.asyncJumpNext();
		if (this.isAsync()){
			s += Runtime.rtl.toString(this.asyncContextName())+".catchPush("+Runtime.rtl.toString(this.convertString(jump_pos_catch))+");";
			s += op_code_try;
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_end))+");");
			this.levelDec();
			s += this.s("}");
			s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_catch))+"){");
			this.levelInc();
			this.asyncJumpAdd();
		}
		else {
			s += op_code_try;
			this.levelDec();
			s += this.s("}");
		}
		var is_else = "";
		var try_catch_childs_sz = op_code.childs.count();
		if (!this.isAsync()){
			s += "catch(_the_exception){";
		}
		else {
			s += this.s(Runtime.rtl.toString(this.asyncContextName())+".catchPop();");
			s += this.s("var _the_exception = "+Runtime.rtl.toString(this.asyncContextName())+".getError();");
		}
		for (var i = 0; i < try_catch_childs_sz; i++){
			var try_catch = op_code.childs.item(i);
			this.beginOperation();
			var tp = this.translateRun(try_catch.op_type);
			var name = this.translateRun(try_catch.op_ident);
			this.endOperation();
			if (tp == "var"){
				tp = "Error";
			}
			if (!this.isAsync()){
				this.levelInc();
			}
			s += this.s(Runtime.rtl.toString(is_else)+"if (_the_exception instanceof "+Runtime.rtl.toString(tp)+"){");
			this.levelInc();
			s += this.s("var "+Runtime.rtl.toString(name)+" = _the_exception;");
			for (var j = 0; j < try_catch.childs.count(); j++){
				s += this.s(this.translateRun(try_catch.childs.item(j)));
			}
			this.levelDec();
			s += this.s("}");
			if (!this.isAsync()){
				this.levelDec();
			}
			is_else = "else";
		}
		if (try_catch_childs_sz > 0){
			if (this.isAsync()){
				s += this.s("else {  return "+Runtime.rtl.toString(this.asyncContextName())+".error( _the_exception );  }");
			}
			else {
				this.levelInc();
				s += this.s("else { throw _the_exception; }");
				this.levelDec();
			}
		}
		if (this.isAsync()){
			s += this.s(Runtime.rtl.toString(this.asyncContextName())+".clearError();");
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_end))+");");
			this.levelDec();
			s += this.s("}");
			s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_end))+"){");
			this.levelInc();
			this.asyncJumpAdd();
		}
		else {
			s += this.s("}");
		}
		this.is_async_opcode = old_is_async_opcode;
		this.is_async_opcode_while = old_is_async_opcode_while;
		return s;
	}
	/**
	 * While
	 */
	OpWhile(op_code){
		var s = "";
		var jump_pos_begin = "";
		var jump_pos_end = "";
		var jump_pos_childs = "";
		/* Check await op_code*/
		var old_is_async_opcode = this.is_async_opcode;
		var old_is_async_opcode_while = this.is_async_opcode_while;
		this.checkAwaitOpCode(op_code, "while");
		/* OpWhile async start */
		/*
		if (this.isAsync())
		{
			this.asyncJumpAdd();
			jump_pos_end = this.asyncJumpCurrent();
			
			s ~= "return " ~ this.asyncContextName() ~ ".jump(" ~ this.convertString(jump_pos_end) ~ ");";
			this.levelDec();
			s ~= this.s("}");
			s ~= this.s("else if (" ~ this.asyncJumpName() ~ " == " ~ this.convertString(jump_pos_end) ~ "){");
			this.levelInc();
		}
		*/
		/* Async start */
		jump_pos_end = this.asyncJumpNext();
		this.asyncJumpPush();
		jump_pos_begin = this.asyncJumpCurrent();
		this.asyncJumpAdd();
		jump_pos_childs = this.asyncJumpCurrent();
		/* Push stop jump positions for break and continue */
		this.asyncPushStop(jump_pos_begin, jump_pos_end);
		/* Condition */
		if (this.isAsync()){
			s += "return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_begin))+");";
			this.levelDec();
			s += this.s("}");
			s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_begin))+"){");
			this.levelInc();
			s += this.s("if ("+Runtime.rtl.toString(this.translateRun(op_code.condition))+"){");
		}
		else {
			this.beginOperation();
			s += "while ("+Runtime.rtl.toString(this.translateRun(op_code.condition))+"){";
			this.endOperation();
		}
		var op_code_childs = "";
		if (!this.isAsync()){
			this.levelInc();
		}
		for (var i = 0; i < op_code.childs.count(); i++){
			op_code_childs += this.s(this.translateRun(op_code.childs.item(i)));
		}
		if (!this.isAsync()){
			this.levelDec();
		}
		if (this.isAsync()){
			this.levelInc();
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_childs))+");");
			this.levelDec();
		}
		else {
			s += op_code_childs;
		}
		s += this.s("}");
		/* Async jump code */
		if (this.isAsync()){
			s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_end))+");");
			if (jump_pos_childs != ""){
				this.levelDec();
				s += this.s("}");
				s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_childs))+"){");
				this.levelInc();
				s += op_code_childs;
				s += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".jump("+Runtime.rtl.toString(this.convertString(jump_pos_begin))+");");
			}
			this.levelDec();
			s += this.s("}");
			s += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(jump_pos_end))+"){");
			this.levelInc();
		}
		this.is_async_opcode = old_is_async_opcode;
		this.is_async_opcode_while = old_is_async_opcode_while;
		/* Pop stop jump positions */
		this.asyncPopStop();
		this.asyncJumpPop();
		this.asyncJumpAdd();
		return s;
	}
	/** ======================== Namespace and use ======================== */
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		this.current_namespace = op_code.value;
		var arr = Runtime.rs.explode(".", this.current_namespace);
		this.current_module_name = arr.item(0);
		this.modules.clear();
		if (this.current_module_name != "Runtime"){
			this.modules.set("rtl", "Runtime.rtl");
			this.modules.set("rs", "Runtime.rs");
			this.modules.set("Map", "Runtime.Map");
			this.modules.set("Dict", "Runtime.Dict");
			this.modules.set("Vector", "Runtime.Vector");
			this.modules.set("Collection", "Runtime.Collection");
			this.modules.set("IntrospectionInfo", "Runtime.IntrospectionInfo");
			this.modules.set("UIStruct", "Runtime.UIStruct");
		}
		return "";
	}
	/**
	 * Use
	 */
	OpUse(op_code){
		var lib_name = op_code.value;
		var arr = Runtime.rs.explode(".", lib_name);
		var class_name = arr.getLastItem("");
		if (op_code.alias_name != ""){
			this.modules.set(op_code.alias_name, lib_name);
		}
		else if (class_name != ""){
			this.modules.set(class_name, lib_name);
		}
		return "";
	}
	/** ============================= Classes ============================= */
	/**
	 * Returns all declare variables for async function
	 * @param BaseOpCode op_code
	 * @param Vector<string> variables
	 */
	detectAsyncDeclareVariables(op_code, variables){
		if (op_code instanceof BayrellLang.OpCodes.OpAssignDeclare){
			variables.push(op_code.name);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpFunctionDeclare){
			if (op_code.childs != null){
				for (var i = 0; i < op_code.childs.count(); i++){
					this.detectAsyncDeclareVariables(op_code.childs.item(i), variables);
				}
			}
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpFor){
			for (var i = 0; i < op_code.childs.count(); i++){
				this.detectAsyncDeclareVariables(op_code.childs.item(i), variables);
			}
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpIf){
			for (var i = 0; i < op_code.if_true.count(); i++){
				this.detectAsyncDeclareVariables(op_code.if_true.item(i), variables);
			}
			for (var i = 0; i < op_code.if_else.count(); i++){
				var item = op_code.if_else.item(i);
				for (var j = 0; j < item.if_true.count(); j++){
					this.detectAsyncDeclareVariables(item.if_true.item(j), variables);
				}
			}
			if (op_code.if_false != null){
				for (var i = 0; i < op_code.if_false.count(); i++){
					this.detectAsyncDeclareVariables(op_code.if_false.item(i), variables);
				}
			}
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpTryCatch){
			for (var i = 0; i < op_code.op_try.count(); i++){
				this.detectAsyncDeclareVariables(op_code.op_try.item(i), variables);
			}
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpWhile){
			for (var i = 0; i < op_code.childs.count(); i++){
				this.detectAsyncDeclareVariables(op_code.childs.item(i), variables);
			}
		}
	}
	/**
	 * Returns true if op_code contains await opCall
	 * @param BaseOpCode op_code
	 * @return bool
	 */
	detectIsAwait(op_code){
		if (op_code instanceof BayrellLang.OpCodes.OpAssign){
			if (op_code.value != null && op_code.value instanceof BayrellLang.OpCodes.OpCall){
				if (op_code.value.is_await){
					return true;
				}
			}
			return false;
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpAssignDeclare){
			if (op_code.value != null && op_code.value instanceof BayrellLang.OpCodes.OpCall){
				if (op_code.value.is_await){
					return true;
				}
			}
			return false;
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpCall){
			if (op_code.is_await){
				return true;
			}
			return false;
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpFunctionDeclare){
			for (var i = 0; i < op_code.childs.count(); i++){
				if (this.detectIsAwait(op_code.childs.item(i))){
					return true;
				}
			}
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpFor){
			for (var i = 0; i < op_code.childs.count(); i++){
				if (this.detectIsAwait(op_code.childs.item(i))){
					return true;
				}
			}
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpIf){
			for (var i = 0; i < op_code.if_true.count(); i++){
				if (this.detectIsAwait(op_code.if_true.item(i))){
					return true;
				}
			}
			for (var i = 0; i < op_code.if_else.count(); i++){
				var item = op_code.if_else.item(i);
				for (var j = 0; j < item.if_true.count(); j++){
					if (this.detectIsAwait(item.if_true.item(j))){
						return true;
					}
				}
			}
			if (op_code.if_false != null){
				for (var i = 0; i < op_code.if_false.count(); i++){
					if (this.detectIsAwait(op_code.if_false.item(i))){
						return true;
					}
				}
			}
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpTryCatch){
			for (var i = 0; i < op_code.op_try.count(); i++){
				if (this.detectIsAwait(op_code.op_try.item(i))){
					return true;
				}
			}
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpWhile){
			for (var i = 0; i < op_code.childs.count(); i++){
				if (this.detectIsAwait(op_code.childs.item(i))){
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * Function header
	 */
	OpFunctionDeclareHeader(op_code){
		var res = "";
		var ch = "";
		/* Static function */
		if (op_code.isFlag("static")){
			res += "static ";
		}
		res += op_code.name;
		res += "(";
		for (var i = 0; i < op_code.args.count(); i++){
			var variable = op_code.args.item(i);
			this.pushOneLine(true);
			res += Runtime.rtl.toString(ch)+Runtime.rtl.toString(variable.name);
			this.popOneLine();
			ch = ", ";
		}
		res += ")";
		if (this.function_stack.count() > 1){
			res += " => ";
		}
		return res;
	}
	/**
	 * Function declare
	 */
	OpFunctionDeclare(op_code){
		var res = "";
		var s = "";
		/* Skip if declare function */
		if (op_code.isFlag("declare")){
			return "";
		}
		var old_current_function_is_memorize = this.current_function_is_memorize;
		this.current_function_is_memorize = false;
		if (op_code.isFlag("memorize") && op_code.isFlag("static") && !op_code.isFlag("async") && this.function_stack.count() == 0){
			this.current_function_is_memorize = true;
		}
		this.functionPush(op_code.name, op_code.isFlag("async"));
		res += this.OpFunctionDeclareHeader(op_code);
		res += "{";
		this.setOperation(false);
		this.pushOneLine(false);
		this.levelInc();
		/* Memorize function */
		if (this.current_function_is_memorize){
			res += this.s("var __memorize_value = "+Runtime.rtl.toString(this.getName("rtl"))+"._memorizeValue("+Runtime.rtl.toString(this.convertString(this.getCurrentFunctionName()))+", arguments);");
			res += this.s("if (__memorize_value != "+Runtime.rtl.toString(this.getName("rtl"))+"._memorize_not_found) return __memorize_value;");
		}
		if (op_code.isFlag("async")){
			var variables = new Runtime.Vector();
			this.detectAsyncDeclareVariables(op_code, variables);
			if (variables.count() > 0){
				res += this.s("var "+Runtime.rtl.toString(Runtime.rs.implode(", ", variables))+";");
			}
			res += this.s("return ("+Runtime.rtl.toString(this.asyncContextName())+") => {");
			this.levelInc();
			res += this.s("var "+Runtime.rtl.toString(this.asyncJumpName())+" = "+Runtime.rtl.toString(this.asyncContextName())+".current();");
			res += this.s("if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString(this.asyncJumpCurrent()))+"){");
			this.levelInc();
		}
		for (var i = 0; i < op_code.args.count(); i++){
			var variable = op_code.args.item(i);
			if (variable.value == null){
				continue;
			}
			this.pushOneLine(true);
			s = "if ("+Runtime.rtl.toString(variable.name)+" == undefined) "+Runtime.rtl.toString(variable.name)+"="+Runtime.rtl.toString(this.translateRun(variable.value))+";";
			this.popOneLine();
			res += this.s(s);
		}
		/* Childs */
		if (op_code.childs != null){
			if (op_code.is_lambda){
				if (op_code.childs.count() > 0){
					var old_is_operation = this.beginOperation(true);
					var lambda_res = this.translateRun(op_code.childs.item(0));
					this.endOperation(old_is_operation);
					if (this.current_function_is_memorize){
						res += this.s("var __memorize_value = "+Runtime.rtl.toString(lambda_res)+";");
						res += this.s(Runtime.rtl.toString(this.getName("rtl"))+"._memorizeSave("+Runtime.rtl.toString(this.convertString(this.getCurrentFunctionName()))+", arguments, __memorize_value);");
						res += this.s("return __memorize_value;");
					}
					else {
						res += this.s("return "+Runtime.rtl.toString(lambda_res)+";");
					}
				}
			}
			else {
				for (var i = 0; i < op_code.childs.count(); i++){
					res += this.s(this.translateRun(op_code.childs.item(i)));
				}
			}
		}
		else if (op_code.return_function != null){
			res += this.s("return "+Runtime.rtl.toString(this.translateItem(op_code.return_function)));
		}
		if (op_code.isFlag("async")){
			this.levelDec();
			res += this.s("}");
			res += this.s("else if ("+Runtime.rtl.toString(this.asyncJumpName())+" == "+Runtime.rtl.toString(this.convertString("-1"))+"){");
			this.levelInc();
			res += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".error( "+Runtime.rtl.toString(this.asyncContextName())+".getError() )");
			this.levelDec();
			res += this.s("}");
			res += this.s("else{");
			this.levelInc();
			res += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".next();");
			this.levelDec();
			res += this.s("}");
			res += this.s("return "+Runtime.rtl.toString(this.asyncContextName())+".end();");
			this.levelDec();
			res += this.s("}");
		}
		this.levelDec();
		res += this.s("}");
		this.popOneLine();
		this.functionPop();
		this.current_function_is_memorize = old_current_function_is_memorize;
		return res;
	}
	/**
	 * Class declare header
	 */
	OpClassDeclareHeader(op_code){
		var s = "";
		var res = "";
		var name = "";
		var ch = "";
		var v = Runtime.rs.explode(".", this.current_namespace);
		this.ui_struct_class_name.push(Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name));
		for (var i = 0; i < v.count(); i++){
			name += Runtime.rtl.toString(ch)+Runtime.rtl.toString(v.item(i));
			s = "if (typeof "+Runtime.rtl.toString(name)+" == 'undefined') "+Runtime.rtl.toString(name)+" = {};";
			if (i == 0){
				res += s;
			}
			else {
				res += this.s(s);
			}
			ch = ".";
		}
		this.beginOperation();
		s = Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(op_code.class_name)+" = class";
		if (op_code.class_extends != ""){
			s += " extends "+Runtime.rtl.toString(this.translateRun(op_code.class_extends));
		}
		s += "{";
		this.endOperation();
		res += this.s(s);
		this.levelInc();
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpClassDeclareFooter(op_code){
		var res = "";
		/* Static variables */
		for (var i = 0; i < op_code.childs.count(); i++){
			var variable = op_code.childs.item(i);
			if (!(variable instanceof BayrellLang.OpCodes.OpAssignDeclare)){
				continue;
			}
			if (variable.flags != null && (variable.isFlag("static") || variable.isFlag("const"))){
				this.beginOperation();
				var s = Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(op_code.class_name)+"."+Runtime.rtl.toString(variable.name)+" = "+Runtime.rtl.toString(this.translateRun(variable.value))+";";
				this.endOperation();
				res += this.s(s);
			}
		}
		/* Static implements */
		var class_implements = op_code.class_implements;
		if (class_implements != null && class_implements.count() > 0){
			var name = Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(op_code.class_name);
			res += this.s(Runtime.rtl.toString(name)+".__static_implements__ = [];");
			for (var i = 0; i < class_implements.count(); i++){
				var value = class_implements.item(i);
				res += this.s(Runtime.rtl.toString(name)+".__static_implements__.push("+Runtime.rtl.toString(this.getName(value))+")");
			}
		}
		return res;
	}
	/**
	 * Returns declare type
	 * @return string
	 */
	getTypeValue(tp){
		var res = "";
		while (tp != null){
			if (tp instanceof BayrellLang.OpCodes.OpIdentifier){
				if (res != ""){
					res = "."+Runtime.rtl.toString(res);
				}
				res = Runtime.rtl.toString(this.getModuleName(tp.value))+Runtime.rtl.toString(res);
				tp = null;
			}
			else if (tp instanceof BayrellLang.OpCodes.OpDynamic){
				if (res != ""){
					res = "."+Runtime.rtl.toString(res);
				}
				res = Runtime.rtl.toString(tp.name)+Runtime.rtl.toString(res);
				tp = tp.value;
			}
			else if (tp instanceof BayrellLang.OpCodes.OpTemplateIdentifier){
				tp = tp.t;
			}
			else {
				tp = null;
			}
		}
		return res;
	}
	/**
	 * Returns declare type
	 * @return string
	 */
	getAssignDeclareTypeValue(variable){
		return this.getTypeValue(variable.tp);
	}
	/**
	 * Returns declare type
	 * @return string
	 */
	getAssignDeclareTypeTemplate(variable){
		if (variable.tp instanceof BayrellLang.OpCodes.OpTemplateIdentifier){
			if (variable.tp.childs != null){
				var code = variable.tp.childs.get(0);
				return this.getTypeValue(code);
			}
		}
		return "";
	}
	/**
	 * Class init functions
	 */
	OpClassInit(op_code){
		var childs = op_code.childs;
		var class_implements = op_code.class_implements;
		var class_extends = "";
		if (op_code.class_extends){
			if (this.modules.has(op_code.class_extends.value)){
				class_extends = this.modules.item(op_code.class_extends.value);
			}
			else {
				class_extends = op_code.class_extends.value;
			}
		}
		var s = "";
		var res = "";
		var has_assignable = false;
		var has_serializable = false;
		var has_cloneable = false;
		var has_variables = false;
		var has_implements = class_implements != null && class_implements.count() > 0;
		var has_methods_annotations = false;
		var has_fields_annotations = false;
		for (var i = 0; i < childs.count(); i++){
			var variable = childs.item(i);
			if (variable instanceof BayrellLang.OpCodes.OpAssignDeclare){
				if (variable.isFlag("serializable")){
					has_serializable = true;
					has_cloneable = true;
				}
				if (variable.isFlag("cloneable")){
					has_cloneable = true;
				}
				if (variable.isFlag("assignable")){
					has_assignable = true;
				}
				if (!variable.isFlag("static") && !variable.isFlag("const")){
					has_variables = true;
				}
				if (variable.hasAnnotations()){
					has_fields_annotations = true;
				}
			}
			if (variable instanceof BayrellLang.OpCodes.OpFunctionDeclare){
				if (variable.hasAnnotations()){
					has_methods_annotations = true;
				}
			}
		}
		if (this.is_struct){
			has_serializable = true;
			has_cloneable = true;
		}
		if (!this.is_interface){
			res += this.s("/* ======================= Class Init Functions ======================= */");
			res += this.s("getClassName(){"+"return "+Runtime.rtl.toString(this.convertString(Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name)))+";}");
			res += this.s("static getCurrentNamespace(){"+"return "+Runtime.rtl.toString(this.convertString(this.current_namespace))+";}");
			res += this.s("static getCurrentClassName(){"+"return "+Runtime.rtl.toString(this.convertString(Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name)))+";}");
			res += this.s("static getParentClassName(){"+"return "+Runtime.rtl.toString(this.convertString(class_extends))+";}");
		}
		if (this.current_module_name != "Runtime" || this.current_class_name != "CoreObject"){
			if (has_variables || has_implements){
				res += this.s("_init(){");
				this.functionPush("_init", false);
				this.levelInc();
				if (class_extends != ""){
					res += this.s("super._init();");
					res += this.s("var names = Object.getOwnPropertyNames(this);");
				}
				if (childs != null){
					for (var i = 0; i < childs.count(); i++){
						var variable = childs.item(i);
						if (!(variable instanceof BayrellLang.OpCodes.OpAssignDeclare)){
							continue;
						}
						if (variable.value == null){
							continue;
						}
						var var_prefix = "";
						if (this.is_struct && variable.isFlag("public") && !variable.isFlag("static")){
							var_prefix = "__";
						}
						var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
						if (is_struct){
							this.beginOperation();
							s = "this."+Runtime.rtl.toString(var_prefix)+Runtime.rtl.toString(variable.name)+" = "+Runtime.rtl.toString(this.translateRun(variable.value))+";";
							this.endOperation();
							res += this.s(s);
							res += this.s("if (names.indexOf("+Runtime.rtl.toString(this.convertString(variable.name))+") == -1)"+"Object.defineProperty(this, "+Runtime.rtl.toString(this.convertString(variable.name))+", { get: function() { return this.__"+Runtime.rtl.toString(variable.name)+"; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("+Runtime.rtl.toString(this.convertString(variable.name))+") }});");
						}
						else {
							this.beginOperation();
							s = "this."+Runtime.rtl.toString(variable.name)+" = "+Runtime.rtl.toString(this.translateRun(variable.value))+";";
							this.endOperation();
							res += this.s(s);
						}
					}
				}
				if (class_implements != null && class_implements.count() > 0){
					res += this.s("if (this.__implements__ == undefined){this.__implements__ = [];}");
					for (var i = 0; i < class_implements.count(); i++){
						var name = class_implements.item(i);
						this.beginOperation();
						s = "this.__implements__.push("+Runtime.rtl.toString(this.getName(name))+");";
						this.endOperation();
						res += this.s(s);
					}
				}
				this.levelDec();
				this.functionPop();
				res += this.s("}");
			}
			if (has_cloneable || has_assignable){
				res += this.s("assignObject(obj){");
				this.functionPush("assignObject", false);
				this.levelInc();
				res += this.s("if (obj instanceof "+Runtime.rtl.toString(this.getName(this.current_class_name))+"){");
				this.levelInc();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof BayrellLang.OpCodes.OpAssignDeclare)){
						continue;
					}
					var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
					var var_prefix = "";
					if (this.is_struct && variable.isFlag("public") && !variable.isFlag("static")){
						var_prefix = "__";
					}
					if (variable.isFlag("public") && (variable.isFlag("cloneable") || variable.isFlag("serializable") || is_struct)){
						if (this.is_struct){
							res += this.s("this."+Runtime.rtl.toString(var_prefix)+Runtime.rtl.toString(variable.name)+" = "+"obj."+Runtime.rtl.toString(var_prefix)+Runtime.rtl.toString(variable.name)+";");
						}
						else {
							res += this.s("this."+Runtime.rtl.toString(var_prefix)+Runtime.rtl.toString(variable.name)+" = "+Runtime.rtl.toString(this.getName("rtl"))+"._clone("+"obj."+Runtime.rtl.toString(var_prefix)+Runtime.rtl.toString(variable.name)+");");
						}
					}
				}
				this.levelDec();
				res += this.s("}");
				res += this.s("super.assignObject(obj);");
				this.levelDec();
				this.functionPop();
				res += this.s("}");
			}
			if (has_serializable || has_assignable){
				var class_variables_serializable_count = 0;
				res += this.s("assignValue(variable_name, value, sender){if(sender==undefined)sender=null;");
				this.functionPush("assignValue", false);
				this.levelInc();
				class_variables_serializable_count = 0;
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof BayrellLang.OpCodes.OpAssignDeclare)){
						continue;
					}
					var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
					var var_prefix = "";
					if (this.is_struct && variable.isFlag("public") && !variable.isFlag("static")){
						var_prefix = "__";
					}
					if (variable.isFlag("public") && (variable.isFlag("serializable") || variable.isFlag("assignable") || is_struct)){
						var type_value = this.getAssignDeclareTypeValue(variable);
						var type_template = this.getAssignDeclareTypeTemplate(variable);
						var def_val = "null";
						if (variable.value != null){
							def_val = this.translateRun(variable.value);
						}
						var s = "if (variable_name == "+Runtime.rtl.toString(this.convertString(variable.name))+")";
						s += "this."+Runtime.rtl.toString(var_prefix)+Runtime.rtl.toString(variable.name)+" = ";
						s += Runtime.rtl.toString(this.getName("rtl"))+".convert(value,\""+Runtime.rtl.toString(type_value)+"\","+Runtime.rtl.toString(def_val)+",\""+Runtime.rtl.toString(type_template)+"\");";
						if (class_variables_serializable_count == 0){
							res += this.s(s);
						}
						else {
							res += this.s("else "+Runtime.rtl.toString(s));
						}
						class_variables_serializable_count++;
					}
				}
				if (class_variables_serializable_count == 0){
					res += this.s("super.assignValue(variable_name, value, sender);");
				}
				else {
					res += this.s("else super.assignValue(variable_name, value, sender);");
				}
				this.levelDec();
				this.functionPop();
				res += this.s("}");
				res += this.s("takeValue(variable_name, default_value){");
				this.functionPush("takeValue", false);
				this.levelInc();
				res += this.s("if (default_value == undefined) default_value = null;");
				class_variables_serializable_count = 0;
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof BayrellLang.OpCodes.OpAssignDeclare)){
						continue;
					}
					var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
					var var_prefix = "";
					if (this.is_struct && variable.isFlag("public") && !variable.isFlag("static")){
						var_prefix = "__";
					}
					if (variable.isFlag("public") && (variable.isFlag("serializable") || variable.isFlag("assignable") || is_struct)){
						var take_value_s = "if (variable_name == "+Runtime.rtl.toString(this.convertString(variable.name))+") "+"return this."+Runtime.rtl.toString(var_prefix)+Runtime.rtl.toString(variable.name)+";";
						if (class_variables_serializable_count == 0){
							res += this.s(take_value_s);
						}
						else {
							res += this.s("else "+Runtime.rtl.toString(take_value_s));
						}
						class_variables_serializable_count++;
					}
				}
				res += this.s("return super.takeValue(variable_name, default_value);");
				this.levelDec();
				this.functionPop();
				res += this.s("}");
			}
			if (!this.is_interface){
				res += this.s("static getFieldsList(names, flag){");
				this.functionPush("getFieldsList", false);
				this.levelInc();
				res += this.s("if (flag==undefined)flag=0;");
				var vars = new Runtime.Map();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof BayrellLang.OpCodes.OpAssignDeclare)){
						continue;
					}
					if (!variable.isFlag("public")){
						continue;
					}
					var is_struct = this.is_struct && !variable.isFlag("static") && !variable.isFlag("const");
					var is_static = variable.isFlag("static");
					var is_serializable = variable.isFlag("serializable");
					var is_assignable = variable.isFlag("assignable");
					var has_annotation = variable.hasAnnotations();
					if (is_struct){
						is_serializable = true;
						is_assignable = true;
					}
					if (is_serializable){
						is_assignable = true;
					}
					var flag = 0;
					if (is_serializable){
						flag = flag | 1;
					}
					if (is_assignable){
						flag = flag | 2;
					}
					if (has_annotation){
						flag = flag | 4;
					}
					if (flag != 0){
						if (!vars.has(flag)){
							vars.set(flag, new Runtime.Vector());
						}
						var v = vars.item(flag);
						v.push(variable.name);
					}
				}
				vars.each((flag, v) => {
					res += this.s("if ((flag | "+Runtime.rtl.toString(flag)+")=="+Runtime.rtl.toString(flag)+"){");
					this.levelInc();
					v.each((varname) => {
						res += this.s("names.push("+Runtime.rtl.toString(this.convertString(varname))+");");
					});
					this.levelDec();
					res += this.s("}");
				});
				this.levelDec();
				this.functionPop();
				res += this.s("}");
				res += this.s("static getFieldInfoByName(field_name){");
				this.functionPush("getFieldInfoByName", false);
				this.levelInc();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof BayrellLang.OpCodes.OpAssignDeclare)){
						continue;
					}
					if (variable.isFlag("public") && variable.hasAnnotations()){
						res += this.s("if (field_name == "+Runtime.rtl.toString(this.convertString(variable.name))+"){");
						this.levelInc();
						res += this.s("return new "+Runtime.rtl.toString(this.getName("IntrospectionInfo"))+"(");
						this.levelInc();
						res += this.s("(new "+Runtime.rtl.toString(this.getName("Map"))+"())");
						res += this.s(".set(\"kind\", \"field\")");
						res += this.s(".set(\"class_name\", "+Runtime.rtl.toString(this.convertString(this.currentClassName()))+")");
						res += this.s(".set(\"name\", "+Runtime.rtl.toString(this.convertString(variable.name))+")");
						res += this.s(".set(\"annotations\", ");
						this.levelInc();
						res += this.s("(new "+Runtime.rtl.toString(this.getName("Vector"))+"())");
						for (var j = 0; j < variable.annotations.count(); j++){
							var annotation = variable.annotations.item(j);
							this.pushOneLine(true);
							var old_is_operation = this.beginOperation();
							var s_kind = this.translateRun(annotation.kind);
							var s_options = this.translateRun(annotation.options);
							this.endOperation(old_is_operation);
							this.popOneLine();
							res += this.s(".push(new "+Runtime.rtl.toString(s_kind)+"("+Runtime.rtl.toString(s_options)+"))");
						}
						this.levelDec();
						res += this.s(")");
						this.levelDec();
						res += this.s(");");
						this.levelDec();
						res += this.s("}");
					}
				}
				res += this.s("return null;");
				this.levelDec();
				this.functionPop();
				res += this.s("}");
				res += this.s("static getMethodsList(names){");
				this.functionPush("getMethodsList", false);
				this.levelInc();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof BayrellLang.OpCodes.OpFunctionDeclare)){
						continue;
					}
					if (variable.isFlag("public") && variable.hasAnnotations()){
						res += this.s("names.push("+Runtime.rtl.toString(this.convertString(variable.name))+");");
					}
				}
				this.levelDec();
				this.functionPop();
				res += this.s("}");
				res += this.s("static getMethodInfoByName(method_name){");
				this.functionPush("getMethodInfoByName", false);
				this.levelInc();
				for (var i = 0; i < childs.count(); i++){
					var variable = childs.item(i);
					if (!(variable instanceof BayrellLang.OpCodes.OpFunctionDeclare)){
						continue;
					}
					if (variable.isFlag("public") && variable.hasAnnotations()){
						res += this.s("if (method_name == "+Runtime.rtl.toString(this.convertString(variable.name))+"){");
						this.levelInc();
						res += this.s("return new "+Runtime.rtl.toString(this.getName("IntrospectionInfo"))+"(");
						this.levelInc();
						res += this.s("(new "+Runtime.rtl.toString(this.getName("Map"))+"())");
						res += this.s(".set(\"kind\", \"method\")");
						res += this.s(".set(\"class_name\", "+Runtime.rtl.toString(this.convertString(this.currentClassName()))+")");
						res += this.s(".set(\"name\", "+Runtime.rtl.toString(this.convertString(variable.name))+")");
						res += this.s(".set(\"annotations\", ");
						this.levelInc();
						res += this.s("(new "+Runtime.rtl.toString(this.getName("Vector"))+"())");
						for (var j = 0; j < variable.annotations.count(); j++){
							var annotation = variable.annotations.item(j);
							this.pushOneLine(true);
							var old_is_operation = this.beginOperation();
							var s_kind = this.translateRun(annotation.kind);
							var s_options = this.translateRun(annotation.options);
							this.endOperation(old_is_operation);
							this.popOneLine();
							res += this.s(".push(new "+Runtime.rtl.toString(s_kind)+"("+Runtime.rtl.toString(s_options)+"))");
						}
						this.levelDec();
						res += this.s(")");
						this.levelDec();
						res += this.s(");");
						this.levelDec();
						res += this.s("}");
					}
				}
				res += this.s("return null;");
				this.levelDec();
				this.functionPop();
				res += this.s("}");
			}
		}
		if (op_code.hasAnnotations()){
			res += this.s("static getClassInfo(){");
			this.functionPush("getClassInfo", false);
			this.levelInc();
			res += this.s("return new "+Runtime.rtl.toString(this.getName("IntrospectionInfo"))+"(");
			this.levelInc();
			res += this.s("(new "+Runtime.rtl.toString(this.getName("Map"))+"())");
			res += this.s(".set(\"kind\", \"class\")");
			res += this.s(".set(\"class_name\", "+Runtime.rtl.toString(this.convertString(this.currentClassName()))+")");
			res += this.s(".set(\"annotations\", ");
			this.levelInc();
			res += this.s("(new "+Runtime.rtl.toString(this.getName("Vector"))+"())");
			for (var j = 0; j < op_code.annotations.count(); j++){
				var annotation = op_code.annotations.item(j);
				this.pushOneLine(true);
				var old_is_operation = this.beginOperation();
				var s_kind = this.translateRun(annotation.kind);
				var s_options = this.translateRun(annotation.options);
				this.endOperation(old_is_operation);
				this.popOneLine();
				res += this.s(".push(new "+Runtime.rtl.toString(s_kind)+"("+Runtime.rtl.toString(s_options)+"))");
			}
			this.levelDec();
			res += this.s(")");
			this.levelDec();
			res += this.s(");");
			this.levelDec();
			this.functionPop();
			res += this.s("}");
		}
		return res;
	}
	/**
	 * Class declare body
	 */
	OpClassBody(op_code){
		var res = "";
		for (var i = 0; i < op_code.childs.count(); i++){
			var item = op_code.childs.item(i);
			res += this.s(this.OpClassBodyItem(item));
		}
		return res;
	}
	/**
	 * Class declare body item
	 */
	OpClassBodyItem(op_code){
		if (op_code instanceof BayrellLang.OpCodes.OpFunctionArrowDeclare){
			return this.OpFunctionArrowDeclare(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpFunctionDeclare){
			return this.OpFunctionDeclare(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpPreprocessorSwitch){
			return this.OpPreprocessorSwitch(op_code);
		}
		else if (op_code instanceof BayrellLang.OpCodes.OpComment){
			return this.OpComment(op_code);
		}
		return "";
	}
	/**
	 * Class declare
	 */
	OpClassDeclare(op_code){
		var res = "";
		var s = "";
		/* Set current class name */
		this.current_class_name = op_code.class_name;
		this.modules.set(this.current_class_name, Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name));
		/* Skip if declare class */
		if (op_code.isFlag("declare")){
			return "";
		}
		res += this.OpClassDeclareHeader(op_code);
		/* Body */
		res += this.OpClassBody(op_code);
		/* Class Init */
		res += this.OpClassInit(op_code);
		/* Footer class */
		this.levelDec();
		res += this.s("}");
		/* Footer */
		res += this.OpClassDeclareFooter(op_code);
		return res;
	}
	/**
	 * Interface declare
	 */
	OpInterfaceDeclare(op_code){
		this.is_interface = true;
		var res = this.OpClassDeclare(op_code);
		this.is_interface = false;
		return res;
	}
	/**
	 * Struct declare
	 */
	OpStructDeclare(op_code){
		this.is_struct = true;
		var res = this.OpClassDeclare(op_code);
		this.is_struct = false;
		return res;
	}
	/* =========================== HTML OP Codes ========================== */
	/**
	 * Check if name is component
	 * @param string name
	 * @return bool
	 */
	isComponent(name){
		var ch = Runtime.rs.charAt(name, 0);
		return Runtime.rs.strtoupper(ch) == ch && ch != "";
	}
	/**
	 * Html escape
	 */
	OpHtmlEscape(op_code){
		var value = this.translateRun(op_code.value);
		return Runtime.rtl.toString(this.getName("rs"))+".htmlEscape("+Runtime.rtl.toString(value)+")";
	}
	/**
	 * OpHtmlJson
	 */
	OpHtmlJson(op_code){
		return Runtime.rtl.toString(this.getName("rtl"))+".json_encode("+Runtime.rtl.toString(this.translateRun(op_code.value))+")";
		var res = "";
		res = "new "+Runtime.rtl.toString(this.getName("UIStruct"))+"(new "+Runtime.rtl.toString(this.getName("Map"))+"({";
		res += this.s("\"name\":\"span\",");
		res += this.s("\"props\": new "+Runtime.rtl.toString(this.getName("Map"))+"({");
		res += this.s("\"rawHTML\":"+Runtime.rtl.toString(value));
		res += this.s("})})");
		return res;
	}
	/**
	 * OpHtmlRaw
	 */
	OpHtmlRaw(op_code){
		return this.translateRun(op_code.value);
		var res = "";
		res = "new "+Runtime.rtl.toString(this.getName("UIStruct"))+"(new "+Runtime.rtl.toString(this.getName("Map"))+"({";
		res += this.s("\"name\":\"span\",");
		res += this.s("\"props\": new "+Runtime.rtl.toString(this.getName("Map"))+"({");
		res += this.s("\"rawHTML\":"+Runtime.rtl.toString(value));
		res += this.s("})})");
		return res;
	}
	/**
	 * Html Text
	 */
	OpHtmlText(op_code){
		return this.convertString(op_code.value);
		return Runtime.rtl.toString(this.getName("rtl"))+".normalizeUI("+Runtime.rtl.toString(this.convertString(op_code.value))+")";
	}
	/**
	 * Returns true if key is props
	 */
	isOpHtmlTagProps(key){
		if (key == "@key" || key == "@control" || key == "@model" || key == "@ref" || key == "@bind" || key == "@annotations"){
			return false;
		}
		return true;
	}
	/**
	 * Html tag
	 */
	OpHtmlTag(op_code){
		var is_component = false;
		var res = "";
		this.pushOneLine(false);
		/* isComponent */
		if (this.modules.has(op_code.tag_name)){
			res = "new "+Runtime.rtl.toString(this.getName("UIStruct"))+"(new "+Runtime.rtl.toString(this.getName("Map"))+"({";
			res += this.s("\"kind\":\"component\",");
			res += this.s("\"class_name\":this.getCurrentClassName(),");
			res += this.s("\"name\":"+Runtime.rtl.toString(this.convertString(this.modules.item(op_code.tag_name)))+",");
			is_component = true;
		}
		else {
			res = "new "+Runtime.rtl.toString(this.getName("UIStruct"))+"(new "+Runtime.rtl.toString(this.getName("Map"))+"({";
			res += this.s("\"space\":"+Runtime.rtl.toString(this.convertString(Runtime.RuntimeUtils.getCssHash(this.getUIStructClassName())))+",");
			res += this.s("\"class_name\":this.getCurrentClassName(),");
			res += this.s("\"name\":"+Runtime.rtl.toString(this.convertString(op_code.tag_name))+",");
		}
		var is_props = false;
		var is_spreads = op_code.spreads != null && op_code.spreads.count() > 0;
		if (op_code.attributes != null && op_code.attributes.count() > 0){
			op_code.attributes.each((item) => {
				var key = item.key;
				if (this.isOpHtmlTagProps(key)){
					is_props = true;
				}
				else if (key == "@key"){
					var value = this.translateRun(item.value);
					res += this.s("\"key\": "+Runtime.rtl.toString(value)+",");
				}
				else if (key == "@ref"){
					var value = this.translateRun(item.value);
					res += this.s("\"reference\": "+Runtime.rtl.toString(value)+",");
				}
				else if (key == "@control"){
					var value = this.translateRun(item.value);
					res += this.s("\"controller\": "+Runtime.rtl.toString(value)+",");
				}
				else if (key == "@model"){
					var value = this.translateRun(item.value);
					res += this.s("\"model\": "+Runtime.rtl.toString(value)+",");
				}
				else if (key == "@bind"){
					var value = this.translateRun(item.value);
					res += this.s("\"bind\": "+Runtime.rtl.toString(value)+",");
				}
				else if (key == "@annotations"){
					var value = this.translateRun(item.value);
					res += this.s("\"annotations\": "+Runtime.rtl.toString(value)+",");
				}
			});
		}
		if (is_props || is_spreads){
			res += this.s("\"props\": (new "+Runtime.rtl.toString(this.getName("Map"))+"())");
			this.levelInc();
			if (is_props){
				op_code.attributes.each((item) => {
					if (this.isOpHtmlTagProps(item.key)){
						var old_operation = this.beginOperation(true);
						this.pushOneLine(true);
						var key = item.key;
						var value = this.translateRun(item.value);
						this.popOneLine();
						this.endOperation(old_operation);
						res += this.s(".set("+Runtime.rtl.toString(this.convertString(key))+", "+Runtime.rtl.toString(value)+")");
					}
				});
			}
			if (is_spreads){
				op_code.spreads.each((item) => {
					res += this.s(".addMap("+Runtime.rtl.toString(item)+")");
				});
			}
			this.levelDec();
			res += this.s(",");
		}
		if (op_code.is_plain){
			if (op_code.childs != null && op_code.childs.count() > 0){
				var value = op_code.childs.reduce((res, item) => {
					var value = "";
					if (item instanceof BayrellLang.OpCodes.OpHtmlJson){
						value = Runtime.rtl.toString(this.getName("rtl"))+".json_encode("+Runtime.rtl.toString(this.translateRun(item.value))+")";
						value = Runtime.rtl.toString(this.getName("rtl"))+".toString("+Runtime.rtl.toString(value)+")";
					}
					else if (item instanceof BayrellLang.OpCodes.OpHtmlRaw){
						value = this.translateRun(item.value);
						value = Runtime.rtl.toString(this.getName("rtl"))+".toString("+Runtime.rtl.toString(value)+")";
					}
					else if (item instanceof BayrellLang.OpCodes.OpConcat || item instanceof BayrellLang.OpCodes.OpString){
						value = this.translateRun(item);
					}
					else if (item instanceof BayrellLang.OpCodes.OpHtmlEscape){
						value = this.translateRun(item);
						value = Runtime.rtl.toString(this.getName("rs"))+".htmlEscape("+Runtime.rtl.toString(value)+")";
					}
					else if (item instanceof BayrellLang.OpCodes.OpHtmlText){
						value = this.convertString(item.value);
					}
					else {
						value = this.translateRun(item);
						value = Runtime.rtl.toString(this.getName("rtl"))+".toString("+Runtime.rtl.toString(value)+")";
					}
					if (res == ""){
						return value;
					}
					return Runtime.rtl.toString(res)+"+"+Runtime.rtl.toString(value);
				}, "");
				var old_operation = this.beginOperation(true);
				this.pushOneLine(true);
				res += this.s("\"children\": new "+Runtime.rtl.toString(this.getName("Vector"))+"(");
				this.levelInc();
				res += Runtime.rtl.toString(this.getName("rtl"))+".normalizeUI("+Runtime.rtl.toString(value)+")";
				this.levelDec();
				res += this.s(")");
				this.popOneLine();
				this.endOperation(old_operation);
			}
		}
		else {
			if (op_code.childs == null || op_code.childs.count() == 0){
			}
			else {
				res += this.s("\"children\": "+Runtime.rtl.toString(this.getName("rtl"))+".normalizeUIVector(new "+Runtime.rtl.toString(this.getName("Vector"))+"(");
				this.levelInc();
				var ch = "";
				op_code.childs.each((item) => {
					if (item instanceof BayrellLang.OpCodes.OpComment){
						return ;
					}
					res += Runtime.rtl.toString(ch)+Runtime.rtl.toString(this.s(this.translateRun(item)));
					ch = ",";
				});
				this.levelDec();
				res += this.s("))");
			}
		}
		res += this.s("}))");
		this.popOneLine();
		return res;
	}
	/**
	 * Html tag
	 */
	OpHtmlView(op_code){
		var res = Runtime.rtl.toString(this.getName("rtl"))+".normalizeUIVector((new "+Runtime.rtl.toString(this.getName("Vector"))+"())";
		this.pushOneLine(false);
		op_code.childs.each((item) => {
			res += this.s(".push("+Runtime.rtl.toString(this.translateRun(item))+")");
		});
		this.popOneLine();
		res += this.s(")");
		return res;
	}
	/** =========================== Preprocessor ========================== */
	calcPreprocessorCondition(op_case){
		if (op_case.condition instanceof BayrellLang.OpCodes.OpIdentifier){
			if (op_case.condition.value == "JAVASCRIPT" || op_case.condition.value == "ES6"){
				return true;
			}
		}
		return false;
	}
	/**
	 * Interface declare
	 */
	OpPreprocessorSwitch(op_code){
		if (op_code.childs == null){
			return "";
		}
		var res = "";
		for (var i = 0; i < op_code.childs.count(); i++){
			var op_case = op_code.childs.item(i);
			if (this.calcPreprocessorCondition(op_case)){
				res += this.s(op_case.value);
			}
		}
		return res;
	}
	/**
	 * Reset translator to default settings
	 */
	resetTranslator(){
		super.resetTranslator();
		this.function_stack = new Runtime.Vector();
		this.ui_struct_class_name = new Runtime.Vector();
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateOpCode(op_code){
		this.resetTranslator();
		var s = "\"use strict;\""+Runtime.rtl.toString(this.crlf);
		s += this.translateRun(op_code);
		return s;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangES6.TranslatorES6";}
	static getCurrentNamespace(){return "BayrellLang.LangES6";}
	static getCurrentClassName(){return "BayrellLang.LangES6.TranslatorES6";}
	static getParentClassName(){return "BayrellLang.CommonTranslator";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.ui_struct_class_name = null;
		this.modules = null;
		this.current_namespace = "";
		this.current_class_name = "";
		this.current_function_is_static = false;
		this.current_function_is_memorize = false;
		this.function_stack = null;
		this.current_module_name = "";
		this.is_interface = false;
		this.is_struct = false;
		this.is_return = false;
		this.is_async_opcode = false;
		this.is_async_opcode_while = false;
		this.is_async_await_op_call = false;
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