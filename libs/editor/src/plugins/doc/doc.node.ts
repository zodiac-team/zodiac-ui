import { NodeSpec } from 'prosemirror-model';
// NOTE: BlockContent is only being used by layoutColumn now.
/**
 * @name block_content
 */
export type BlockContent = any
    // | Panel
    // | Paragraph
    // | ParagraphWithMarks
    // | Blockquote
    // | OrderedList
    // | BulletList
    // | Rule
    // | Heading
    // | HeadingWithMarks
    // | CodeBlock
    // | MediaGroup
    // | MediaSingle
    // | ApplicationCard
    // | DecisionList
    // | TaskList
    // | Table
    // | Extension
    // | BodiedExtension
    // | BlockCard;

/**
 * @name table_cell_content
 * @minItems 1
 * @allowUnsupportedBlock true
 */
export type TableCellContent = any
    // Array<
    // | Panel
    // | Paragraph
    // | ParagraphWithMarks
    // | Blockquote
    // | OrderedList
    // | BulletList
    // | Rule
    // | Heading
    // | HeadingWithMarks
    // | CodeBlock
    // | MediaGroup
    // | MediaSingle
    // | ApplicationCard
    // | DecisionList
    // | TaskList
    // | Extension
    // | BlockCard
    // >;

// exclude Extension and BodiedExtension
/**
 * @name extension_content
 * @minItems 1
 * @allowUnsupportedBlock true
 */
export type ExtensionContent = any
    // Array<
    // | Panel
    // | Paragraph
    // | Blockquote
    // | OrderedList
    // | BulletList
    // | Rule
    // | Heading
    // | CodeBlock
    // | MediaGroup
    // | MediaSingle
    // | ApplicationCard
    // | DecisionList
    // | TaskList
    // | Table
    // | Extension
    // | BlockCard
    // >;

/**
 * @additionalProperties true
 */
export interface MarksObject<T> {
    marks?: Array<T>;
}

/**
 * @additionalProperties true
 */
export interface NoMark {
    /**
     * @maxItems 0
     */
    marks?: Array<any>;
}

/**
 * @name formatted_text_inline_node
 */
export type InlineFormattedText = any
    // Text &
    // MarksObject<
    //     | Link
    //     | Em
    //     | Strong
    //     | Strike
    //     | SubSup
    //     | Underline
    //     | TextColor
    //     | Action
    //     | Annotation
    //     >;

/**
 * @name link_text_inline_node
 */
export type InlineLinkText = any
    // Text & MarksObject<Link>;

/**
 * @name code_inline_node
 */
export type InlineCode = any
    // Text & MarksObject<Code | Link | Annotation>;

/**
 * @name atomic_inline_node
 */
export type InlineAtomic =
    | any
    // | HardBreak
    // | Mention
    // | Emoji
    // | InlineExtension
    // | Date
    // | Placeholder
    // | InlineCard
    // | Status;

/**
 * @name inline_node
 */
export type Inline = InlineFormattedText | InlineCode | InlineAtomic;

/**
 * @name doc_node
 */
export interface DocNode {
    version: 1;
    type: 'doc';
    /**
     * @allowUnsupportedBlock true
     */
    // content: Array<BlockContent | LayoutSection | CodeBlockWithMarks>;
    content: any;
}

export const docNode: NodeSpec = {
    content: '(block|layoutSection)+',
    marks: 'alignment breakout indentation link',
};
