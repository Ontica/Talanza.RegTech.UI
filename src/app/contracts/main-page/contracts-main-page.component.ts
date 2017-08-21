/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { Assertion } from 'empiria';
import { CoreService } from '../../core';

import { ContractService } from '../services/contract.service';

import { Contract, ContractClause,
         EmptyContract, EmptyContractClause } from '../data-types/contract';

@Component({
  selector: 'contracts-main-page',
  templateUrl: './contracts-main-page.component.html',
  styleUrls: ['./contracts-main-page.component.scss'],
  providers: [ContractService]
})
export class ContractsMainPageComponent implements OnInit {

  public contractsList: Contract[] = [];

  public selectedContract: Contract = EmptyContract();
  public selectedContractClause: ContractClause = EmptyContractClause();

  public isClauseEditorWindowVisible = false;

  constructor(private core: CoreService,
              private contractService: ContractService) { }

  public ngOnInit() {
    this.setInitialValues();
  }

  public onCloseContractEditorWindow(): void {
    this.selectedContractClause = EmptyContractClause();
    this.isClauseEditorWindowVisible = false;
  }

  public onClickAddClause() {
    if (this.selectedContract.uid === '') {
      alert('Es necesario seleccionar el contrato al cual se le aplicarán los anexos.');
      return;
    }
    this.selectedContractClause = EmptyContractClause();
    this.selectedContractClause.contract = this.selectedContract;
    this.isClauseEditorWindowVisible = true;
  }

  public onClickEditClause(clause: ContractClause) {
    this.selectedContractClause = clause;
    this.selectedContractClause.contract = this.selectedContract;
    this.isClauseEditorWindowVisible = true;
  }

  public search(): any {
//    const errMsg = 'Por el momento la búsqueda de cláusulas está deshabilitada.';

    // return this.contractService.searchClauses(this.selectedContractClause.uid, 'anexo 3.2')
    //                            .subscribe();

    // this.contractService.getClause(this.selectedContract.uid, 'abcdefg')
    //                     .toPromise()
    //                     .then((x) => this.selectedContractClause = x)
    //                     .catch((e) => this.core.exceptionHandler.show(e, errMsg));
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

  public openURL(page?: number): void {
    if (!this.selectedContract) {
      return;
    }
    window.open(this.selectedContract.url + (page ? '#page=' + page : ''));
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
