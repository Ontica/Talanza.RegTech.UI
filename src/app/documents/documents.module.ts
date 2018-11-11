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
import { ControlsModule } from '../controls/controls.module';

import { DocumentsMainPageComponent } from './main-page/documents-main-page.component';
import { DocumentsTableViewComponent } from './views/documents-table-view.component';

import { DocumentsRoutingModule } from './documents-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [DocumentsRoutingModule, CommonModule, FormsModule, ControlsModule],
  declarations: [DocumentsMainPageComponent, DocumentsTableViewComponent],
  exports: [DocumentsMainPageComponent, DocumentsTableViewComponent]
})
export class DocumentsModule { }
