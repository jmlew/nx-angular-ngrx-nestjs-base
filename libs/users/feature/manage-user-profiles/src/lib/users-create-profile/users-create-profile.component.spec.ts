import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCreateProfileComponent } from './users-create-profile.component';

describe('UsersCreateProfileComponent', () => {
  let component: UsersCreateProfileComponent;
  let fixture: ComponentFixture<UsersCreateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersCreateProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCreateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
