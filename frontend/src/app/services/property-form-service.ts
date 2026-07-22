import { inject, Service, signal, effect } from '@angular/core';
import { AuthService } from './auth-service';
import { propertyBase, propertyAnnouncement } from '../models/propertyModel';

@Service()
export class PropertyFormService {
  formData = signal<propertyAnnouncement | null>(null);
  authService = inject(AuthService);

  constructor () {
    effect(() => {
      if (this.authService.isLoggedIn()) {
        this.saveDataFromStorage()
      }
    });
  }

  saveData(data: propertyAnnouncement) {
    this.formData.set(data);
    console.log('dados salvos temporariamente');
    if (this.authService.isLoggedIn()) {
      this.savePermantentData();
    } else {
      localStorage.setItem('propertyFormData', JSON.stringify(data))
    }
  }

  saveDataFromStorage() {
    const data = localStorage.getItem('propertyFormData');
    if (data) {
      this.savePermantentData();
      localStorage.removeItem('propertyFormData')
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
