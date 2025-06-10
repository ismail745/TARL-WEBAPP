import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Database, ref, get, update } from '@angular/fire/database';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  password?: string;
  address: {
    street: string;
    city: string;
    postal_code: string;
  };
  children_school?: string;
  number_of_children?: number;
  children_list?: string[];
  title?: 'Mr.' | 'Mrs.';
  id_number: string;
  academic_role?: 'Mother' | 'Father' | 'Guardian';
  data_completed: boolean;
  frozen: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  currentUser: UserProfile | null = null;
  loading = true;
  error = '';
  success = '';
  editMode = false;
  profileForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private db: Database,
    private fb: FormBuilder,
    private router: Router
  ) {
    console.log('UserProfileComponent initialized');
    this.initializeForm();
  }

  private initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      title: [''],
      id_number: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postal_code: ['', [Validators.required, Validators.pattern('^[0-9]{4,5}$')]]
      }),
      children_school: [''],
      number_of_children: [0, [Validators.min(0)]],
      academic_role: [''],
      data_completed: [false],
      frozen: [true]
    });
  }

  async ngOnInit() {
    try {
      await this.loadUserProfile();
    } catch (error) {
      
      this.error = 'Failed to load profile data';
    } finally {
      this.loading = false;
    }
  }

  private async loadUserProfile() {
    const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
    if (!user?.uid) throw new Error('No authenticated user');

    const snapshot = await get(ref(this.db, `users/${user.uid}`));
    if (snapshot.exists()) {
      this.currentUser = snapshot.val();
      this.updateFormWithUserData();
    } else {
      throw new Error('User profile not found');
    }
  }

  private updateFormWithUserData(): void {
    if (!this.currentUser) return;
    
    this.profileForm.patchValue({
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      title: this.currentUser.title,
      id_number: this.currentUser.id_number,
      address: this.currentUser.address,
      children_school: this.currentUser.children_school,
      number_of_children: this.currentUser.number_of_children,
      academic_role: this.currentUser.academic_role,
      data_completed: this.currentUser.data_completed,
      frozen: this.currentUser.frozen
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.updateFormWithUserData();
    }
  }

  async saveChanges(): Promise<void> {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    try {
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user?.uid) throw new Error('No authenticated user');

      const updates = {
        ...this.currentUser,
        ...this.profileForm.value,
        updatedAt: new Date().toISOString()
      };

      await update(ref(this.db, `users/${user.uid}`), updates);
      this.currentUser = updates;
      this.success = 'Profile updated successfully';
      this.editMode = false;
      setTimeout(() => this.success = '', 3000);
    } catch (error) {
      
      this.error = 'Failed to update profile';
      setTimeout(() => this.error = '', 3000);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.profileForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
      if (control.errors['email']) return 'Invalid email format';
      if (control.errors['minlength']) return 'Minimum length not met';
      if (control.errors['pattern']) {
        switch (fieldName) {
          case 'phone': return 'Phone must be at least 8 digits';
          case 'id_number': return 'ID must be 8 digits';
          case 'address.postal_code': return 'Postal code must be 4-5 digits';
          default: return 'Invalid format';
        }
      }
      if (control.errors['min']) return 'Value must be 0 or greater';
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.profileForm.get(fieldName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }
  revertChanges(): void {
    this.updateFormWithUserData();
    this.editMode = false;
  }
  goToDashboard() {
    window.location.reload();
  }
}