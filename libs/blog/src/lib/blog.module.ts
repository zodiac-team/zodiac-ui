import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common";
import { BlogComponent } from './blog/blog.component'

@NgModule({
    imports: [CommonModule],
    declarations: [BlogComponent],
    exports: [BlogComponent],
})
export class BlogModule {}
