/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ContractsMainPageComponent } from './main-page/contracts-main-page.component';

import { ContractsRoutingModule } from './contracts-routing.module';

import { ContractViewComponent } from './view/contract-view.component';
import { ContractClauseSelectorComponent } from './view/contract-clause-selector.component';
import { ContractSelectedClauseComponent } from './view/contract-selected-clause.component';
import { ContractSelectedProcedureComponent } from './view/contract-selected-procedure.component';
import { ContractFiltersComponent } from './view/contract-filters.component';

import { SafeHtmlPipe } from './view/contract-selected-procedure.component';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ContractsRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [ContractViewComponent, ContractClauseSelectorComponent, 
                 ContractSelectedClauseComponent, ContractSelectedProcedureComponent,
                 ContractFiltersComponent, SafeHtmlPipe],
  exports: [ContractSelectedProcedureComponent]
})
export class ContractsModule { }
