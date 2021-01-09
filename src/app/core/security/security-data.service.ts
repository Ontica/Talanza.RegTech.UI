/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Cryptography } from './cryptography';

import { EventInfo } from '../data-types/command';

import { Assertion } from '../general/assertion';

import { HttpHandler } from '../http/http-handler';


import { SessionToken, Identity, ClaimsList } from './security-types';


interface ExternalSessionToken {
  readonly access_token: string;
  readonly expires_in: number;
  readonly refresh_token: string;
  readonly token_type: string;
}


@Injectable()
export class SecurityDataService {

  constructor(private httpHandler: HttpHandler) { }

  changePassword(event: EventInfo): Promise<boolean> {
    Assertion.assertValue(event, 'event');

    return this.httpHandler.post<boolean>('v2/security/change-password', event)
                           .toPromise();
  }

  closeSession(): Promise<void> {
    return this.httpHandler.post<void>('v1/security/logout')
               .toPromise();
  }

  createSession(userID: string, userPassword: string): Promise<SessionToken> {
    const body = {
      user_name: userID,
      password: Cryptography.convertToMd5(userPassword)
    };

    return this.httpHandler.post<ExternalSessionToken>('v2/security/login', body)
               .toPromise()
               .then(x => this.mapToSessionToken(x));
  }

  getPrincipalIdentity(): Promise<Identity> {
    const fakeIdentity = {
      username: 'jrulfo',
      email: 'jrulfo@escritores.com',
      fullname: '{Nombre del usuario} || settings'
    };

    return Promise.resolve(fakeIdentity);
  }

  getPrincipalClaimsList(): Promise<ClaimsList> {
    const list = [
      { type: 'token', value: 'abc' },
      { type: 'phone', value: '567-890-1234' }
    ];

    const claims = new ClaimsList(list);

    return Promise.resolve(claims);
  }

  private mapToSessionToken(source: ExternalSessionToken): SessionToken {
    return {
      accessToken: source.access_token,
      expiresIn: source.expires_in,
      refreshToken: source.refresh_token,
      tokenType: source.token_type
    };
  }

}
