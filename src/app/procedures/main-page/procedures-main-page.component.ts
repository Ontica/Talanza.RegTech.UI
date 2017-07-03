/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';

import { Procedure } from '../data-types/procedure';

@Component({
  selector: 'task-procedures-editor',
  templateUrl: './procedures-main-page.component.html',
  styleUrls: ['./procedures-main-page.component.scss'],
})

export class ProceduresMainPageComponent {

  public procedures: Procedure[] = [];

  public showProcedureWindow = false;

  public onOpenProcedureWindow(): void {
    this.showProcedureWindow = true;
  }
  public closeProcedureWindow(): void {
    this.showProcedureWindow = false;
  }

  public getProcedures(procedures: Procedure[]): void {
    this.procedures = procedures;
  }

}
