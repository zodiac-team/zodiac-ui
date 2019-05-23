import { NodeSpec } from "prosemirror-model"

// /**
//  * @name heading_node
//  */
// export interface HeadingBaseDefinition {
//     type: 'heading';
//     /**
//      * @allowUnsupportedInline true
//      */
//     content?: Array<Inline>;
//     marks?: Array<any>;
//     attrs: {
//         /**
//          * @minimum 1
//          * @maximum 6
//          */
//         level: number;
//     };
// }
//
// /**
//  * @name heading_with_no_marks_node
//  */
// export type HeadingDefinition = HeadingBaseDefinition & NoMark;
//
// // Check `paragraph` node for why we are doing things like this
// /**
//  * @name heading_with_alignment_node
//  * @stage 0
//  */
// export type HeadingWithAlignmentDefinition = HeadingBaseDefinition &
//     MarksObject<AlignmentMarkDefinition>;
//
// /**
//  * @name heading_with_indentation_node
//  * @stage 0
//  */
// export type HeadingWithIndentationDefinition = HeadingBaseDefinition &
//     MarksObject<IndentationMarkDefinition>;
//
// export type HeadingWithMarksDefinition =
//     | HeadingWithAlignmentDefinition
//     | HeadingWithIndentationDefinition;

export const headingNode: NodeSpec = {
    attrs: { level: { default: 1 } },
    content: `inline*`,
    group: "block",
    defining: true,
    parseDOM: [
        { tag: "h1", attrs: { level: 1 } },
        { tag: "h2", attrs: { level: 2 } },
        { tag: "h3", attrs: { level: 3 } },
        { tag: "h4", attrs: { level: 4 } },
        { tag: "h5", attrs: { level: 5 } },
        { tag: "h6", attrs: { level: 6 } },
    ],
    toDOM(node) {
        return ["h" + node.attrs["level"], 0]
    },
}
