/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Assertion } from '@app/core';
import { CoreService } from '@app/core/core.service';

import { ContractsService } from '../services/contracts.service';

import { Contract, EmptyContract, ContractClauseRef } from '../data-types/contract';

@Component({
  selector: 'contract-filters',
  templateUrl: './contracts-filters.component.html',
  styleUrls: ['./contracts-filters.component.scss'],
  providers: [ContractsService]

})
export class ContractsFiltersComponent implements OnInit {

  public contractsList: Contract[] = [];
  public selectedContract: Contract = EmptyContract();
  public keywords = '';
  public sections = [];
  public selectedSection: string  = '';

  @Output() clauses = new EventEmitter<ContractClauseRef[]>();

  constructor(private core: CoreService,
    private contractService: ContractsService) { }

  ngOnInit() {
    this.setInitialValues();
  }

  public async onChangeContract(uid: string) {
    if (uid === '') {
      this.selectedContract.clausesList = [];
      this.selectedContract = EmptyContract();
      this.sections  = [];
      this.selectedSection = '';
      return;
    }

    this.selectedContract = this.contractsList.find((x) => x.uid === uid);

    await this.loadSelectedContractClausesList('');

    this.fillSectionList();
    this.selectedSection = 'Cláusulas';

    this.onChangeSection(this.selectedSection);
  }

  public onChangeSection(section: string): void {
    this.selectedSection = section;
    if (this.sections.length === 0) {
      return;
    }

    let clauses = this.selectedContract.clausesList.filter(item => item.section === section);

    this.clauses.emit(clauses);
  }

  public async onSearch() {
    if (this.selectedContract.uid === '') {
      alert("Es necesario seleccionar un contrato de la lista de contrados");
      return;
    }

    await this.loadSelectedContractClausesList(this.keywords);

    let clauses = this.selectedContract.clausesList.filter(item => item.section === this.selectedSection);

    //this.clauses.emit(this.selectedContract.clauses);
    this.clauses.emit(clauses);
  }

  private setInitialValues(): void {
    this.loadContractsList();
  }

  private fillSectionList(): void {
    this.sections = Array.from(new Set(this.selectedContract.clausesList.map(item => item.section)).values());
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

    await this.contractService.searchClauses(this.selectedContract.uid, keywords)
                              .toPromise()
                              .then((x) => this.selectedContract.clausesList = x
    );
  }

}
