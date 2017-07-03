/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurityGuardService } from '../core';

import { MainLayoutComponent } from '../shared';
import { ProcessEditorComponent } from './editor/process-editor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'process', component: MainLayoutComponent, canActivate: [SecurityGuardService],
        children: [{ path: 'editor', component: ProcessEditorComponent }]

      }
    ])],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
