/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { ProceduresModule } from '@app/procedures/procedures.module';

import { ProcessActivityAssociationComponent } from './editor/process-activity-association.component';
import { ProcessEditorComponent } from './editor/process-editor.component';
import { SaveProcessDialogComponent } from './editor/save-process-dialog.component';

import { ProcessRoutingModule } from './process-routing.module';


@NgModule({

  imports: [
    CommonModule,
    SharedModule,

    ProceduresModule,

    ProcessRoutingModule
  ],

  declarations: [
    ProcessActivityAssociationComponent,
    ProcessEditorComponent,
    SaveProcessDialogComponent
  ],

  exports: []
})
export class ProcessModule { }
