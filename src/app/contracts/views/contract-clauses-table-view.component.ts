/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ContractsService } from '@app/services/regulation';

import { ContractClauseRef, ContractClause,
         EmptyContractClause } from '@app/models/regulation';

@Component({
  selector: 'contract-clauses-table',
  templateUrl: './contract-clauses-table-view.component.html',
  styleUrls: ['./contract-clauses-table-view.component.scss'],
  providers: [ContractsService]
})
export class ContractClausesTableViewComponent {

  @Output() public onSelectClause = new EventEmitter<ContractClause>();

  @Input() clauses: ContractClauseRef[] = [];
  public selectedClause = EmptyContractClause();

  constructor(private contractService: ContractsService) { }

  public selectClause(selectedClause: ContractClause): void {
    this.selectedClause = selectedClause;
    this.loadClause();
  }


  private loadClause(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la cláusula.';

    this.contractService.getClause(this.selectedClause.contractUID, this.selectedClause.uid)
      .toPromise()
      .then((x) => { this.onSelectClause.emit(x); });
  }

}
