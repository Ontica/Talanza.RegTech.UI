/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurityGuardService } from '@app/core';

import { MainLayoutComponent } from '@app/shared';

import { LibraryMainPageComponent } from './main-page/library-main-page.component';
import { ProceduresMainPageComponent } from '@app/procedures/main-page/procedures-main-page.component';
import { ContractsMainPageComponent } from '@app/contracts/main-page/contracts-main-page.component';
import { DocumentsMainPageComponent } from '@app/documents/main-page/documents-main-page.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'library', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'talanza-guidance', component: LibraryMainPageComponent },
          { path: 'oil-and-gas-contract-models', component: ContractsMainPageComponent },
          { path: 'regulatory-documents', component: DocumentsMainPageComponent },
          { path: 'procedures', component: ProceduresMainPageComponent },
          { path: '', redirectTo: 'talanza-guidance', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class LibraryRoutingModule { }
