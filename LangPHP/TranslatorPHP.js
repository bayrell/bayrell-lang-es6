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
if (typeof BayrellLang.LangPHP == 'undefined') BayrellLang.LangPHP = {};
BayrellLang.LangPHP.TranslatorPHP = class extends BayrellLang.CommonTranslator{
	getClassName(){return "BayrellLang.LangPHP.TranslatorPHP";}
	static getParentClassName(){return "BayrellLang.CommonTranslator";}
	_init(){
		super._init();
		this.modules = null;
		this.current_namespace = "";
		this.current_class_name = "";
		this.current_function_name = null;
		this.current_function_is_static = false;
		this.current_module_name = "";
		this.is_static = false;
		this.is_interface = false;
	}
	/**
	 * Get name
	 */
	getName(name){
		if (name == "parent"){
			return "parent";
		}
		else if (name == "self"){
			return "static";
		}
		else if (this.modules.has(name)){
			return name;
		}
		else if (this.is_static){
			return name;
		}
		else if (name == "null" || name == "false" || name == "true"){
			return name;
		}
		return "$"+Runtime.rtl.toString(name);
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
		s = Runtime.re.replace("\\$", "\\$", s);
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
	 * Array
	 */
	OpStringItem(op_code){
		return "mb_substr("+Runtime.rtl.toString(this.translateRun(op_code.value1))+", "+Runtime.rtl.toString(this.s(this.translateRun(op_code.value2)))+", 1)";
	}
	/** ======================== Dynamic or static ======================== */
	/**
	 * Dynamic load
	 */
	OpDynamic(op_code){
		var res = Runtime.rtl.toString(this.o(this.translateRun(op_code.value), this.max_opcode_level))+"->"+Runtime.rtl.toString(op_code.name);
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Static load
	 */
	OpStatic(op_code){
		return Runtime.rtl.toString(this.translateRun(op_code.value))+"::"+Runtime.rtl.toString(op_code.name);
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
			res += Runtime.rtl.toString(this.getName("rtl"))+"::toString("+Runtime.rtl.toString(this.s(this.translateRun(op_code.value1)))+")";
		}
		res += this.s(" . ");
		if (op_code.value2 instanceof BayrellLang.OpCodes.OpConcat || op_code.value2 instanceof BayrellLang.OpCodes.OpString){
			res += this.o(this.s(this.translateRun(op_code.value2)), 13);
		}
		else {
			res += Runtime.rtl.toString(this.getName("rtl"))+"::toString("+Runtime.rtl.toString(this.s(this.translateRun(op_code.value2)))+")";
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
		var res = Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 17))+"--";
		this.current_opcode_level = 17;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Post increment
	 */
	OpPostInc(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 17))+"++";
		this.current_opcode_level = 17;
		if (!this.is_operation){
			res += ";";
		}
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
		var res = "--"+Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Pre increment
	 */
	OpPreInc(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "++"+Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		if (!this.is_operation){
			res += ";";
		}
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
			if (op_code.value.value == "parent"){
				if (this.current_function_name.get(0) == "constructor"){
					s += "parent::__construct";
				}
				else if (this.current_function_name.get(0) == "destructor"){
					s += "parent::__destruct";
				}
				else {
					s += "parent::"+Runtime.rtl.toString(this.current_function_name.get(0));
				}
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
				s += ch + this.s(this.translateRun(op));
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
		return s;
	}
	/**
	 * Operator call function
	 */
	OpCompare(op_code){
		this.current_opcode_level = 10;
		var condition = op_code.condition;
		if (condition == "implements"){
			condition = "instanceof";
		}
		return this.op(op_code, condition, 10);
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
			res += this.s("->push("+Runtime.rtl.toString(this.translateRun(item))+")");
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
			res += this.s("->set("+Runtime.rtl.toString(Runtime.rs.json_encode(key))+", "+Runtime.rtl.toString(this.translateRun(item))+")");
		}
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Method
	 */
	OpMethod(op_code){
		if (op_code.value instanceof BayrellLang.OpCodes.OpDynamic){
			var name = op_code.value.name;
			var obj = this.translateRun(op_code.value.value);
			return "new \\Runtime\\Callback("+Runtime.rtl.toString(obj)+", "+Runtime.rtl.toString(this.convertString(name))+")";
		}
		else if (op_code.value instanceof BayrellLang.OpCodes.OpStatic){
			var name = op_code.value.name;
			var obj = this.translateRun(op_code.value.value);
			return "new \\Runtime\\Callback("+Runtime.rtl.toString(obj)+"::class, "+Runtime.rtl.toString(this.convertString(name))+")";
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
	OpAssign(op_code){
		var old_is_operation = this.beginOperation();
		/* one line */
		this.pushOneLine(true);
		var res = this.translateRun(op_code.ident);
		this.popOneLine();
		if (op_code.op_name == "="){
			res += " = ";
		}
		else if (op_code.op_name == "~="){
			res += " .= ";
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
	OpAssignDeclare(op_code, output_value){
		if (output_value == undefined) output_value=true;
		var res = "";
		var old_is_operation = this.beginOperation();
		var ch_var = "$";
		if (op_code.isFlag("const")){
			ch_var = "";
		}
		if (op_code.value == null || !output_value && !op_code.isFlag("static") && !op_code.isFlag("const")){
			this.pushOneLine(true);
			res = Runtime.rtl.toString(ch_var)+Runtime.rtl.toString(op_code.name);
			this.popOneLine();
		}
		else {
			this.pushOneLine(true);
			res = Runtime.rtl.toString(ch_var)+Runtime.rtl.toString(op_code.name)+" = ";
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
		return "break;";
	}
	/**
	 * Clone
	 */
	OpClone(op_code){
		var old_is_operation = this.beginOperation();
		/* result */
		var s = "rtl::_clone(";
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
		/* Header */
		var old_is_operation = this.beginOperation();
		s += "for ("+Runtime.rtl.toString(this.translateRun(op_code.loop_init))+"; "+Runtime.rtl.toString(this.translateRun(op_code.loop_condition))+"; "+Runtime.rtl.toString(this.translateRun(op_code.loop_inc))+"){";
		this.endOperation(old_is_operation);
		/* Childs */
		this.levelInc();
		for (var i = 0; i < op_code.childs.count(); i++){
			s += this.s(this.translateRun(op_code.childs.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		return s;
	}
	/**
	 * If
	 */
	OpIf(op_code){
		var s = "";
		/* Condition */
		var old_is_operation = this.beginOperation();
		s += "if ("+Runtime.rtl.toString(this.translateRun(op_code.condition))+"){";
		this.endOperation(old_is_operation);
		/* If true */
		this.levelInc();
		for (var i = 0; i < op_code.if_true.count(); i++){
			s += this.s(this.translateRun(op_code.if_true.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		/* If else */
		for (var i = 0; i < op_code.if_else.count(); i++){
			var if_else = op_code.if_else.item(i);
			var old_is_operation = this.beginOperation();
			var res = "else if ("+Runtime.rtl.toString(this.translateRun(if_else.condition))+"){";
			this.endOperation(old_is_operation);
			s += this.s(res);
			this.levelInc();
			for (var j = 0; j < if_else.if_true.count(); j++){
				s += this.s(this.translateRun(if_else.if_true.item(j)));
			}
			this.levelDec();
			s += this.s("}");
		}
		/* If false */
		if (op_code.if_false != null){
			s += this.s("else {");
			this.levelInc();
			for (var i = 0; i < op_code.if_false.count(); i++){
				s += this.s(this.translateRun(op_code.if_false.item(i)));
			}
			this.levelDec();
			s += this.s("}");
		}
		return s;
	}
	/**
	 * Return
	 */
	OpReturn(op_code){
		var old_is_operation = this.beginOperation();
		/* result */
		var s = "return ";
		this.current_opcode_level = 0;
		this.levelInc();
		s += this.s(this.translateRun(op_code.value));
		this.levelDec();
		s += this.s(";");
		this.endOperation(old_is_operation);
		return s;
	}
	/**
	 * Throw
	 */
	OpThrow(op_code){
		var old_is_operation = this.beginOperation();
		/* result */
		var s = "throw ";
		this.current_opcode_level = 0;
		s += this.s(this.translateRun(op_code.value));
		s += ";";
		this.endOperation(old_is_operation);
		return s;
	}
	/**
	 * Try Catch
	 */
	OpTryCatch(op_code){
		var s = "";
		s += "try{";
		this.levelInc();
		for (var i = 0; i < op_code.op_try.count(); i++){
			s += this.s(this.translateRun(op_code.op_try.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		var try_catch_childs_sz = op_code.childs.count();
		var is_else = "";
		s += "catch(\\Exception $_the_exception){";
		for (var i = 0; i < try_catch_childs_sz; i++){
			var try_catch = op_code.childs.item(i);
			var old_is_operation = this.beginOperation();
			var tp = this.translateRun(try_catch.op_type);
			var name = this.translateRun(try_catch.op_ident);
			this.endOperation(old_is_operation);
			if (tp == "$var"){
				tp = "\\Exception";
			}
			this.levelInc();
			s += this.s(Runtime.rtl.toString(is_else)+"if ($_the_exception instanceof "+Runtime.rtl.toString(tp)+"){");
			this.levelInc();
			s += this.s(Runtime.rtl.toString(name)+" = $_the_exception;");
			for (var j = 0; j < try_catch.childs.count(); j++){
				s += this.s(this.translateRun(try_catch.childs.item(j)));
			}
			this.levelDec();
			s += this.s("}");
			this.levelDec();
			is_else = "else";
		}
		if (try_catch_childs_sz > 0){
			this.levelInc();
			s += this.s("else { throw $_the_exception; }");
			this.levelDec();
		}
		s += this.s("}");
		return s;
	}
	/**
	 * While
	 */
	OpWhile(op_code){
		var s = "";
		/* Condition */
		var old_is_operation = this.beginOperation();
		s += "while ("+Runtime.rtl.toString(this.translateRun(op_code.condition))+"){";
		this.endOperation(old_is_operation);
		/* Childs */
		this.levelInc();
		for (var i = 0; i < op_code.childs.count(); i++){
			s += this.s(this.translateRun(op_code.childs.item(i)));
		}
		this.levelDec();
		s += this.s("}");
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
		var res = "namespace "+Runtime.rtl.toString(Runtime.rs.implode("\\", arr))+";";
		if (this.current_module_name != "Runtime"){
			res += this.s("use Runtime\\rtl;");
			res += this.s("use Runtime\\Map;");
			res += this.s("use Runtime\\Vector;");
			this.modules.set("rtl", "Runtime.rtl");
			this.modules.set("Map", "Runtime.Map");
			this.modules.set("Vector", "Runtime.Vector");
		}
		return res;
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
		var res = Runtime.rs.implode("\\", arr);
		if (op_code.alias_name != ""){
			return "use "+Runtime.rtl.toString(res)+" as "+Runtime.rtl.toString(op_code.alias_name)+";";
		}
		return "use "+Runtime.rtl.toString(res)+";";
	}
	/** ============================= Classes ============================= */
	/**
	 * Function arrow declare
	 */
	OpFunctionArrowDeclare(op_code){
		var res = "";
		var ch = "";
		var use_vars = new Runtime.Vector();
		/* Skip if declare function */
		if (op_code.isFlag("declare")){
			return "";
		}
		if (op_code.isFlag("static")){
			res += "static function ";
			if (this.current_function_name.count() == 0){
				this.current_function_is_static = true;
			}
		}
		else {
			res += "function ";
			if (this.current_function_name.count() == 0){
				this.current_function_is_static = false;
			}
		}
		this.current_function_name.push(op_code.name);
		res += op_code.name;
		res += "(";
		for (var i = 0; i < op_code.args.count(); i++){
			var variable = op_code.args.item(i);
			this.pushOneLine(true);
			res += Runtime.rtl.toString(ch)+"$"+Runtime.rtl.toString(variable.name);
			if (variable.value != null){
				res += " = "+Runtime.rtl.toString(this.translateRun(variable.value));
			}
			this.popOneLine();
			use_vars.push(variable.name);
			ch = ", ";
		}
		res += ")";
		res += "{";
		this.setOperation(false);
		this.pushOneLine(false);
		this.levelInc();
		res += this.s("return ");
		res += this.OpFunctionDeclare(op_code.return_function, true, use_vars);
		this.levelDec();
		res += this.s("}");
		this.popOneLine();
		this.current_function_name.pop();
		return res;
	}
	/**
	 * Function declare
	 */
	OpFunctionDeclare(op_code, end_semicolon, use_vars){
		if (end_semicolon == undefined) end_semicolon=false;
		if (use_vars == undefined) use_vars=null;
		var res = "";
		var ch = "";
		var s = "";
		/* Skip if declare function */
		if (op_code.isFlag("declare")){
			return "";
		}
		if (op_code.isFlag("static")){
			res += "static function ";
			if (this.current_function_name.count() == 0){
				this.current_function_is_static = true;
			}
		}
		else {
			res += "function ";
			if (this.current_function_name.count() == 0){
				this.current_function_is_static = false;
			}
		}
		if (op_code.name == "constructor"){
			res += "__construct";
		}
		else if (op_code.name == "destructor"){
			res += "__destruct";
		}
		else {
			res += op_code.name;
		}
		this.current_function_name.push(op_code.name);
		this.pushOneLine(true);
		res += "(";
		for (var i = 0; i < op_code.args.count(); i++){
			var variable = op_code.args.item(i);
			res += Runtime.rtl.toString(ch)+"$"+Runtime.rtl.toString(variable.name);
			if (variable.value != null){
				res += " = "+Runtime.rtl.toString(this.translateRun(variable.value));
			}
			ch = ", ";
		}
		res += ")";
		var flag_use = false;
		if (this.current_function_name.count() == 2 && !this.current_function_is_static){
			if (use_vars == null){
				var use_vars = new Runtime.Vector();
			}
		}
		if (use_vars != null){
			if (use_vars.count() > 0){
				flag_use = true;
			}
		}
		if (op_code.use_variables != null){
			if (op_code.use_variables.count() > 0){
				flag_use = true;
			}
		}
		if (flag_use){
			ch = "";
			res += " use (";
			if (use_vars != null){
				for (var i = 0; i < use_vars.count(); i++){
					res += Runtime.rtl.toString(ch)+"&$"+Runtime.rtl.toString(use_vars.item(i));
					ch = ", ";
				}
			}
			if (op_code.use_variables != null){
				for (var i = 0; i < op_code.use_variables.count(); i++){
					res += Runtime.rtl.toString(ch)+"&$"+Runtime.rtl.toString(op_code.use_variables.item(i));
					ch = ", ";
				}
			}
			res += ")";
		}
		this.popOneLine();
		if (this.is_interface){
			res += ";";
		}
		else {
			res += "{";
			this.setOperation(false);
			this.pushOneLine(false);
			this.levelInc();
			if (op_code.childs != null){
				for (var i = 0; i < op_code.childs.count(); i++){
					res += this.s(this.translateRun(op_code.childs.item(i)));
				}
			}
			this.levelDec();
			res += this.s("}"+Runtime.rtl.toString((end_semicolon) ? (";") : ("")));
			this.popOneLine();
		}
		this.current_function_name.pop();
		return res;
	}
	/**
	 * Class declare header
	 */
	OpClassDeclareHeader(op_code){
		var res = "";
		var old_is_operation = this.beginOperation();
		if (this.is_interface){
			res += "interface ";
		}
		else {
			res += "class ";
		}
		res += op_code.class_name;
		if (op_code.class_extends != ""){
			res += " extends "+Runtime.rtl.toString(this.translateRun(op_code.class_extends));
		}
		if (op_code.class_implements != null && op_code.class_implements.count() > 0){
			res += " implements ";
			var ch = "";
			for (var i = 0; i < op_code.class_implements.count(); i++){
				var name = op_code.class_implements.item(i);
				res += Runtime.rtl.toString(ch)+Runtime.rtl.toString(this.getName(name));
				ch = ", ";
			}
		}
		res += "{";
		this.endOperation(old_is_operation);
		this.levelInc();
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpClassDeclareVariables(op_code){
		var res = "";
		for (var i = 0; i < op_code.class_variables.count(); i++){
			var variable = op_code.class_variables.item(i);
			if (variable.flags != null){
				var old_is_operation = this.beginOperation();
				var s = "";
				if (variable.isFlag("const")){
					s += "const ";
				}
				else {
					if (variable.isFlag("static")){
						s += "static ";
					}
					if (variable.isFlag("protected")){
						s += "protected ";
					}
					else {
						s += "public ";
					}
				}
				s += this.OpAssignDeclare(variable, false);
				s += ";";
				this.endOperation(old_is_operation);
				res += this.s(s);
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
		var class_variables = op_code.class_variables;
		var class_implements = op_code.class_implements;
		var class_extends = "";
		if (op_code.class_extends){
			var name = op_code.class_extends.value;
			if (this.modules.has(name)){
				class_extends = this.modules.item(name);
			}
			else {
				class_extends = name;
			}
		}
		var res = "";
		var has_variables = false;
		var has_serializable = false;
		var has_cloneable = false;
		if (!this.is_interface){
			res += this.s("public function getClassName(){"+"return "+Runtime.rtl.toString(this.convertString(Runtime.rtl.toString(this.current_namespace)+"."+Runtime.rtl.toString(this.current_class_name)))+";}");
			res += this.s("public static function getParentClassName(){"+"return "+Runtime.rtl.toString(this.convertString(class_extends))+";}");
		}
		for (var i = 0; i < class_variables.count(); i++){
			var variable = class_variables.item(i);
			if (variable.isFlag("serializable")){
				has_serializable = true;
			}
			if (variable.isFlag("cloneable")){
				has_cloneable = true;
			}
			if (!variable.isFlag("static") && !variable.isFlag("const")){
				has_variables = true;
			}
		}
		if (this.current_module_name != "Runtime" || this.current_class_name != "CoreObject"){
			if (has_variables){
				res += this.s("protected function _init(){");
				this.levelInc();
				if (class_extends != ""){
					res += this.s("parent::_init();");
				}
				if (class_variables != null){
					for (var i = 0; i < class_variables.count(); i++){
						var variable = class_variables.item(i);
						if (!variable.isFlag("static") && !variable.isFlag("const")){
							this.beginOperation();
							var s = "$this->"+Runtime.rtl.toString(variable.name)+" = "+Runtime.rtl.toString(this.translateRun(variable.value))+";";
							this.endOperation();
							res += this.s(s);
						}
					}
				}
				this.levelDec();
				res += this.s("}");
			}
			if (has_cloneable){
				res += this.s("public function assignObject($obj){");
				this.levelInc();
				res += this.s("if ($obj instanceof "+Runtime.rtl.toString(this.getName(this.current_class_name))+"){");
				this.levelInc();
				for (var i = 0; i < class_variables.count(); i++){
					var variable = class_variables.item(i);
					if (variable.isFlag("cloneable")){
						res += this.s("$this->"+Runtime.rtl.toString(variable.name)+" = "+Runtime.rtl.toString(this.getName("rtl"))+"::_clone("+"$obj->"+Runtime.rtl.toString(variable.name)+");");
					}
				}
				this.levelDec();
				res += this.s("}");
				res += this.s("parser::assign($obj);");
				this.levelDec();
				res += this.s("}");
			}
			if (has_serializable){
				var class_variables_serializable_count = 0;
				res += this.s("public function assignValue($variable_name, $value){");
				this.levelInc();
				class_variables_serializable_count = 0;
				for (var i = 0; i < class_variables.count(); i++){
					var variable = class_variables.item(i);
					if (variable.isFlag("serializable")){
						var type_value = this.getAssignDeclareTypeValue(variable);
						var type_template = this.getAssignDeclareTypeTemplate(variable);
						var def_val = "null";
						if (variable.value != null){
							def_val = this.translateRun(variable.value);
						}
						var s = "if ($variable_name == "+Runtime.rtl.toString(this.convertString(variable.name))+") ";
						s += "$this->"+Runtime.rtl.toString(variable.name)+" = ";
						s += "rtl::correct($value, \""+Runtime.rtl.toString(type_value)+"\", "+Runtime.rtl.toString(def_val)+", \""+Runtime.rtl.toString(type_template)+"\");";
						if (class_variables_serializable_count == 0){
							res += this.s(s);
						}
						else {
							res += this.s("else "+Runtime.rtl.toString(s));
						}
						class_variables_serializable_count++
					}
				}
				res += this.s("else parent::assignValue($variable_name, $value);");
				this.levelDec();
				res += this.s("}");
				res += this.s("public function takeValue($variable_name, $default_value = null){");
				this.levelInc();
				class_variables_serializable_count = 0;
				for (var i = 0; i < class_variables.count(); i++){
					var variable = class_variables.item(i);
					if (variable.isFlag("serializable")){
						var take_value_s = "if ($variable_name == "+Runtime.rtl.toString(this.convertString(variable.name))+") "+"return $this->"+Runtime.rtl.toString(variable.name)+";";
						if (class_variables_serializable_count == 0){
							res += this.s(take_value_s);
						}
						else {
							res += this.s("else "+Runtime.rtl.toString(take_value_s));
						}
						class_variables_serializable_count++
					}
				}
				res += this.s("return parent::takeValue($variable_name, $default_value);");
				this.levelDec();
				res += this.s("}");
				res += this.s("public function getVariablesNames($names){");
				this.levelInc();
				res += this.s("parent::getVariablesNames($names);");
				for (var i = 0; i < class_variables.count(); i++){
					var variable = class_variables.item(i);
					if (variable.isFlag("serializable")){
						res += this.s("$names->push("+Runtime.rtl.toString(this.convertString(variable.name))+");");
					}
				}
				this.levelDec();
				res += this.s("}");
			}
		}
		return res;
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
		/*this.is_interface = false;*/
		/* Skip if declare class */
		if (op_code.isFlag("declare")){
			return "";
		}
		res += this.OpClassDeclareHeader(op_code);
		/* Variables */
		res += this.OpClassDeclareVariables(op_code);
		res += this.OpClassInit(op_code);
		/* Class functions */
		for (var i = 0; i < op_code.childs.count(); i++){
			var op_code2 = op_code.childs.item(i);
			if (op_code2 instanceof BayrellLang.OpCodes.OpFunctionArrowDeclare){
				res += this.s(this.OpFunctionArrowDeclare(op_code2));
			}
			else if (op_code2 instanceof BayrellLang.OpCodes.OpFunctionDeclare){
				res += this.s(this.OpFunctionDeclare(op_code2));
			}
			else if (op_code2 instanceof BayrellLang.OpCodes.OpPreprocessorSwitch){
				res += this.s(this.OpPreprocessorSwitch(op_code2));
			}
			else if (op_code2 instanceof BayrellLang.OpCodes.OpComment){
				res += this.s(this.OpComment(op_code2));
			}
		}
		/* Footer class */
		this.levelDec();
		res += this.s("}");
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
	/** =========================== Preprocessor ========================== */
	calcPreprocessorCondition(op_case){
		if (op_case.condition instanceof BayrellLang.OpCodes.OpIdentifier){
			if (op_case.condition.value == "PHP"){
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
		this.current_function_name = new Runtime.Vector();
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translate(op_code){
		this.resetTranslator();
		var s = "<?php"+Runtime.rtl.toString(this.crlf);
		s += this.translateRun(op_code);
		return s;
	}
}