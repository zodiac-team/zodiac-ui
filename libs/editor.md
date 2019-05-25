# Editor

A rich text editor for Angular based on `@atlaskit/editor-core`.

## Installation

Install the package from NPM

```text
npm install @zodiac-ui/editor
```

### Peer Dependencies

Zodiac Editor has a number of peer dependencies depending on which features are needed.

#### Core Dependencies

```text
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

#### LinkModule Dependencies

`LinkModule` requires `LinkifyIt` to be installed

```text
npm install linkify-it@^2.1.0
```

#### CodeModule Dependencies

`CodeModule` requires `CodeMirror` to be installed

```text
npm install codemirror@^5.45.0
```

For CodeMirror mode support, add the following styles and assets to your project in `angular.json`

```javascript
{
    "assets": [
        {
            "input": "node_modules/codemirror",
            "glob": "**/*.js",
            "output": "/assets"
        }
    ],
    "styles": ["node_modules/codemirror/lib/codemirror.css"]
}
```

### CSS

TBA

## Basic Usage

Import the editor module

```typescript
@NgModule({
    imports: [EditorModule],
})
export class BasicEditorModule {}
```

Add this tag to your component template

```markup
<z-editor></z-editor>
```

Features can be added through additional modules

```typescript
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
        HorizontalRuleModule,
    ],
})
export class KitchenSinkEditorModule {}
```

Documents can be loaded by passing in a serialised `ProseMirror` state object

```markup
<z-editor [state]="state" (stateChange)="save($event)"></z-editor>
```

```typescript
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

For convenience, Zodiac editor exports toolbar components built with Angular Material and FontAwesome. Some additional dependencies and config are required.

```text
npm install @angular/material@~7.2.2 @fortawesome/fontawesome-free@^5.8.1
```

Add the following project config to `angular.json`

```javascript
{
    "styles": [
        "node_modules/@angular/material/prebuilt-themes/indigo-pink.css", // or another theme
        "node_modules/@fortawesome/fontawesome-free/css/all.css"
    ],
    "scripts": ["node_modules/hammerjs/hammer.min.js"]
}
```

Now you can add the toolbar to your app

```typescript
@NgModule({
    imports: [
        ...
        EditorModule,
        EditorToolbarModule,
    ]
})
```

```markup
<z-editor-toolbar [editor]="editor"></z-editor-toolbar>
<z-editor #editor></z-editor>
```

This will render an empty toolbar. Add some tools to it.

```typescript
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

```markup
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

## API

## CodeModule

> Ensure you've installed [peer dependencies](editor.md#codemodule-dependencies) before using this module

```typescript
imports: [CodeModule.configure(config)]
```

> config: [CodeModuleConfig](https://github.com/zodiac-team/zodiac-ui/tree/4d768096819e10f7baa1fb0644104052d0d890a6/libs/editor/src/plugins/code/interfaces.ts)

| Option     | Description                                 |
| :--------- | :------------------------------------------ |
| modeURL    | File pattern to load mode dependencies from |
| extraModes | Additional metadata to append to modeInfo   |

Support for Angular language mode is [available here](https://github.com/zodiac-team/zodiac-ui/tree/4d768096819e10f7baa1fb0644104052d0d890a6/libs/editor/src/plugins/code/mode/angular.js). Copy this file to your assets folder \(eg. `assets/modes/angular/angular.js`\)
