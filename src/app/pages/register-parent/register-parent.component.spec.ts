import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterParentComponent } from './register-parent.component';

describe('RegisterParentComponent', () => {
  let component: RegisterParentComponent;
  let fixture: ComponentFixture<RegisterParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
