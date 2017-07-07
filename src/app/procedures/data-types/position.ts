/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Officer } from './officer';

export class Position {
  uid: string;
  name: string;
  phone: string;
  officer: Officer;
  //officers: Officer[];

  constructor() {
    this.uid = '';
    this.name = '';
    this.phone = '';
    this.officer = new Officer();
    //this.officers = [];
  }

}
