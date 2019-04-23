/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { SharedModule } from '@app/shared/shared.module';

import { KnowledgeBaseModule } from '@app/knowledge-base/knowledge-base.module';
import { ProceduresModule } from '@app/procedures/procedures.module';

import { ProcessesMainPageComponent } from './main-page/processes-main-page.component';

import { ProcessTreeDesignerComponent } from './tree-designer/tree-designer.component';

import { ProcessActivityAssociationComponent } from './former-editor/process-activity-association.component';
import { ProcessEditorComponent } from './former-editor/process-editor.component';
import { SaveProcessDialogComponent } from './former-editor/save-process-dialog.component';

import { ActivityDesignerComponent } from './activity-designer/activity-designer.component';

import { MoveActivityDialogComponent } from './move-activity-dialog/move-activity-dialog.component';

import {
 ActivityModelFormComponent
} from './activity-designer/activity-model-form/activity-model-form.component';

import { ProcessesRoutingModule } from './processes-routing.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,

    AngularMaterialModule,
    SharedModule,

    KnowledgeBaseModule,
    ProceduresModule,

    ProcessesRoutingModule
  ],

  declarations: [
    ActivityDesignerComponent,
    ActivityModelFormComponent,
    MoveActivityDialogComponent,
    ProcessesMainPageComponent,
    ProcessTreeDesignerComponent,
    ProcessActivityAssociationComponent,
    ProcessEditorComponent,
    SaveProcessDialogComponent
  ],

  exports: [
    ActivityDesignerComponent
  ],

  entryComponents: [
    MoveActivityDialogComponent
  ]

})
export class ProcessesModule { }
