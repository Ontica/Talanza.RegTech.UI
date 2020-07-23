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


export interface BaseProjectItem {
  readonly id: number;
  readonly uid: string;
  readonly parent: Identifiable | number;

  position: number;

  theme: string;
  resource: string;
  tags: string;
  responsible: Contact;
}


export interface Activity extends Identifiable, PartitionedType, BaseProjectItem  {
  id: number;
  notes: string;
  project: Project;
  parent: Identifiable;

  estimatedDuration: Duration;

  deadline: DateString;
  plannedEndDate: DateString;
  actualStartDate: DateString;
  actualEndDate: DateString;

  trafficLight?: {
    type: string;
    days: number;
  };

  reminder?: {
    days: number;
  };

  position: number;
  level: number;
  stage: string;
  status: string;

  theme: string;
  resource: string;
  tags: string;
  responsible: Contact;

  template?: ActivityTemplate;

  foreignLanguage: {
    name: string;
    notes: string;
  };
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

  theme: '',
  resource: '',
  tags: '',
  position: 0,
  level: 0,

  stage: '',
  status: '',

  foreignLanguage: {
    name: '',
    notes: ''
  }
};


export interface ActivityOperation {
  operation: 'changeParent' | 'copyToProject' | 'insertActivity' | 'moveActivity' | 'moveToProject';
  activity: Activity | { name: string, position: number };
  newPosition?: number;
  newParent?: Activity;
  targetProjectUID?: string;
}
