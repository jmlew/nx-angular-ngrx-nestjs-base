import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkitemsListComponent } from './workitems-list.component';

describe('WorkitemsListComponent', () => {
  let component: WorkitemsListComponent;
  let fixture: ComponentFixture<WorkitemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkitemsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkitemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
