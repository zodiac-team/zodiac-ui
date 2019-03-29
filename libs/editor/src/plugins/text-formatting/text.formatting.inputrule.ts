import { InputRule, inputRules } from 'prosemirror-inputrules';
import { Schema, MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { createInputRule, InputRuleHandler } from "../../lib/utils/input-rules"
import { transformToCodeAction } from "./utils"

const validCombos = {
    '**': ['_', '~~'],
    '*': ['__', '~~'],
    __: ['*', '~~'],
    _: ['**', '~~'],
    '~~': ['__', '_', '**', '*'],
};

const validRegex = (char: string, str: string): boolean => {
    for (let i = 0; i < validCombos[char].length; i++) {
        const ch = validCombos[char][i];
        if (ch === str) {
            return true;
        }
        const matchLength = str.length - ch.length;
        if (str.substr(matchLength, str.length) === ch) {
            return validRegex(ch, str.substr(0, matchLength));
        }
    }
    return false;
};

function addMark(
    markType: MarkType,
    schema: Schema,
    charSize: number,
    char: string,
): InputRuleHandler {
    return (state, match, start, end) => {
        const [, prefix, textWithCombo] = match;
        const to = end;
        // in case of *string* pattern it matches the text from beginning of the paragraph,
        // because we want ** to work for strong text
        // that's why "start" argument is wrong and we need to calculate it ourselves
        const from = textWithCombo ? start + prefix.length : start;
        const nodeBefore = state.doc.resolve(start + prefix.length).nodeBefore;

        if (
            prefix &&
            prefix.length > 0 &&
            !validRegex(char, prefix) &&
            !(nodeBefore && nodeBefore.type === state.schema.nodes.hardBreak)
        ) {
            return null;
        }
        // fixes the following case: my `*name` is *
        // expected result: should ignore special characters inside "code"
        if (
            state.schema.marks.code &&
            state.schema.marks.code.isInSet(state.doc.resolve(from + 1).marks())
        ) {
            return null;
        }

        // Prevent autoformatting across hardbreaks
        let containsHardBreak;
        state.doc.nodesBetween(from, to, node => {
            if (node.type === schema.nodes.hardBreak) {
                containsHardBreak = true;
                return false;
            }
            return !containsHardBreak;
        });
        if (containsHardBreak) {
            return null;
        }

        // fixes autoformatting in heading nodes: # Heading *bold*
        // expected result: should not autoformat *bold*; <h1>Heading *bold*</h1>
        if (state.doc.resolve(from).sameParent(state.doc.resolve(to))) {
            if (!state.doc.resolve(from).parent.type.allowsMarkType(markType)) {
                return null;
            }
        }

        // apply mark to the range (from, to)
        let tr = state.tr.addMark(from, to, markType.create());

        if (charSize > 1) {
            // delete special characters after the text
            // Prosemirror removes the last symbol by itself, so we need to remove "charSize - 1" symbols
            tr = tr.delete(to - (charSize - 1), to);
        }

        return (
            tr
            // delete special characters before the text
                .delete(from, from + charSize)
                .removeStoredMark(markType)
        );
    };
}

function addCodeMark(
    markType: MarkType,
    schema: Schema,
    specialChar: string,
): InputRuleHandler {
    return (state, match, start, end) => {
        if (match[1] && match[1].length > 0) {
            const nodeBefore = state.doc.resolve(start + match[1].length).nodeBefore;
            if (!(nodeBefore && nodeBefore.type === state.schema.nodes.hardBreak)) {
                return null;
            }
        }
        // fixes autoformatting in heading nodes: # Heading `bold`
        // expected result: should not autoformat *bold*; <h1>Heading `bold`</h1>
        if (state.doc.resolve(start).sameParent(state.doc.resolve(end))) {
            if (!state.doc.resolve(start).parent.type.allowsMarkType(markType)) {
                return null;
            }
        }
        const regexStart = end - match[2].length + 1;
        const tr = transformToCodeAction(regexStart, end, state.tr)
            .delete(regexStart, regexStart + specialChar.length)
            .removeStoredMark(markType);
        return tr;
    };
}

export const strongRegex1 = /(\S*)(\_\_([^\_\s](\_(?!\_)|[^\_])*[^\_\s]|[^\_\s])\_\_)$/;
export const strongRegex2 = /(\S*)(\*\*([^\*\s](\*(?!\*)|[^\*])*[^\*\s]|[^\*\s])\*\*)$/;
export const italicRegex1 = /(\S*[^\s\_]*)(\_([^\s\_][^\_]*[^\s\_]|[^\s\_])\_)$/;
export const italicRegex2 = /(\S*[^\s\*]*)(\*([^\s\*][^\*]*[^\s\*]|[^\s\*])\*)$/;
export const strikeRegex = /(\S*)(\~\~([^\s\~](\~(?!\~)|[^\~])*[^\s\~]|[^\s\~])\~\~)$/;
export const codeRegex = /(\S*)(`[^\s][^`]*`)$/;

/**
 * Create input rules for strong mark
 *
 * @param {Schema} schema
 * @returns {InputRule[]}
 */
function getStrongInputRules(schema: Schema): InputRule[] {
    // **string** or __strong__ should bold the text

    const markLength = 2;
    const doubleUnderscoreRule = createInputRule(
        strongRegex1,
        addMark(schema.marks.strong, schema, markLength, '__'),
    );

    const doubleAsterixRule = createInputRule(
        strongRegex2,
        addMark(schema.marks.strong, schema, markLength, '**'),
    );

    return [
        doubleUnderscoreRule,
        doubleAsterixRule,
    ];
}

/**
 * Create input rules for em mark
 *
 * @param {Schema} schema
 * @returns {InputRule[]}
 */
function getItalicInputRules(schema: Schema): InputRule[] {
    // *string* or _string_ should italic the text
    const markLength = 1;

    const underscoreRule = createInputRule(
        italicRegex1,
        addMark(schema.marks.em, schema, markLength, '_'),
    );

    const asterixRule = createInputRule(
        italicRegex2,
        addMark(schema.marks.em, schema, markLength, '*'),
    );

    return [
        underscoreRule,
        asterixRule,
    ];
}

/**
 * Create input rules for strike mark
 *
 * @param {Schema} schema
 * @returns {InputRule[]}
 */
function getStrikeInputRules(schema: Schema): InputRule[] {
    const markLength = 2;
    const doubleTildeRule = createInputRule(
        strikeRegex,
        addMark(schema.marks.strike, schema, markLength, '~~'),
    );

    return [doubleTildeRule];
}

/**
 * Create input rules for code mark
 *
 * @param {Schema} schema
 * @returns {InputRule[]}
 */
function getCodeInputRules(schema: Schema): InputRule[] {
    const backTickRule = createInputRule(
        codeRegex,
        addCodeMark(schema.marks.code, schema, '`'),
    );

    return [backTickRule];
}

export function inputRulePlugin(schema: Schema): Plugin | undefined {
    const rules: Array<InputRule> = [];

    if (schema.marks.strong) {
        rules.push(...getStrongInputRules(schema));
    }

    if (schema.marks.em) {
        rules.push(...getItalicInputRules(schema));
    }

    if (schema.marks.strike) {
        rules.push(...getStrikeInputRules(schema));
    }

    if (schema.marks.code) {
        rules.push(...getCodeInputRules(schema));
    }

    if (rules.length !== 0) {
        return inputRules({ rules });
    }
}
