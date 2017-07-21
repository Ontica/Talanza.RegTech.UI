/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export interface BaseContract {
  uid: string;
  name: string;
  url: string;
}

export interface BaseClause {
  uid: string;
  clauseNo: string;
  title: string;
  text: string;
  surcePageNo: number;
}
