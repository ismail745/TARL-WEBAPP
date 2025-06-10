import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Database, ref, set, get ,update,DatabaseReference} from '@angular/fire/database';
import { sendPasswordResetEmail } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@angular/fire/auth';





@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private db = inject(Database); 
  private registrationEmail: string | null = null;

  register(email: string, password: string, userProfile: any): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential => {
        const uid = userCredential.user?.uid;
        const user = userCredential.user;
        if (!uid) throw new Error('UID not found');
        const userData = {
          uid,
          email,
          emailVerified: user.emailVerified,
          role: 'Pending',
          frozen: true,
          data_completed: false,
          ...userProfile
        };
        const userRef = ref(this.db, `users/${uid}`);
        return from(set(userRef, userData)).pipe(map(() => user));
      })
    );
  }
  updateUserProfile(userId: string, newData: any): Observable<void> {
    const userRef = ref(this.db, `users/${userId}`);
  
    return from(get(userRef)).pipe(
      map(snapshot => snapshot.exists() ? snapshot.val() : {}),
      map(oldData => ({ ...oldData, ...newData })),
      switchMap(mergedData => from(update(userRef, mergedData)))
    );
  }


  
  

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  getCurrentUserWithRole(): Observable<any> {
    return new Observable(observer => {
      this.auth.onAuthStateChanged(user => {
        if (!user || !user.emailVerified) {
          observer.next(null);
          observer.complete();
        } else {
          const userRef = ref(this.db, `users/${user.uid}`);
          from(get(userRef)).subscribe({
            next: snapshot => {
              observer.next(snapshot.val());
              observer.complete();
            },
            error: err => {
              observer.error(err);
            }
          });          
        }
      });
    });
  }
  getUserData(uid: string): Observable<any> {
    const userRef: DatabaseReference = ref(this.db, `users/${uid}`);
    return from(get(userRef)).pipe(
      map((snapshot) => snapshot.exists() ? snapshot.val() : null),
      catchError((error: unknown) => {
        console.error('Error fetching user data:', error);
        return of(null);
      })
    );
  }

  logout(): Promise<void> {
    return signOut(this.auth).then(() => {});
  }
    getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  resetPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  setRegistrationEmail(email: string): void {
    this.registrationEmail = email;
  }

  getRegistrationEmail(): string | null {
    return this.registrationEmail;
  }

  async verifyOtp(otp: string): Promise<void> {
    try {

      if (!this.registrationEmail) {
        throw new Error('No email found for verification');
      }
      
      const response = await fetch('your-api-endpoint/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.registrationEmail,
          otp: otp
        })
      });

      if (!response.ok) {
        throw new Error('Invalid verification code');
      }
    } catch (error) {
      throw error;
    }
  }

  async resendOtp(): Promise<void> {
    try {
      if (!this.registrationEmail) {
        throw new Error('No email found for verification');
      }

      const response = await fetch('your-api-endpoint/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.registrationEmail
        })
      });

      if (!response.ok) {
        throw new Error('Failed to resend verification code');
      }
    } catch (error) {
      throw error;
    }
  }

}
