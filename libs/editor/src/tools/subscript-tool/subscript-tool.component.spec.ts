import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptToolComponent } from './subscript-tool.component';

describe('SubscriptToolComponent', () => {
  let component: SubscriptToolComponent;
  let fixture: ComponentFixture<SubscriptToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
