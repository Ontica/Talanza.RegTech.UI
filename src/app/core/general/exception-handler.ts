/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { Exception } from './exception';

@Injectable()
export class ExceptionHandler extends ErrorHandler {

  private trace: any[] = [];

  private verbose = false;

  constructor(private injector: Injector) {
    super();
  }

  public handleError(error: any): void {
    // do real error handling like logging them to a central log server

    if (this.verbose) {
      console.log('Global Exception handler:', error);

    } else if (error instanceof Exception) {
      console.log(`Global Exception handler: [${error.code}] ${error.message},
                   from ${error.innerError.message}`);

    } else if (error instanceof Error) {
      console.log(`Global Exception handler: ${error.message}`);

    } else {
      console.log('Global Exception handler:', error);

    }

    // if (this.trace.length != 0) {
    //   const lastError = this.trace[this.trace.length -1];

    //   if (lastError === error) {
    //     return;
    //   }
    // }
    // this.trace.push(error);
  }

}
