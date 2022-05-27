import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditPermissionComponent } from './users-edit-permission.component';

describe('UsersEditPermissionComponent', () => {
  let component: UsersEditPermissionComponent;
  let fixture: ComponentFixture<UsersEditPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersEditPermissionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
