import { Component, signal } from '@angular/core';
import { LoginRegister } from '../../components/login-register/login-register';
import { CreateProperty } from '../../components/create-property/create-property';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-announce',
  imports: [LoginRegister, CreateProperty],
  templateUrl: './announce.html',
  styleUrl: './announce.css',
})
export class Announce {
  constructor(protected authService: AuthService) {}
  showPropertyOrLoginForm = signal(true);

  toggleShowPropertyOrLoginForm() {
    this.showPropertyOrLoginForm.set(!this.showPropertyOrLoginForm());
  }
}
