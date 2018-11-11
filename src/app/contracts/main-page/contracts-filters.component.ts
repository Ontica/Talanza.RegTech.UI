/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Assertion } from '@app/core';

import { ContractsService } from '@app/services/regulation';

import { Contract, EmptyContract, ContractClauseRef } from '@app/models/regulation';

@Component({
  selector: 'emp-gov-contract-filters',
  templateUrl: './contracts-filters.component.html',
  styleUrls: ['./contracts-filters.component.scss']
})
export class ContractsFiltersComponent implements OnInit {

  contractsList: Contract[] = [];
  selectedContract: Contract = EmptyContract();
  keywords = '';
  sections = [];
  selectedSection = '';

  @Output() clauses = new EventEmitter<ContractClauseRef[]>();

  constructor(private contractService: ContractsService) { }

  ngOnInit() {
    this.setInitialValues();
  }

  async onChangeContract(uid: string) {
    if (uid === '') {
      this.selectedContract.clausesList = [];
      this.selectedContract = EmptyContract();
      this.sections = [];
      this.selectedSection = '';
      return;
    }

    this.selectedContract = this.contractsList.find((x) => x.uid === uid);

    await this.loadSelectedContractClausesList('');

    this.fillSectionList();
    this.selectedSection = 'Cláusulas';

    this.onChangeSection(this.selectedSection);
  }

  onChangeSection(section: string): void {
    this.selectedSection = section;
    if (this.sections.length === 0) {
      return;
    }

    const clauses = this.selectedContract.clausesList.filter(item => item.section === section);

    this.clauses.emit(clauses);
  }

  async onSearch() {
    if (this.selectedContract.uid === '') {
      alert('Es necesario seleccionar un contrato de la lista de contrados');
      return;
    }

    await this.loadSelectedContractClausesList(this.keywords);

    const clauses = this.selectedContract.clausesList.filter(item => item.section === this.selectedSection);

    this.clauses.emit(clauses);
  }

  private setInitialValues(): void {
    this.loadContractsList();
  }

  private fillSectionList(): void {
    this.sections = Array.from(new Set(this.selectedContract.clausesList.map(item => item.section)).values());
  }

  private loadContractsList(): void {
    this.contractService.getContractList()
      .toPromise()
      .then((x) => this.contractsList = x);
  }

  private async loadSelectedContractClausesList(keywords: string) {
    Assertion.assertValue(this.selectedContract, 'this.selectedContract');

    await this.contractService.searchClauses(this.selectedContract.uid, keywords)
      .toPromise()
      .then((x) => this.selectedContract.clausesList = x);
  }

}
