import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditComponentComponent } from './create-edit-component.component';

describe('CreateEditComponentComponent', () => {
  let component: CreateEditComponentComponent;
  let fixture: ComponentFixture<CreateEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
