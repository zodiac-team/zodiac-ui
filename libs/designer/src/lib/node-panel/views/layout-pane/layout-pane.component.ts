import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    EventEmitter,
    Output,
    ViewChildren,
    QueryList,
    AfterViewInit,
    ElementRef,
} from "@angular/core"
import { FormulaContext } from "@zodiac-ui/formula"
import { FormBuilder, FormControl, FormGroup } from "@angular/forms"
import { Observable } from "rxjs"
import { map, repeatWhen, retryWhen, takeUntil, throttle, throttleTime } from "rxjs/operators"
import { fromEvent } from "rxjs/internal/observable/fromEvent"
import { switchMap } from "rxjs/internal/operators/switchMap"
import { switchMapTo } from "rxjs/internal/operators/switchMapTo"

export interface BoxModelTLRB {
    top: FormControl
    left: FormControl
    right: FormControl
    bottom: FormControl
}

export interface BoxModelXY {
    x: FormControl
    y: FormControl
}

export interface BoxModelElement {
    name: string
    offsets?: BoxModelTLRB
    size?: BoxModelXY
}

export const POSITIONS = ["static", "relative", "absolute", "fixed"]

@Component({
    selector: "z-layout-pane",
    template: `
        <h4 class="z-heading">Layout</h4>
        <div class="z-position">
            <mat-form-field>
                <mat-label>Position</mat-label>
                <input matInput type="text" [formControl]="position" [matAutocomplete]="auto" />
            </mat-form-field>
            <mat-autocomplete #auto>
                <mat-option *ngFor="let position of (positions | async)" [value]="position">
                    <span>{{ position }}</span>
                </mat-option>
            </mat-autocomplete>
        </div>
        <div class="z-box-model" [formGroup]="boxModel">
            <div *ngFor="let box of boxModelMap" class="z-box-{{ box.name }}">
                <div
                    *ngFor="let name of box.propertyMap; let index = index"
                    class="z-grab-{{ grabClass[index] }}"
                    attr.data-name="{{ name }}"
                    #grab
                >
                    <input
                        type="number"
                        [formControlName]="name"
                        style.width="{{ input.value.toString().length }}em"
                        #input
                    />
                </div>
            </div>

            <div class="z-box-content">
                <div class="z-grab-top" #grab></div>
                <div class="z-grab-left" #grab></div>
                <div class="z-grab-right" #grab></div>
                <div class="z-grab-bottom" #grab></div>
                <div class="z-size">
                    <input
                        class="z-size-x"
                        type="number"
                        formControlName="width"
                        style.width="{{ boxModel.value.width.toString().length }}em"
                    />
                    <span>×</span>
                    <input
                        class="z-size-y"
                        type="number"
                        formControlName="height"
                        style.width="{{ boxModel.value.height.toString().length }}em"
                    />
                </div>
            </div>
        </div>
    `,
    styleUrls: ["./layout-pane.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPaneComponent implements OnChanges, AfterViewInit {
    @Input()
    public value: any

    @Output()
    public valueChanges: EventEmitter<any>

    @ViewChildren("grab")
    public grab: QueryList<ElementRef<HTMLElement>>

    public grabClass: string[]

    public boxModel: FormGroup
    public boxModelMap: {
        name: string
        propertyMap: string[]
    }[]
    public boxSizeMap: {
        name: string
        propertyMap: string[]
    }
    public sizeModel: BoxModelElement
    public position: FormControl
    public positions: Observable<string[]>

    constructor(fb: FormBuilder) {
        this.position = new FormControl(POSITIONS[0])
        this.positions = this.position.valueChanges.pipe(
            map((text: string) =>
                POSITIONS.filter(position => position.toLowerCase().includes(text.toLowerCase())),
            ),
        )
        this.grabClass = ["top", "left", "right", "bottom"]
        const boxModelMap = [
            {
                name: "position",
                propertyMap: ["top", "left", "right", "bottom"],
            },
            {
                name: "margin",
                propertyMap: ["marginTop", "marginLeft", "marginRight", "marginBottom"],
            },
            {
                name: "border",
                propertyMap: [
                    "borderTopWidth",
                    "borderLeftWidth",
                    "borderRightWidth",
                    "borderBottomWidth",
                ],
            },
            {
                name: "padding",
                propertyMap: ["paddingTop", "paddingLeft", "paddingRight", "paddingBottom"],
            },
        ]
        const boxSizeMap = {
            name: "size",
            propertyMap: ["width", "height"],
        }

        this.boxModelMap = boxModelMap
        this.boxSizeMap = boxSizeMap
        this.boxModel = fb.group({})
        this.valueChanges = new EventEmitter()

        boxModelMap.concat(boxSizeMap).forEach(prop => {
            prop.propertyMap.forEach(name => {
                const control = fb.control(0)
                control.setParent(this.boxModel)
                this.boxModel.addControl(name, control)
            })
        })

        this.boxModel.valueChanges.subscribe(this.valueChanges)
        this.position.valueChanges
            .pipe(map(position => ({ position })))
            .subscribe(this.valueChanges)
    }

    public ngOnChanges() {
        if (this.value) {
            this.applyValues()
        }
    }

    public ngAfterViewInit() {
        const onmouseup = fromEvent(document, "mouseup")
        const onmousemove = fromEvent(document, "mousemove")
        this.grab.map(element => {
            const horizontal =
                element.nativeElement.classList.contains("z-grab-left") ||
                element.nativeElement.classList.contains("z-grab-right")
            const direction =
                element.nativeElement.classList.contains("z-grab-left") ||
                element.nativeElement.classList.contains("z-grab-top")
                    ? -1
                    : 1
            const onmousedown = fromEvent(element.nativeElement, "mousedown")
            const propertyName = element.nativeElement.dataset.name
            return onmousedown
                .pipe(
                    switchMap((start: MouseEvent) => {
                        const startValue = this.boxModel.value[propertyName]

                        return onmousemove.pipe(
                            map((current: MouseEvent) => {
                                return {
                                    horizontal,
                                    propertyName,
                                    value:
                                        startValue +
                                        direction *
                                            (horizontal
                                                ? current.screenX - start.screenX
                                                : current.screenY - start.screenY),
                                }
                            }),
                            takeUntil(onmouseup),
                        )
                    }),
                )
                .subscribe(props => {
                    this.boxModel.patchValue({
                        [props.propertyName]: props.value,
                    })
                })
        })
    }

    public applyValues() {
        const style: CSSStyleDeclaration = this.value.computedStyle

        this.position.setValue(style.position, { emitEvent: false })

        Object.entries(this.boxModel.controls).forEach(([key, control]) => {
            control.setValue(parseInt(style[key], 10) || 0, { emitEvent: false })
        })
    }

    public handleDrag($event: DragEvent) {
        console.log("drag", $event)
    }
}
