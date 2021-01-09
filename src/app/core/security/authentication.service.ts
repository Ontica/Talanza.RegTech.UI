/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion } from '../general/assertion';
import { SessionService } from '../general/session.service';

import { SecurityDataService } from './security-data.service';
import { Principal } from './principal';


@Injectable()
export class AuthenticationService {

  constructor(private session: SessionService,
              private securityService: SecurityDataService) { }


  login(userID: string, userPassword: string): Promise<void> {
    Assertion.assertValue(userID, 'userID');
    Assertion.assertValue(userPassword, 'userPassword');

    const sessionToken = this.securityService.createSession(userID, userPassword);
    const identity = this.securityService.getPrincipalIdentity();
    const claimsList = this.securityService.getPrincipalClaimsList();

    return Promise.all([sessionToken, identity, claimsList])
                  .then(([a, b, c]) => {
                    const principal = new Principal(a, b, c);
                    this.session.setPrincipal(principal);
                    })
                  .catch((e) => this.handleAuthenticationError(e));
  }


  logout(): Promise<boolean> {
    const principal = this.session.getPrincipal();

    if (!principal.isAuthenticated) {
      return Promise.resolve(false);
    }

    return this.securityService.closeSession()
               .then(() => Promise.resolve(true));
  }


  // private methods


  private handleAuthenticationError(error): Promise<never> {
    if (error.status === 401) {
      return Promise.reject(new Error('El nombre de usuario o contraseña no coinciden con los registrados. ' +
                                      'Favor de intentar nuevamente.'));
    } else {
      return Promise.reject(new Error(`Tuve un problema al intentar acceder al sistema: ` +
                                      `${error.status} ${error.statusText} ${error.message}`));
    }
  }

}
