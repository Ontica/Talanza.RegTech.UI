/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Contact, DateString, Empty,
         Identifiable, PartitionedType } from '@app/models/core';

import { Project } from './project';
import { ActivityTemplate } from './project-template';


export const ACTIVITY_TYPE_NAME = 'ObjectType.ProjectItem.Activity';


export interface Duration {
  value: number;
  type: string;
}


export const DefaultDuration: Duration = {
  value: 0,
  type: 'Unknown',
};


export interface Activity extends Identifiable, PartitionedType {
  id: number;
  notes: string;
  project: Project;
  parent: Identifiable;

  estimatedDuration: Duration;

  deadline: DateString;
  plannedEndDate: DateString;
  actualStartDate: DateString;
  actualEndDate: DateString;

  warnDays: number;
  warnType: string;

  position: number;
  level: number;
  stage: string;
  status: string;

  tags: string[];
  responsible: Contact;

  template?: ActivityTemplate;
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
  actualStartDate: '',
  plannedEndDate: '',
  actualEndDate: '',
  deadline: '',

  warnDays: 0,
  warnType: '',

  tags: [],
  position: 0,
  level: 0,
  stage: '',
  status: ''
};


export interface ActivityOperation {
  operation: 'changeParent' | 'copyToProject' | 'insertActivity' | 'moveActivity' | 'moveToProject';
  activity: Activity | { name: string, position: number };
  newPosition?: number;
  newParent?: Activity;
  targetProjectUID?: string;
}
