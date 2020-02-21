/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable, DateString } from '@app/models/core';

import { Activity } from './activity';
import { ActivityTemplate } from './project-template';


export type WhatIfOperation = 'CreateFromTemplate' | 'Complete' | 'Reactivate';


export interface ProjectProcess extends Identifiable {
  level: number;
}


export interface WhatIfResult {

  sourceOperation: WhatIfOperation;

  source: ActivityTemplate | Activity;

  stateChanges: StateChange[];

  hasErrors: boolean;

  exception: string;

}


export interface StateChange extends Identifiable {

  operation: WhatIfOperation;

  position: number;

  parentUID: string;

  level: number;

  theme: string;

  notes: string;

  deadline: DateString;

  plannedEndDate: DateString;

  actualStartDate: DateString;

  actualEndDate: DateString;

  activityUID: string;

  projectUID: string;

  templateUID: string;

}
