/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { SessionToken, Identity, ClaimsList } from './security-types';

export class Principal {

  constructor(private _sessionToken: SessionToken,
              private _identity: Identity,
              private _claims: ClaimsList) { }

  public static get empty(): Principal {
    return new Principal(undefined, undefined, undefined);
  }

  public get isAuthenticated(): boolean {
    return (this._sessionToken && this._identity && this._claims && true);
  }

  public get sessionToken(): SessionToken {
    return this._sessionToken;
  }

  public get identity(): Identity {
    return this._identity;
  }

  public get claims(): ClaimsList {
    return this._claims;
  }

}
