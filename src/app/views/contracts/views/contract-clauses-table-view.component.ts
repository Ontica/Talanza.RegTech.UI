/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ContractsService } from '@app/data-services/regulation';

import { ContractClauseRef, ContractClause,
         EmptyContractClause } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-contract-clauses-table',
  templateUrl: './contract-clauses-table-view.component.html',
  styleUrls: ['./contract-clauses-table-view.component.scss']
})
export class ContractClausesTableViewComponent {

  @Output() contractClauseSelect = new EventEmitter<ContractClause>();

  @Input() clauses: ContractClauseRef[] = [];

  selectedClause = EmptyContractClause();

  constructor(private contractService: ContractsService) { }


  selectClause(selectedClause: ContractClause): void {
    this.selectedClause = selectedClause;
    this.loadClause();
  }


  private loadClause(): void {
    this.contractService.getClause(this.selectedClause.contractUID, this.selectedClause.uid)
      .toPromise()
      .then(x => this.contractClauseSelect.emit(x));
  }

}
