import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  saveUser (user) {
    window.localStorage.setItem('user', user);
  }

  getUser () {
    return window.localStorage.getItem('user');
  }

  removeUser () {
    window.localStorage.removeItem('user');
  }

  authenticateUser (token, isAdmin = false) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('isAdmin', isAdmin ? 'yes' : null);
  }

  isAdmin () {
    return window.localStorage.getItem('isAdmin') !== null;
  }

  isUserAuthenticated () {
    return window.localStorage.getItem('token') !== null;
  }

  deauthenticateUser () {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('isAdmin');
  }

  getToken () {
    return window.localStorage.getItem('token');
  }
}