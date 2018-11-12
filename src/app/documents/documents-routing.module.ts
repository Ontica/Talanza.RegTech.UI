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

import { DocumentsMainPageComponent } from './main-page/documents-main-page.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'documents', component: MainLayoutComponent, canActivate: [SecurityGuardService],
        children: [{ path: 'search', component: DocumentsMainPageComponent }]
      }
    ])],

  exports: [RouterModule]

})
export class DocumentsRoutingModule { }
