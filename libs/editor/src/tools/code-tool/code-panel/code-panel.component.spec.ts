import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePanelComponent } from './code-panel.component';

describe('CodePanelComponent', () => {
  let component: CodePanelComponent;
  let fixture: ComponentFixture<CodePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
