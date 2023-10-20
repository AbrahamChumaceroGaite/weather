import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditMunicipalityComponent } from './create-edit-municipality.component';

describe('CreateEditMunicipalityComponent', () => {
  let component: CreateEditMunicipalityComponent;
  let fixture: ComponentFixture<CreateEditMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditMunicipalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
