import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperscriptToolComponent } from './superscript-tool.component';

describe('SuperscriptToolComponent', () => {
  let component: SuperscriptToolComponent;
  let fixture: ComponentFixture<SuperscriptToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperscriptToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperscriptToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
