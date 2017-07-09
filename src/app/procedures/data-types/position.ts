/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Officer } from './officer';

export class Position {
  public uid: string;
  public name: string;
  public phone: string;
  public officer: Officer;

  constructor() {
    this.uid = '';
    this.name = '';
    this.phone = '';
    this.officer = new Officer();
  }

}
