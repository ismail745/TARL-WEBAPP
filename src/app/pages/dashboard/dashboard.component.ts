import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';
import { StudentListComponent } from '../student-list/student-list.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { TestCreationComponent } from '../test-creation/test-creation.component';
import { TestListComponent } from '../test-list/test-list.component';
import { TeacherHomeComponent } from '../teacher-home/teacher-home.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { ViewStudentComponent } from '../view-student/view-student.component';
import { ParentListComponent } from '../parent-list/parent-list.component';
import { ViewTestComponent } from '../view-test/view-test.component';
import { ViewParentComponent } from '../view-parent/view-parent.component';
import { EditTestComponent } from '../edit-test/edit-test.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AddParentComponent } from '../add-parent/add-parent.component';
import { OverallPerformanceComponent } from '../overall-performance/overall-performance.component';
import { SkillAnalysisComponent } from '../skill-analysis/skill-analysis.component';
import { TimeStatisticsComponent } from '../time-statistics/time-statistics.component';
import { GameStatisticsComponent } from '../game-statistics/game-statistics.component';
import { StudentProgressComponent } from '../student-progress/student-progress.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    StudentProgressComponent,
    GameStatisticsComponent,
    NavBarComponent,
    OverallPerformanceComponent,
    SkillAnalysisComponent,
    TimeStatisticsComponent,
    ViewStudentComponent,
    UserProfileComponent,
    EditTestComponent,
    ViewParentComponent,
    ViewTestComponent,
    EditStudentComponent,
    ParentListComponent,
    TeacherHomeComponent,
    SidebarComponent,
    StudentRegistrationComponent,
    StudentListComponent,
    TestCreationComponent,
    TestListComponent,
    AddParentComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userRole: string | null = null;
  loading = true;
  selectedSection = 'teacher-home'; 

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