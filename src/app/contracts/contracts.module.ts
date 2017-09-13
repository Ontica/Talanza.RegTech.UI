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

import { ContractEditorComponent } from './editor/contract-editor.component';

import { ClauseInfoTabComponent } from './editor/tabs/clause-info-tab.component';
import { RelatedProceduresTabComponent } from './editor/tabs/related-procedures-tab.component';

import { ContractsRoutingModule } from './contracts-routing.module';

import { ContractViewComponent } from './view/contract-view.component';
import { ContractClauseSelectorComponent } from './view/contract-clause-selector.component';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ContractsRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [ContractsMainPageComponent, ContractEditorComponent,
                 ClauseInfoTabComponent, RelatedProceduresTabComponent, ContractViewComponent,
                 ContractClauseSelectorComponent],
  exports: [ContractsMainPageComponent]
})
export class ContractsModule { }
