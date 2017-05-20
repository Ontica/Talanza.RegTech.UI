/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserLoginService } from './user-login.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [UserLoginService]
})

export class UserLoginComponent {

  public userID = '';
  public password = '';

  constructor(private router: Router, private loginService: UserLoginService) {

  }

  // region Public methods

  public async authenticate() {
    if (!this.validateForm()) {
      return;
    }

    try {
      await this.loginService.authenticate(this.userID, this.password);
      this.router.navigate(['default']);

    } catch (exception) {
      alert(exception);
    }
  }

  // endregion Public methods

  // region Private methods

  private validateForm(): boolean {
    if (this.userID.length === 0) {
      alert('Requiero el nombre del usuario.');
      return false;
    }
    if (this.password.length === 0) {
      alert('Para ingresar al sistema requiero la contraseña.');
      return false;
    }
    return true;
  }

}
