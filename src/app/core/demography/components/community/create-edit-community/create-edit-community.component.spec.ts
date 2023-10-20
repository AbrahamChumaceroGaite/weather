import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCommunityComponent } from './create-edit-community.component';

describe('CreateEditCommunityComponent', () => {
  let component: CreateEditCommunityComponent;
  let fixture: ComponentFixture<CreateEditCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCommunityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
