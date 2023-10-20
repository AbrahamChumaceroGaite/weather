import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminHomeComponent } from './view-admin-home.component';

describe('ViewAdminHomeComponent', () => {
  let component: ViewAdminHomeComponent;
  let fixture: ComponentFixture<ViewAdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
