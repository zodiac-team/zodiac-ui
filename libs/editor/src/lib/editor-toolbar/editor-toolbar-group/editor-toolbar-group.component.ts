import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'z-editor-toolbar-group',
  template: `
    <p>
      editor-toolbar-group works!
    </p>
  `,
  styleUrls: ['./editor-toolbar-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorToolbarGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
