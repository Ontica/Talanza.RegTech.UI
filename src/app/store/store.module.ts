/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedureStore } from './procedure.store';

import { ProjectStore } from './project.store';
import { ProjectTemplateStore } from './project-template.store';


@NgModule({

  imports: [
    CommonModule
  ],

  providers: [
    ProjectStore,
    ProjectTemplateStore,
    ProcedureStore
  ]
})
export class StoreModule { }
