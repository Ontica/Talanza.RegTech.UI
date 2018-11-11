/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { MessageBoxService } from './message-box';
import { SpinnerService } from './spinner/spinner.service';


@Injectable()
export class SharedService {

  constructor(private _messageBoxService: MessageBoxService,
                     private _spinnerService: SpinnerService) {
  }

  get messageBox(): MessageBoxService {
    return this._messageBoxService;
  }

  get spinner(): SpinnerService {
    return this._spinnerService;
  }

}
