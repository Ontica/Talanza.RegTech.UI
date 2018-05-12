/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export class GanttTask {
  id: number;
  start_date: string;
  text: string;
  duration: number;
  parent: number;
  type: string;
}
