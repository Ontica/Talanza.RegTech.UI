/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurityGuardService } from '@app/core';

import { MainLayoutComponent } from '@app/shared';

import { ProcessesMainPageComponent } from './main-page/processes-main-page.component';

@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'regulatory-processes', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'Processes' },
        children: [
          {
            path: '',
            component: ProcessesMainPageComponent,
            data: { viewName: 'Processes.Tree' }
          }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class ProcessesRoutingModule { }
