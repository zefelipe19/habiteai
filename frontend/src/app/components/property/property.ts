import { Component, input } from '@angular/core';
import { propertyBase } from '../../models/propertyModel';

@Component({
  selector: 'app-property',
  imports: [],
  templateUrl: './property.html',
  styleUrl: './property.css',
})
export class Property {
  area = input<number | null>(0);
  restrooms = input<number | null>(0);
  bathrooms = input<number | null>(0);
  parkingSpace = input<number | null>(0);
  price = input<number | null>(0);
  type = input<string | null>('');
}
