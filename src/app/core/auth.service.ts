import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:4000/api/auth/photographer/signin';
  private auth = inject(Auth);

  readonly authState$ = authState(this.auth);
  
  constructor(private http: HttpClient, private router: Router, private secure: SecureStorageService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}`, {email, password});
  };

  signUpWithEmailAndPassword(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  loginWithEmailAndPassword(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  isLoggedIn(): boolean {
    
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.secure.removeItem('user');
    this.secure.removeItem('token');
    this.router.navigate(['/login']);
  }

}
