import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../app.state';
import { UsersService } from '../../users/users.service';

export const USER_REGISTERED = 'user/REGISTER';
export const USER_LOGGED_IN = 'user/LOGIN';
export const USER_LOGOUT = 'user/LOGOUT';

@Injectable()
export class UsersActions {
  constructor (
    private userService: UsersService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  register (user) {
    this.userService
      .register(user)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: USER_REGISTERED,
          result
        });
      });
  }

  login (user) {
    this.userService
      .login(user)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: USER_LOGGED_IN,
          result
        });
      });
  }

  logout () {
    this.ngRedux.dispatch({
      type: USER_LOGOUT
    });
  }
}
