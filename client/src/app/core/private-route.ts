import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class PrivateRoute implements CanActivate {
  constructor (
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate (): boolean {
    const canActivate = this.authService.isUserAuthenticated();

    if (!canActivate) {
      this.router.navigateByUrl('users/login');
    }
    
    return canActivate;
  }
}