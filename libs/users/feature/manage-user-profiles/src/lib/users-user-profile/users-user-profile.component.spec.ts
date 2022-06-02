import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUserProfileComponent } from './users-user-profile.component';

describe('UsersUserProfileComponent', () => {
  let component: UsersUserProfileComponent;
  let fixture: ComponentFixture<UsersUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersUserProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
