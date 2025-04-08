import { Component, inject } from '@angular/core';
import { Auth, browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { SecureStorageService } from '../../core/secure-storage.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private auth = inject(Auth);
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private secureStorage: SecureStorageService
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signUpWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password).subscribe({
        next: (res) => {
          console.log(res);
          this.secureStorage.setItem('user', res.user);
          this.secureStorage.setItem('token', res.token);
          localStorage.setItem('token', res.token)
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log('Error during signup');
          alert(err.message);
        }
      });
    } else {
      alert('Llene todos los campos primero.');
    }
  }

  signUpWithGoogle(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider(), browserPopupRedirectResolver).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      this.secureStorage.setItem('user', user);
      this.secureStorage.setItem('token', token);
      localStorage.setItem('token', token ?? '');
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.error('Error during Google signup:', error);
      alert('Google signup failed: ' + error.message);
    });
  }
}
