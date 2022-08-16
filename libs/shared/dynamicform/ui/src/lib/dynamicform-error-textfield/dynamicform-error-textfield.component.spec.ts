import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformErrorTextfieldComponent } from './dynamicform-error-textfield.component';

describe('DynamicformErrorTextfieldComponent', () => {
  let component: DynamicformErrorTextfieldComponent;
  let fixture: ComponentFixture<DynamicformErrorTextfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicformErrorTextfieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicformErrorTextfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
