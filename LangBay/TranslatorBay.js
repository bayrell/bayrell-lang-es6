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
BayrellLang.LangBay.TranslatorBay = class extends BayrellLang.CoreTranslator{
	/**
	 * Get name
	 */
	getName(name){
		return name;
	}
	/**
	 * Escape string
	 */
	convertString(s){
		s = (Runtime.rtl.method(re.getClassName(), "replace"))("\\\\", "\\\\", s);
		s = (Runtime.rtl.method(re.getClassName(), "replace"))("\"", "\\\"", s);
		s = (Runtime.rtl.method(re.getClassName(), "replace"))("\n", "\\n", s);
		s = (Runtime.rtl.method(re.getClassName(), "replace"))("\r", "\\r", s);
		s = (Runtime.rtl.method(re.getClassName(), "replace"))("\t", "\\t", s);
		return s;
	}
	/**
	 * Convert string
	 */
	convertString(s){
		return "\""+Runtime.rtl.toString(this.escapeString(s))+"\"";
	}
	/** =========================== Identifier ============================ */
	/**
	 * HexNumber
	 */
	OpHexNumber(op_code){
		this.setMaxOpCodeLevel();
		return op_code.value;
	}
	/**
	 * Identifier
	 */
	OpIdentifier(op_code){
		this.setMaxOpCodeLevel();
		return this.getName(op_code.value);
	}
	/**
	 * Number
	 */
	OpNumber(op_code){
		this.setMaxOpCodeLevel();
		return op_code.value;
	}
	/**
	 * String
	 */
	OpString(op_code){
		this.setMaxOpCodeLevel();
		return this.convertString(op_code.value);
	}
	/**
	 * OpStringItem
	 */
	OpStringItem(op_code){
		return Runtime.rtl.toString(this.translateRun(op_code.value1))+Runtime.rtl.toString(this.n("["))+Runtime.rtl.toString(this.s(this.translateRun(op_code.value2)))+"]";
	}
	/** ======================== Dynamic or static ======================== */
	/**
	 * Dynamic load
	 */
	OpDynamic(op_code){
		var res = Runtime.rtl.toString(this.o(this.translateRun(op_code.value), this.max_opcode_level))+"."+Runtime.rtl.toString(op_code.name);
		this.setMaxOpCodeLevel();
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
		this.setOpCodeLevel(16);
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
		return this.op(op_code, "~", 13);
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
		/* Function name */
		var s = "new "+Runtime.rtl.toString(this.translateRun(op_code.value));
		/* Call arguments */
		this.setMaxOpCodeLevel();
		this.beginOperation();
		s += "(";
		if (op_code.args != null){
			var ch = "";
			for (var i = 0; i < op_code.args.count(); i++){
				var op = op_code.args.item(i);
				s += Runtime.rtl.toString(ch)+Runtime.rtl.toString(this.s(this.translateRun(op)));
				ch = ", ";
			}
		}
		s += this.s(")");
		this.endOperation();
		this.setOpCodeLevel(19);
		return s;
	}
	/**
	 * Not
	 */
	OpNot(op_code){
		var res = "!"+Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.setOpCodeLevel(16);
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
		var semicolon = (this.isOperation()) ? ("") : (";");
		var res = Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 17))+"--"+Runtime.rtl.toString(semicolon);
		this.setOpCodeLevel(17);
		return res;
	}
	/**
	 * Post increment
	 */
	OpPostInc(op_code){
		var semicolon = (this.isOperation()) ? ("") : (";");
		var res = Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 17))+"++"+Runtime.rtl.toString(semicolon);
		this.setOpCodeLevel(17);
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
		var semicolon = (this.isOperation()) ? ("") : (";");
		var res = "--"+Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 16))+Runtime.rtl.toString(semicolon);
		this.setOpCodeLevel(16);
		return res;
	}
	/**
	 * Pre increment
	 */
	OpPreInc(op_code){
		var semicolon = (this.isOperation()) ? ("") : (";");
		var res = "++"+Runtime.rtl.toString(this.o(this.translateRun(op_code.value), 16))+Runtime.rtl.toString(semicolon);
		this.setOpCodeLevel(16);
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
		this.pushOneLine();
		this.beginOperation();
		s += this.translateRun(op_code.value);
		this.endOperation();
		/* Call arguments */
		var s_args = "";
		s += this.s("(");
		if (op_code.args != null){
			var ch = "";
			for (var i = 0; i < op_code.args.count(); i++){
				var op = op_code.args.item(i);
				s_args += Runtime.rtl.toString(ch)+Runtime.rtl.toString(this.s(this.translateRun(op)));
				ch = ", ";
			}
		}
		s += this.s(s_args);
		s += this.s(")");
		if (!this.isOperation()){
			s += ";";
		}
		this.popOneLine();
		return s;
	}
	/**
	 * Operator call function
	 */
	OpCompare(op_code){
		this.setOpCodeLevel(10);
		return this.op(op_code, op_code.condition, 10);
	}
	/**
	 * Operator call function
	 */
	OpTernary(op_code){
		var semicolon = (this.isOperation()) ? ("") : (";");
		var res = "("+Runtime.rtl.toString(this.translateRun(op_code.condition))+") ? "+"("+Runtime.rtl.toString(this.s(this.translateRun(op_code.if_true)))+") : "+"("+Runtime.rtl.toString(this.s(this.translateRun(op_code.if_false)))+")";
		this.setOpCodeLevel(4);
		return res;
	}
	/** ========================== Vector and Map ========================= */
	/**
	 * Vector
	 */
	OpVector(op_code){
		var res = "";
		var ch = "";
		for (var i = 0; i < op_code.values.count(); i++){
			var item = op_code.values.item(i);
			this.setMaxOpCodeLevel();
			res += Runtime.rtl.toString(ch)+Runtime.rtl.toString(this.s(this.translateRun(item)));
			ch = ",";
		}
		this.setMaxOpCodeLevel();
		return Runtime.rtl.toString(this.n("["))+Runtime.rtl.toString(res)+"]";
	}
	/**
	 * Map
	 */
	OpMap(op_code){
		var res = "";
		var keys = op_code.values.keys();
		for (var i = 0; i < op_code.values.count(); i++){
			var key = keys.item(i);
			var item = op_code.values.item(key);
			this.setMaxOpCodeLevel();
			res += Runtime.rtl.toString(ch)+Runtime.rtl.toString(this.s(Runtime.rtl.toString(this.convertString(key))+": "+Runtime.rtl.toString(this.translateRun(item))));
			ch = ",";
		}
		this.setMaxOpCodeLevel();
		return Runtime.rtl.toString(this.n("{"))+Runtime.rtl.toString(res)+"}";
	}
	/**
	 * Method
	 */
	OpMethod(op_code){
		return "method "+Runtime.rtl.toString(this.translateRun(op_code.value));
	}
	/**
	 * Class name
	 */
	OpClassName(op_code){
		return this.convertString(op_code.value);
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
		this.setOpCodeLevel(0);
		res += this.s(this.translateRun(op_code.value));
		if (!old_is_operation){
			res += this.n(";");
		}
		this.endOperation();
		return Runtime.rs.trim(res);
	}
	/**
	 * Assign declare
	 */
	OpAssignDeclare(op_code){
		var old_is_operation = this.beginOperation();
		var res = "";
		/* one line */
		this.pushOneLine(true);
		res += Runtime.rtl.toString(this.translateRun(op_code.tp))+" ";
		res += op_code.name;
		this.popOneLine();
		if (op_code.value == null){
			this.setOpCodeLevel(0);
			res += " = "+Runtime.rtl.toString(this.s(this.translateRun(op_code.value)));
		}
		if (!old_is_operation){
			res += this.n(";");
		}
		this.endOperation();
		return Runtime.rs.trim(res);
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
		this.beginOperation();
		this.setOpCodeLevel(0);
		var res = "clone "+Runtime.rtl.toString(this.translateRun(op_code.value));
		this.endOperation();
		return Runtime.rs.trim(res);
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
		this.beginOperation();
		this.setOpCodeLevel(0);
		var res = "delete "+Runtime.rtl.toString(this.translateRun(op_code.value));
		this.endOperation();
		return Runtime.rs.trim(res);
	}
	/**
	 * For
	 */
	OpFor(op_code){
		var s = "";
		/* Header */
		this.beginOperation();
		s += this.n("for ("+Runtime.rtl.toString(this.translateRun(op_code.loop_init))+"; "+Runtime.rtl.toString(this.translateRun(op_code.loop_condition))+"; "+Runtime.rtl.toString(this.translateRun(op_code.loop_inc))+")");
		s += this.n("{");
		this.endOperation();
		/* Childs */
		for (var i = 0; i < op_code.childs.count(); i++){
			var item = op_code.childs.item(i);
			s += this.s(this.translateRun(item));
		}
		s += this.n("}");
		return Runtime.rs.trim(s);
	}
	/**
	 * If
	 */
	OpIf(op_code){
		var s = "";
		/* Condition */
		this.beginOperation();
		s += this.n("if ("+Runtime.rtl.toString(this.translateRun(op_code.condition))+")");
		s += this.n("{");
		this.endOperation();
		/* If true */
		for (var i = 0; i < op_code.if_true.count(); i++){
			var item = op_code.if_true.item(i);
			s += this.s(this.translateRun(item));
		}
		s += this.n("}");
		/* If else */
		for (var i = 0; i < op_code.if_else.count(); i++){
			var if_else = op_code.if_else.item(i);
			this.beginOperation();
			var res = "else if ("+Runtime.rtl.toString(this.translateRun(if_else.condition))+")";
			res += this.n("{");
			this.endOperation();
			s += this.n(res);
			for (var j = 0; j < if_else.if_true.count(); j++){
				var item = if_else.if_true.item(j);
				s += this.s(this.translateRun(item));
			}
			s += this.n("}");
		}
		/* If false */
		if (op_code.if_false != null){
			s += this.n("else");
			s += this.n("{");
			for (var i = 0; i < op_code.if_false.count(); i++){
				var item = op_code.if_false.item(i);
				s += this.s(this.translateRun(item));
			}
			s += this.n("}");
		}
		return Runtime.rs.trim(s);
	}
	/**
	 * Return
	 */
	OpReturn(op_code){
		this.beginOperation();
		this.setOpCodeLevel(0);
		var res = "return "+Runtime.rtl.toString(this.translateRun(op_code.value));
		this.endOperation();
		return Runtime.rs.trim(res);
	}
	/**
	 * Throw
	 */
	OpThrow(op_code){
		this.beginOperation();
		this.setOpCodeLevel(0);
		var res = "throw "+Runtime.rtl.toString(this.translateRun(op_code.value));
		this.endOperation();
		return Runtime.rs.trim(res);
	}
	/**
	 * Try Catch
	 */
	OpTryCatch(op_code){
		var s = "";
		s += "try";
		s += this.n("{");
		for (var i = 0; i < op_code.op_try.count(); i++){
			var item = op_code.op_try.item(i);
			s += this.s(this.translateRun(item));
		}
		s += this.n("}");
		var try_catch_childs_sz = op_code.childs.count();
		var is_else = "";
		for (var i = 0; i < try_catch_childs_sz; i++){
			var try_catch = op_code.childs.item(i);
			this.beginOperation();
			var tp = this.translateRun(try_catch.op_type);
			var name = this.translateRun(try_catch.op_ident);
			this.endOperation();
			/* catch childs */
			var catch_s = "";
			s += this.n("catch ("+Runtime.rtl.toString(tp)+" "+Runtime.rtl.toString(name)+")");
			s += this.n("{");
			for (var j = 0; j < try_catch.childs.count(); j++){
				var item = op_code.op_try.item(i);
				catch_s += this.s(this.translateRun(item));
			}
			s += this.s(catch_s);
			s += this.n("}");
		}
		return Runtime.rs.trim(s);
	}
	/**
	 * While
	 */
	OpWhile(op_code){
		var s = "";
		/* Condition */
		this.beginOperation();
		s += this.n("while ("+Runtime.rtl.toString(this.translateRun(op_code.condition))+")");
		s += this.n("{");
		this.endOperation();
		/* Childs */
		for (var i = 0; i < op_code.childs.count(); i++){
			var item = op_code.childs.item(i);
			s += this.s(this.translateRun(item));
		}
		s += "}";
		return s;
	}
	/** ======================== Namespace and use ======================== */
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		this.current_namespace = op_code.value;
		return "namespace "+Runtime.rtl.toString(op_code.value)+";";
	}
	/**
	 * Use
	 */
	OpUse(op_code){
		var lib_name = op_code.value;
		return "use "+Runtime.rtl.toString(lib_name)+";";
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
		this.pushOneLine();
		res += this.s("return ");
		res += this.OpFunctionDeclare(op_code.return_function, true, use_vars);
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
			this.pushOneLine(false);
			if (op_code.childs != null){
				for (var i = 0; i < op_code.childs.count(); i++){
					res += this.s(this.translateRun(op_code.childs.item(i)));
				}
			}
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
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpClassDeclareFooter(op_code){
	}
	/**
	 * Class init functions
	 */
	OpClassInit(op_code){
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
		this.struct_read_only = op_code.is_readonly;
		var res = this.OpClassDeclare(op_code);
		this.is_struct = false;
		return res;
	}
	/**
	 * Reset translator to default settings
	 */
	resetTranslator(){
		super.resetTranslator();
		this.current_function_name = new Runtime.Vector();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangBay.TranslatorBay";}
	static getCurrentNamespace(){return "BayrellLang.LangBay";}
	static getCurrentClassName(){return "BayrellLang.LangBay.TranslatorBay";}
	static getParentClassName(){return "BayrellLang.CoreTranslator";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.is_interface = false;
		this.is_struct = false;
		this.struct_read_only = false;
		this.current_function_name = null;
		this.current_class_name = "";
		this.current_namespace = "";
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