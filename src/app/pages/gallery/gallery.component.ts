import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, DatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  loading: boolean = true;
  searchTerm: string = '';
  clients: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Simulamos carga de datos
    setTimeout(() => {
      this.loadMockData();
      this.loading = false;
    }, 1000);
  }

  sortBy(criteria: string): void {
    // Implementación de ordenamiento
    switch(criteria) {
      case 'name':
        this.clients.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        this.clients.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
        break;
      case 'count':
        this.clients.sort((a, b) => b.galleryCount - a.galleryCount);
        break;
    }
  }

  loadMockData(): void {
    // Datos de ejemplo para mostrar en la interfaz
    this.clients = [
      {
        name: 'María Rodríguez',
        galleryCount: 3,
        lastUpdate: '2025-02-15',
        galleries: [
          {
            name: 'Boda',
            date: '2025-01-20',
            photoCount: 120,
            photos: this.generateMockPhotos(8, 'Boda')
          },
          {
            name: 'Pre-boda',
            date: '2024-12-10',
            photoCount: 45,
            photos: this.generateMockPhotos(8, 'Pre-boda')
          },
          {
            name: 'Fiesta',
            date: '2025-01-25',
            photoCount: 78,
            photos: this.generateMockPhotos(8, 'Fiesta')
          }
        ]
      },
      {
        name: 'Carlos Gutiérrez',
        galleryCount: 2,
        lastUpdate: '2025-02-20',
        galleries: [
          {
            name: 'Sesión Familiar',
            date: '2025-02-18',
            photoCount: 60,
            photos: this.generateMockPhotos(8, 'Familiar')
          },
          {
            name: 'Cumpleaños',
            date: '2025-01-30',
            photoCount: 85,
            photos: this.generateMockPhotos(8, 'Cumpleaños')
          }
        ]
      },
      {
        name: 'Empresa TechSol',
        galleryCount: 1,
        lastUpdate: '2025-03-01',
        galleries: [
          {
            name: 'Evento Corporativo',
            date: '2025-02-25',
            photoCount: 95,
            photos: this.generateMockPhotos(8, 'Corporativo')
          }
        ]
      }
    ];
  }

  generateMockPhotos(count: number, category: string): any[] {
    const photos = [];
    for (let i = 1; i <= count; i++) {
      photos.push({
        id: `photo-${category}-${i}`,
        title: `Foto ${i} de ${category}`,
        url: `https://picsum.photos/seed/${category}${i}/300/200`,
        date: new Date()
      });
    }
    return photos;
  }

}
