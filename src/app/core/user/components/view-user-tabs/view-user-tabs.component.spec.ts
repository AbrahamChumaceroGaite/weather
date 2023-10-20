import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserTabsComponent } from './view-user-tabs.component';

describe('ViewUserTabsComponent', () => {
  let component: ViewUserTabsComponent;
  let fixture: ComponentFixture<ViewUserTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
