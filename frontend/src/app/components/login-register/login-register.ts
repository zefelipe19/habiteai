import { Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-register',
  imports: [ReactiveFormsModule],
  templateUrl: './login-register.html',
})
export class LoginRegister {
  constructor(protected authService: AuthService) {}

  // Cria o emissor de evento
  onAuthSuccess = output<void>();

  isAuthenticated = false;
  willRegister = false;
  showPassword = false;

  loginForm = new FormGroup({
    loginEmail: new FormControl(''),
    loginPassword: new FormControl(''),
  });

  registerForm = new FormGroup({
    registerEmail: new FormControl(''),
    registerPassword: new FormControl(''),
    registerPassword2: new FormControl(''),
  });

  toggleLoginRegisterSession() {
    this.willRegister = !this.willRegister;
    this.loginForm.reset();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  makeLogin() {
    this.authService.login();
    this.onAuthSuccess.emit(); // Dispara o evento de sucesso
  }

  makeRegistration() {
    const registerForm = this.registerForm.value;
    if (registerForm.registerPassword != registerForm.registerPassword2) {
      window.alert('Os dois campos de senha precisam ser iguais');
      return;
    }

    // Se o registro também fizer login automático, descomente a linha abaixo:
    // this.onAuthSuccess.emit();
  }
}
