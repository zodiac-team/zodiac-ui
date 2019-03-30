import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorToolbarButtonComponent } from './editor-toolbar-button.component';

describe('EditorToolbarButtonComponent', () => {
  let component: EditorToolbarButtonComponent;
  let fixture: ComponentFixture<EditorToolbarButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorToolbarButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorToolbarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
