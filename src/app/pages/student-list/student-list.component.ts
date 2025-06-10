import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { Database, ref, get, update, set } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StudentService } from '../../services/student.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LanguageService } from '../../services/language.service';

type Language = 'en' | 'ar';

type TranslationKey = 
  | 'studentList'
  | 'search'
  | 'filter'
  | 'class'
  | 'gender'
  | 'dateRange'
  | 'all'
  | 'male'
  | 'female'
  | 'today'
  | 'lastWeek'
  | 'lastMonth'
  | 'lastYear'
  | 'actions'
  | 'edit'
  | 'view'
  | 'unlink'
  | 'exportPDF'
  | 'exportCSV'
  | 'printQR'
  | 'confirmUnlink'
  | 'firstName'
  | 'lastName'
  | 'grade'
  | 'birthDate'
  | 'createdAt'
  | 'selectAll'
  | 'selected'
  | 'importStudents'
  | 'advancedSearch'
  | 'resetFilters'
  | 'noResults'
  | 'loading';

interface TeacherClass {
  classId: string;
  className: string;
}

interface Student {
  uid: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: 'Male' | 'Female';
  schoolGrade: string;
  password: string;
  qrCode: string;
  role: 'Student';
  createdAt: string;
  linkedSchoolId: string;
  linkedTeacherId: string;
  group?: string;
}


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
  styles: [`
    [dir="rtl"] .search-icon {
      right: 12px;
      left: auto;
    }
    [dir="rtl"] table th,
    [dir="rtl"] table td {
      text-align: right;
    }
    [dir="rtl"] .actions-cell {
      text-align: left;
    }
  `]
})
export class StudentListComponent implements OnInit {
  private db = inject(Database);
  private auth = inject(AuthService);
  private page = inject(DashboardComponent);
  private studentService = inject(StudentService);
  private langService = inject(LanguageService);

  getTranslation(key: TranslationKey): string {
    const currentLang = this.langService.getCurrentLanguage() as Language;
    return this.translations[currentLang]?.[key] || key;
  }

  get isRTL(): boolean {
    return this.langService.getCurrentLanguage() === 'ar';
  }

  studentsData: Student[] = [];
  loading = true;
  teacherUID = '';
  searchQuery = '';
  selectedClass = '';
  selectedGender = '';
  sortBy = 'name';
  sortDirection = 'asc';
  dateFilter = '';
  availableClasses: TeacherClass[] = [];
  qrPreview: string | null = null;
  selectedStudents: string[] = [];
  selectAll = false;
  showBulkActions = false;
  exportDropdown = false;
  showAdvancedSearch = false;

  @Output() sectionSelected = new EventEmitter<string>();

  private translations: Record<Language, Record<TranslationKey, string>> = {
    'en': {
      'studentList': 'Student List',
      'search': 'Search students...',
      'filter': 'Filter',
      'class': 'Class',
      'gender': 'Gender',
      'dateRange': 'Date Range',
      'all': 'All',
      'male': 'Male',
      'female': 'Female',
      'today': 'Today',
      'lastWeek': 'Last Week',
      'lastMonth': 'Last Month',
      'lastYear': 'Last Year',
      'actions': 'Actions',
      'edit': 'Edit',
      'view': 'View',
      'unlink': 'Unlink',
      'exportPDF': 'Export PDF',
      'exportCSV': 'Export CSV',
      'printQR': 'Print QR Codes',
      'confirmUnlink': 'Are you sure you want to unlink this student?',
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'grade': 'Grade',
      'birthDate': 'Birth Date',
      'createdAt': 'Created At',
      'selectAll': 'Select All',
      'selected': 'Selected',
      'importStudents': 'Import Students',
      'advancedSearch': 'Advanced Search',
      'resetFilters': 'Reset Filters',
      'noResults': 'No students found',
      'loading': 'Loading students...'
    },
    'ar': {
      'studentList': 'قائمة الطلاب',
      'search': 'بحث عن الطلاب...',
      'filter': 'تصفية',
      'class': 'الصف',
      'gender': 'الجنس',
      'dateRange': 'النطاق الزمني',
      'all': 'الكل',
      'male': 'ذكر',
      'female': 'أنثى',
      'today': 'اليوم',
      'lastWeek': 'الأسبوع الماضي',
      'lastMonth': 'الشهر الماضي',
      'lastYear': 'السنة الماضية',
      'actions': 'الإجراءات',
      'edit': 'تعديل',
      'view': 'عرض',
      'unlink': 'فصل',
      'exportPDF': 'تصدير PDF',
      'exportCSV': 'تصدير CSV',
      'printQR': 'طباعة رموز QR',
      'confirmUnlink': 'هل أنت متأكد من فصل هذا الطالب؟',
      'firstName': 'الاسم الأول',
      'lastName': 'اسم العائلة',
      'grade': 'الصف',
      'birthDate': 'تاريخ الميلاد',
      'createdAt': 'تاريخ الإنشاء',
      'selectAll': 'تحديد الكل',
      'selected': 'محدد',
      'importStudents': 'استيراد الطلاب',
      'advancedSearch': 'بحث متقدم',
      'resetFilters': 'إعادة تعيين التصفية',
      'noResults': 'لم يتم العثور على طلاب',
      'loading': 'جاري تحميل الطلاب...'
    }
  };

  ngOnInit(): void {
    this.auth.getCurrentUserWithRole().subscribe(async (user) => {
      if (!user || user.role !== 'Teacher') return;

      this.teacherUID = user.uid;

      try {
        const teacherRef = ref(this.db, `users/${user.uid}`);
        const teacherSnapshot = await get(teacherRef);
        
        if (teacherSnapshot.exists()) {
          const teacherData = teacherSnapshot.val();
          if (Array.isArray(teacherData.schoolGrades)) {
            this.availableClasses = teacherData.schoolGrades;
          }
        }

        const studentsSnapshot = await get(ref(this.db, 'users'));
        if (studentsSnapshot.exists()) {
          const allUsers = studentsSnapshot.val();
          this.studentsData = Object.values(allUsers)
            .filter((u: any): u is Student => 
              u.role === 'Student' && 
              u.linkedTeacherId === this.teacherUID &&
              this.isValidStudent(u)
            );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    });
  }
  
  private isValidStudent(user: any): user is Student {
    return (
      typeof user.uid === 'string' &&
      typeof user.firstName === 'string' &&
      typeof user.lastName === 'string' &&
      typeof user.birthday === 'string' &&
      typeof user.gender === 'string' &&
      typeof user.schoolGrade === 'string' &&
      typeof user.password === 'string' &&
      typeof user.qrCode === 'string' &&
      user.role === 'Student' &&
      typeof user.createdAt === 'string' &&
      typeof user.linkedSchoolId === 'string' &&
      typeof user.linkedTeacherId === 'string'
    );
  }

  get filteredStudents() {
    let result = this.studentsData.filter(student => {
      const matchesSearch = this.searchQuery ? 
        `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase()) 
        : true;
      
      const matchesClass = this.selectedClass ? 
        student.schoolGrade === this.selectedClass 
        : true;
      
      const matchesGender = this.selectedGender ? 
        student.gender === this.selectedGender 
        : true;
      
      let matchesDate = true;
      if (this.dateFilter && student.createdAt) {
        const createdDate = new Date(student.createdAt);
        const today = new Date();
        
        switch (this.dateFilter) {
          case 'today':
            matchesDate = createdDate.toDateString() === today.toDateString();
            break;
          case 'week':
            const weekAgo = new Date();
            weekAgo.setDate(today.getDate() - 7);
            matchesDate = createdDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date();
            monthAgo.setMonth(today.getMonth() - 1);
            matchesDate = createdDate >= monthAgo;
            break;
          case 'year':
            const yearAgo = new Date();
            yearAgo.setFullYear(today.getFullYear() - 1);
            matchesDate = createdDate >= yearAgo;
            break;
        }
      }
      
      return matchesSearch && matchesClass && matchesGender && matchesDate;
    });
    
    return this.sortStudents(result);
  }
  
  private sortStudents(students: Student[]): Student[] {
    return [...students].sort((a, b) => {
      let comparison = 0;
      
      switch (this.sortBy) {
        case 'name':
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case 'grade':
          comparison = a.schoolGrade.localeCompare(b.schoolGrade);
          break;
        case 'gender':
          comparison = a.gender.localeCompare(b.gender);
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  editStudent(uid: string) {
    this.studentService.setStudentToEdit(uid);
    this.page.onSectionSelected('edit-student');
  }

  viewStudent(uid: string) {
    this.studentService.setStudentToEdit(uid);
    this.page.onSectionSelected('view-student');
  }

  showQr(url: string | undefined) {
    if (url) {
      this.qrPreview = url;
    }
  }

  async unlinkStudent(uid: string) {
    if (!confirm('Are you sure you want to unlink this student?')) return;
    
    try {
      await update(ref(this.db, `users/${uid}`), {
        linkedTeacherId: null
      });
      this.studentsData = this.studentsData.filter(s => s.uid !== uid);
    } catch (error) {
      console.error('Error unlinking student:', error);
    }
  }
  
  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    
    if (this.selectAll) {
      this.selectedStudents = this.filteredStudents.map(s => s.uid);
    } else {
      this.selectedStudents = [];
    }
    
    this.updateBulkActionsVisibility();
  }
  
  toggleStudentSelection(uid: string) {
    const index = this.selectedStudents.indexOf(uid);
    
    if (index === -1) {
      this.selectedStudents.push(uid);
    } else {
      this.selectedStudents.splice(index, 1);
    }
    
    this.selectAll = this.filteredStudents.length > 0 && 
                    this.selectedStudents.length === this.filteredStudents.length;
                    
    this.updateBulkActionsVisibility();
  }
  
  updateBulkActionsVisibility() {
    this.showBulkActions = this.selectedStudents.length > 0;
  }
  
  async bulkUnlinkStudents() {
    if (!confirm(`Are you sure you want to unlink ${this.selectedStudents.length} students?`)) return;
    
    try {
      for (const uid of this.selectedStudents) {
        await update(ref(this.db, `users/${uid}`), {
          linkedTeacherId: null
        });
      }
      
      this.studentsData = this.studentsData.filter(s => !this.selectedStudents.includes(s.uid));
      this.selectedStudents = [];
      this.updateBulkActionsVisibility();
    } catch (error) {
      console.error('Error unlinking students:', error);
    }
  }
  
  changeSorting(sortField: string) {
    if (this.sortBy === sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortField;
      this.sortDirection = 'asc';
    }
  }
  
  resetFilters() {
    this.searchQuery = '';
    this.selectedClass = '';
    this.selectedGender = '';
    this.dateFilter = '';
    this.sortBy = 'name';
    this.sortDirection = 'asc';
  }
  
  getSortIcon(field: string): string {
    if (this.sortBy !== field) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
  
  goToImportStudents() {
    this.page.onSectionSelected('student-bulk-import');
  }
  
  exportStudentList() {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(18);
      doc.text('Student List', 14, 22);
      
      doc.setFontSize(10);
      const filterText = [
        `Date: ${new Date().toLocaleDateString()}`,
        `Total Students: ${this.filteredStudents.length}`,
        this.selectedClass ? `Grade: ${this.availableClasses.find(c => c.classId === this.selectedClass)?.className || this.selectedClass}` : '',
        this.selectedGender ? `Gender: ${this.selectedGender}` : ''
      ].filter(Boolean).join(' | ');
      
      doc.text(filterText, 14, 30);
      
      const tableColumn = ['#', 'First Name', 'Last Name', 'Grade', 'Gender', 'Birth Date'];
      const tableRows = this.filteredStudents.map((student, index) => [
        (index + 1).toString(),
        student.firstName,
        student.lastName,
        student.schoolGrade,
        student.gender,
        student.birthday
      ]);
      
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [70, 130, 180] }
      });
      
      doc.save('student-list.pdf');
    } catch (error) {
      console.error('Error exporting student list:', error);
    }
  }
  
  exportToCSV() {
    try {
      const students = this.selectedStudents.length > 0 
        ? this.studentsData.filter(s => this.selectedStudents.includes(s.uid))
        : this.filteredStudents;
      
      const headers = ['First Name', 'Last Name', 'Birth Date', 'Gender', 'Grade', 'PIN'];
      
      let csvContent = headers.join(',') + '\n';
      
      students.forEach(student => {
        const row = [
          this.escapeCsvValue(student.firstName),
          this.escapeCsvValue(student.lastName),
          this.escapeCsvValue(student.birthday),
          this.escapeCsvValue(student.gender),
          this.escapeCsvValue(student.schoolGrade),
          this.escapeCsvValue(student.password)
        ];
        csvContent += row.join(',') + '\n';
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'students.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      if (this.selectedStudents.length > 0) {
        this.selectedStudents = [];
        this.selectAll = false;
        this.updateBulkActionsVisibility();
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error);
    }
  }
  
  private escapeCsvValue(value: any): string {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return '"' + stringValue.replace(/"/g, '""') + '"';
    }
    return stringValue;
  }
  
  printQRCodes() {
    try {
      const doc = new jsPDF();
      const students = this.selectedStudents.length > 0 
        ? this.studentsData.filter(s => this.selectedStudents.includes(s.uid))
        : this.filteredStudents;
      
      doc.setFontSize(18);
      doc.text('Student QR Codes', 105, 15, { align: 'center' });
      
      let y = 30;
      let x = 15;
      let count = 0;
      
      for (const student of students) {
        if (!student.qrCode) continue;
        
        if (y > 250) {
          doc.addPage();
          y = 30;
          count = 0;
        }
        
        if (count % 2 === 0) {
          x = 15;
        } else {
          x = 110;
        }
        
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(x, y, 85, 110, 3, 3, 'F');
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`${student.firstName} ${student.lastName}`, x + 42.5, y + 10, { align: 'center' });
        doc.text(`Grade: ${student.schoolGrade}`, x + 42.5, y + 20, { align: 'center' });
        
        doc.addImage(student.qrCode, 'PNG', x + 17.5, y + 35, 50, 50);
        doc.text(`PIN: ${student.password}`, x + 42.5, y + 95, { align: 'center' });
        
        count++;
        if (count % 2 === 0) {
          y += 120;
        }
      }
      
      doc.save('student-qr-codes.pdf');
      
      if (this.selectedStudents.length > 0) {
        this.selectedStudents = [];
        this.selectAll = false;
        this.updateBulkActionsVisibility();
      }
    } catch (error) {
      console.error('Error printing QR codes:', error);
    }
  }
}