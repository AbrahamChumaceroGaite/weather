import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDevicesTabsComponent } from './view-devices-tabs.component';

describe('ViewDevicesTabsComponent', () => {
  let component: ViewDevicesTabsComponent;
  let fixture: ComponentFixture<ViewDevicesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDevicesTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDevicesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
