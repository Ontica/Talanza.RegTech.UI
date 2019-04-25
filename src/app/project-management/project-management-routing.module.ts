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

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'contract-management', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'activities', component: ProjectsMainPageComponent },
          { path: 'gantt', component: ProjectsMainPageComponent },
          { path: 'timelines', component: ProjectsMainPageComponent },
          { path: 'documents', component: ProjectsMainPageComponent },
          { path: '', redirectTo: 'activities', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class ProjectManagementRoutingModule { }
