export interface propertyBase {
    id: number;
    area: number;
    restrooms: number;
    bathrooms: number;
    parkingSpace: number;
}

type announcementType = "rent" | "sell" | "season"

export interface propertyAnnouncement extends propertyBase {
    price: number;
    type: announcementType;
    announcementId: number;
    advertiserId: number;
}