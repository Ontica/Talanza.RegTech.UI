/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ContractsService } from '@app/services/regulation';

import { ContractClauseRef, EmptyContractClause } from '@app/models/regulation';


@Component({
  selector: 'contract-clause-selector',
  template: `<ul class="clause-list">
                <li *ngFor="let clause of clauses">
                  <a [class.selected]="clause === currentClause" (click)="onClickSelectClause(clause)">{{clause.clauseNo}} {{clause.title}}</a>
                </li>
               </ul> `,
  styleUrls: ['./contracts-clause.selector.component.scss'],
  providers: [ContractsService]
})

export class ContractsClauseSelectorComponent {

  private _clauses: ContractClauseRef[] = [];

  @Input()
  set clauses(clauses: ContractClauseRef[]) {
    this._clauses = clauses;
    this.emitSelectedClause(EmptyContractClause());
  }

  get clauses(): ContractClauseRef[] {
    return this._clauses;
  }

  @Output() selectedClause = new EventEmitter<ContractClauseRef>();

  public currentClause: ContractClauseRef;

  constructor(private contractService: ContractsService) { }

  public onClickSelectClause(selectedClause: ContractClauseRef): void {
    this.currentClause = selectedClause;
    this.selectedClause.emit(selectedClause);
  }

  private emitSelectedClause(selectedClause: ContractClauseRef): void {
    this.selectedClause.emit(selectedClause);
  }

}
