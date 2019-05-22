import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IMAGE_PLUGIN } from "./image-plugin"
import { EditImageComponent } from "./views/edit-image/edit-image.component"

@NgModule({
    declarations: [EditImageComponent],
    imports: [CommonModule],
    providers: [IMAGE_PLUGIN],
})
export class ImageModule {}
