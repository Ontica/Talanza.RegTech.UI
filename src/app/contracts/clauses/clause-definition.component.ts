/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';

import { CoreService } from '@app/core/core.service';

import { ContractsService } from '@app/services/regulation';

import {
  ContractClause, ContractClauseRef,
  EmptyContractClause
} from '@app/models/regulation';

@Component({
  selector: 'emp-gov-clause-definition',
  templateUrl: './clause-definition.component.html',
  styleUrls: ['./clause-definition.component.scss'],
  providers: [ContractsService],
  encapsulation: ViewEncapsulation.Native,
})

export class ClauseDefinitionComponent {

  clause: ContractClause = EmptyContractClause();

  constructor(private contractService: ContractsService) { }

  @Input()
  set clauseRef(clauseRef: ContractClauseRef) {
    if (clauseRef && clauseRef.uid !== '') {
      this.loadClause(clauseRef);
    }
  }

  private loadClause(clauseRef: ContractClauseRef): void {
    this.contractService.getClause(clauseRef.contractUID, clauseRef.uid)
      .toPromise()
      .then((x) => this.clause = x);
  }

}
