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
import { Session } from './session';

@Injectable()
export class PrincipalService {

  constructor(private dataService: SecurityDataService) { }

  public async authenticate(userID: string, userPassword: string): Promise<void> {
    Assertion.assertValue(userID, 'userID');
    Assertion.assertValue(userPassword, 'userPassword');

    await this.dataService.createSession(userID, userPassword)
                          .catch(this.handleAuthenticationError);
  }

  public async close() {
    await this.dataService.closeSession();
  }

  private handleAuthenticationError(error): Promise<never> {
    return Promise.reject(new Error('No reconozco las credenciales proporcionadas. ' +
                                    `${error.status} ${error.statusText}`));
  }

}
