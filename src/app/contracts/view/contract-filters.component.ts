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

import { Contract, EmptyContract, ContractClause } from '../data-types/contract';

@Component({
  selector: 'contract-filters',
  template: `<table class="grid-search-table">
  <tr>
    <td>Contrato:</td>
    <td>
      <select #contract class="select-box" style="width:210px;" (change)="onChangeContract(contract.value)">
                 <option value="">( Seleccionar un contrato )</option>
                 <option *ngFor="let contract of contractsList" [value]="contract.uid">{{contract.name}}</option>
              </select>
    </td>
    <td>Sección</td>
    <td>
      <select #section class="select-box" style="width:210px;" (change)="onChangeSection(section.value)">
        <option value="">( Seleccionar un contrato )</option>
        <option value="Cláusulas">Cláusulas</option>
        <option value="anexos">Anexos</option>
      </select>     
    </td>
    <td>Buscar:</td>
    <td>
      <input style="width:364px;" type="search " class="text-box " [(ngModel)]="keywords">
      <button class="btn" (click)="onSearch()"><i class="fa fa-search" aria-hidden="true"></i></button>
    </td>
    <td>
      
    </td>   
  </tr>
</table>`,
  styleUrls: ['./contract-filters.component.scss'],
  providers: [ContractService]

})
export class ContractFiltersComponent implements OnInit {

  public contractsList: Contract[] = [];
  public selectedContract: Contract = EmptyContract();
  public keywords = '';

  @Output() clauses = new EventEmitter<ContractClause[]>();

  private section = '';

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
    
  }

  public onChangeSection(section: string): void {
    this.section = section;  
  }

  public async onSearch() {
    if (this.selectedContract === EmptyContract()){
      return;
    }
   
    await this.loadSelectedContractClausesList('');   
    
    let clauses: ContractClause[];

    if (this.section === "Cláusulas") {
      clauses = this.selectedContract.clauses.filter(item => item.section === "Cláusulas");
    } else {
      clauses = this.selectedContract.clauses.filter(item => item.section !== "Cláusulas");
    }

    this.clauses.emit(clauses);       
    
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

  private async loadSelectedContractClausesList(keywords: string) {
    Assertion.assertValue(this.selectedContract, 'this.selectedContract');

    if (this.selectedContract.clauses) {
      return;
    }
    await this.contractService.searchClauses(this.selectedContract.uid,keywords)    
      .toPromise()
      .then((x) => this.selectedContract.clauses = x       
    );
  }

}