import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditModuleComponent } from './create-edit-module.component';

describe('CreateEditModuleComponent', () => {
  let component: CreateEditModuleComponent;
  let fixture: ComponentFixture<CreateEditModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
