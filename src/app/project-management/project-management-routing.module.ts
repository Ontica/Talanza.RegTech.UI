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
import { TemplatesMainPageComponent } from './templates/templates-main-page.component';

@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'contract-management', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'Projects' },
        children: [
          {
            path: 'activities',
            component: ProjectsMainPageComponent,
            data: { viewName: 'Project.Activities' }
          },
          {
            path: 'gantt',
            component: ProjectsMainPageComponent,
            data: { viewName: 'Project.Gantt' }
          },
          {
            path: 'timelines',
            component: ProjectsMainPageComponent,
            data: { viewName: 'Project.Timelines' }
          },
          {
            path: 'documents',
            component: ProjectsMainPageComponent,
            data: { viewName: 'Project.Documents' }
          },
          {
            path: '',
            redirectTo: 'activities',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'regulatory-processes', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'Processes' },
        children: [
          {
            path: '',
            component: TemplatesMainPageComponent,
            data: { viewName: 'Processes.Tree' }
          }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class ProjectManagementRoutingModule { }
