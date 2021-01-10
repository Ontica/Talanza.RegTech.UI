/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { DataSource } from "../data-objects";


export interface Step {
  uid: string;
  type: string;
  typeName: string;
  kind: string;
  name: string;
  description: string;
  topics: string;
  tags: string;
  entity: string;
}

export const EmptyStep: Step = {
  uid: 'Empty',
  type: 'Empty',
  typeName: 'Empty',
  kind: '',
  name: 'Empty step',
  description: '',
  topics: '',
  tags: '',
  entity: ''
};


export enum StepsListType {
  All = 'All',
  Processes = 'Processes',
  Activities = 'Activities',
  Events = 'Events'
}


export interface StepsListFilter {
  type: StepsListType;
  entities: string[],
  topics: string[],
  keywords: string;
}


export const EmptyStepsListFilter: StepsListFilter = {
  type: StepsListType.All,
  entities: [],
  topics: [],
  keywords: ''
};


export class Process {
  uid: string;
  type: string;
  typeName: string;
  kind: string;
  name: string;
  description: string;
  topics: string;
  tags: string;
  entity: string;
}


// ToDo: remove this interface

export interface StepRequirement {
  uid: string;
  name: string;
  description: string;
  dataObject: DataSource;
  optional: string;
  legalBasis: string;
}
