/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';

import { BaseProcedure, Procedure } from '@app/models/regulation';
import { Observable } from 'rxjs';
import { ProcedureStore } from '@app/store/procedure.store';


@Component({
  selector: 'emp-gov-task-procedures-editor',
  templateUrl: './procedures-main-page.component.html',
  styleUrls: ['./procedures-main-page.component.scss'],
})
export class ProceduresMainPageComponent {

  procedures: BaseProcedure[] = [];

  selectedProcedure: Procedure;

  showProcedureEditorWindow = false;

  constructor(protected store: ProcedureStore) {

  }

  onOpenProcedureEditorWindow(UID: string): void {
    this.store.getProcedure(UID)
              .toPromise()
              .then(x => {
                this.selectedProcedure = x;
                this.showProcedureEditorWindow = true;
              });
  }

  closeProcedureEditorWindow(): void {
    this.showProcedureEditorWindow = false;
  }

  getProcedures(procedures: BaseProcedure[]): void {
    this.procedures = procedures;
  }

}
