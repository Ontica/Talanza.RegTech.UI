/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { Assertion } from 'empiria';

import { LoggerService } from '../general/logger.service';
import { SecurityDataService } from './security-data.service';
import { Session, Identity, ClaimsList } from './security-types';

@Injectable()
export class PrincipalService {

  private _session: Session;
  private _identity: Identity;
  private _claims: ClaimsList;

  constructor(private dataService: SecurityDataService, private logger: LoggerService) { }

  public get isAuthenticated(): boolean {
    return (this._session && this._identity && this._claims && true);
  }

  public get session(): Session {
    return this._session;
  }

  public get identity(): Identity {
    return this._identity;
  }

  public async login(userID: string, userPassword: string): Promise<void> {
    Assertion.assertValue(userID, 'userID');
    Assertion.assertValue(userPassword, 'userPassword');

    this._session = await this.dataService.createSession(userID, userPassword)
                                         .catch((e) => this.handleAuthenticationError(e));

    this._identity = await this.dataService.getPrincipalIdentity()
                                          .catch((e) => this.handleAuthenticationError(e));

    this._claims = await this.dataService.getPrincipalClaimsList()
                                        .catch((e) => this.handleAuthenticationError(e));
  }

  public async logout(): Promise<void> {
    if (!this.isAuthenticated) {
      return;
    }

    try {
      await this.dataService.closeSession();
    } catch (e) {
      this.logger.error(e);
    }

    this.cleanFields();
  }

  // Private methods

  private handleAuthenticationError(error): Promise<never> {
    this.cleanFields();
    if (error.status === 401) {
      return Promise.reject(new Error('No reconozco las credenciales proporcionadas. ' +
                                      `${error.status} ${error.statusText}`));
    } else {
      return Promise.reject(new Error('Tuve un problema al intentar leer información del servidor. ' +
                                      `${error.status} ${error.statusText} ${error.message}`));
    }
  }

  private cleanFields() {
    this._session = undefined;
    this._identity = undefined;
    this._claims = undefined;
  }

}
