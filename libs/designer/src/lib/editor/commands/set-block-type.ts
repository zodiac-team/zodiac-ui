import { Command } from "../../../../../editor/src/lib/interfaces/command"
import {
    HeadingLevels,
    HEADINGS_BY_NAME,
    NORMAL_TEXT,
} from "../../../../../editor/src/plugins/block-type/interfaces"
import {
    setHeading,
    setNormalText,
} from "../../../../../editor/src/plugins/block-type/block-type.command"

export function setBlockType(name: string): Command {
    return (state, dispatch) => {
        const { nodes } = state.schema
        if (name === NORMAL_TEXT.name && nodes.paragraph) {
            return setNormalText()(state, dispatch)
        }

        const headingBlockType = HEADINGS_BY_NAME[name]
        if (headingBlockType && nodes.heading && headingBlockType.level) {
            return setHeading(headingBlockType.level as HeadingLevels)(state, dispatch)
        }

        return false
    }
}
