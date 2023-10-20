import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProvinceComponent } from './view-province.component';

describe('ViewProvinceComponent', () => {
  let component: ViewProvinceComponent;
  let fixture: ComponentFixture<ViewProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProvinceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
