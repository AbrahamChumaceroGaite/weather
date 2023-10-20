import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientDeviceComponent } from './view-client-device.component';

describe('ViewClientDeviceComponent', () => {
  let component: ViewClientDeviceComponent;
  let fixture: ComponentFixture<ViewClientDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClientDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
