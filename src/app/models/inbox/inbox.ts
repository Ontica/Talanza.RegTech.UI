/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { DateString, Identifiable } from '@app/models/core';


export interface InboxRef {
  description: string;
  extensionData: ExtensionData;
  externalUID: string;
  from: Identifiable;
  received: DateString;
  project: Identifiable;
  status: string;
  title: string;
  theme: string;
  tags: string[];
  to: Identifiable;
  type: string;
  uid: string;
}


interface ExtensionData {
  deadline: DateString;
  plannedEndDate: DateString;
  stage: string;
}
