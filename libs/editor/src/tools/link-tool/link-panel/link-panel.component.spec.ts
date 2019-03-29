import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPanelComponent } from './link-panel.component';

describe('LinkPanelComponent', () => {
  let component: LinkPanelComponent;
  let fixture: ComponentFixture<LinkPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
