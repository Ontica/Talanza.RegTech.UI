/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

export class InboxFilter {
  type: string;
  project: string;
  tags: string[];
  responsible: string;
  keywords: string;
  orderBy: string;

  constructor()  {
    this.clean();
  }

  clean(): void {
    this.type = '';
    this.project = '';
    this.tags = [];
    this.responsible = '';
    this.keywords = '';
    this.orderBy = '';
  }

  clone(): InboxFilter {
    const clone = new InboxFilter();

    clone.type = this.type;
    clone.project = this.project;
    clone.tags = this.tags;
    clone.responsible = this.responsible;
    clone.keywords = this.keywords;
    clone.orderBy = this.orderBy;

    return clone;
  }

  toString(): string {
    let filter = '';

    if ((this.type !== '')) {
      filter = this.addFilterConnector(filter) + 'type=' + this.type;
    }
    if ((this.project !== '')) {
      filter = this.addFilterConnector(filter) + 'project=' + this.project;
    }
    if ((this.tags.length !== 0)) {
      this.tags.forEach((x) => {
        filter = this.addFilterConnector(filter) + 'tag=' + x;
      });
    }
    if (this.responsible !== '') {
      filter = this.addFilterConnector(filter) + 'responsible=' + this.responsible;
    }
    if (this.keywords !== '') {
      filter = this.addFilterConnector(filter) + 'keywords=' + this.keywords;
    }
    if (this.orderBy !== '') {
      filter = this.addFilterConnector(filter) + 'orderBy=' + this.orderBy;
    }
    return filter;
  }

  private addFilterConnector(filter: string): string {
    if (filter !== '') {
      filter += '&';
    }
    return filter;
  }

}
