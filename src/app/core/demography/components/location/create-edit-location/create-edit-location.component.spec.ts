import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditLocationComponent } from './create-edit-location.component';

describe('CreateEditLocationComponent', () => {
  let component: CreateEditLocationComponent;
  let fixture: ComponentFixture<CreateEditLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
