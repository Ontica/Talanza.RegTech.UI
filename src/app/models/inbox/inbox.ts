/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

export interface InboxRef {
  description: string,
  extensionData: ExtensionData,
  externalUID: string,
  from: UidName,
  received: Date,
  status: string,
  title: string,
  to: UidName,
  type: string,
  uid: string
}


interface ExtensionData {
  dueDate: Date,
  ragStatus: string,
  stage:string,
  tags: string[]
}


interface UidName {
  uid: string,
  name: string
}