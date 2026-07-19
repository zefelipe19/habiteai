import { Service } from '@angular/core';
import { propertyBase, propertyAnnouncement } from '../models/propertyModel';

@Service()
export class PropertyService {
  properties: Array<propertyAnnouncement> = [];

  getPropertiesData() {
    const properties = [
      {
        id: 1,
        area: 18,
        restrooms: 3,
        bathrooms: 1,
        parkingSpace: 1,
        price: 120,
        type: 'rent',
        announcementId: null,
        advertiserId: null,
      },
      {
        id: 2,
        area: 28,
        restrooms: 4,
        bathrooms: 2,
        parkingSpace: 2,
        price: 550,
        type: 'season',
        announcementId: null,
        advertiserId: null,
      },
      {
        id: 3,
        area: 18,
        restrooms: 1,
        bathrooms: 1,
        parkingSpace: 1,
        price: 800,
        type: 'rent',
        announcementId: null,
        advertiserId: null,
      },
      {
        id: 4,
        area: 20,
        restrooms: 3,
        bathrooms: 2,
        parkingSpace: 1,
        price: 1200,
        type: 'sell',
        announcementId: null,
        advertiserId: null,
      },
    ];
    const propertiesSimple = JSON.stringify(properties);
    const propertiesOnMemory = localStorage.getItem('properties');

    if (propertiesOnMemory) {
      return (this.properties = JSON.parse(propertiesOnMemory));
    } else {
      localStorage.setItem('properties', propertiesSimple);
    }
  }

  resetLocal() {
    localStorage.setItem('properties', JSON.stringify(this.getPropertiesData()));
  }

  getProperties() {
    this.getPropertiesData();
    this.resetLocal();
    return this.properties;
  }
}
