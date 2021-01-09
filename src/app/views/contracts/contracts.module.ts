/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';

import { ProceduresModule } from '@app/views/procedures/procedures.module';
import { ProcessesModule } from '@app/views/processes/processes.module';

import { ClauseDefinitionComponent } from './clauses/clause-definition.component';
import { ClauseObligationsComponent } from './clauses/clause-obligations.component';
import { ContractsClauseSelectorComponent } from './editor/contracts-clause-selector.component';
import { ContractsSelectedClauseComponent } from './editor/contracts-selected-clause.component';
import { ContractsFiltersComponent } from './main-page/contracts-filters.component';
import { ContractsMainPageComponent } from './main-page/contracts-main-page.component';
import { ContractClausesTableViewComponent } from './views/contract-clauses-table-view.component';

import { ContractsRoutingModule } from './contracts-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    ProceduresModule,

    ProcessesModule,

    ContractsRoutingModule
  ],

  declarations: [
    ClauseDefinitionComponent,
    ClauseObligationsComponent,
    ContractClausesTableViewComponent,
    ContractsClauseSelectorComponent,
    ContractsFiltersComponent,
    ContractsMainPageComponent,
    ContractsSelectedClauseComponent
  ],

  exports: [
    ClauseDefinitionComponent,
    ClauseObligationsComponent,
    ContractClausesTableViewComponent
  ]

})
export class ContractsModule { }
