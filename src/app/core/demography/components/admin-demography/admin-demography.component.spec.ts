import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDemographyComponent } from './admin-demography.component';

describe('AdminDemographyComponent', () => {
  let component: AdminDemographyComponent;
  let fixture: ComponentFixture<AdminDemographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDemographyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDemographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
