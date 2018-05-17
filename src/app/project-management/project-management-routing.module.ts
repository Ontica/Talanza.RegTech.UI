/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurityGuardService } from '../core';

import { MainLayoutComponent } from '../shared';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'projects', component: MainLayoutComponent, canActivate: [SecurityGuardService],
        children: [{ path: 'search', component: ProjectsMainPageComponent }]
      }
    ])],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
