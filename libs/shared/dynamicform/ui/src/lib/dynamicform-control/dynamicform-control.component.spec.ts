import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformControlComponent } from './dynamicform-control.component';

describe('DynamicformControlComponent', () => {
  let component: DynamicformControlComponent;
  let fixture: ComponentFixture<DynamicformControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicformControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicformControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
