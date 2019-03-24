import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { strong } from "./strong/strong.mark"
import { em } from "./emphasis/emphasis.mark"
import { underline } from "./underline/underline.mark"
import { subsup } from "./subsup/subsup.mark"
import { strike } from "./strike/strike.mark"

export const TEXT_FORMATTING = "textFormatting"

export const textFormattingPlugin: EditorPlugin = {
    name: TEXT_FORMATTING,

    marks() {
        return [{
            name: 'strong',
            mark: strong
        }, {
            name: 'em',
            mark: em
        }, {
            name: 'underline',
            mark: underline
        }, {
            name: 'subsup',
            mark: subsup
        }, {
            name: 'strike',
            mark: strike
        }]
    }
}
