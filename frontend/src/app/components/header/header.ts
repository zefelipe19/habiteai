import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { LoginRegister } from '../../components/login-register/login-register';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LoginRegister],
  templateUrl: './header.html',
})
export class Header {
  constructor(protected authService: AuthService) {}

  loginPopUp = false;
  mobileMenuOpen = false;

  showLoginPopUp() {
    this.loginPopUp = !this.loginPopUp;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
