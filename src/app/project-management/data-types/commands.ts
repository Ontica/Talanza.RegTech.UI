/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export class CloseActivityCommand {

  endDate = new Date();
  requestedByUID = '';

}


export class UpdateActivityCommand {

  name = '';
  notes = '';
  ragStatus = '';
  tags: string[] = []

  startDate: Date;
  targetDate: Date;
  dueDate: Date;

  // ToDo: assign command?
  responsibleUID = 'Empty';

}
