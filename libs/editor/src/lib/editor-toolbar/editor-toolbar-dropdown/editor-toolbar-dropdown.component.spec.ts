import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorToolbarDropdownComponent } from './editor-toolbar-dropdown.component';

describe('EditorToolbarDropdownComponent', () => {
  let component: EditorToolbarDropdownComponent;
  let fixture: ComponentFixture<EditorToolbarDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorToolbarDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorToolbarDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
