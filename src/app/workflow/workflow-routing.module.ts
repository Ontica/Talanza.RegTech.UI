/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProcessDefinitionComponent } from './modeling/process-definition.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'workflow/modeling', component: ProcessDefinitionComponent }
  ])],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
