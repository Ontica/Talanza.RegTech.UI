/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ProcessRoutingModule } from './process-routing.module';

import { ProcessEditorComponent } from './editor/process-editor.component';
import { SaveProcessDialogComponent } from  './editor/save-process-dialog.component';

import { ProceduresModule } from '../procedures/procedures.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ProcessRoutingModule, SharedModule, CommonModule, ProceduresModule],
  declarations: [ProcessEditorComponent, SaveProcessDialogComponent],
  exports: []
})
export class ProcessModule { }
