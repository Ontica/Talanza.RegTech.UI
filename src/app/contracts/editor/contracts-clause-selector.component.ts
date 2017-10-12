/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Assertion } from 'empiria';
import { CoreService } from '../../core';

import { ContractsService } from '../services/contracts.service';

import { ContractClause } from '../data-types/contract';

 @Component({
    selector: 'contract-clause-selector',
    template: `<ul class="clause-list">
                <li *ngFor="let clause of clauses"><a [class.selected]="clause === currentClause" (click)="onClickSelectClause(clause)">{{clause.clauseNo}} {{clause.title}}</a></li>
               </ul> `,    
   styleUrls: ['./contracts-clause.selector.component.scss'],            
    providers: [ContractsService]
})

export class ContractsClauseSelectorComponent {

  @Input() clauses: ContractClause[]

  @Output() selectedClause = new EventEmitter<ContractClause>();
  
  public currentClause: ContractClause; 

  constructor(private core: CoreService,
    private contractService: ContractsService) { }
 
  public onClickSelectClause(clause: ContractClause): void {    
    this.currentClause = clause;
    this.selectedClause.emit(clause);
  } 

}
