import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditRoleComponent } from './users-edit-role.component';

describe('UsersEditRoleComponent', () => {
  let component: UsersEditRoleComponent;
  let fixture: ComponentFixture<UsersEditRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersEditRoleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
