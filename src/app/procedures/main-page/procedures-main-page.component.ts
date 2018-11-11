/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';

import { BaseProcedure } from '@app/models/regulation';


@Component({
  selector: 'task-procedures-editor',
  templateUrl: './procedures-main-page.component.html',
  styleUrls: ['./procedures-main-page.component.scss'],
})
export class ProceduresMainPageComponent {

  procedures: BaseProcedure[] = [];
  selectedProcedureUID: string;
  showProcedureEditorWindow = false;

  onOpenProcedureEditorWindow(UID: string): void {
    this.selectedProcedureUID = UID;
    this.showProcedureEditorWindow = true;
  }

  closeProcedureEditorWindow(): void {
    this.showProcedureEditorWindow = false;
  }

  getProcedures(procedures: BaseProcedure[]): void {
    this.procedures = procedures;
  }

}
