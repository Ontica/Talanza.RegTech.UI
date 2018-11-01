/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreService } from '@app/core';
import { SharedService } from '@app/shared/services';

import { ContractsService } from '../../contracts/services/contracts.service';
import { ProcedureService } from '../../procedures/services/procedure.service';
import { DocumentService } from '../../documents/services/document.service';
import { FAQService } from '../../service-desk/services/faq.service';

import { SmallProcedureInterface } from '../../procedures/data-types/small-procedure.interface';
import { ProcedureFilter } from '../../procedures/data-types/procedure-filter';
import { NavBarConfig } from '../../controls/nav-bar/nav-bar.control';
import { ContractClauseRef } from '../../contracts/data-types/contract';
import { Document, DocumentFilter } from '../../documents/data-types/document';
import { Faq } from '../../service-desk/data-types/faq';


@Component({
    selector: 'global-search',
    templateUrl: './gs-main-page.component.html',
    styleUrls: ['./gs-main-page.component.scss']
})
export class GlobalSearchMainPageComponent {

    public procedures: SmallProcedureInterface[] = [];
    public selectedProcedureUID = '';
    public navBarConfig: NavBarConfig[] = [];
    public selectedOption = '';

    public masterContainer = 'centered-container';
    public isDetailsContainerVisible = false;

    public clauses: ContractClauseRef[] = [];
    public clause: ContractClauseRef;

    public documents: Document[] = [];
    public documentURI = '';

    public FAQs: Faq[] = [];
    public FAQUid = '' ;

    private _keywords: string = '';
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

    @Output() public onClose = new EventEmitter();

    constructor(private route: ActivatedRoute,
                private core: CoreService,
                private app: SharedService,
                private procedureService: ProcedureService,
                private contractService: ContractsService,
                private documentService: DocumentService,
                private faqService: FAQService) {

      this.route.params.subscribe(params => {
          this.keywords = params['keywords'];
          this.main();
      });

    }


    public selectOption(option: string) {
        this.selectedOption = option;

        this.closeDetailsContainer();
    }


    public closeGlobalSearch(): void {
        this.onClose.emit();
    }


    public selectProcedure(procedureUID: string): void {

        if (procedureUID) {
            this.selectedProcedureUID = procedureUID;

            this.showDetailsContainer();
        }
    }


    public setSelectedClause(clause: ContractClauseRef): void {
        this.clause = clause;

        this.showDetailsContainer();
    }


    public setSelectedDocument(document: Document): void {
        this.documentURI = document.url;

        this.showDetailsContainer();
    }


    public setSelectedFAQ(FAQUid: string): void {
        this.FAQUid = FAQUid;

        this.showDetailsContainer();

    }


    public closeDetailsContainer(): void {
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
        this.navBarConfig.push({ name:'procedures', displayText:'Trámites (' + this.procedures.length.toString() +')'});
        this.navBarConfig.push({ name:'contracts', displayText:'Contratos (' + this.clauses.length.toString() +')'});
        this.navBarConfig.push({ name:'documents', displayText:'Documentos (' + this.documents.length.toString() +')'});
        this.navBarConfig.push({ name:'FAQs', displayText:'Q&A (' + this.FAQs.length.toString() +')'});
    }


    private cleanSelectedOption(): void {
        this.selectedOption = '';
    }


    private async loadProcedures() {
        let filter: ProcedureFilter = new ProcedureFilter();
        filter.keywords = this.keywords;

        this.app.spinner.show();

       await this.procedureService.getProceduresList(filter)
                         .then( x => {
                             this.procedures = x;
                             this.app.spinner.hide();
                            })
                          .catch( () => this.app.spinner.hide() );

    }


    private async loadContractClauses() {
        const errMsg = 'Ocurrió un problema al intentar leer la lista de cláusulas para el contrato.' ;

        const contractUID = 'R24Kmag356L21'; //Contrato: 2.4 Individual

        this.app.spinner.show();

        await this.contractService.searchClauses(contractUID, this.keywords)
                                  .toPromise()
                                  .then( x => {
                                    this.clauses = x;
                                    this.app.spinner.hide();
                                  })
                                  .catch( () => this.app.spinner.hide() );
    }


    private async loadDocuments() {

        let filter = new DocumentFilter();
        filter.type = '';
        filter.keywords = this.keywords;

        this.app.spinner.show();

        await this.documentService.getDocuments(filter)
                                  .then( x => {
                                    this.documents = x;
                                    this.app.spinner.hide();
                                   })
                                  .catch( () => this.app.spinner.hide() );
    }


    private async loadFaqs() {

      this.app.spinner.show();

      await this.faqService.getFAQs(this.keywords)
                           .subscribe( x => {
                              this.FAQs = x;
                              this.app.spinner.hide();
                           },
                           () => {},
                           () => this.app.spinner.hide() );

  }
}
