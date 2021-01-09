/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProceduresMainPageComponent } from '../procedures/main-page/procedures-main-page.component';
import { ContractsMainPageComponent } from '../contracts/main-page/contracts-main-page.component';
import { DocumentsMainPageComponent } from '@app/documents/main-page/documents-main-page.component';
import { KnowledgeBaseMainPageComponent } from '@app/knowledge-base/main-page/kb-main-page.component';


const routes: Routes = [
  { path: 'oil-and-gas-contract-models', component: ContractsMainPageComponent },
  { path: 'regulatory-documents', component: DocumentsMainPageComponent },
  { path: 'procedures', component: ProceduresMainPageComponent },
  { path: 'talanza-guidance', component: KnowledgeBaseMainPageComponent },
  { path: '', redirectTo: 'oil-and-gas-contract-models', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
