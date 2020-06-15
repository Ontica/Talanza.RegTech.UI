/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileStore } from './file.store';
import { ProcedureStore } from './procedure.store';
import { ProjectStore } from './project.store';
import { ProjectTemplateStore } from './project-template.store';
import { StepsStore } from './steps.store';

import { UserInterfaceStore } from './ui.store';


@NgModule({

  imports: [
    CommonModule
  ],

  providers: [
    FileStore,
    ProjectTemplateStore,
    ProjectStore,
    ProcedureStore,
    StepsStore,
    UserInterfaceStore
  ]
})
export class StoreModule { }
