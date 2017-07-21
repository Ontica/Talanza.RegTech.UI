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
import { Clause } from '../data-types/clause';

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
  public clause: Clause;

  constructor(private contractService: ContractService) { }

  public ngOnInit() {
    this.setInitialValues();
  }
  public closeContractEditorWindow(): void {
    this.isShowContractEditorWindow = false;
  }

  public showContractEditorWindow(clause?: BaseClause): void {
    if (!clause) {
      this.clause = new Clause();
    } else {
      this.clause = clause;
    }

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
      console.log(clauses);
    });
  }

}
