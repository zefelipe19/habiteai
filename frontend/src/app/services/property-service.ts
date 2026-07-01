import { Service } from '@angular/core';
import { propertyBase } from '../models/propertyModel'

@Service()
export class PropertyService {
  properties: Array<propertyBase> = [];

  getPropertiesData() {
    return this.properties.push({
        id: 1,
        area: 18,
        restrooms: 3,
        bathrooms: 1,
        parkingSpace: 1,
      },
      {
        id: 2,
        area: 28,
        restrooms: 4,
        bathrooms: 2,
        parkingSpace: 2,
      },
      {
        id: 3,
        area: 18,
        restrooms: 1,
        bathrooms: 1,
        parkingSpace: 1,
      },)
  }

  getProperties(){
    this.getPropertiesData();
    return this.properties;
  }
}
