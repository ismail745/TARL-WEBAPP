import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { Database, ref, get } from '@angular/fire/database';
import { DatabaseReference } from 'firebase/database';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.auth.login(email, password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: async (userCredential) => {
          const user = userCredential.user;
          await user.reload();

          if (!user.emailVerified) {
            this.errorMessage = 'Please verify your email before continuing.';
            return;
          }

          this.auth.getUserData(user.uid).subscribe({
            next: (userData) => {
              if (!userData) {
                this.router.navigate(['/register-completed'], {
                  queryParams: { userId: user.uid }
                });
                return;
              }

              if (userData.data_completed === false) {
                if (userData.role === 'Teacher' || userData.role === 'Principal') {
                  this.router.navigate(['/register-completed'], {
                    queryParams: { userId: user.uid }
                  });
                  return;
                }else if (userData.role === 'Parent') {
                  this.router.navigate(['/register-parent'], {
                    queryParams: { userId: user.uid }
                  });
                  return;
                }

              } else if (userData.frozen === true) {
                this.router.navigate(['/pending-approval'], {
                  queryParams: { userId: user.uid }
                });
              } else {
                 if (userData.role === 'Parent') {
                  this.router.navigate(['/parent-dashboard'], {
                    queryParams: { userId: user.uid }
                  });
                } else if (userData.role === 'Teacher') {
                  this.router.navigate(['/dashboard'], {
                    queryParams: { userId: user.uid }
                  });
                }
                else if (userData.role === 'Principal') {
                  this.router.navigate(['/Principal-dashboard'], {
                    queryParams: { userId: user.uid }
                  });
                }}
            },
            error: (error) => {
              console.error('Error fetching user data:', error);
              this.errorMessage = 'Error loading user data. Please try again.';
            }
          });
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = this.getErrorMessage(error.code);
        }
      });
  }
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Invalid password.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      default:
        return 'An error occurred during login.';
    }
  }

  resetPassword() {
    const email = this.loginForm.get('email')?.value;
    if (!email) {
      this.errorMessage = 'Please enter your email to reset your password.';
      return;
    }
  
    this.auth.resetPassword(email).subscribe({
      next: () => alert('Password reset email sent. Check your inbox.'),
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }
  
}