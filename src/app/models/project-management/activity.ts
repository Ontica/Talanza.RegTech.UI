/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Contact, DateString, Empty,
         Identifiable, PartitionedType } from '@app/models/core';

import { Project } from './project';


export const ACTIVITY_TYPE_NAME = 'ObjectType.ProjectItem.Activity';


export interface Duration {
  value: number,
  type: string
}


export const DefaultDuration: Duration = {
  value: 0,
  type: 'Unknown',
}

export interface Activity extends Identifiable, PartitionedType {
  id: number;
  notes: string,
  project: Project,
  responsible: Contact,
  parent: Identifiable,
  estimatedDuration: Duration,

  startDate: DateString,
  targetDate: DateString,
  endDate: DateString,
  dueDate: DateString,

  warnDays: number,
  warnType: string,

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


export const EmptyActivity: Activity = {
  id: 0,
  uid: '',
  type: '',
  name: '',
  notes: '',
  project: Empty,
  responsible: Empty,
  parent: Empty,

  estimatedDuration: DefaultDuration,
  startDate: '',
  targetDate: '',
  endDate: '',
  dueDate: '',

  warnDays: 0,
  warnType: '',

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
