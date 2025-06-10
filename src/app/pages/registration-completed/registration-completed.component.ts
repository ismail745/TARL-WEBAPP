import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Database, get, ref } from '@angular/fire/database';

interface School {
  id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  academy: string;
}

@Component({
  selector: 'app-registration-completed',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-completed.component.html',
  styleUrls: ['./registration-completed.component.css']
})
export class RegistrationCompletedComponent implements OnInit {
  enseignantForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  schools: School[] = [];
  userId: string = '';
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private db: Database
  ) {
    this.initializeForm();
    
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      if (!this.userId) {
        this.router.navigate(['/login']);
        return;
      }
    });
  }

  private initializeForm(): void {
    this.enseignantForm = this.fb.group({
      userId: [''],
      telephone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{8,}$')
      ]],
      dateNaissance: ['', Validators.required],
      academy: ['', Validators.required],
      ecole: ['', Validators.required],
      dateEmbauche: ['', Validators.required],
      matieres_enseignees: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.enseignantForm.patchValue({ userId: this.userId });
    }
  }

  async onAcademyChange(event: Event): Promise<void> {
    try {
      const academy = (event.target as HTMLSelectElement).value;
      if (!academy) {
        this.schools = [];
        this.enseignantForm.patchValue({ ecole: '' });
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      const schoolsSubscription = this.schoolService.getSchoolsByAcademy(academy).subscribe({
        next: async (schools) => {
          try {
            const principalsSnapshot = await get(ref(this.db, 'users'));
            const schoolsWithPrincipals = new Set();

            if (principalsSnapshot.exists()) {
              Object.values(principalsSnapshot.val()).forEach((user: any) => {
                if (user.role === 'Principal' && user.ecole ) {
                  schoolsWithPrincipals.add(user.ecole);
                }
              });
            }

            this.schools = schools.filter(school => !schoolsWithPrincipals.has(school.name));

            console.log('Available Schools:', this.schools);
            console.log('Schools with principals:', Array.from(schoolsWithPrincipals));

            if (this.schools.length === 0) {
              this.errorMessage = 'No available schools in this academy.';
            }
          } catch (error) {
            console.error('Error fetching principals:', error);
            this.errorMessage = 'Failed to load school data.';
          }
        },
        error: (error) => {
          console.error('Error fetching schools:', error);
          this.errorMessage = 'Failed to load school list.';
          this.schools = [];
        },
        complete: () => {
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('Error in academy change:', error);
      this.errorMessage = 'An unexpected error occurred.';
      this.loading = false;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.enseignantForm.invalid) {
      this.markFormGroupTouched(this.enseignantForm);
      return;
    }

    if (!this.userId) {
      this.errorMessage = 'User ID not found.';
      return;
    }

    try {
      this.loading = true;
      this.errorMessage = '';

      const formData = {
        ...this.enseignantForm.value,
        role: 'Principal',
        data_completed: true,
        updatedAt: new Date().toISOString()
      };

      await this.auth.updateUserProfile(this.userId, formData).toPromise();
      
      this.successMessage = 'Registration completed successfully';
      setTimeout(() => {
        this.router.navigate(['/login'], {
          queryParams: { userId: this.userId }
        });
      }, 1500);

    } catch (error) {
      console.error('Registration error:', error);
      this.errorMessage = 'Registration failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.enseignantForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const control = this.enseignantForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required.';
      if (control.errors['pattern']) {
        switch (fieldName) {
          case 'telephone': return 'Phone number must have at least 8 digits.';
          default: return 'Invalid format.';
        }
      }
      if (control.errors['minlength']) return 'Text is too short.';
    }
    return '';
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
