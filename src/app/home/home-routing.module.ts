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

import { HomeComponent } from './home.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'home', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'pending-tasks', component: HomeComponent },
          { path: 'tasks-finder', component: HomeComponent },
          { path: 'overall-timelines', component: HomeComponent },
          { path: 'documents-store', component: HomeComponent },
          { path: '', redirectTo: 'pending-tasks', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class HomeRoutingModule { }
