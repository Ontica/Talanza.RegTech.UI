/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Office } from './office';
import { Position } from './position';

export class Entity {
  uid: string;
  name: string;
  shortName:string;
  offices: Office[];
  positions: Position[];

  constructor() {
    this.uid = '';
    this.name = '';
    this.shortName = '';
    this.offices = [];
    this.positions =[];
  }
  
}