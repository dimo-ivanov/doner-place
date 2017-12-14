import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserModel } from './register-user.model';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';

import { UsersActions } from '../store/users/users.actions';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user: RegisterUserModel = new RegisterUserModel();
  error: string = null;

  constructor (
    private usersActions: UsersActions,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) { }

  register () {
    this.usersActions.register(this.user);
    this.ngRedux
      .select(state => state.users)
      .subscribe(users => {
        if (users.userRegistered) {
          this.router.navigateByUrl('users/login');
          return;
        }

        if (users.error) {
          this.error = users.error;
        }
      });
  }
}