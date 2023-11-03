import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPersonComponent } from './create-edit-person.component';

describe('CreateEditPersonComponent', () => {
  let component: CreateEditPersonComponent;
  let fixture: ComponentFixture<CreateEditPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
