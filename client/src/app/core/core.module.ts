import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { PrivateRoute } from './private-route';
import { PrivateAdminRoute } from './private-admin-route';

import { NavbarComponent } from './navbar.component';
import { MessageHandlerComponent } from './message-handler.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MessageHandlerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    HttpService,
    AuthService,
    PrivateRoute,
    PrivateAdminRoute
  ],
  exports: [
    NavbarComponent,
    MessageHandlerComponent
  ]
})
export class CoreModule { }