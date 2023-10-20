import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDeviceComponent } from './create-edit-device.component';

describe('CreateEditDeviceComponent', () => {
  let component: CreateEditDeviceComponent;
  let fixture: ComponentFixture<CreateEditDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
