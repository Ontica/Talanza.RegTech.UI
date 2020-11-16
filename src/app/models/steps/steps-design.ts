/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { DataSource } from '../data-objects';


export class Process {
  uid: string;
  type: string;
  name: string;
  theme: string;
}


export interface StepRequirement {
  uid: string;
  name: string;
  description: string;
  dataObject: DataSource;
  optional: string;
  legalBasis: string;
}
