/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { DateString } from '../../core/data-types';

import { Contact, Empty, Identifiable } from '../../core/data-types';

import { Project } from './project';


export interface Parent extends Identifiable {
  type: string
}


export interface Activity extends Identifiable {
  id: number;
  type: string,
  notes: string,
  project: Project,
  responsible: Contact,
  parent: Parent | Identifiable,
  estimatedDuration: string,
  startDate: DateString,
  targetDate: DateString,
  endDate: DateString,
  dueDate: DateString,
  tags: string[],
  position: number,
  level: number;
  ragStatus: string,
  stage: string,
  status: string,

  visible: string,

  config?: any,
  workflowObject?: any,
}


export const Activity_Empty: Activity = {
  id: 0,
  uid: '',
  type: '',
  name: '',
  notes: '',
  project: Empty,
  responsible: Empty,
  parent: Empty,
  estimatedDuration: '',
  startDate: '',
  targetDate: '',
  endDate: '',
  dueDate: '',
  tags: [],
  position: 0,
  level: 0,
  ragStatus: '',
  stage: '',
  status: '',

  visible: '',

  config: {},
  workflowObject: {}
}


export interface ActivityOperation {
  operation: 'changeParent' | 'copyToProject' | 'createActivity' | 'moveActivity' | 'moveToProject',
  activity: Activity | { name: string, position: number },
  newPosition?: number,
  newParent?: Activity,
  targetProjectUID?: string
}
