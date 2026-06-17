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
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
  ]
}
