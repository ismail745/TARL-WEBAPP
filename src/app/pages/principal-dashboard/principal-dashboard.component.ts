import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { PrincipalDashboarddComponent } from '../principal-dashboardd/principal-dashboardd.component';

@Component({
  selector: 'app-principal-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    UserProfileComponent,
    PrincipalDashboarddComponent
],
  templateUrl: './principal-dashboard.component.html',
  styleUrl: './principal-dashboard.component.css'
})
export class PrincipalDashboardComponent {
  userRole: string | null = null;
  loading = true;
  selectedSection = 'principal-dashboardd';
  isSidebarOpen = true;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getCurrentUserWithRole().subscribe(user => {
      if (user) {
        this.userRole = user.role;
      }
      this.loading = false;
    });
  }

  onSectionSelected = (section: string): void => {
    this.selectedSection = section;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}