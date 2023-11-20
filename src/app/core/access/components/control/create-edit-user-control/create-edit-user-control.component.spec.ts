import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUserControlComponent } from './create-edit-user-control.component';

describe('CreateEditUserControlComponent', () => {
  let component: CreateEditUserControlComponent;
  let fixture: ComponentFixture<CreateEditUserControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditUserControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditUserControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
