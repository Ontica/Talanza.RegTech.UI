/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

 import { Component, Input } from '@angular/core';

 import { Assertion } from 'empiria';
 import { CoreService } from '../../core';
 
 import { ContractsService } from '../services/contracts.service';
 
 import { ContractClause, EmptyContractClause, RelatedProcedure } from '../data-types/contract';
  
 @Component({
   selector:'selected-clause',
   templateUrl: './contracts-selected-clause.component.html',
   styleUrls:['./contracts-selected-clause.component.scss'],
   providers: [ContractsService]
 })

 export class ContractsSelectedClauseComponent {
  
  public isProcedruesTablesVisible = !false;
  public relatedProcedures: RelatedProcedure[];
  public procedureUID = "";
  public isVisibleProcedureInfo = false;

  private  _clause: ContractClause =EmptyContractClause();
  @Input()
  set clause(clause: any) {    
    this._clause = clause;   
    console.log(clause);
    this.loadClause(clause.contractUID, clause.uid);    
  }
  get clause(): any {
    return this._clause;
  }

  constructor(private core: CoreService,
    private contractService: ContractsService) { }
  
  public onDisplayProcedruesList(): void {   
    this.isProcedruesTablesVisible = !this.isProcedruesTablesVisible;
  }

  public onSelectedProcedure(procedureUID: string): void {
    this.isVisibleProcedureInfo = true;
    this.procedureUID = procedureUID;   
  }

  public onCloseProcedureInfoModal(): void {
    this.isVisibleProcedureInfo = false;
  }

  private loadClause(contractUID:string, clauseUID:string): void {
    this.contractService.getClause(contractUID, clauseUID)
    .toPromise()
    .then((x) => {      
      this.relatedProcedures = x.relatedProcedures;
    });
  }

 }
