import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Database, ref, get } from '@angular/fire/database';

interface Student {
  uid: string;
  firstName: string;
  lastName: string;
  role: 'Student';
  linkedTeacherId: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentToEdit = new BehaviorSubject<string>('');
  currentStudent = this.studentToEdit.asObservable();

  constructor(private db: Database) {}

  setStudentToEdit(studentId: string) {
    this.studentToEdit.next(studentId);
  }

  async getStudents(): Promise<Student[]> {
    const studentsRef = ref(this.db, 'users');
    const snapshot = await get(studentsRef);
    
    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val())
      .filter(([_, data]: [string, any]) => {
        return data?.role === 'Student';
      })
      .map(([key, value]: [string, any]) => ({
        uid: key,
        ...value
      }));
  }
}