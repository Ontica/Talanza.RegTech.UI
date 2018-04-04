/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Assertion } from 'empiria';
import { CoreService } from '../../core/core.service';

import { ContractsService } from '../services/contracts.service';

import { ContractClause, ContractClauseRef,
         EmptyContractClause  } from '../data-types/contract';

@Component({
  selector:'clause-definition',
  templateUrl: './clause-definition.component.html',
  styleUrls:['./clause-definition.component.scss'],
  providers: [ContractsService],
  encapsulation: ViewEncapsulation.Native,
})

export class ClauseDefinitionComponent {

 public clause: ContractClause = EmptyContractClause();

 constructor(private core: CoreService, private contractService: ContractsService) { }

 @Input()
 set clauseRef(clauseRef: ContractClauseRef) {
   if (clauseRef && clauseRef.uid != '') {
    this.loadClause(clauseRef);
   }
 }

 private loadClause(clauseRef: ContractClauseRef): void {
   const errMsg = 'Ocurrió un problema al intentar leer la cláusula.';

   this.contractService.getClause(clauseRef.contractUID, clauseRef.uid)
                       .toPromise()
                       .then((x) => this.clause = x)
                       .catch((e) => this.core.http.showAndThrow(e, errMsg));
 } 

}
