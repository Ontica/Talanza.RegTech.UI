/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MultiProjectsMainPageComponent, ProjectFilesMainPageComponent } from '@app/project-management';


const routes: Routes = [
  { path: 'tasks', component: MultiProjectsMainPageComponent },
  { path: 'gantt', component: MultiProjectsMainPageComponent },
  { path: 'files', component: ProjectFilesMainPageComponent },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
