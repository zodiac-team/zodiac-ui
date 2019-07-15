import { NgModule, Pipe, PipeTransform } from "@angular/core"
import { toEnumeratedValue } from "@zodiac-ui/store"

@Pipe({
    name: "jsonAll",
    pure: true
})
export class JsonAllPipe implements PipeTransform {
    public transform(o: any, spaces: number = 4, deep?: boolean): any {
        return JSON.stringify(toEnumeratedValue(o, deep), null, spaces)
    }
}

@NgModule({
    declarations: [JsonAllPipe],
    exports: [JsonAllPipe]
})
export class JsonAllModule {}
