/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';

import { SmallProcedureInterface } from '../data-types/small-procedure.interface';

@Component({
  selector: 'task-procedures-editor',
  templateUrl: './procedures-main-page.component.html',
  styleUrls: ['./procedures-main-page.component.scss'],
})

export class ProceduresMainPageComponent {

  public procedures: SmallProcedureInterface[] = [];
  public selectedProcedureUID: string;
  public showProcedureEditorWindow = false;

  public onOpenProcedureEditorWindow(UID: string): void {
    this.selectedProcedureUID = UID;
    this.showProcedureEditorWindow = true;
  }

  public closeProcedureEditorWindow(): void {
    this.showProcedureEditorWindow = false;
  }

  public getProcedures(procedures:SmallProcedureInterface[]): void {
    this.procedures = procedures;
  }

}
