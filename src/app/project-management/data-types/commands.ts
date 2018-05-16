/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export class UpdateActivityCommand {

  public name = '';
  public notes = '';
  public ragStatus = '';
  public tags: string[] = []

  public startDate: Date;
  public targetDate: Date;
  public dueDate: Date;

  // ToDo: assign command?
  public responsibleUID = 'Empty';

}


export class CloseActivityCommand {

  public endDate = new Date();
  public requestedByUID = '';

}
