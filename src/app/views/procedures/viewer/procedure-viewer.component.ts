/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';
import { Observable, isObservable, of } from 'rxjs';

import { Procedure } from '@app/models/regulation';
import { ProcedureStore } from '@app/store/procedure.store';


export type Identifier = string | number;

@Component({
  selector: 'emp-gov-procedure-viewer',
  templateUrl: './procedure-viewer.component.html'
})
export class ProcedureViewerComponent {

  _procedure: Observable<Procedure>;

  @Input()
  set procedure(value: Observable<Procedure> | Procedure | Identifier) {
    if (!value) {
      return;

    } else if (typeof value === 'string' || typeof value === 'number') {
      this._procedure = this.store.getProcedure(value);

    } else if (isObservable(value)) {
      this._procedure = value as Observable<Procedure>;

    } else {
      this._procedure = of(value);
    }
  }


  constructor(private store: ProcedureStore) {}

}
