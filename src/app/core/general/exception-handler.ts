/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Injectable } from '@angular/core';

@Injectable()
export class ExceptionHandler {

  public show(exception: any, defaultMessage?: string) {

    let errMsg = 'Tengo un problema.\n\n';

    if (exception instanceof Error) {
      errMsg += defaultMessage + '\n\n' + (<Error> exception).message;
    } else {
      errMsg += defaultMessage + '\n\n' + 'Error desconocido.';
    }
    console.log("at exception", exception);
    alert(errMsg);
  }

}
