import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManageComponent } from './users-manage.component';

describe('UsersListComponent', () => {
  let component: UsersManageComponent;
  let fixture: ComponentFixture<UsersManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersManageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
