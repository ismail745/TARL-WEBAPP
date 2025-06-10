import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Database, ref, get, update } from '@angular/fire/database';
import { StudentService } from '../../services/student.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { firstValueFrom } from 'rxjs';

interface TeacherClass {
  classId: string;
  className: string;
}

type Language = 'en' | 'ar';

type TranslationKey =
  | 'editStudent'
  | 'loading'
  | 'studentDetails'
  | 'firstName'
  | 'lastName'
  | 'birthDate'
  | 'gender'
  | 'grade'
  | 'selectGender'
  | 'male'
  | 'female'
  | 'selectGrade'
  | 'reset'
  | 'saveChanges'
  | 'fillAllFields'
  | 'studentNotFound'
  | 'errorLoadingStudent'
  | 'errorLoadingGrades'
  | 'updateSuccess'
  | 'updateError'
  | 'enterFirstName'
  | 'enterLastName';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit {
  private translations: Record<Language, Record<TranslationKey, string>> = {
    'en': {
      'editStudent': 'Edit Student',
      'loading': 'Loading student data...',
      'studentDetails': 'Student Details',
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'birthDate': 'Birth Date',
      'gender': 'Gender',
      'grade': 'Grade',
      'selectGender': 'Select gender',
      'male': 'Male',
      'female': 'Female',
      'selectGrade': 'Select grade',
      'reset': 'Reset',
      'saveChanges': 'Save Changes',
      'fillAllFields': 'Please fill all required fields correctly',
      'studentNotFound': 'Student not found',
      'errorLoadingStudent': 'Error loading student data',
      'errorLoadingGrades': 'Failed to load available grades',
      'updateSuccess': 'Student information updated successfully',
      'updateError': 'Error updating student information',
      'enterFirstName': 'Enter first name',
      'enterLastName': 'Enter last name'
    },
    'ar': {
      'editStudent': 'تعديل بيانات الطالب',
      'loading': 'جاري تحميل بيانات الطالب...',
      'studentDetails': 'تفاصيل الطالب',
      'firstName': 'الاسم الأول',
      'lastName': 'اسم العائلة',
      'birthDate': 'تاريخ الميلاد',
      'gender': 'الجنس',
      'grade': 'الصف',
      'selectGender': 'اختر الجنس',
      'male': 'ذكر',
      'female': 'أنثى',
      'selectGrade': 'اختر الصف',
      'reset': 'إعادة تعيين',
      'saveChanges': 'حفظ التغييرات',
      'fillAllFields': 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح',
      'studentNotFound': 'لم يتم العثور على الطالب',
      'errorLoadingStudent': 'خطأ في تحميل بيانات الطالب',
      'errorLoadingGrades': 'فشل في تحميل الصفوف المتاحة',
      'updateSuccess': 'تم تحديث معلومات الطالب بنجاح',
      'updateError': 'خطأ في تحديث معلومات الطالب',
      'enterFirstName': 'أدخل الاسم الأول',
      'enterLastName': 'أدخل اسم العائلة'
    }
  };

  studentId: string = '';
  studentData: any = null;
  editForm: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  availableGrades: TeacherClass[] = [];
  private dab = inject(DashboardComponent);
  private auth = inject(AuthService);
  private langService = inject(LanguageService);

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private db: Database
  ) {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthday: ['', Validators.required],
      schoolGrade: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  getTranslation(key: TranslationKey): string {
    const currentLang = this.langService.getCurrentLanguage() as Language;
    return this.translations[currentLang]?.[key] || key;
  }

  async ngOnInit() {
    // Load student data when ID is available
    this.studentService.currentStudent.subscribe(id => {
      if (id) {
        this.studentId = id;
        this.loadStudentData();
      }
    });

    // Load teacher's available grades
    try {
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user?.uid) throw new Error('No authenticated user');

      const teacherRef = ref(this.db, `users/${user.uid}`);
      const snapshot = await get(teacherRef);
      
      if (snapshot.exists()) {
        const teacherData = snapshot.val();
        if (Array.isArray(teacherData.schoolGrades)) {
          this.availableGrades = teacherData.schoolGrades;
        }
      }
    } catch (error) {
      console.error('Error loading teacher grades:', error);
      this.errorMessage = 'Failed to load available grades';
    }
  }

  async loadStudentData() {
    try {
      this.loading = true;
      const studentRef = ref(this.db, `users/${this.studentId}`);
      const snapshot = await get(studentRef);

      if (snapshot.exists()) {
        this.studentData = snapshot.val();
        this.editForm.patchValue({
          firstName: this.studentData.firstName,
          lastName: this.studentData.lastName,
          birthday: this.studentData.birthday,
          schoolGrade: this.studentData.schoolGrade,
          gender: this.studentData.gender
        });
      } else {
        this.errorMessage = this.getTranslation('studentNotFound');
      }
    } catch (error) {
      console.error('Error loading student:', error);
      this.errorMessage = this.getTranslation('errorLoadingStudent');
    } finally {
      this.loading = false;
    }
  }

  async saveChanges() {
    if (this.editForm.invalid) {
      this.errorMessage = this.getTranslation('fillAllFields');
      return;
    }

    try {
      const updates = {
        ...this.editForm.value,
        updatedAt: Date.now()
      };

      await update(ref(this.db, `users/${this.studentId}`), updates);
      this.successMessage = this.getTranslation('updateSuccess');
      this.dab.onSectionSelected('student-list');
      await this.loadStudentData();
    } catch (error) {
      console.error('Error updating student:', error);
      this.errorMessage = this.getTranslation('updateError');
    }
  }

  resetForm() {
    if (this.studentData) {
      this.editForm.patchValue({
        firstName: this.studentData.firstName,
        lastName: this.studentData.lastName,
        birthday: this.studentData.birthday,
        schoolGrade: this.studentData.schoolGrade,
        gender: this.studentData.gender
      });
    }
  }
}