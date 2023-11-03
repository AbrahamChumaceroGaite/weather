import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditClientDeviceComponent } from './create-edit-client-device.component';

describe('CreateEditClientDeviceComponent', () => {
  let component: CreateEditClientDeviceComponent;
  let fixture: ComponentFixture<CreateEditClientDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditClientDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditClientDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
