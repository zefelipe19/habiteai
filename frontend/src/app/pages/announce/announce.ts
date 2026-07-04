import { Component } from '@angular/core';
import { LoginRegister } from '../../components/login-register/login-register';

@Component({
  selector: 'app-announce',
  imports: [LoginRegister],
  templateUrl: './announce.html',
  styleUrl: './announce.css',
})
export class Announce {}
