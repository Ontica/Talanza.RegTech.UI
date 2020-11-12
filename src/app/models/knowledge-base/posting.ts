/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { SelectedContacts } from '@app/shared/contacts-picker/contacts-picker.component';

export interface Posting {
  uid: string;
  objectUID: string;
  body: string;
  title?: string;
  fileUrl?: string;
  authors?: string;
  tags?: string;
  date?: Date;
  sendTo?: SelectedContacts;
  accessMode?: string;
  owner?: string;
  status?: string;
}


export function EmptyPosting(): Posting {
  return {
    uid: 'Empty',
    objectUID: '',
    body: '',
    title: '',
    fileUrl: '',
    authors: '',
    tags: '',
    date: new Date,
    accessMode: '',
    owner: '',
    status: ''
  };
}

export const BASE_OBJECT_UID = '7111442e-f059-4613-9770-84be3eb939db';
