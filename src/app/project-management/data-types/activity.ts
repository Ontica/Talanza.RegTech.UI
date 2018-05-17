/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import {
  Contact,
  Empty,
  Identifiable
} from '../../core/core-data-types';

import { Project } from './project';


export interface Parent extends Identifiable {
  type: string
}


export interface Activity extends Identifiable {
  type: string,
  notes: string,
  project: Project,
  responsible: Contact,
  parent: Parent | Identifiable,
  estimatedDuration: string,
  startDate: Date,
  targetDate: Date,
  endDate: Date,
  dueDate: Date,
  tags: string[],
  position: number,
  level: number;
  ragStatus: string,
  stage: string,
  status: string,

  visible: string
}


export const Activity_Empty: Activity = {
  uid: '',
  type: '',
  name: '',
  notes: '',
  project: Empty,
  responsible: Empty,
  parent: Empty,
  estimatedDuration: '',
  startDate: new Date(),
  targetDate: new Date(),
  endDate: new Date(),
  dueDate: new Date(),
  tags: [],
  position: 0,
  level: 0,
  ragStatus: '',
  stage: '',
  status: '',

  visible: '',
}
