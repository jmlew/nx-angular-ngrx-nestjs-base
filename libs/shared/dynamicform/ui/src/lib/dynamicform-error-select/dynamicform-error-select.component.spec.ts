import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformErrorSelectComponent } from './dynamicform-error-select.component';

describe('DynamicformErrorSelectComponent', () => {
  let component: DynamicformErrorSelectComponent;
  let fixture: ComponentFixture<DynamicformErrorSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicformErrorSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicformErrorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
