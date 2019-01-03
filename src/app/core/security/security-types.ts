/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export interface SessionToken {

  readonly access_token: string;

  readonly expires_in: number;

  readonly refresh_token: string;

  readonly token_type: string;

}

export interface Identity {

  readonly username: string;

  readonly email: string;

  readonly fullname: string;

}

export interface Claim {

  readonly type: string;

  readonly value: any;

}

export class ClaimsList {

  constructor(public claims: Claim[]) { }

}
