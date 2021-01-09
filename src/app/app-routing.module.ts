/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoContentComponent } from './views/main-layout/no-content.component';

// import { SecurityGuardService } from './core';
// import { MainLayoutComponent, NoContentComponent } from './shared/';


const routes: Routes = [
  {
    path: 'security',
    loadChildren: () => import('./security-ui/security-ui.module')
                            .then(m => m.SecurityUIModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NoContentComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
