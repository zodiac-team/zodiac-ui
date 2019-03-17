import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'z-basic',
  template: `
      <h1>Basic</h1>
      <z-editor></z-editor>
  `,
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
