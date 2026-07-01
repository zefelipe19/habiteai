import { Component, inject, OnInit } from "@angular/core";
import { Property } from "../../components/property/property";
import { SearchBox } from "../../components/searchbox/searchbox";
import { PropertyService } from "../../services/property-service";
import { propertyBase } from "../../models/propertyModel"

@Component({
  selector: "app-home",
  imports: [Property, SearchBox],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home implements OnInit {
  private propertyService = inject(PropertyService);
  properties:Array<propertyBase> = [];
  ngOnInit() {
    this.properties = this.propertyService.getProperties();
  }
}
