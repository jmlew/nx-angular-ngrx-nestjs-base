import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserProfileComponent } from './new-user-profile.component';

describe('NewUserProfileComponent', () => {
  let component: NewUserProfileComponent;
  let fixture: ComponentFixture<NewUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUserProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
