import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditProfileComponent } from './users-edit-profile.component';

describe('UsersEditProfileComponent', () => {
  let component: UsersEditProfileComponent;
  let fixture: ComponentFixture<UsersEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersEditProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
