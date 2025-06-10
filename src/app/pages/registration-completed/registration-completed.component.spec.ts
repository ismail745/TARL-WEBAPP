import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCompletedComponent } from './registration-completed.component';

describe('RegistrationCompletedComponent', () => {
  let component: RegistrationCompletedComponent;
  let fixture: ComponentFixture<RegistrationCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
