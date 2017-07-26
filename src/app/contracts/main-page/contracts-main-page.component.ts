/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { ContractService } from '../services/contract.service';

import { BaseContract, BaseClause } from '../data-types/contract';
import { Clause, SmallClause } from '../data-types/clause';

@Component({
  selector: 'contracts-main-page',
  templateUrl: './contracts-main-page.component.html',
  styleUrls: ['./contracts-main-page.component.scss'],
  providers: [ContractService]
})

export class ContractsMainPageComponent implements OnInit {

  public isShowContractEditorWindow = false;
  public clauses: BaseClause[] = [];
  public contracts: BaseContract[] = [];
  public selectedContract: BaseContract;
  public clause = new SmallClause();

  constructor(private contractService: ContractService) { }

  public ngOnInit() {
    this.setInitialValues();
  }
  public closeContractEditorWindow(): void {
    this.isShowContractEditorWindow = false;
  }

  public showContractEditorWindow(clauseUID?: string): void {
    if (!this.selectedContract) {
      alert("Seleccionar primero el contrato al que se le agregará la nueva Clausual");
      return;

    }
    if (!clauseUID) {
      this.clause.uid = '';
    } else {
      this.clause.uid = clauseUID;
    }
    this.clause.contractName = this.selectedContract.name;
    this.clause.contractUID = this.selectedContract.uid;

    this.isShowContractEditorWindow = true;
  }

  public search(): void {
    if (!this.selectedContract) {
      return;
    }
    this.setClauses();
  }

  public onChangeContract(uid: string): void {
    this.getSelectedContract(uid);
  }

  public openURL(page?: number): void {
    if (!this.selectedContract) {
      return;
    }
    window.open(this.selectedContract.url + (page ? '#page=' + page : ''));
  }

  private setInitialValues(): void {
    this.setContracts();
  }

  private setContracts(): void {
    this.contractService.getContractList().then((contracts) => {
      this.contracts = contracts;
    });
  }

  private getSelectedContract(uid: string) {
    this.selectedContract = this.contracts.find((x) => x.uid === uid);
  }

  private setClauses(): void {
    this.contractService.getContractClausesList(this.selectedContract.uid).then((clauses) => {
      this.clauses = clauses;
    });
  }

}
