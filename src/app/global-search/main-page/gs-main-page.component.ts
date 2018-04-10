import { Component, EventEmitter, Input, Output,  ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreService } from '../../core/core.service';
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
    
    private _keywords = '';    
    @Input()
    set keywords(keywords: string) {        
        this._keywords = keywords;
        
        this.main();
    }
    get keywords(): string {
        return this._keywords;
    }

    @Output() public onClose = new EventEmitter();
    
    constructor(private route: ActivatedRoute, private procedureService: ProcedureService,
                private contractService: ContractsService, private core: CoreService,
                private documentService: DocumentService, private faqService: FAQService ) {
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
        this.selectedProcedureUID = procedureUID; 

        this.showDetailsContainer();        
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
        this.navBarConfig.push({ name:'FAQs', displayText:'FAQs (' + this.FAQs.length.toString() +')'});
    }

    private cleanSelectedOption(): void {
        this.selectedOption = '';
    }  

    private async loadProcedures() {
        let filter: ProcedureFilter = new ProcedureFilter(); 
        filter.keywords = this.keywords;

       await this.procedureService.getProceduresList(filter)
                         .then((procedures) =>{this.procedures = procedures;});
    }  

    private async loadContractClauses() {
        const errMsg = 'Ocurrió un problema al intentar leer la lista de cl�usulas para el contrato.' ;

        const contractUID = 'R24Kmag356L21'; //Contrato: 2.4 Individual
       
        await this.contractService.searchClauses(contractUID, this.keywords)
            .toPromise()
            .then((x) => this.clauses = x)
            .catch((e) => this.core.http.showAndThrow(e, errMsg));
    }

    private async loadDocuments() {

        let filter = new DocumentFilter();   
        filter.type = '';     
        filter.keywords = this.keywords;    

        await this.documentService.getDocuments(filter)
                            .then((documents) => this.documents = documents);
    }

      private loadFaqs(): void {
        this.faqService.getFAQs(this.keywords)
            .subscribe((FAQs) => { this.FAQs = FAQs;   });
    } 
    

     
}
