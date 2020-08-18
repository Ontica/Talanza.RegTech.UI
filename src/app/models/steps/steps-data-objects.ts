/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable } from '../core';


export interface DataSource {
  uid: string;
  type: string;
  family: string;
  name: string;
  description: string;
  templateUrl?: string;
}


export interface DataObject {
  uid: string;
  type: string;
  name: string;
  description : string;
  step: Identifiable;
  activity: Identifiable;
  action: string;
  mediaFormat: string;
  templateUrl?: string;
  mediaUrl?: string;
  status : string;
}
