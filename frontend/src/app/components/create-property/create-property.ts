import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-property',
  imports: [],
  templateUrl: './create-property.html',
  styleUrl: './create-property.css',
})
export class CreateProperty {
  @Output() propertyCreatedSuccessfully = new EventEmitter<void>()

  propertyForm = new FormGroup({
    propertyArea: new FormControl<Number>(0),
    propertyRestrooms: new FormControl<Number>(0),
    propertyBathrooms: new FormControl<Number>(0),
    propertyParkingSpace: new FormControl<Number>(0),
  })

  propertyAnnouncement = new FormGroup({
    price: new FormControl<Number>(0),
    type: new FormControl<String>(''),
    announcementId: new FormControl<Number>(0),
    advertiserId: new FormControl<Number>(0),
  })
}
