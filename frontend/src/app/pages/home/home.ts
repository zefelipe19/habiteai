import { Component } from "@angular/core";
import { Property } from "../../components/property/property"
import { SearchBox } from "../../components/searchbox/searchbox"

@Component({
  selector: "app-home",
  imports: [Property, SearchBox],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  properties = [
    {
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
    },
  ]
}
