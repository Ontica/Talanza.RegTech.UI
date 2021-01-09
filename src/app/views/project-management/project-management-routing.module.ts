/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';

import { ProjectFilesMainPageComponent } from './project-files-main-page/project-files-main-page.component';


const routes: Routes = [
  { path: 'activities', component: ProjectsMainPageComponent },
  { path: 'gantt', component: ProjectsMainPageComponent },
  { path: 'timelines', component: ProjectsMainPageComponent },
  { path: 'files', component: ProjectFilesMainPageComponent },
  { path: '', redirectTo: 'activities', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
