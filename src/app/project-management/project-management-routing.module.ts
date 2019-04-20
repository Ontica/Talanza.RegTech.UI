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
          { path: 'my-tasks', component: ProjectsMainPageComponent, },
          { path: 'activities', component: ProjectsMainPageComponent },
          { path: 'timelines', component: ProjectsMainPageComponent },
          { path: 'documents', component: ProjectsMainPageComponent },
          { path: '', redirectTo: 'my-tasks', pathMatch: 'full' }
        ]
      },
      {
        path: 'home', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'Timelines' },
        children: [
          { path: 'my-tasks', component: ProjectsMainPageComponent, },
          { path: 'activities', component: ProjectsMainPageComponent },
          { path: 'timelines', component: ProjectsMainPageComponent },
          { path: 'documents', component: ProjectsMainPageComponent },
          { path: '', redirectTo: 'my-tasks', pathMatch: 'full' }
        ]
      },
      {
        path: 'regulatory-processes', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'ProjectsTemplates' },
        children: [
          { path: '', component: TemplatesMainPageComponent }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class ProjectManagementRoutingModule { }
