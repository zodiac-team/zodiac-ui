import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NodePanelComponent } from "./node-panel.component"
import { ReactiveFormsModule } from "@angular/forms"
import {
    MatAutocompleteModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
} from "@angular/material"
import { FormFieldModule } from "../form-field/form-field.module"
import { FormulaModule } from "@zodiac-ui/formula"
import { FormulaMaterialModule } from "@zodiac-ui/formula-material"
import { NODE_PANEL_PLUGIN } from "./node-panel-plugin"
import { LayoutPaneComponent } from "./views/layout-pane/layout-pane.component"
import { AttributesPaneComponent } from "./views/attributes-pane/attributes-pane.component"
import { StylesPaneComponent } from "./views/styles-pane/styles-pane.component"
import { ScrollingModule } from "@angular/cdk/scrolling"

@NgModule({
    declarations: [
        NodePanelComponent,
        LayoutPaneComponent,
        AttributesPaneComponent,
        StylesPaneComponent,
    ],
    entryComponents: [LayoutPaneComponent, AttributesPaneComponent, StylesPaneComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        FormFieldModule,
        MatAutocompleteModule,
        FormulaModule,
        FormulaMaterialModule,
        MatInputModule,
        ScrollingModule,
        MatCheckboxModule,
    ],
    exports: [NodePanelComponent],
    providers: [NODE_PANEL_PLUGIN],
})
export class NodePanelModule {}
