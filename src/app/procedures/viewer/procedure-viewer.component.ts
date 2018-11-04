/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { Procedure } from '@app/models/regulation';
import { ProcedureStore } from '@app/store/procedure.store';

export type Identifier = string | number;

@Component({
  selector: 'procedure-viewer',
  styleUrls: [],
  templateUrl: './procedure-viewer.component.html'
})
export class ProcedureViewerComponent {

  _procedure: Procedure;

  @Input()
  set procedure(value: Procedure | Identifier) {
    if (!value) {
      this._procedure = null;

    } else if (typeof value === 'string') {
      this._procedure = this.store.getProcedure(value);

    } else if (typeof value === 'number') {
      this._procedure = this.store.getProcedure(value);

    } else {
      this._procedure = value;
    }
  }


  constructor(private store: ProcedureStore) {}

}
