import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'z-alignment-tool',
  template: `
    <p>
      alignment-tool works!
    </p>
  `,
  styleUrls: ['./alignment-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlignmentToolComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
