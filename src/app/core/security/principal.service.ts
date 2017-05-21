/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { Assertion } from 'empiria';

import { SecurityDataService } from './security-data.service';
import { Session, Identity, ClaimsList } from './security-types';

@Injectable()
export class PrincipalService {

  private session: Session;
  private identity: Identity;
  private claims: ClaimsList;

  constructor(private dataService: SecurityDataService) { }

  public get isAuthenticated() {
    return (true && this.session && this.identity && this.claims);
  }

  public async authenticate(userID: string, userPassword: string): Promise<void> {
    Assertion.assertValue(userID, 'userID');
    Assertion.assertValue(userPassword, 'userPassword');

    this.session = await this.dataService.createSession(userID, userPassword)
                                         .catch(this.handleAuthenticationError);

    this.identity = await this.dataService.getPrincipalIdentity()
                                          .catch(this.handleAuthenticationError);

    this.claims = await this.dataService.getPrincipalClaimsList()
                                        .catch(this.handleAuthenticationError);
  }

  public async close() {
    await this.dataService.closeSession();
  }

  private handleAuthenticationError(error): Promise<never> {
    if (error.status === 401) {
      return Promise.reject(new Error('No reconozco las credenciales proporcionadas. ' +
                                      `${error.status} ${error.statusText}`));
    } else {
      return Promise.reject(new Error('Tuve un problema al intentar leer información del servidor.' +
                                      `${error.status} ${error.statusText}`));
    }
  }
}
