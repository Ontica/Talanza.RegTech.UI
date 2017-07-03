/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Authority } from './authority';

export class Entity {
  uid: string;
  name: string;
  shortName:string;
  authorities: Authority[];

  constructor() {
    this.uid = '';
    this.name = '';
    this.shortName = '';
    this.authorities = [];
  }
  
}