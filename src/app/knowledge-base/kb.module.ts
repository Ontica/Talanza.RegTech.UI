/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { KnowledgeBaseRoutingModule } from './kb-routing.module';

import { KnowledgeBaseMainComponent } from './main/kb-main.component';


@NgModule({
  imports: [
    KnowledgeBaseRoutingModule
  ],
  declarations: [KnowledgeBaseMainComponent],
  exports: [KnowledgeBaseMainComponent]
})
export class KnowledgeBaseModule { }
