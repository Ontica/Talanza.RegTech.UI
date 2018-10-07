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
import { TemplatesMainPageComponent } from './templates/templates-main-page.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'projects', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'Projects' },
        children: [
          { path: 'main', component: ProjectsMainPageComponent }
        ]
      },
      {
        path: 'projects-templates', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'ProjectsTemplates' },
        children: [
          { path: 'main', component: TemplatesMainPageComponent }
        ]
      }
    ])],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
