/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { PrincipalService } from './principal.service';

@Injectable()
export class SecurityGuardService implements CanActivate {

  constructor(private router: Router, private principal: PrincipalService) { }

  public canActivate() {
    if (!this.principal.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
