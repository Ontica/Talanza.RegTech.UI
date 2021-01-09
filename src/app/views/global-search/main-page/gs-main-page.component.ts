/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '@app/shared/services';

import { ContractsService, DocumentService, ProcedureService } from '@app/data-services/regulation';
import { PostingsService } from '@app/data-services/knowledge-base';

import { BaseProcedure, ContractClauseRef, Document,
         DocumentFilter, ProcedureFilter } from '@app/models/regulation';

import { Posting, BASE_OBJECT_UID } from '@app/models/knowledge-base';

import { NavBarConfig } from '../search-results-navbar/search-results-navbar.component';


@Component({
  selector: 'emp-kb-global-search',
  templateUrl: './gs-main-page.component.html',
  styleUrls: ['./gs-main-page.component.scss']
})
export class GlobalSearchMainPageComponent {

  procedures: BaseProcedure[] = [];
  selectedProcedureUID = '';
  navBarConfig: NavBarConfig[] = [];
  selectedOption = '';

  masterContainer = 'centered-container';
  isDetailsContainerVisible = false;

  clauses: ContractClauseRef[] = [];
  clause: ContractClauseRef;

  documents: Document[] = [];
  document: Document;

  FAQs: Posting[] = [];
  faq: Posting;

  private _keywords = '';
  @Input()
  set keywords(keywords: string) {
    if (keywords) {
      this._keywords = keywords;

      this.main();
    }
  }
  get keywords(): string {
    return this._keywords;
  }

  @Output() globalSearchClose = new EventEmitter();

  constructor(private route: ActivatedRoute,
    private app: SharedService,
    private procedureService: ProcedureService,
    private contractService: ContractsService,
    private documentService: DocumentService,
    private faqService: PostingsService) {

    this.route.params.subscribe(params => {
      this.keywords = params['keywords'];
      this.main();
    });

  }


  selectOption(option: string) {
    this.selectedOption = option;

    this.closeDetailsContainer();
  }


  closeGlobalSearch(): void {
    this.globalSearchClose.emit();
  }


  selectProcedure(procedureUID: string): void {

    if (procedureUID) {
      this.selectedProcedureUID = procedureUID;

      this.showDetailsContainer();
    }
  }


  setSelectedClause(clause: ContractClauseRef): void {
    this.clause = clause;

    this.showDetailsContainer();
  }


  setSelectedDocument(document: Document): void {
    this.document = document;

    this.showDetailsContainer();
  }


  setSelectedFAQ(faq: Posting): void {
    this.faq = faq;

    this.showDetailsContainer();
  }


  closeDetailsContainer(): void {
    this.masterContainer = 'centered-container';
    this.isDetailsContainerVisible = false;
  }


  private showDetailsContainer(): void {
    this.masterContainer = 'block-container';
    this.isDetailsContainerVisible = true;
  }


  private async main() {
    this.closeDetailsContainer();

    if (!this.keywords) {
      return;
    }

    await this.loadProcedures();
    await this.loadContractClauses();
    await this.loadDocuments();
    await this.loadFaqs();

    this.fillNavBar();
  }


  private fillNavBar(): void {
    this.navBarConfig = [];
    this.navBarConfig.push({
      name: 'procedures',
      displayText: 'Procedures (' + this.procedures.length.toString() + ')'
    });
    this.navBarConfig.push({
      name: 'contracts',
      displayText: 'Contracts (' + this.clauses.length.toString() + ')'
    });
    this.navBarConfig.push({
      name: 'documents',
      displayText: 'Documents (' + this.documents.length.toString() + ')'
    });
    this.navBarConfig.push({
      name: 'FAQs',
      displayText: 'Q&A (' + this.FAQs.length.toString() + ')'
    });
  }


  private cleanSelectedOption(): void {
    this.selectedOption = '';
  }


  private async loadProcedures() {
    const filter = new ProcedureFilter();
    filter.keywords = this.keywords;

    this.app.spinner.show();

    await this.procedureService.getProceduresList(filter)
      .then(x => {
        this.procedures = x;
        this.app.spinner.hide();
      })
      .catch(() => this.app.spinner.hide());

  }


  private async loadContractClauses() {
    const contractUID = '57993f7c-1390-4103-9f4d-3b98866bf956'; // Contrato: 3.1 Consorcio

    this.app.spinner.show();

    await this.contractService.searchClauses(contractUID, this.keywords)
      .toPromise()
      .then(x => {
        this.clauses = x;
        this.app.spinner.hide();
      })
      .catch(() => this.app.spinner.hide());
  }


  private async loadDocuments() {
    const filter = new DocumentFilter();

    filter.type = '';
    filter.keywords = this.keywords;

    this.app.spinner.show();

    await this.documentService.getDocuments(filter)
      .then(x => {
        this.documents = x;
        this.app.spinner.hide();
      })
      .catch(() => this.app.spinner.hide());
  }


  private async loadFaqs() {
    this.app.spinner.show();

    await this.faqService.getPostingsList(BASE_OBJECT_UID, this.keywords)
      .toPromise()
      .then(x => {
        this.FAQs = x;
        this.app.spinner.hide();
      })
      .catch(() => this.app.spinner.hide());
  }

}
