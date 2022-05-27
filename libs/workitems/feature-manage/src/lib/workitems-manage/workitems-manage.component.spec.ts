import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkitemsManageComponent } from './workitems-manage.component';

describe('WorkitemsManageComponent', () => {
  let component: WorkitemsManageComponent;
  let fixture: ComponentFixture<WorkitemsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkitemsManageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkitemsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
