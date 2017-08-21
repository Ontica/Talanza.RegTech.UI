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

import { DocumentsMainPageComponent } from './main-page/documents-main-page.component';

import { DocumentsRoutingModule } from './documents-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [DocumentsRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [DocumentsMainPageComponent],
  exports: [DocumentsMainPageComponent]
})
export class DocumentsModule { }
