import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'z-editor-toolbar-separator',
  template: `
    <p>
      editor-toolbar-separator works!
    </p>
  `,
  styleUrls: ['./editor-toolbar-separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorToolbarSeparatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
