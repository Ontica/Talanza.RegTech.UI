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
import { ProceduresModule } from '../procedures/procedures.module';
import { ControlsModule } from '../controls/controls.module';

import { ContractsRoutingModule } from './contracts-routing.module';

import { ContractsMainPageComponent } from './main-page/contracts-main-page.component';
import { ContractsFiltersComponent } from './main-page/contracts-filters.component';
import { ContractsClauseSelectorComponent } from './editor/contracts-clause-selector.component';
import { ContractsSelectedClauseComponent } from './editor/contracts-selected-clause.component';
import { ContractClausesTableViewComponent } from './views/contract-clauses-table-view.component';
import { ClauseDefinitionComponent } from './clauses/clause-definition.component';
import { ClauseObligationsComponent } from './clauses/clause-obligations.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ContractsRoutingModule, CommonModule, FormsModule,
            ProceduresModule, ControlsModule],
  declarations: [ContractsMainPageComponent, ContractsClauseSelectorComponent,
                 ContractsSelectedClauseComponent, ContractsFiltersComponent,
                 ContractClausesTableViewComponent, ClauseDefinitionComponent,
                 ClauseObligationsComponent],
  exports: [ContractClausesTableViewComponent, ClauseDefinitionComponent, ClauseObligationsComponent]
})
export class ContractsModule { }
