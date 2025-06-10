import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCreationComponent } from './test-creation.component';

describe('TestCreationComponent', () => {
  let component: TestCreationComponent;
  let fixture: ComponentFixture<TestCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
