/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

export class Authority {
  entity: Entity;
  office: Office;
  position: Position;
  contact: Contact;

  constructor() {
    this.entity = new Entity();
    this.office = new Office();
    this.position = new Position();
    this.contact = new Contact();
  }

}

export class Contact {
  uid: string;
  name: string;
  email: string;

  constructor() {
    this.uid = '';
    this.name = '';
    this.email = '';
  }

}

export class Entity {
  id: number;
  uid: string;
  name: string;
  shortName: string;
  offices: Office[];
  positions: Position[];

  constructor() {
    this.id = 0;
    this.uid = '';
    this.name = '';
    this.shortName = '';
    this.offices = [];
    this.positions = [];
  }

}


export class Office {
  uid: string;
  name: string;

  constructor() {
    this.uid = '';
    this.name = '';
  }

}


export class Officer {
  uid: string;
  name: string;
  email: string;

  constructor() {
    this.uid = '';
    this.name = '';
    this.email = '';
  }

}


export class Position {
  uid: string;
  name: string;
  phone: string;
  officer: Officer;

  constructor() {
    this.uid = '';
    this.name = '';
    this.phone = '';
    this.officer = new Officer();
  }

}
