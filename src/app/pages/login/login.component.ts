import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Auth } from '@angular/fire/auth';
import { browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { SecureStorageService } from '../../core/secure-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private auth = inject(Auth);
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private secureStorage: SecureStorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token)
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log('Inicio de sesion fallido');
          alert('Acceso invalido: ' + err.error.msg);
        }
      })
    } else {
      alert('Formulario invalido. Llena todos los datos requeridos')
    }
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider, browserPopupRedirectResolver)
      .then((result) => {
        const user = result.user;
        this.secureStorage.setItem('user', user);
        console.log('Usuario logueado con Google:', user);
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.error('Error al iniciar sesión con Google:', error);
        if( error.code === 'auth/popup-closed-by-user') {
          alert('El popup fue cerrado antes de completar el inicio de sesión. Intenta nuevamente.');
        }
        else if (error.code === 'auth/popup-blocked') {
          alert('El popup fue bloqueado. Por favor, permite los popups para este sitio.');
        }
        else {
          alert('Error desconocido: ' + error.message);
        }
      });
  }
}
