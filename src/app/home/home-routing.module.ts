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

// import { ProjectsMainPageComponent } from '../project-management/main-page/projects-main-page.component';
import { HomeComponent } from './home.component';

@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'home', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'Home' },
        children: [
          { path: 'my-tasks', component: HomeComponent, data: { viewName: 'Home.MyTasks' }},
          { path: 'timelines', component: HomeComponent, data: { viewName: 'Home.Timelines' }},
          { path: 'documents', component: HomeComponent, data: { viewName: 'Home.Documents' }},
          { path: '', redirectTo: 'my-tasks', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class HomeRoutingModule { }
