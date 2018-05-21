/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


export interface SpinnerState {
  show: boolean;
}


@Injectable()
export class SpinnerService {

  private _spinnerSubject = new Subject<SpinnerState>();

  constructor() {
    // no-op
  }

  get spinnerState(): Observable<SpinnerState> {
    return this._spinnerSubject.asObservable();
  }

  show() {
    this._spinnerSubject.next(<SpinnerState> { show: true });
  }

  hide() {
    this._spinnerSubject.next(<SpinnerState> { show: false });
  }

}
