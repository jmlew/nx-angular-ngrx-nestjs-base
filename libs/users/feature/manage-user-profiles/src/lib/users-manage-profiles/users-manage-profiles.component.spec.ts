import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManageProfilesComponent } from './users-manage-profiles.component';

describe('UsersListComponent', () => {
  let component: UsersManageProfilesComponent;
  let fixture: ComponentFixture<UsersManageProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersManageProfilesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManageProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
