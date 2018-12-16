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
BayrellLang.TranslatorBay = class extends BayrellLang.CommonTranslator{
	/**
	 * Operator ADD
	 */
	OpAdd(code_tree){
		var tag = new BayrellLang.Output.OutputNope();
		tag.addChild(this.translateRun(code_tree.value1));
		tag.addChild((new BayrellLang.Output.OutputString()).setValueAtSameLine("+"));
		tag.addChild(this.translateRun(code_tree.value2));
		return tag;
	}
	/**
	 * Operator AND
	 */
	OpAnd(code_tree){
		return (new BayrellLang.Output.OutputOneLine()).addChild(this.translateRun(code_tree.value1)).addChild((new BayrellLang.Output.OutputString()).setValueAtSameLine("and")).addChild(this.translateRun(code_tree.value2));
	}
	OpArray(code_tree){
		return null;
	}
	/**
	 * Assign
	 */
	OpAssign(code_tree){
		return (new BayrellLang.Output.OutputOneLine()).addChild(this.translateRun(code_tree.ident)).addChild((new BayrellLang.Output.OutputString()).setValueAtSameLine("=")).addChild(this.translateRun(code_tree.value));
	}
	OpAssignDeclare(code_tree){
		return null;
	}
	OpBitAnd(code_tree){
		return null;
	}
	OpBitNot(code_tree){
		return null;
	}
	OpBitOr(code_tree){
		return null;
	}
	OpBitXor(code_tree){
		return null;
	}
	OpBreak(code_tree){
		return null;
	}
	OpCall(code_tree){
		return null;
	}
	OpChilds(code_tree){
		return null;
	}
	OpClone(code_tree){
		return null;
	}
	OpCompare(code_tree){
		return null;
	}
	OpConcat(code_tree){
		return null;
	}
	OpContinue(code_tree){
		return null;
	}
	OpDelete(code_tree){
		return null;
	}
	OpDiv(code_tree){
		return null;
	}
	OpDynamic(code_tree){
		return null;
	}
	OpFlags(code_tree){
		return null;
	}
	OpFor(code_tree){
		return null;
	}
	OpHexNumber(code_tree){
		return null;
	}
	/**
	 * Identifier
	 */
	OpIdentifier(code_tree){
		return (new BayrellLang.Output.OutputString()).setValueAtSameLine(code_tree.value);
	}
	OpIf(code_tree){
		return null;
	}
	OpIfElse(code_tree){
		return null;
	}
	OpMod(code_tree){
		return null;
	}
	OpMult(code_tree){
		return null;
	}
	OpNamespace(code_tree){
		return null;
	}
	OpNew(code_tree){
		return null;
	}
	OpNope(code_tree){
		return null;
	}
	OpNot(code_tree){
		return null;
	}
	/**
	 * Number
	 */
	OpNumber(code_tree){
		return (new BayrellLang.Output.OutputString()).setValueAtSameLine(code_tree.value);
	}
	OpOr(code_tree){
		return null;
	}
	OpPostDec(code_tree){
		return null;
	}
	OpPostInc(code_tree){
		return null;
	}
	OpPow(code_tree){
		return null;
	}
	OpPreDec(code_tree){
		return null;
	}
	OpPreInc(code_tree){
		return null;
	}
	OpReturn(code_tree){
		return null;
	}
	OpShiftLeft(code_tree){
		return null;
	}
	OpShiftRight(code_tree){
		return null;
	}
	OpStatic(code_tree){
		return null;
	}
	OpString(code_tree){
		return null;
	}
	OpSub(code_tree){
		return null;
	}
	OpTemplateIdentifier(code_tree){
		return null;
	}
	OpTernary(code_tree){
		return null;
	}
	OpThrow(code_tree){
		return null;
	}
	OpTryCatch(code_tree){
		return null;
	}
	OpUse(code_tree){
		return null;
	}
	OpWhile(code_tree){
		return null;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.TranslatorBay";}
	static getParentClassName(){return "BayrellLang.CommonTranslator";}
}