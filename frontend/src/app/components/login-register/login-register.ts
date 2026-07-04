import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  imports: [ReactiveFormsModule],
  templateUrl: './login-register.html',
  styleUrl: './login-register.css',
})
export class LoginRegister {
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

  LoginResgister() {
    if (!this.isAuthenticated) {
      console.log('Aqui');
    }
  }

  toggleLoginRegisterSession() {
    console.log(
      `valor de willRegister ${this.willRegister}; valor de isAuthenticated ${this.isAuthenticated}`,
    );
    return ((this.willRegister = !this.willRegister), this.loginForm.reset());
  }

  toggleShowPassword() {
    return (this.showPassword = !this.showPassword);
  }

  makeLogin() {
    console.log(this.loginForm.value);
  }

  makeRegistration() {
    const registerForm = this.registerForm.value;
    if (registerForm.registerPassword != registerForm.registerPassword2) {
      window.alert('Os dois campos de senha precisam ser iguais');
    }
  }
}
