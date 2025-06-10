import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildResultComponent } from './child-result.component';

describe('ChildResultComponent', () => {
  let component: ChildResultComponent;
  let fixture: ComponentFixture<ChildResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
