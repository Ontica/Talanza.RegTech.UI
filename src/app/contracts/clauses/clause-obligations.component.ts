/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, Input } from '@angular/core';

import { Assertion } from '@app/core';
import { CoreService } from '@app/core/core.service';

import { ContractsService } from '../services/contracts.service';

import { ContractClauseRef, Rule } from '../data-types/contract';

@Component({
  selector: 'clause-obligations',
  templateUrl: './clause-obligations.component.html',
  styleUrls: ['./clause-obligations.component.scss'],
  providers: [ContractsService]
})

export class ClauseObligationsComponent {

  public procedureUID = "";
  public isVisibleProcedureInfo = false;

  public rules: Rule[] = [];

  constructor(private core: CoreService, private contractService: ContractsService) { }

  @Input()
  set clauseRef(clauseRef: ContractClauseRef) {
    if (clauseRef && clauseRef.uid != '') {
      this.loadObligations(clauseRef);
    }
  }

  public onSelectedProcedure(procedureUID: string): void {
    this.isVisibleProcedureInfo = true;
    this.procedureUID = procedureUID;
  }

  public onCloseProcedureInfoModal(): void {
    this.isVisibleProcedureInfo = false;
  }

  private loadObligations(clauseRef: ContractClauseRef): void {
    const errMsg = 'Ocurrió un problema al intentar leer la cláusula.';

    this.contractService.getObligations(clauseRef.contractUID, clauseRef.uid).toPromise()
                        .then((x) => this.rules = x.rules)
                        .catch((e) => this.core.http.showAndThrow(e, errMsg));
  }


}
