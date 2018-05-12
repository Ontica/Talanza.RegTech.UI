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
  public resourceUID = '';
  public startDate = new Date();
  public targetDate = new Date();
  public ragStatus = '';
  public requestedByUID = '';
  public requestedTime = new Date();
  public responsibleUID = '';
  public tags: string[] = []

}


export class CloseActivityCommand {

  public endDate = new Date();
  public requestedByUID = '';

}
