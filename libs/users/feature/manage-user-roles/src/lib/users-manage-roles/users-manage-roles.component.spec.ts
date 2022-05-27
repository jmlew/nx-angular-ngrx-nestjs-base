import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManageRolesComponent } from './users-manage-roles.component';

describe('UsersManageRolesComponent', () => {
  let component: UsersManageRolesComponent;
  let fixture: ComponentFixture<UsersManageRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersManageRolesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManageRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
