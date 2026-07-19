import { Component, output, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PropertyFormService } from '../../services/property-form-service';
import {
  propertyBase,
  propertyAnnouncement,
  propertyAnnouncementForm,
  announcementType,
} from '../../models/propertyModel';

@Component({
  selector: 'app-create-property',
  imports: [ReactiveFormsModule],
  templateUrl: './create-property.html',
  styleUrl: './create-property.css',
})
export class CreateProperty implements OnInit {
  propertyAnnouncementForm = new FormGroup({
    propertyForm: new FormGroup({
      area: new FormControl<number | null>(null),
      restrooms: new FormControl<number | null>(null),
      bathrooms: new FormControl<number | null>(null),
      parkingSpace: new FormControl<number | null>(null),
    }),
    announcementForm: new FormGroup({
      price: new FormControl<number | null>(null),
      type: new FormControl<announcementType | null>('rent'),
    }),
  });

  ngOnInit(): void {
    // const savedData = this.propertyFormService.formData();
    // if (savedData) {
    //   this.propertyAnnouncementForm.patchValue(savedData);
    // }
  }

  propertyFormService = inject(PropertyFormService);
  propertyCreatedSuccessfully = output<void>();

  createModel(): propertyAnnouncement {
    const propertyAnnouncementData = this.propertyAnnouncementForm.getRawValue();
    const propertyAnnouncementModel: propertyAnnouncement = {
      id: 15,
      area: propertyAnnouncementData.propertyForm.area,
      restrooms: propertyAnnouncementData.propertyForm.restrooms,
      bathrooms: propertyAnnouncementData.propertyForm.bathrooms,
      parkingSpace: propertyAnnouncementData.propertyForm.parkingSpace,
      price: propertyAnnouncementData.announcementForm.price,
      type: propertyAnnouncementData.announcementForm.type,
      announcementId: null,
      advertiserId: null,
    };
    return propertyAnnouncementModel;
  }

  nextStep() {
    this.propertyCreatedSuccessfully.emit();
    console.log(this.createModel());
    this.propertyFormService.saveData(this.createModel());
  }
}
