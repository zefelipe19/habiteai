import { Component, inject, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from "../../services/auth-service";

@Component({
  selector: 'app-login-register',
  imports: [ReactiveFormsModule],
  templateUrl: './login-register.html',
  styleUrl: './login-register.css',
})
export class LoginRegister {
  constructor() {}
  
  protected authService = inject(AuthService);
  
  isAuthenticated = false;
  willRegister = false;
  showPassword = false;

  loginForm = new FormGroup({
    loginEmail: new FormControl(''),
    loginPassword: new FormControl(''),
  });

  registerForm = new FormGroup({
    registerEmail: new FormControl<string | null>(''),
    registerPassword: new FormControl<string |null>(''),
    registerPassword2: new FormControl<string | null>(''),
  });


  toggleLoginRegisterSession() {
    return ((this.willRegister = !this.willRegister), this.loginForm.reset());
  }

  toggleShowPassword() {
    return (this.showPassword = !this.showPassword);
  }

  makeLogin() {
    const data = this.loginForm.getRawValue();
    this.authService.login({email: data.loginEmail, password: data.loginPassword}); 
  }

  makeRegistration() {
    const registerForm = this.registerForm.getRawValue();
    if (registerForm.registerPassword != registerForm.registerPassword2) {
      window.alert('Os dois campos de senha precisam ser iguais');
    }
    
    const newUser = {email: registerForm.registerEmail, password: registerForm.registerPassword }
    this.authService.registerUser(newUser);
    
  }
}
