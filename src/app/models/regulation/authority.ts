/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

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

export class Contact {
  public uid: string;
  public name: string;
  public email: string;

  constructor() {
    this.uid = '';
    this.name = '';
    this.email = '';
  }

}

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


export class Office {
  public uid: string;
  public name: string;

  constructor() {
    this.uid = '';
    this.name = '';
  }

}


export class Officer {
  public uid: string;
  public name: string;
  public email: string;

  constructor() {
    this.uid = '';
    this.name = '';
    this.email = '';
  }

}


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
