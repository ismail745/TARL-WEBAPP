import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Database, get, ref, set } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface ChildSearch {
  nom: string;
  prenom: string;
  dateNaissance: string;
}

interface Student {
  uid: string;
  firstName: string;
  lastName: string;
  dateNaissance: string;
  role: string;
  class?: string;
  school?: string;
}

interface ParentFormData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  mot_de_passe?: string;
  adresse: {
    rue: string;
    ville: string;
    code_postal: string;
  };
  ecole_des_enfants: string;
  nombre_enfants: number;
  civilite: 'Monsieur' | 'Madame';
  cin: string;
  role: string;
  role_academique: 'Mother' | 'Father' | 'Guardian';
  data_completed: boolean;
  frozen: boolean;
  la_liste_enfants: string[];
  createdAt: string;
}

@Component({
  selector: 'app-register-parent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './register-parent.component.html',
  styleUrls: ['./register-parent.component.css']
})
export class RegisterParentComponent implements OnInit {
  parentForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  userId = '';
  existingUserData: Partial<ParentFormData> | null = null;

  childSearch: ChildSearch = {
    nom: '',
    prenom: '',
    dateNaissance: ''
  };

  foundChildren: Student[] = [];
  selectedChildren: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: Database,
    private auth: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.checkAuthStatus();
    await this.fetchExistingUserData();
    this.initializeForm();
  }

  private async checkAuthStatus(): Promise<void> {
    try {
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      this.router.navigate(['/login']);
    }
  }

  private async fetchExistingUserData(): Promise<void> {
    try {
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user?.uid) return;

      const userSnapshot = await get(ref(this.db, `users/${user.uid}`));
      if (userSnapshot.exists()) {
        this.existingUserData = userSnapshot.val();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  private initializeForm(): void {
    this.parentForm = this.fb.group({
      telephone: [this.existingUserData?.telephone || '', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      adresse: this.fb.group({
        rue: [this.existingUserData?.adresse?.rue || '', Validators.required],
        ville: [this.existingUserData?.adresse?.ville || '', Validators.required],
        code_postal: [this.existingUserData?.adresse?.code_postal || '', [Validators.required, Validators.pattern('^[0-9]{4,5}$')]]
      }),
      ecole_des_enfants: [this.existingUserData?.ecole_des_enfants || '', Validators.required],
      nombre_enfants: [this.existingUserData?.nombre_enfants || '', [Validators.required, Validators.min(1)]],
      civilite: [this.existingUserData?.civilite || '', Validators.required],
      cin: [this.existingUserData?.cin || '', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      role_academique: [this.existingUserData?.role_academique || '', Validators.required]
    });
  }

  async searchChildren(): Promise<void> {
    try {
      if (!this.validateSearchFields()) return;

      this.loading = true;
      this.errorMessage = '';
      this.foundChildren = [];

      const snapshot = await get(ref(this.db, 'users'));
      if (snapshot.exists()) {
        const users = snapshot.val();
        
        this.foundChildren = Object.entries(users)
          .map(([uid, data]: [string, any]) => ({
            uid,
            ...data
          }))
          .filter(user => {
            const nameMatch = user.firstName?.toLowerCase().trim() === this.childSearch.prenom.toLowerCase().trim() &&
                           user.lastName?.toLowerCase().trim() === this.childSearch.nom.toLowerCase().trim();
            const dateMatch = user.birthday === this.childSearch.dateNaissance;
            const roleMatch = user.role === 'Student';
            return nameMatch && dateMatch && roleMatch;
          });

        if (this.foundChildren.length === 0) {
          this.errorMessage = 'No student found';
        }
      }
    } catch (error) {
      console.error('Error searching for children:', error);
      this.errorMessage = 'Search failed';
    } finally {
      this.loading = false;
    }
  }

  private validateSearchFields(): boolean {
    const errors: string[] = [];
    if (!this.childSearch.nom?.trim()) errors.push('Last name');
    if (!this.childSearch.prenom?.trim()) errors.push('First name');
    if (!this.childSearch.dateNaissance) errors.push('Birth date');

    if (errors.length > 0) {
      this.errorMessage = `Required fields: ${errors.join(', ')}`;
      return false;
    }
    return true;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.parentForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const control = this.parentForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'Required field';
      if (control.errors['email']) return 'Invalid email';
      if (control.errors['pattern']) {
        switch (fieldName) {
          case 'telephone': return 'Must be at least 8 digits';
          case 'cin': return 'Must be 8 digits';
          case 'adresse.code_postal': return 'Must be 4-5 digits';
          default: return 'Invalid format';
        }
      }
      if (control.errors['min']) return 'Minimum value is 1';
    }
    return '';
  }

  toggleChildSelection(uid: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked && !this.selectedChildren.includes(uid)) {
      this.selectedChildren.push(uid);
    } else {
      this.selectedChildren = this.selectedChildren.filter(id => id !== uid);
    }
  }

  async onSubmit(): Promise<void> {
    try {
      if (this.parentForm.invalid) {
        this.markFormGroupTouched(this.parentForm);
        return;
      }

      if (this.selectedChildren.length === 0) {
        this.errorMessage = 'Select at least one child';
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user) throw new Error('Unauthorized');

      const formData: ParentFormData = {
        uid: user.uid,
        lastName: this.existingUserData?.lastName || '',
        firstName: this.existingUserData?.firstName || '',
        email: this.existingUserData?.email || '',
        ...this.parentForm.value,
        data_completed: true,
        frozen: true,
        role: 'Parent',
        la_liste_enfants: this.selectedChildren,
        createdAt: new Date().toISOString()
      };

      await set(ref(this.db, `users/${user.uid}`), formData);
      
      this.successMessage = 'Registration successful';
      setTimeout(() => {
        this.router.navigate(['/pending-approval'], {
          queryParams: { userId: user.uid }
        });
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      this.errorMessage = 'Registration failed';
    } finally {
      this.loading = false;
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

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}