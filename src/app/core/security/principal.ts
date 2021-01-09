/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { SessionToken, Identity, ClaimsList } from './security-types';


export class Principal {

  constructor(public readonly sessionToken: SessionToken,
              public readonly identity: Identity,
              public readonly claims: ClaimsList) { }


  static get empty(): Principal {
    return new Principal(undefined, undefined, undefined);
  }


  get isAuthenticated(): boolean {
    return (this.sessionToken && this.identity && this.claims && true);
  }

}
