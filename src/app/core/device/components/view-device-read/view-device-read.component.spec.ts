import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeviceReadComponent } from './view-device-read.component';

describe('ViewDeviceReadComponent', () => {
  let component: ViewDeviceReadComponent;
  let fixture: ComponentFixture<ViewDeviceReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDeviceReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDeviceReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
