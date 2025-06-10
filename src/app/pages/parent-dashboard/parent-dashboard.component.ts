import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { ChildResultComponent } from '../child-result/child-result.component';  
import { ParentSidebarComponent } from '../../shared/parent-sidebar/parent-sidebar.component';
import { ParentHomeComponent } from '../parent-home/parent-home.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';




@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css'],
  imports: [NgIf,NavBarComponent,UserProfileComponent,ChildResultComponent,ParentHomeComponent,ParentSidebarComponent]
})
export class ParentDashboardComponent {
  userRole: string | null = null;
  loading = true;
  selectedSection = 'parent-home'; 

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getCurrentUserWithRole().subscribe(user => {
      if (user) this.userRole = user.role;
      this.loading = false;
    });
  }

  onSectionSelected(section: string) {
    this.selectedSection = section;
  }
    
}