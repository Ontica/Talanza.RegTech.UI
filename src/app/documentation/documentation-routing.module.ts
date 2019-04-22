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

import { DocumentationMainPageComponent } from './main-page/documentation-main-page.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'documentation', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'Documents' },
        children: [
          { path: 'main', component: DocumentationMainPageComponent }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class DocumentationRoutingModule { }
