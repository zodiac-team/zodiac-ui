import { inputRules, InputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
import { Match, LinkMatcher, normalizeUrl } from '../utils';
import { createInputRule } from "../../../lib/utils/input-rules"
import { queueCards } from "../../card/pm-plugins/actions"

export function createLinkInputRule(
    regexp: RegExp,
    formatUrl: (url: string[]) => string,
): InputRule {
    return createInputRule(
        regexp,
        (state: EditorState, match: Match[], start: number, end: number) => {
            const { schema } = state;

            if (state.doc.rangeHasMark(start, end, schema.marks.link)) {
                return null;
            }
            const [link] = match;

            const markType = schema.mark('link', { href: link.url });

            const tr = state.tr
                .addMark(
                    start - (link.input.length - link.lastIndex),
                    end - (link.input.length - link.lastIndex),
                    markType,
                )
                .insertText(' ');

            return queueCards([
                {
                    url: link.url,
                    pos: start - (link.input.length - link.lastIndex),
                    appearance: 'inline',
                },
            ])(tr);
        },
    );
}

export function createInputRulePlugin(schema: Schema): Plugin | undefined {
    if (!schema.marks.link) {
        return;
    }

    const urlWithASpaceRule = createLinkInputRule(
        new LinkMatcher() as unknown as RegExp,
        match => (match[3] ? match[1] : `https?://${match[1]}`),
    );

    // [something](link) should convert to a hyperlink
    const markdownLinkRule = createInputRule(
        /(^|[^])\[(.*?)\]\((\S+)\)$/,
        (state, match, start, end) => {
            // tslint:disable-next-line:no-shadowed-variable
            const { schema } = state;
            const [, prefix, linkText, linkUrl] = match;
            const url = normalizeUrl(linkUrl);
            const markType = schema.mark('link', { href: url });

            console.log('match?')

            return state.tr.replaceWith(
                start + prefix.length,
                end,
                schema.text(linkText, [markType]),
            );
        },
    );

    return inputRules({
        rules: [urlWithASpaceRule, markdownLinkRule],
    });
}
