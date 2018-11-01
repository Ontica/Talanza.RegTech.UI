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
  public id: number;
  public uid: string;
  public name: string;
  public shortName: string;
  public offices: Office[];
  public positions: Position[];

  constructor() {
    this.id = 0;
    this.uid = '';
    this.name = '';
    this.shortName = '';
    this.offices = [];
    this.positions = [];
  }

}
