import { TestBed, async } from "@angular/core/testing"
import { AppComponent } from "./app.component"
import { NO_ERRORS_SCHEMA } from "@angular/core"

describe("AppComponent", () => {
    beforeEach(async(() => {
        const testbed = TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
    }))

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.debugElement.componentInstance
        expect(app).toBeTruthy()
    })
})
