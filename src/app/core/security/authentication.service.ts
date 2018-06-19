/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion } from '../general/assertion';
import { SessionService } from '../general/session.service';
import { LoggerService } from '../general/logger.service';

import { SecurityDataService } from './security-data.service';
import { Principal } from './principal';


@Injectable()
export class AuthenticationService {

  constructor(private session: SessionService,
              private securityService: SecurityDataService,
              private logger: LoggerService) {}

  public login(userID: string, userPassword: string): Promise<void> {
    Assertion.assertValue(userID, 'userID');
    Assertion.assertValue(userPassword, 'userPassword');

    const sessionToken = this.securityService.createSession(userID, userPassword)
                             .toPromise()
                             .catch((e) => this.handleAuthenticationError(e));

    const identity = this.securityService.getPrincipalIdentity()
                         .toPromise()
                         .catch((e) => this.handleAuthenticationError(e));

    const claimsList = this.securityService.getPrincipalClaimsList()
                           .toPromise()
                           .catch((e) => this.handleAuthenticationError(e));

    return Promise.all( [sessionToken, identity, claimsList])
                  .then( ([sessionToken, identity, claimsList]) => {
                    const principal = new Principal(sessionToken, identity, claimsList);

                    this.session.setPrincipal(principal);
                  });
  }


  public logout(): Promise<boolean> {
    const principal = this.session.getPrincipal();

    if (!principal.isAuthenticated) {
      return Promise.resolve(false);
    }

    return this.securityService.closeSession()
               .then( () => Promise.resolve(true) );
  }

  // private methods

  private handleAuthenticationError(error): Promise<never> {
    if (error.status === 401) {
      return Promise.reject(new Error('No reconozco las credenciales de acceso proporcionadas.'));
    } else {
      return Promise.reject(new Error('Tengo un problema para ingresar al sistema:' +
                                      `${error.status} ${error.statusText} ${error.message}`));
    }
  }

}
