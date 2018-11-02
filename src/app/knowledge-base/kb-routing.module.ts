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

import { KnowledgeBaseMainComponent } from './main/kb-main.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'knowledge-base', component: MainLayoutComponent,
        data: {layoutType: 'KB'}, canActivate: [SecurityGuardService],
        children: [{ path: 'main', component: KnowledgeBaseMainComponent }]
      }
    ])],

  exports: [RouterModule]

})
export class KnowledgeBaseRoutingModule { }
