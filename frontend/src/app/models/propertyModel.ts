import { FormControl, FormGroup } from '@angular/forms';

export interface propertyBase {
  id: number | null;
  area: number | null;
  restrooms: number | null;
  bathrooms: number | null;
  parkingSpace: number | null;
}

export type announcementType = 'rent' | 'sell' | 'season';

// Essa classe existe, pois uma propriedade pode ter varios anuncios
export interface propertyAnnouncement extends propertyBase {
  price: number | null;
  type: announcementType | null;
  announcementId: number | null; //Id do anuncio
  advertiserId: number | null; //Id do anunciante
}

export interface propertyAnnouncementForm {
  propertyAnnouncementForm: FormGroup<{
    area: FormControl<number | null>;
    restrooms: FormControl<number | null>;
    bathrooms: FormControl<number | null>;
    parkingSpace: FormControl<number | null>;
  }>;
  announcementForm: FormGroup<{
    price: FormControl<number | null>;
    type: FormControl<announcementType | null>;
  }>;
}
