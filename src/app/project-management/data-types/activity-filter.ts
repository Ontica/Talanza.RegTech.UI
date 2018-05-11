/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

 import { ProjectRef, EmptyProjectRef, PersonRef,
          EmptyContact, Contract, EmptyContract,
          Stage, EmptyStage } from '../data-types/project';

export class ViewConfig {
  viewType: string;
  ganttConfig: string;
  timeScaleUnit: string;
}

export function DefaultViewConfig(): ViewConfig {
  return {
    viewType: 'activity-tree',
    ganttConfig: 'ganttWeeks',
    timeScaleUnit: 'quarters',
  };
}

export class ActivityFilter {
  public contract: Contract;
  public project: ProjectRef;
  public stage: Stage;
  public tags: string[];
  public responsible: PersonRef;
  public keywords: string;
  public orderBy: string;

  constructor() {
    this.clean();
  }

  public clean(): void {
    this.contract = EmptyContract();
    this.project = EmptyProjectRef();
    this.stage = EmptyStage();
    this.tags = [];
    this.responsible = EmptyContact();
    this.keywords = '';
    this.orderBy = '';
  }

  public clone(): ActivityFilter {
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

  public toString(): string {
    let filter = '';

    if ((this.contract.uid !== '')) {
      filter = this.addFilterConnector(filter) + "contract=" + this.contract;
    }
    if ((this.project.uid !== '')) {
      filter = this.addFilterConnector(filter) + "project=" + this.project;
    }
    if ((this.stage.uid !== '')) {
      filter = this.addFilterConnector(filter) + "stage=" + this.stage;
    }
    if ((this.tags.length !== 0)) {
      this.tags.forEach((x) => {
        filter = this.addFilterConnector(filter) + "tag=" + x;
      })
    }
    if (this.responsible.uid !== '') {
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

  private addFilterConnector(filter: string): string {
    if (filter !== '') {
      filter += '&';
    }
    return filter;
  }

}
