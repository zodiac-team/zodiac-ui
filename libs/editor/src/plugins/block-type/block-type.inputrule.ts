import {
    textblockTypeInputRule,
    wrappingInputRule,
    inputRules,
    // @ts-ignore
    InputRule,
} from "prosemirror-inputrules"
import { Schema, NodeType } from "prosemirror-model"
import { Plugin } from "prosemirror-state"
import { safeInsert } from "prosemirror-utils"
import { HeadingLevels } from "./interfaces"
import {
    createInputRule,
    defaultInputRuleHandler,
    InputRuleWithHandler,
    leafNodeReplacementCharacter,
} from "../../lib/utils/input-rules"
import { isConvertableToCodeBlock, transformToCodeBlockAction } from "./block-type.command"
import { insertBlock } from "./insert-block"

const MAX_HEADING_LEVEL = 6

function getHeadingLevel(match: string[]): { level: HeadingLevels } {
    return {
        level: match[1].length as HeadingLevels,
    }
}

export function headingRule(nodeType: NodeType, maxLevel: number) {
    return textblockTypeInputRule(
        new RegExp("^(#{1," + maxLevel + "})\\s$"),
        nodeType,
        getHeadingLevel,
    ) as InputRuleWithHandler
}

export function blockQuoteRule(nodeType: NodeType) {
    return wrappingInputRule(/^\s*>\s$/, nodeType) as InputRuleWithHandler
}

export function codeBlockRule(nodeType: NodeType) {
    return textblockTypeInputRule(/^```$/, nodeType)
}

/**
 * Get heading rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getHeadingRules(schema: Schema): InputRuleWithHandler[] {
    // '# ' for h1, '## ' for h2 and etc
    const hashRule = defaultInputRuleHandler(
        headingRule(schema.nodes.heading, MAX_HEADING_LEVEL),
        true,
    )

    const leftNodeReplacementHashRule = createInputRule(
        new RegExp(`${leafNodeReplacementCharacter}(#{1,6})\\s$`),
        (state, match, start, end) => {
            const level = match[1].length
            return insertBlock(state, schema.nodes.heading, `heading${level}`, start, end, {
                level,
            })
        },
        true,
    )

    // Old analytics stuff
    const currentHandler = hashRule.handler
    hashRule.handler = (state, match: string[], start, end) => {
        return currentHandler(state, match, start, end)
    }

    return [hashRule, leftNodeReplacementHashRule]
}

/**
 * Get all block quote input rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getBlockQuoteRules(schema: Schema): InputRuleWithHandler[] {
    // '> ' for blockquote
    const greatherThanRule = defaultInputRuleHandler(blockQuoteRule(schema.nodes.blockquote), true)

    const leftNodeReplacementGreatherRule = createInputRule(
        new RegExp(`${leafNodeReplacementCharacter}\\s*>\\s$`),
        (state, match, start, end) => {
            return insertBlock(state, schema.nodes.blockquote, "blockquote", start, end)
        },
        true,
    )

    return [greatherThanRule, leftNodeReplacementGreatherRule]
}

/**
 * Get all code block input rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getCodeBlockRules(schema: Schema): InputRuleWithHandler[] {
    const threeTildeRule = createInputRule(
        /((^`{3,})|(\s`{3,}))(\S*)$/,
        (state, match, start, end) => {
            const attributes: any = {}
            if (match[4]) {
                attributes.language = match[4]
            }
            const newStart = match[0][0] === " " ? start + 1 : start
            if (isConvertableToCodeBlock(state)) {
                return (
                    transformToCodeBlockAction(state, attributes)
                        // remove markdown decorator ```
                        .delete(newStart, end)
                        .scrollIntoView()
                )
            }
            let { tr } = state
            tr = tr.delete(newStart, end)
            const codeBlock = state.schema.nodes.codeBlock.createChecked()
            return safeInsert(codeBlock)(tr)
        },
        true,
    )

    const leftNodeReplacementThreeTildeRule = createInputRule(
        new RegExp(`((${leafNodeReplacementCharacter}\`{3,})|(\\s\`{3,}))(\\S*)$`),
        (state, match, start, end) => {
            const attributes: any = {}
            if (match[4]) {
                attributes.language = match[4]
            }
            return insertBlock(state, schema.nodes.codeBlock, "codeblock", start, end, attributes)
        },
        true,
    )

    return [threeTildeRule, leftNodeReplacementThreeTildeRule]
}

export function inputRulePlugin(schema: Schema): Plugin | undefined {
    const rules: Array<InputRuleWithHandler> = []

    if (schema.nodes.heading) {
        rules.push(...getHeadingRules(schema))
    }

    if (schema.nodes.blockquote) {
        rules.push(...getBlockQuoteRules(schema))
    }

    if (schema.nodes.codeBlock) {
        rules.push(...getCodeBlockRules(schema))
    }

    if (rules.length !== 0) {
        return inputRules({ rules })
    }
}
