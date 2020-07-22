/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Empty, DateString, Identifiable, PartitionedType } from '@app/models/core';

import { Duration, DefaultDuration } from './activity';


export const TASK_TYPE_NAME = 'ObjectType.ProjectItem.Task';


export interface Task extends Identifiable, PartitionedType {
  id: number;
  notes: string;
  activity: Identifiable;
  project: Identifiable;

  estimatedDuration: Duration;

  trafficLight?: {
    type: string;
    days: number;
  };

  deadline: DateString;
  plannedEndDate: DateString;
  actualStartDate: DateString;
  actualEndDate: DateString;

  theme: string;
  tags: string;
  position: number;
  level: number;
  stage: string;
  status: string;

  responsible: Identifiable;
  assignedDate: DateString;
  assignedBy: Identifiable;

  foreignLanguage: {
    name: string;
    notes: string;
  };
}


export const EmptyTask: Task = {
  id: 0,
  uid: '',
  type: '',
  name: '',
  notes: '',
  activity: Empty,
  project: Empty,

  estimatedDuration: DefaultDuration,

  deadline: '',
  plannedEndDate: '',
  actualStartDate: '',
  actualEndDate: '',

  theme: '',
  tags: '',
  position: 0,
  level: 0,
  stage: '',
  status: '',

  responsible: Empty,
  assignedDate: '',
  assignedBy: Empty,

  foreignLanguage: {
    name: '',
    notes: ''
  }

};
