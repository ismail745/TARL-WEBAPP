import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Database, ref, set, get } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { CsvImportService } from '../../services/csv-import.service';
import { firstValueFrom } from 'rxjs';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import { DashboardComponent } from '../dashboard/dashboard.component';

interface TeacherClass {
  classId: string;
  className: string;
}

interface StudentImportData {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: 'Male' | 'Female';
  schoolGrade: string;
  password: string;
}

@Component({
  selector: 'app-student-bulk-import',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-bulk-import.component.html',
  styleUrl: './student-bulk-import.component.css'
})
export class StudentBulkImportComponent implements OnInit {
  private fb = inject(FormBuilder);
  private db = inject(Database);
  private auth = inject(AuthService);
  private csvService = inject(CsvImportService);
  private page = inject(DashboardComponent);

  importForm: FormGroup;
  csvFile: File | null = null;
  parsedStudents: StudentImportData[] = [];
  availableGrades: TeacherClass[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';
  linkedTeacherId = '';
  linkedSchoolId = '';
  showPreview = false;
  currentStep = 1;
  totalSteps = 3;
  
  getUniqueGradesCount(): number {
    const uniqueGrades = new Set<string>();
    this.parsedStudents.forEach(student => {
      if (student.schoolGrade) {
        uniqueGrades.add(student.schoolGrade);
      }
    });
    return uniqueGrades.size;
  }
  
  constructor() {
    this.importForm = this.fb.group({
      defaultGrade: ['', Validators.required],
      generatePasswords: [true]
    });
  }

  async ngOnInit() {
    try {
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user?.uid) throw new Error('No authenticated user');

      const teacherRef = ref(this.db, `users/${user.uid}`);
      const snapshot = await get(teacherRef);
      
      if (snapshot.exists()) {
        const teacherData = snapshot.val();
        
        if (Array.isArray(teacherData.schoolGrades)) {
          this.availableGrades = teacherData.schoolGrades;
        } else {
          this.availableGrades = [];
        }

        this.linkedTeacherId = teacherData.userId;
        this.linkedSchoolId = teacherData.ecole || '';
      } else {
        throw new Error('Teacher profile not found');
      }
    } catch (error) {
      console.error('Error loading teacher data:', error);
      this.errorMessage = 'Failed to load teacher information';
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.csvFile = input.files[0];
      this.errorMessage = '';
    }
  }

  downloadTemplate() {
    const template = this.csvService.generateTemplateCSV();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_import_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  async parseCSV() {
    if (!this.csvFile) {
      this.errorMessage = 'Please select a CSV file';
      return;
    }

    try {
      this.loading = true;
      this.errorMessage = '';
      
      const fileContent = await this.readFileContent(this.csvFile);
      this.parsedStudents = this.csvService.parseCSV(fileContent);
      
      if (this.parsedStudents.length === 0) {
        this.errorMessage = 'No valid student records found in the CSV file';
        return;
      }
      
      this.showPreview = true;
      this.currentStep = 2;
    } catch (error) {
      console.error('Error parsing CSV:', error);
      this.errorMessage = `Failed to parse CSV file: ${error instanceof Error ? error.message : 'Unknown error'}`;
    } finally {
      this.loading = false;
    }
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }

  applyGradeToAll() {
    const defaultGrade = this.importForm.get('defaultGrade')?.value;
    if (defaultGrade) {
      this.parsedStudents = this.parsedStudents.map(student => ({
        ...student,
        schoolGrade: defaultGrade
      }));
    }
  }

  generatePasswordsForAll() {
    if (this.importForm.get('generatePasswords')?.value) {
      this.parsedStudents = this.parsedStudents.map(student => ({
        ...student,
        password: Math.floor(1000 + Math.random() * 9000).toString()
      }));
    }
  }

  reviewAndConfirm() {
    this.parsedStudents.forEach(student => {
      if (!student.schoolGrade) {
        student.schoolGrade = this.importForm.get('defaultGrade')?.value || '';
      }
    });
    
    this.currentStep = 3;
  }

  async importStudents() {
    if (this.parsedStudents.length === 0) {
      this.errorMessage = 'No students to import';
      return;
    }

    try {
      this.loading = true;
      this.errorMessage = '';
      
      console.log('Starting bulk import...');
      this.successMessage = 'Processing student data...';

      for (const student of this.parsedStudents) {
        const uid = `stu_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const qrData = JSON.stringify({ uid, pin: student.password });
        const qrUrl = await QRCode.toDataURL(qrData);

        const userData = {
          firstName: student.firstName,
          lastName: student.lastName,
          birthday: student.birthday,
          gender: student.gender,
          schoolGrade: student.schoolGrade,
          password: student.password,
          qrCode: qrUrl,
          role: 'Student',
          linkedTeacherId: this.linkedTeacherId,
          linkedSchoolId: this.linkedSchoolId,
          uid: uid,
          createdAt: new Date().toISOString()
        };

        await set(ref(this.db, `users/${uid}`), userData);

        await this.generatePDF(student, qrUrl, uid);
      }

      this.successMessage = `Successfully imported ${this.parsedStudents.length} students!`;
      setTimeout(() => {
        this.page.onSectionSelected('student-list');
      }, 2000);
    } catch (error) {
      console.error('Import error:', error);
      this.errorMessage = 'Error importing students';
    } finally {
      this.loading = false;
    }
  }

  async generatePDF(student: StudentImportData, qrUrl: string, uid: string) {
    const doc = new jsPDF();

    doc.setFillColor(30, 64, 175);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('Student Login Card', 105, 17, { align: 'center' });

    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 35, 180, 85, 3, 3, 'F');

    doc.setTextColor(33, 37, 41);
    doc.setFontSize(12);
    const labels = [
      `First Name: ${student.firstName}`,
      `Last Name: ${student.lastName}`,
      `Grade: ${student.schoolGrade}`,
      `Birth Date: ${student.birthday}`,
      `Gender: ${student.gender}`,
      `PIN Code: ${student.password}`,
      `Student ID: ${uid}`
    ];

    let y = 45;
    labels.forEach(label => {
      doc.text(label, 20, y);
      y += 10;
    });

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text("Scan this QR code to log in:", 105, 130, { align: 'center' });

    doc.addImage(qrUrl, "PNG", 60, 140, 90, 90);

    const filename = `student-${student.firstName}-${student.lastName}-G${student.schoolGrade}.pdf`;
    doc.save(filename);
  }

  resetForm() {
    this.csvFile = null;
    this.parsedStudents = [];
    this.showPreview = false;
    this.currentStep = 1;
    this.errorMessage = '';
    this.successMessage = '';
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
