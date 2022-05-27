import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagePermissionsComponent } from './users-manage-permissions.component';

describe('UsersManagePermissionsComponent', () => {
  let component: UsersManagePermissionsComponent;
  let fixture: ComponentFixture<UsersManagePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersManagePermissionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
