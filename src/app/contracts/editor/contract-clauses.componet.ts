/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ContractsService } from '../services/contracts.service';
import { CoreService } from '../../core';

import { ContractClauseRef, ContractClause, EmptyContractClause } from '../data-types/contract';

interface Configuration {
    contractUID: string,
    keywords:string
}

@Component({
    selector: 'contract-clauses',
    templateUrl: './contract-clauses.component.html',
    styleUrls: ['./contract-clauses.component.scss'],
    providers: [ContractsService]
})

export class ContractClausesComponent {

    private _config : Configuration;  
    @Input() 
    set config(config: Configuration ) {       
        this._config = config;  
        this.loadSelectedContractClausesList()
    }

    get config(): Configuration {
        return this._config;
    }

    @Output() public onSelectClause = new EventEmitter< ContractClause>();
   
    public clauses : ContractClauseRef[] = [];
    public selectedClause =  EmptyContractClause();
   
    constructor(private core: CoreService, private contractService: ContractsService) { }    
   

    public selectClause(selectedClause: ContractClause): void {    
        this.selectedClause = selectedClause;     

        this.loadClause();      
    }    

    private async loadSelectedContractClausesList() {
        const errMsg = 'Ocurrió un problema al intentar leer la lista de cláusulas para el contrato.' + this.config.contractUID ;
       
        await this.contractService.searchClauses(this.config.contractUID, this.config.keywords)
            .toPromise()
            .then((x) => this.clauses = x)
            .catch((e) => this.core.http.showAndThrow(e, errMsg));
    }

    private loadClause(): void {
        const errMsg = 'Ocurrió un problema al intentar leer la cláusula.';
    
        this.contractService.getClause(this.selectedClause.contractUID, this.selectedClause.uid)
                            .toPromise()
                            .then((x) => { this.onSelectClause.emit(x); })
                            .catch((e) => this.core.http.showAndThrow(e, errMsg));
    }    

}