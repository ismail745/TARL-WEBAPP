import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalDashboarddComponent } from './principal-dashboardd.component';

describe('PrincipalDashboarddComponent', () => {
  let component: PrincipalDashboarddComponent;
  let fixture: ComponentFixture<PrincipalDashboarddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalDashboarddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalDashboarddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
