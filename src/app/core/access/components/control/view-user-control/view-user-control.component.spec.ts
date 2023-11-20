import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserControlComponent } from './view-user-control.component';

describe('ViewUserControlComponent', () => {
  let component: ViewUserControlComponent;
  let fixture: ComponentFixture<ViewUserControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
