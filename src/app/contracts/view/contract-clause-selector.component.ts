/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Assertion } from 'empiria';
import { CoreService } from '../../core';

import { ContractService } from '../services/contract.service';

import { Contract, ContractClause,
  EmptyContract, EmptyContractClause } from '../data-types/contract';

 @Component({
    selector: 'contract-clause-selector',
    template: `<select class="select-warning" #contract (change)="onChangeContract(contract.value)">
                 <option value="">( Seleccionar un contrato )</option>
                 <option *ngFor="let contract of contractsList" [value]="contract.uid">{{contract.name}}</option>
               </select>
               <ul class="clause-list">
                <li *ngFor="let clause of selectedContract.clauses"><a [class.selected]="clause === currentClause" (click)="onClickSelectClause(clause)">{{clause.clauseNo}} {{clause.title}}</a></li>
               </ul>`,    
    styleUrls: ['./contract-view.component.scss',
                `.clause-list { list-style-type: none; }
                 .selected { color: red;}
                 `],
   
    providers: [ContractService]
})

export class ContractClauseSelectorComponent implements OnInit{

  public contractsList: Contract[] = [];
  
  public selectedContract: Contract = EmptyContract();

  public currentClause: ContractClause;

  @Output() selectedClause = new EventEmitter<ContractClause>();

  constructor(private core: CoreService,
    private contractService: ContractService) { }

  ngOnInit() {      
      this.setInitialValues();
  }

  public onChangeContract(uid: string): void {
    if (uid === '') {
      this.selectedContract.clauses = [];
      this.selectedContract = EmptyContract();
      return;
    }
    this.selectedContract = this.contractsList.find((x) => x.uid === uid);
    this.loadSelectedContractClausesList();
  }

  public onClickSelectClause(clause: ContractClause): void {    
    this.currentClause = clause;
    this.selectedClause.emit(clause);
  }

  private setInitialValues(): void {
    this.loadContractsList();
  }

  private loadContractsList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de contratos.';

    this.contractService.getContractList()
                        .toPromise()
                        .then((x) => this.contractsList = x)
                        .catch((e) => this.core.http.showAndThrow(e, errMsg));
  }

  private loadSelectedContractClausesList(): void {
    Assertion.assertValue(this.selectedContract, 'this.selectedContract');

    if (this.selectedContract.clauses) {
      return;
    }

    this.contractService.getContractClausesList(this.selectedContract.uid)
                        .toPromise()
                        .then((x) => this.selectedContract.clauses = x);
  }


}