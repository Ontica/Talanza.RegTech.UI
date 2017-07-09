/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Entity } from './entity';
import { Office } from './office';
import { Position } from './position';
import { Contact } from './contact';

export class Authority {
  public entity: Entity;
  public office: Office;
  public position: Position;
  public contact: Contact;

  constructor() {
    this.entity = new Entity();
    this.office = new Office();
    this.position = new Position();
    this.contact = new Contact();
  }

}
