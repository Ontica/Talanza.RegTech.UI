/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseProcedure } from "@app/models/regulation";


@Component({
  selector: 'procedures-table-view',
  templateUrl: './procedures-table-view.component.html',
  styleUrls: ['./procedures-table-view.component.scss'],
})
export class ProceduresTableViewComponent {

  @Input() procedures: BaseProcedure[] = [];

  public selectedProcedureUID: string;

  @Output() public onSelectProcedure = new EventEmitter<string>();

  public selectProcedure(procedureUID: string): void {
    this.selectedProcedureUID = procedureUID;
    this.onSelectProcedure.emit(procedureUID);
  }

}
