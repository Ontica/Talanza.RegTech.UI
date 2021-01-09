/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ContractsService } from '@app/services/regulation';

import {
  ContractClause, ContractClauseRef,
  EmptyContractClause, ContractObligation
} from '@app/models/regulation';

import { ActivityTemplate } from '@app/models/project-management';
import { ProjectTemplateService } from '@app/services/project-management';

import { CardSettings } from '@app/shared/common-models';


@Component({
  selector: 'emp-gov-selected-clause',
  templateUrl: './contracts-selected-clause.component.html',
  styleUrls: ['./contracts-selected-clause.component.scss']
})
export class ContractsSelectedClauseComponent {

  clauseInfoWidth = '100%';

  obligations: ContractObligation[] = [];

  clause: ContractClause = EmptyContractClause();

  selectedObligation: ContractObligation;

  selectedProcess: Observable<ActivityTemplate>;

  readonly modalSettings = new CardSettings();

  constructor(private contractService: ContractsService,
             private templateService: ProjectTemplateService) {
    this.modalSettings.readonly = true;
  }

  @Input()
  set clauseRef(clauseRef: ContractClauseRef) {
    if (clauseRef && clauseRef.uid !== '') {
      this.loadGridValues(clauseRef);
    }
  }


  onSelectObligation(selected: ContractObligation) {
    this.selectedObligation = selected;
    this.selectedProcess = this.templateService.getProjectTemplate(this.selectedObligation.stepUID);
  }


  closeModalWindow(): void {
    this.selectedObligation = null;
  }


  private loadGridValues(clauseRef: ContractClauseRef): void {
    this.loadClause(clauseRef);
    this.loadObligations(clauseRef);
  }


  private loadClause(clauseRef: ContractClauseRef): void {
    this.contractService.getClause(clauseRef.contractUID, clauseRef.uid)
      .toPromise()
      .then((x) => {
        this.clause = x;
      });
  }


  private loadObligations(clauseRef: ContractClauseRef): void {
    this.contractService.getObligations(clauseRef.uid)
      .toPromise()
      .then((x) => {
        this.obligations = x;
        this.setClauseInfoContainerWidth();
      });
  }


  private setClauseInfoContainerWidth(): void {
    if (this.obligations.length > 0) {
      this.clauseInfoWidth = '40%';
      return;
    }
    if (this.clause.relatedProcedures.length === 0) {
      this.clauseInfoWidth = '100%';
    } else {
      this.clauseInfoWidth = '40%';
    }
  }

}
