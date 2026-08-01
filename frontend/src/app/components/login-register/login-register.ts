import { Component, inject, effect, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-register',
  imports: [ReactiveFormsModule],
  templateUrl: './login-register.html',
})
export class LoginRegister {
  constructor() {}

  protected authService = inject(AuthService);
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
    registerEmail: new FormControl<string | null>(''),
    registerPassword: new FormControl<string | null>(''),
    registerPassword2: new FormControl<string | null>(''),
  });

  toggleLoginRegisterSession() {
    this.willRegister = !this.willRegister;
    this.loginForm.reset();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  makeLogin() {
    const data = this.loginForm.getRawValue();
    this.authService.login({ email: data.loginEmail, password: data.loginPassword });
    this.onAuthSuccess.emit(); // Dispara o evento de sucesso
  }

  makeRegistration() {
    const registerForm = this.registerForm.getRawValue();
    if (registerForm.registerPassword != registerForm.registerPassword2) {
      window.alert('Os dois campos de senha precisam ser iguais');
      return;
    }

    const newUser = { email: registerForm.registerEmail, password: registerForm.registerPassword };
    this.authService.registerUser(newUser);

    // Se o registro também fizer login automático, descomente a linha abaixo:
    // this.onAuthSuccess.emit();
  }
}
