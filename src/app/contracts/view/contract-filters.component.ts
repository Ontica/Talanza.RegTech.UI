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
    <td>Buscar:</td>
    <td>
      <input style="width:364px;" type="search " class="text-box ">
      <button class="btn"><i class="fa fa-search" aria-hidden="true"></i></button>
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

  @Output() clauses = new EventEmitter<ContractClause[]>();

  constructor(private core: CoreService,
    private contractService: ContractService) { }

  ngOnInit() {
    //console.log(this.clauses);
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
      .then((x) => {
        this.selectedContract.clauses = x
        this.clauses.emit(x);
      }
    );
  }

}