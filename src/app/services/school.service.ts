import { Injectable, inject } from '@angular/core';
import { Database, ref, query, orderByChild, equalTo, get } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface School {
  id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  academy: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private database: Database = inject(Database);

  getSchoolsByAcademy(academy: string): Observable<School[]> {
    const schoolsRef = ref(this.database, 'School');
    const schoolsQuery = query(schoolsRef, orderByChild('academy'), equalTo(academy));
    
    return from(get(schoolsQuery)).pipe(
      map(snapshot => {
        if (!snapshot.exists()) {
          return [];
        }
        const schools: School[] = [];
        snapshot.forEach(childSnapshot => {
          schools.push({
            id: childSnapshot.key || '',
            ...childSnapshot.val() as School
          });
        });
        return schools;
      }),
      catchError(error => {
        console.error('Error fetching schools by academy:', error);
        throw error;
      })
    );
  }

  getSchoolByName(schoolName: string): Observable<School | null> {
    const schoolsRef = ref(this.database, 'School');
    const schoolQuery = query(schoolsRef, orderByChild('name'), equalTo(schoolName));

    return from(get(schoolQuery)).pipe(
      map(snapshot => {
        if (!snapshot.exists()) {
          return null;
        }
        let firstSchool: School | null = null;
        snapshot.forEach(childSnapshot => {
          firstSchool = {
            id: childSnapshot.key || '',
            ...childSnapshot.val() as School
          };
          return true; 
        });
        return firstSchool;
      }),
      catchError(error => {
        console.error('Error fetching school by name:', error);
        throw error;
      })
    );
  }
}