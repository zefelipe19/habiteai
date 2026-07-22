import { Component, inject, effect } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth-service";
import { LoginRegister } from '../../components/login-register/login-register';

@Component({
  selector: "app-header",
  imports: [RouterLink, LoginRegister],
  templateUrl: "./header.html",
  styleUrl: "./header.css",
})
export class Header {
  constructor () {
    effect(() => {
      if(this.authService.userCreated()) {
        this.showLoginPopUp();
      }
    })
  }
  protected authService = inject(AuthService)
  
  loginPopUp = false;
  showLoginPopUp() {
    return this.loginPopUp = !this.loginPopUp;
  }
}
