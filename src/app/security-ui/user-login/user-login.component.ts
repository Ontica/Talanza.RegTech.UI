/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PrincipalService } from '../../core';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public userID = '';
  public password = '';

  constructor(private router: Router, private principal: PrincipalService) { }

  public async authenticate() {
    if (!this.validateForm()) {
      return;
    }

    try {
      await this.principal.login(this.userID, this.password);
      this.router.navigate(['procedures/search']);

    } catch (exception) {
      alert(exception);
    }
  }

  public async ngOnInit() {
    await this.principal.logout();
  }

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
