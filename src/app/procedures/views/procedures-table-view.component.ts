/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseProcedure } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-procedures-table-view',
  templateUrl: './procedures-table-view.component.html',
  styleUrls: ['../../../styles/grid.scss'],
})
export class ProceduresTableViewComponent {

  selectedProcedureUID: string;

  @Input() procedures: BaseProcedure[] = [];

  @Output() procedureSelect = new EventEmitter<string>();


  selectProcedure(procedureUID: string): void {
    this.selectedProcedureUID = procedureUID;
    this.procedureSelect.emit(procedureUID);
  }

}
