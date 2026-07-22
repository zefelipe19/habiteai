import { Service, signal, inject } from '@angular/core';
import { userForm } from '../models/user';

@Service()
export class AuthService {
    private isLoggedInSignal = signal<boolean>(this.checkLoginStatus());
    public isLoggedIn = this.isLoggedInSignal.asReadonly();
    private userCreatedSignal = signal<boolean>(false)
    public userCreated = this.userCreatedSignal.asReadonly();

    checkLoginStatus() {
        return localStorage.getItem('user_logged') === 'true';
    }

    login(user: userForm) {
        const users = localStorage.getItem('userList');
        if (users) {
            const userList = JSON.parse(users);
            let userListIndex = userList.findIndex((user: userForm) => user.email == user.email);
            let userInList = userList[userListIndex];
            
            if (userInList.password === user.password) {
                localStorage.setItem('user_logged', 'true');
                this.isLoggedInSignal.set(true);
                console.log('aqui é ok')
            }
        } else {
            window.alert("Usuário ou senha incorretos!")
        }

    }

    logout() {
        localStorage.removeItem('user_logged');
        this.isLoggedInSignal.set(false);
    }

    registerUser(user: userForm) {
        const newUser = user;
        const storageList = localStorage.getItem('userList');
        if (storageList) {
            const userList = JSON.parse(storageList);
            userList.push(newUser);
            localStorage.setItem('userList', JSON.stringify(userList))
            this.userCreatedSignal.set(true);
        } else {
            localStorage.setItem('userList', JSON.stringify([newUser],))
        }
        this.login(user);
    }
}
