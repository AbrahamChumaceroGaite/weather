import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProvinceComponent } from './create-edit-province.component';

describe('CreateEditProvinceComponent', () => {
  let component: CreateEditProvinceComponent;
  let fixture: ComponentFixture<CreateEditProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditProvinceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
