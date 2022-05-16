import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformGeneratorComponent } from './dynamicform-generator.component';

describe('DynamicformGeneratorComponent', () => {
  let component: DynamicformGeneratorComponent;
  let fixture: ComponentFixture<DynamicformGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicformGeneratorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicformGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
