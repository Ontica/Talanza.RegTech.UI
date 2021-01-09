/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { ErrorHandler, Injectable } from '@angular/core';


@Injectable()
export class ExceptionHandler extends ErrorHandler {

  constructor() {
    super();
  }


  handleError(error: any): void {
    // do real error handling like logging them to a central log server and present it through user-interface

    console.log('Global Exception handler', error);

    return;
  }

}
