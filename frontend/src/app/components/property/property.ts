import { Component, input } from '@angular/core';
import { propertyBase } from '../../models/propertyModel';

@Component({
  selector: 'app-property',
  imports: [],
  templateUrl: './property.html',
  styleUrl: './property.css',
})
export class Property {
  area = input<number>(0);
  restrooms = input<number>(0);
  bathrooms = input<number>(0);
  parkingSpace = input<number>(0);
}
