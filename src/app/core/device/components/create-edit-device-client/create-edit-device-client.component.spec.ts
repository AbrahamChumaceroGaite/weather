import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDeviceClientComponent } from './create-edit-device-client.component';

describe('CreateEditDeviceClientComponent', () => {
  let component: CreateEditDeviceClientComponent;
  let fixture: ComponentFixture<CreateEditDeviceClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditDeviceClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditDeviceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
