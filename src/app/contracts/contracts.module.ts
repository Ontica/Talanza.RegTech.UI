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

import { ContractsRoutingModule } from './contracts-routing.module';

import { ContractsMainPageComponent } from './main-page/contracts-main-page.component';
import { ContractViewComponent } from './main-page/contract-view.component';
import { ContractsFiltersComponent } from './main-page/contracts-filters.component';
import { ContractsClauseSelectorComponent } from './editor/contracts-clause-selector.component';
import { ContractsSelectedClauseComponent } from './editor/contracts-selected-clause.component';
import  { ContractsSelectedProcedureComponent } from './editor/contract-selected-procedure.component';

import { SafeHtmlPipe } from './editor/contract-selected-procedure.component';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ContractsRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [ContractsMainPageComponent, ContractsClauseSelectorComponent, 
                 ContractsSelectedClauseComponent, ContractsSelectedProcedureComponent,
                 ContractsFiltersComponent, SafeHtmlPipe],
  exports: [ContractsSelectedProcedureComponent]
})
export class ContractsModule { }
