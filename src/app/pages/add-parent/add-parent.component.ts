import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Database, ref, set, push, get } from '@angular/fire/database';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';

interface ParentData {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  schoolName: string;
  studentCount: number;
  studentList: string[];
  title: 'Mr.' | 'Mrs.';
  nationalId: string;
  role: string;
  academicRole: 'Father' | 'Mother' | 'Guardian';
  dataCompleted: boolean;
  frozen: boolean;
  createdAt: number;
}

@Component({
  selector: 'app-add-parent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit {
  parentForm!: FormGroup;
  loading = false;
  error = '';
  success = '';
  foundStudents: any[] = [];
  selectedStudents: string[] = [];
  searchQuery = '';

  currentLanguage = 'en';

  translations: Record<string, Record<string, string>> = {
    en: {
      addNewParent: 'Add New Parent',
      formDescription: 'Complete the form to register a new parent in the system',
      personalInfo: 'Personal Information',
      contactInfo: 'Contact Information',
      address: 'Address',
      studentsDetails: 'Select Students Details',
      selectStudents: 'Select Students',
      searchStudents: 'Search and select the students to associate with this parent',
      title: 'Title',
      selectCivility: 'Select civility',
      role: 'Role',
      selectRole: 'Select role',
      father: 'Father',
      mother: 'Mother',
      guardian: 'Guardian',
      lastName: 'Last Name',
      firstName: 'First Name',
      enterLastName: 'Enter last name',
      enterFirstName: 'Enter first name',
      nationalId: 'National ID',
      enterNationalId: 'Enter national ID number',
      email: 'Email',
      emailPlaceholder: 'parent@example.com',
      phone: 'Phone',
      phonePlaceholder: '+1 (555) 123-4567',
      password: 'Password',
      passwordPlaceholder: 'Create a secure password',
      street: 'Street',
      streetPlaceholder: '123 Main Street',
      city: 'City',
      cityPlaceholder: 'City name',
      postalCode: 'Postal Code',
      postalCodePlaceholder: '12345',
      schoolName: 'School Name',
      schoolNamePlaceholder: 'School name',
      numberOfStudents: 'Number of Students',
      searchPlaceholder: 'Type student name to search...',
      searchResults: 'Search Results',
      studentsFound: 'student(s) found',
      noClassAssigned: 'No class assigned',
      grade: 'Grade',
      noStudentsFound: 'No students found matching your search',
      tryDifferentSearch: 'Try a different search term or check spelling',
      selectedStudents: 'Selected Students',
      selected: 'selected',
      selectAtLeastOne: 'Please select at least one student to associate with this parent',
      cancel: 'Cancel',
      saveParent: 'Save Parent'
    },
    ar: {
      addNewParent: 'إضافة ولي أمر جديد',
      formDescription: 'أكمل النموذج لتسجيل ولي أمر جديد في النظام',
      personalInfo: 'المعلومات الشخصية',
      contactInfo: 'معلومات الاتصال',
      address: 'العنوان',
      studentsDetails: 'اختيار تفاصيل الطلاب',
      selectStudents: 'اختيار الطلاب',
      searchStudents: 'ابحث واختر الطلاب لربطهم بولي الأمر',
      title: 'اللقب',
      selectCivility: 'اختر اللقب',
      role: 'الدور',
      selectRole: 'اختر الدور',
      father: 'أب',
      mother: 'أم',
      guardian: 'وصي',
      lastName: 'اسم العائلة',
      firstName: 'الاسم الأول',
      enterLastName: 'أدخل اسم العائلة',
      enterFirstName: 'أدخل الاسم الأول',
      nationalId: 'رقم الهوية',
      enterNationalId: 'أدخل رقم الهوية الوطنية',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'parent@example.com',
      phone: 'رقم الهاتف',
      phonePlaceholder: '+1 (555) 123-4567',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أنشئ كلمة مرور آمنة',
      street: 'الشارع',
      streetPlaceholder: '123 الشارع الرئيسي',
      city: 'المدينة',
      cityPlaceholder: 'اسم المدينة',
      postalCode: 'الرمز البريدي',
      postalCodePlaceholder: '12345',
      schoolName: 'اسم المدرسة',
      schoolNamePlaceholder: 'اسم المدرسة',
      numberOfStudents: 'عدد الطلاب',
      searchPlaceholder: 'اكتب اسم الطالب للبحث...',
      searchResults: 'نتائج البحث',
      studentsFound: 'طالب/طلاب تم العثور عليهم',
      noClassAssigned: 'لم يتم تعيين فصل',
      grade: 'الصف',
      noStudentsFound: 'لم يتم العثور على طلاب مطابقين لبحثك',
      tryDifferentSearch: 'جرب مصطلح بحث مختلف أو تحقق من التهجئة',
      selectedStudents: 'الطلاب المختارون',
      selected: 'مختار',
      selectAtLeastOne: 'الرجاء اختيار طالب واحد على الأقل لربطه بولي الأمر',
      cancel: 'إلغاء',
      saveParent: 'حفظ ولي الأمر'
    }
  };

  constructor(
    private fb: FormBuilder,
    private db: Database,
    private router: Router,
    private auth: AuthService,
    private languageService: LanguageService
  ) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadStudents();
  }

  initForm(): void {
    this.parentForm = this.fb.group({
      civility: ['Monsieur', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{4,5}$')]]
      }),
      childrenSchool: ['', Validators.required],
      childrenCount: [1, [Validators.required, Validators.min(1)]],
      nationalId: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      academicRole: ['Father', Validators.required]
    });
  }

  async loadStudents(): Promise<void> {
    try {
      this.loading = true;
      const snapshot = await get(ref(this.db, 'users'));
      if (snapshot.exists()) {
        const users = snapshot.val();
        this.foundStudents = Object.entries(users)
          .map(([uid, data]: [string, any]) => ({
            uid,
            ...data
          }))
          .filter(user => user.role === 'Student');
        
        this.foundStudents.sort((a, b) => {
          const nameA = `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase();
          const nameB = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
      }
    } catch (error) {
      console.error('Error loading students:', error);
      this.error = 'Failed to load students. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  filterStudents(): any[] {
    if (!this.searchQuery.trim()) return [];
    
    const query = this.searchQuery.toLowerCase().trim();
    return this.foundStudents.filter(student => {
      const firstName = student.firstName?.toLowerCase() || '';
      const lastName = student.lastName?.toLowerCase() || '';
      const fullName = `${firstName} ${lastName}`;
      
      return firstName.includes(query) || 
             lastName.includes(query) || 
             fullName.includes(query);
    });
  }

  toggleStudentSelection(uid: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked && !this.selectedStudents.includes(uid)) {
      this.selectedStudents.push(uid);
    } else {
      this.selectedStudents = this.selectedStudents.filter(id => id !== uid);
    }
  }

  removeStudent(uid: string): void {
    this.selectedStudents = this.selectedStudents.filter(id => id !== uid);
  }

  getStudentName(uid: string): string {
    const student = this.foundStudents.find(s => s.uid === uid);
    if (student) {
      return `${student.firstName || ''} ${student.lastName || ''}`;
    }
    return 'Student';
  }

  cancel(): void {
    this.router.navigate(['/dashboard'], { queryParams: { section: 'parent-list' } });
  }

  async onSubmit(): Promise<void> {
    if (this.parentForm.invalid) {
      this.touchAllFormFields(this.parentForm);
      return;
    }

    if (this.selectedStudents.length === 0) {
      this.error = 'Please select at least one student';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    try {
      const formValues = this.parentForm.value;
      const parentsRef = ref(this.db, 'users');
      const newParentRef = push(parentsRef);
      const parentId = newParentRef.key;
      
      if (!parentId) {
        throw new Error('Failed to generate parent ID');
      }
      
      const parentData: ParentData = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        dataCompleted: true,
        frozen: true,
        password: formValues.password,
        telephone: formValues.telephone,
        address: {
          street: formValues.address.street,
          city: formValues.address.city,
          postalCode: formValues.address.postalCode
        },
        schoolName: formValues.childrenSchool,
        studentCount: formValues.childrenCount,
        studentList: this.selectedStudents,
        title: formValues.civility,
        nationalId: formValues.nationalId,
        role: 'Parent',
        academicRole: formValues.academicRole,
        createdAt: Date.now(),
        uid: parentId
      };

      await set(ref(this.db, `users/${parentId}`), parentData);
      
      for (const studentId of this.selectedStudents) {
        const studentRef = ref(this.db, `users/${studentId}`);
        const studentSnapshot = await get(studentRef);
        
        if (studentSnapshot.exists()) {
          const studentData = studentSnapshot.val();
          const parentsList = studentData.parentsList || [];
          if (!parentsList.includes(parentId)) {
            parentsList.push(parentId);
            await set(ref(this.db, `users/${studentId}/parentsList`), parentsList);
          }
        }
      }

      this.success = '✅ Parent added successfully. Pending activation.';
      this.parentForm.reset();
      this.selectedStudents = [];
      this.initForm();
      
      setTimeout(() => {
        this.router.navigate(['/dashboard'], { queryParams: { section: 'parent-list' } });
      }, 2000);
    } catch (error) {
      console.error('Error adding parent:', error);
      this.error = '❌ Error adding parent. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  touchAllFormFields(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.touchAllFormFields(control);
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.parentForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.parentForm.get(field);
    if (!control) return '';
    
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (control.hasError('minlength')) {
      return `Must be at least ${control.getError('minlength').requiredLength} characters`;
    }
    if (control.hasError('min')) {
      return `Minimum value is ${control.getError('min').min}`;
    }
    if (control.hasError('pattern')) {
      switch (field) {
        case 'telephone': return 'Must be at least 8 digits';
        case 'postalCode': return 'Must be 4-5 digits';
        case 'nationalId': return 'Must be 8 digits';
        default: return 'Invalid format';
      }
    }
    return '';
  }

  getTranslation(key: string): string {
    return this.translations[this.currentLanguage][key] || key;
  }
}
