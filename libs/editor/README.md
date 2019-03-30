# Editor

A rich text editor for Angular based on `@atlaskit/editor-core`.

## Installation

Install the package from NPM

```
npm install @zodiac-ui/editor
```

### Peer Dependencies

Zodiac Editor has a number of peer dependencies depending on which features are needed.

Core peer dependencies

```
npm install 
    prosemirror-collab@^1.1.1
    prosemirror-commands@^1.0.7
    prosemirror-history@^1.0.4
    prosemirror-inputrules@^1.0.1
    prosemirror-keymap@^1.0.1
    prosemirror-model@^1.7.0
    prosemirror-schema-basic@^1.0.0
    prosemirror-state@^1.2.2
    prosemirror-tables"@0.7.10
    prosemirror-transform@^1.1.3
    prosemirror-utils@^0.7.7
    prosemirror-view@^1.8.3
```

`LinkModule` requires `LinkifyIt` to be installed

```
npm install linkify-it@^2.1.0
```

`CodeModule` requires `CodeMirror` to be installed

```
npm install codemirror@^5.45.0
```

For CodeMirror mode support, add the following styles and scripts to your `angular.json`

TBA

### CSS

TBA

## Basic Usage

Import the editor module

```ts
@NgModule({
    imports: [EditorModule]
})
export class BasicEditorModule {}
```

Add this tag to your component template

```html
<z-editor></z-editor>
```

Features can be added through additional modules

```ts
@NgModule({
    imports: [
        EditorModule,
        LinkModule,
        HeadingModule,
        BlockquoteModule,
        AlignmentModule,
        HardBreakModule,
        BlockTypeModule,
        TextFormattingModule,
        CodeModule,
        HorizontalRuleModule
    ]
})
export class KitchenSinkEditorModule {}
```

Documents can be loaded by passing in a serialised `ProseMirror` state object

```html
<z-editor [state]="state" (stateChange)="save($event)"></z-editor>
```
```ts
@Component({ ... })
export class BasicEditorComponent {
    state = {
        doc: {
            content: [],
            type: "doc"
        },
        selection: {
            type: "text",
            anchor: 1, 
            head: 1
        }
    }
    
    save(event: Editor) {
        console.log(event)
    }
}
```

Changes to the document or selection can be observed through the `stateChange` event

### Toolbar

For convenience, Zodiac editor exports toolbar components built with Angular Material and FontAwesome. Some additional
dependencies and config are required.

```
npm install @angular/material@~7.2.2 @fortawesome/fontawesome-free@^5.8.1
```

Add the following project config to `angular.json`

```json
{
    "styles": [
        "node_modules/@angular/material/prebuilt-themes/indigo-pink.css", // or another theme
        "node_modules/@fortawesome/fontawesome-free/css/all.css",
    ],
    "scripts": [
        "node_modules/hammerjs/hammer.min.js"
    ]
}
```

Now you can add the toolbar to your app

```ts
@NgModule({
    imports: [
        ...
        EditorModule,
        EditorToolbarModule,
    ]
})
```
```html
<z-editor-toolbar [editor]="editor"></z-editor-toolbar>
<z-editor #editor></z-editor>

```

This will render an empty toolbar. Add some tools to it.

```ts
@NgModule({
    imports: [
        ...
        EditorModule,
        EditorToolbarModule,
        StrongToolModule,
        AlignmentToolModule,
        EmphasisToolModule,
        UnderlineToolModule,
        SuperscriptToolModule,
        SubscriptToolModule,
        StrikeToolModule,
        LinkToolModule,
        CodeToolModule,
        HeadingToolModule,
    ]
})
```
```html
<z-editor-toolbar [editor]="editor">
    <z-heading-tool></z-heading-tool>
    <z-strong-tool></z-strong-tool>
    <z-emphasis-tool></z-emphasis-tool>
    <z-underline-tool></z-underline-tool>
    <z-alignment-tool></z-alignment-tool>
    <z-superscript-tool></z-superscript-tool>
    <z-subscript-tool></z-subscript-tool>
    <z-strike-tool></z-strike-tool>
    <z-link-tool></z-link-tool>
</z-editor-toolbar>
<z-editor #editor></z-editor>
```

To create your own tools, toolbars or floating panels, refer to Advanced Usage.

## Advanced Usage

TBA

## API

TBA
