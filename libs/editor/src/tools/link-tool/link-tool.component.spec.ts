import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkToolComponent } from './link-tool.component';

describe('LinkToolComponent', () => {
  let component: LinkToolComponent;
  let fixture: ComponentFixture<LinkToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
