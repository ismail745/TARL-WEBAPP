import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Database, ref, get, set, query, orderByChild, equalTo } from '@angular/fire/database';
import { from } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css'
})
export class RoleManagementComponent {
  users: any[] = [];
  teachers: any[] = [];
  filteredUsers: any[] = [];
  loading = true;
  userRole: string | null = null;
  currentUserUID = '';
  filter = 'all';

  constructor(private db: Database, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getCurrentUserWithRole().subscribe(user => {
      if (!user) return;
      this.userRole = user.role;
      this.currentUserUID = user.uid;

      from(get(ref(this.db, 'users'))).subscribe({
        next: snapshot => {
          const allUsers = snapshot.val();
          if (allUsers) {
            this.users = Object.entries(allUsers)
              .map(([uid, data]: [string, any]) => ({ uid, ...data }))
              .filter(u => u.uid !== this.currentUserUID);
            this.applyFilter();
          }
          this.loading = false;
          this.teachers = this.users.filter(u => u.role === 'Teacher');
        },
        error: err => {
          console.error('Error fetching users', err);
          this.loading = false;
        }
      });
    });
  }

  applyFilter() {
    this.filteredUsers = this.filter === 'pending'
      ? this.users.filter(u => u.role === 'Pending')
      : this.users;
  }

  assignRole(uid: string, newRole: string) {
    set(ref(this.db, `users/${uid}/role`), newRole);
    const updatedUser = this.users.find(u => u.uid === uid);
    if (updatedUser) updatedUser.role = newRole;
    this.applyFilter();
  }

  linkStudentToTeacher(studentUid: string, teacherUid: string) {
    set(ref(this.db, `users/${studentUid}/linkedTeacherId`), teacherUid)
      .then(() => {
        const student = this.users.find(u => u.uid === studentUid);
        if (student) {
          student.linkedTeacherId = teacherUid;
          delete student.tempTeacherId;
          this.applyFilter();
        }
      })
      .catch(err => console.error('Link error:', err));
  }  

  unlinkStudent(studentUid: string) {
    set(ref(this.db, `users/${studentUid}/linkedTeacherId`), '')
      .then(() => {
        const student = this.users.find(u => u.uid === studentUid);
        if (student) {
          student.linkedTeacherId = '';
          this.applyFilter();
        }
      })
      .catch(err => console.error('Error unlinking student:', err));
  }  

  getLinkedTeacherName(user: any): string {
    const teacher = this.teachers.find(t => t.uid === user.linkedTeacherId);
    return teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unknown';
  }
}