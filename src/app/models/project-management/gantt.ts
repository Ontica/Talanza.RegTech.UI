/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Contact } from '../core';

import { BaseProjectItem } from './activity';


export interface GanttTask extends BaseProjectItem {
  readonly uid: string;
  readonly id: number;
  readonly parent: number;

  type: string;
  text: string;
  start_date: string;
  duration: number;
  position: number;
  level: number;
  theme: string;
  tags: string;
  resource: string;
  responsible: Contact;
}
