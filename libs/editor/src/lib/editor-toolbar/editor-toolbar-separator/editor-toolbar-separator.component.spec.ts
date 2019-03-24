import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorToolbarSeparatorComponent } from './editor-toolbar-separator.component';

describe('EditorToolbarSeparatorComponent', () => {
  let component: EditorToolbarSeparatorComponent;
  let fixture: ComponentFixture<EditorToolbarSeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorToolbarSeparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorToolbarSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
