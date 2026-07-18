import { Component, EventEmitter, output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PropertyFormService } from "../../services/property-form-service";

@Component({
  selector: 'app-create-property',
  imports: [ReactiveFormsModule],
  templateUrl: './create-property.html',
  styleUrl: './create-property.css',
})
export class CreateProperty {
  private propertyFormService = inject(PropertyFormService)

  propertyAnnouncementForm = this.propertyFormService.propertyAnnouncementForm.controls.propertyForm;
  propertyCreatedSuccessfully = output<void>();
  
  nextStep() {
    this.propertyCreatedSuccessfully.emit();
  }
}
