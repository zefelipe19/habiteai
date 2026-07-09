import { Service, signal } from '@angular/core';

@Service()
export class AuthService {
    private isLoggedInSignal = signal<boolean>(this.checkLoginStatus());
    public isLoggedIn = this.isLoggedInSignal.asReadonly();

    checkLoginStatus() {
        return localStorage.getItem('user_logged') === 'true';
    }

    login() {
        localStorage.setItem('user_logged', 'true');
        this.isLoggedInSignal.set(true);
    }

    logout() {
        localStorage.removeItem('user_logged');
        this.isLoggedInSignal.set(false);
    }
}
