/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of'

import { Cryptography } from 'empiria';

import { HttpHandler } from '../http/http-handler';

import { SessionToken, Identity, ClaimsList } from './security-types';

@Injectable()
export class SecurityDataService {

  constructor(private httpHandler: HttpHandler) { }

  public createSession(userID: string, userPassword: string): Observable<SessionToken> {

    const body = {
      user_name: userID,
      password: Cryptography.convertToMd5(userPassword)
    };

    return this.httpHandler.post<SessionToken>('v2/security/login', body);
  }

  public async closeSession(): Promise<void> {
    return this.httpHandler.post<void>('v1/security/logout', undefined)
                           .toPromise();
  }

  public getPrincipalIdentity(): Observable<Identity> {
    const fakeIdentity = { username: 'jrulfo',
                           email: 'jrulfo@escritores.com',
                           fullname: '{Nombre del usuario} || settings' };

    return Observable.of<Identity>(fakeIdentity);
  }

  public getPrincipalClaimsList(): Observable<ClaimsList> {
    const list = [
                  { type: 'token', value: 'abc' },
                  { type: 'phone', value: '567-890-1234' }
                 ];

    const claims = new ClaimsList(list);

    return Observable.of<ClaimsList>(claims);
  }

}
