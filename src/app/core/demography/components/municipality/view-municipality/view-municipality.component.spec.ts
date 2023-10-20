import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMunicipalityComponent } from './view-municipality.component';

describe('ViewMunicipalityComponent', () => {
  let component: ViewMunicipalityComponent;
  let fixture: ComponentFixture<ViewMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMunicipalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
