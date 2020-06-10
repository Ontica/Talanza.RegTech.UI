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

import { StepsDesignerComponent } from './designer/steps-designer.component';
import { StepElementFormComponent } from './designer/element-form/step-element-form.component';
import { StepsListComponent } from './list/steps-list.component';
import { StepsMainPageComponent } from './main-page/steps-main-page.component';

import { StepsRoutingModule } from './steps-routing.module';



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

    StepsRoutingModule,
  ],

  declarations: [
    StepsDesignerComponent,
    StepElementFormComponent,
    StepsListComponent,
    StepsMainPageComponent
  ],

})
export class StepsModule { }
