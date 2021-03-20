/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable } from '../../core/data-types';


export interface DataSource {
  uid: string;
  type: string;
  family: string;
  name: string;
  mediaFormat: string;
  description: string;
  templateUrl?: string;
}


export const EmptyDataSource: DataSource = {
  uid: '',
  type: '',
  family: '',
  name: '',
  mediaFormat: '',
  description: ''
};


export interface DataObject {
  uid: string;
  type: string;
  name: string;
  description: string;
  isOptional: boolean
  entity: Identifiable;
  subject: Identifiable;
  action: string;
  mediaFormat: string;
  autofillFileUrl?: string;
  uploadedFileUrl?: string;
  templateUrl?: string;
  status: string;
  decorator: string;
  dataObject: DataSource,
  optional: string;
  legalBasis: string;
}
