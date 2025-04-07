import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User, signOut } from 'firebase/auth';
import { SecureStorageService } from '../../core/secure-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss'
})
export class DashboardContentComponent implements OnInit{
  
  user: User | null = null;

  constructor(
    private secureStorage: SecureStorageService,
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    this.secureStorage.getItem<any>('user').then((user) => {
      this.user = user;
    }
    ).catch((error) => {
      console.error('Error al obtener el usuario:', error);
    });
  }

  logOut(){
    signOut(this.auth).then(() => {
      console.log('Sesión cerrada');
      this.secureStorage.removeItem('user').then(() => {
        console.log('Usuario eliminado de almacenamiento seguro');
        this.router.navigate(['/login']);
      }).catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
