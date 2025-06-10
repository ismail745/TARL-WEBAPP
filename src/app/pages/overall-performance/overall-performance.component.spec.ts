import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallPerformanceComponent } from './overall-performance.component';

describe('OverallPerformanceComponent', () => {
  let component: OverallPerformanceComponent;
  let fixture: ComponentFixture<OverallPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
