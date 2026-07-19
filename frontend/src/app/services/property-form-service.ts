import { inject, Service, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { propertyBase, propertyAnnouncement } from '../models/propertyModel';

@Service()
export class PropertyFormService {
  formData = signal<propertyAnnouncement | null>(null);
  authService = inject(AuthService);

  saveData(data: propertyAnnouncement) {
    this.formData.set(data);
    console.log('dados salvos temporariamente');
    if (this.authService.isLoggedIn()) {
      console.log('ta logado');
      this.savePermantentData();
    } else {
      console.log('não ta logado');
    }
  }

  savePermantentData() {
    const propertiesOnMemoryString = localStorage.getItem('properties');
    const propertyModel = this.formData();

    if (propertiesOnMemoryString) {
      const propertiesList: Array<propertyBase> = JSON.parse(propertiesOnMemoryString);
      propertiesList.push(propertyModel!);
      localStorage.setItem('properties', JSON.stringify(propertiesList));
    }
  }

  resetData() {
    this.formData.set(null);
  }
}
