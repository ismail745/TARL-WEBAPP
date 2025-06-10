import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentService } from '../../services/parent.service';
import { Database, ref, get } from '@angular/fire/database';
import { StudentService } from '../../services/student.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

interface ChildDetails {
  uid: string;
  firstName: string;
  lastName: string;
  schoolGrade: string;
  gender: 'Male' | 'Female';
}

interface Parent {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  childrenSchool: string;
  childrenCount: number;
  childrenList: string[];
  childrenDetails?: ChildDetails[];
  civility: string;
  nationalId: string;
  role: string;
  academicRole: string;
  dataCompleted: boolean;
  frozen: boolean;
}

@Component({
  selector: 'app-view-parent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-parent.component.html'
})
export class ViewParentComponent implements OnInit {
  parentId: string = '';
  parentData: Parent | null = null;
  loading = false;
  error = '';
  private page = inject(DashboardComponent);

  constructor(
    private ParentService: ParentService,
    private db: Database,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.ParentService.currentParent.subscribe(id => {
      if (id) {
        this.parentId = id;
        this.loadParentData();
      }
    });
  }
    getChildColor(index: number): string {
    const colors = ["#4682b4", "#5e8ca8", "#88c0d0", "#a3be8c", "#ebcb8b"]
    return colors[index % colors.length]
  }

  async loadParentData() {
    try {
      this.loading = true;
      this.error = '';
      const snapshot = await get(ref(this.db, `users/${this.parentId}`));

      if (snapshot.exists()) {
        const parentData = snapshot.val();
        const childrenDetails: ChildDetails[] = [];

        if (parentData.childrenList && Array.isArray(parentData.childrenList)) {
          for (const childId of parentData.childrenList) {
            const childSnapshot = await get(ref(this.db, `users/${childId}`));
            if (childSnapshot.exists()) {
              const childData = childSnapshot.val();
              childrenDetails.push({
                uid: childId,
                firstName: childData.firstname || childData.firstName,
                lastName: childData.lastname || childData.lastName,
                schoolGrade: childData.schoolGrade || '',
                gender: childData.gender || 'Male'
              });
            }
          }
        }

        this.parentData = {
          ...parentData,
          childrenDetails
        };
      } else {
        this.error = 'Parent data not found';
      }
    } catch (error) {
      
      this.error = 'An error occurred while loading data';
    } finally {
      this.loading = false;
    }
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'Mother':
        return 'text-pink-600';
      case 'Father':
        return 'text-blue-600';
      case 'Guardian':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  }

  getStatusBadgeClass(isActive: boolean): string {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  viewChild(childId: string) {
    this.studentService.setStudentToEdit(childId);
    this.page.onSectionSelected('view-student');
  }
}