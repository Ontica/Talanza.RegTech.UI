/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

export class GanttTask {
  uid: string;
  id: number;
  type: string;
  text: string;
  start_date: string;
  duration: number;
  position: number;
  level: number;
  parent: number;
}
