import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentToolComponent } from './alignment-tool.component';

describe('AlignmentToolComponent', () => {
  let component: AlignmentToolComponent;
  let fixture: ComponentFixture<AlignmentToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignmentToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
