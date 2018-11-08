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
  notes: string,
  activity: Identifiable,
  project: Identifiable,

  estimatedDuration: Duration,
  warnDays: number,
  warnType: string,

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

  responsible: Identifiable,
  assignedDate: DateString,
  assignedBy: Identifiable
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
  warnDays: 0,
  warnType: '',

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

  responsible: Empty,
  assignedDate: '',
  assignedBy: Empty
}
