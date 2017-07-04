/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { RequestOptionsArgs } from '@angular/http';

export enum HttpMethod {
  GET = 1,
  POST = 2,
  DELETE = 4,
  PUT = 8,
  PATCH = 16,
  HEAD = 32,
  OPTIONS = 64
}

export interface HttpRequestOptions extends RequestOptionsArgs {
  payloadDataField?: string;
  serviceParams?: any[];
}

export interface Service {

  readonly uid: string;

  readonly baseAddress: string;

  readonly path: string;

  readonly parameters: string[];

  readonly method: HttpMethod;

  readonly description: string;

  readonly isProtected: boolean;

  readonly headers: string[];

  readonly payloadType: string;

  readonly payloadDataField: string;

  readonly responseDataType: string;

}
