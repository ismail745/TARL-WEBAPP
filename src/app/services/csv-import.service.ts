import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface StudentImportData {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: 'Male' | 'Female';
  schoolGrade: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {
  private importedStudentsSubject = new BehaviorSubject<StudentImportData[]>([]);
  importedStudents$ = this.importedStudentsSubject.asObservable();

  constructor() {}

  parseCSV(csvContent: string): StudentImportData[] {
    try {
      const lines = csvContent.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      
      const fieldIndices = {
        firstName: headers.indexOf('firstName'),
        lastName: headers.indexOf('lastName'),
        birthday: headers.indexOf('birthday'),
        gender: headers.indexOf('gender'),
        schoolGrade: headers.indexOf('schoolGrade'),
        password: headers.indexOf('password')
      };
      
      const requiredFields = ['firstName', 'lastName', 'birthday', 'gender', 'schoolGrade'];
      const missingFields = requiredFields.filter(field => fieldIndices[field as keyof typeof fieldIndices] === -1);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      const students: StudentImportData[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = this.parseCSVLine(lines[i]);
        
        const password = fieldIndices.password !== -1 && values[fieldIndices.password] 
          ? values[fieldIndices.password] 
          : Math.floor(1000 + Math.random() * 9000).toString();
        
        const student: StudentImportData = {
          firstName: values[fieldIndices.firstName],
          lastName: values[fieldIndices.lastName],
          birthday: values[fieldIndices.birthday],
          gender: values[fieldIndices.gender] === 'Male' ? 'Male' : 'Female',
          schoolGrade: values[fieldIndices.schoolGrade],
          password: password
        };
        
        students.push(student);
      }
      
      this.importedStudentsSubject.next(students);
      return students;
    } catch (error) {
      console.error('Error parsing CSV:', error);
      throw error;
    }
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    
    return result;
  }

  generateTemplateCSV(): string {
    const headers = ['firstName', 'lastName', 'birthday', 'gender', 'schoolGrade', 'password'];
    const sampleRow1 = ['John', 'Doe', '2015-05-15', 'Male', '1', '1234'];
    const sampleRow2 = ['Jane', 'Smith', '2015-06-20', 'Female', '1', '5678'];
    
    return [
      headers.join(','),
      sampleRow1.join(','),
      sampleRow2.join(',')
    ].join('\n');
  }

  clearImportedStudents(): void {
    this.importedStudentsSubject.next([]);
  }
}
