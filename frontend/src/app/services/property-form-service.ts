import { Service } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Service()
export class PropertyFormService {
    propertyAnnouncementForm = new FormGroup({
        propertyForm: new FormGroup({
          propertyArea: new FormControl(0),
          propertyRestrooms: new FormControl(0),
          propertyBathrooms: new FormControl(0),
          propertyParkingSpace: new FormControl(0),
        }),
        announcementForm: new FormGroup({
          price: new FormControl(0),
          type: new FormControl(''),
          announcementId: new FormControl(0),
          advertiserId: new FormControl(0),
        })
    });

    resetForm() {
        this.propertyAnnouncementForm.reset()
    }
}
