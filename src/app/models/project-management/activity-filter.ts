/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import {
  Contact,
  Empty,
  isEmpty
} from '../../core/data-types';

import {
  Contract,
  Project,
  Stage
} from './project';


export class ActivityFilter {

  contract: Contract;
  project: Project;
  stage: Stage;
  tags: string[];
  responsible: Contact;
  keywords: string;
  orderBy: string;


  constructor() {
    this.clean();
  }


  clean() {
    this.contract = Empty;
    this.project = Empty;
    this.stage = Empty;
    this.tags = [];
    this.responsible = Empty;
    this.keywords = '';
    this.orderBy = '';
  }


  clone(): ActivityFilter {
    let clone = new ActivityFilter();

    clone.contract = this.contract;
    clone.project = this.project;
    clone.stage = this.stage;
    clone.tags = this.tags;
    clone.responsible = this.responsible;
    clone.keywords = this.keywords;
    clone.orderBy = this.orderBy;

    return clone;
  }


  toString(): string {
    let filter = '';

    if (!isEmpty(this.contract)) {
      filter = this.addFilterConnector(filter) + "contract=" + this.contract;
    }
    if (!isEmpty(this.project)) {
      filter = this.addFilterConnector(filter) + "project=" + this.project;
    }
    if (!isEmpty(this.stage)) {
      filter = this.addFilterConnector(filter) + "stage=" + this.stage;
    }
    if ((this.tags.length !== 0)) {
      this.tags.forEach((x) => {
        filter = this.addFilterConnector(filter) + "tag=" + x;
      })
    }
    if (!isEmpty(this.responsible)) {
      filter = this.addFilterConnector(filter) + "responsible=" + this.responsible;
    }
    if (this.keywords !== '') {
      filter = this.addFilterConnector(filter) + "keywords=" + this.keywords;
    }
    if (this.orderBy !== '') {
      filter = this.addFilterConnector(filter) + "orderBy=" + this.orderBy;
    }
    return filter;
  }


  // private methods

  private addFilterConnector(filter: string): string {
    if (filter !== '') {
      filter += '&';
    }
    return filter;
  }

} // class ActivityFilter


export function DefaultViewConfig(): ViewConfig {
  return {
    viewType: 'treeView',
    timeScaleUnit: 'quarter',
  };
}


export class ViewConfig {
  viewType: string;
  timeScaleUnit: string;
}
