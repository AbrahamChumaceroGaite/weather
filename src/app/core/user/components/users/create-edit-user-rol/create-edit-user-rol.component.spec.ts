import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUserRolComponent } from './create-edit-user-rol.component';

describe('CreateEditUserRolComponent', () => {
  let component: CreateEditUserRolComponent;
  let fixture: ComponentFixture<CreateEditUserRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditUserRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditUserRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
