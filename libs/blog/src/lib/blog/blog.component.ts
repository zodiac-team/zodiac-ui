import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'z-blog',
  template: `
    <p>
      blog works!
    </p>
  `,
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
