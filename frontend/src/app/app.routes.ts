import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Announce } from "./pages/announce/announce";


export const routes: Routes = [
  {
    path: "",
    component: Home,
  },
  {
    path: "anunciar",
    component: Announce
  },
];
