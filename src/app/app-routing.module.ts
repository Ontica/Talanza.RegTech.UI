/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityGuardService } from './core';

import { MainLayoutComponent, NoContentComponent } from './views/main-layout';


const routes: Routes = [
  {
    path: 'home',
    component: MainLayoutComponent,
    canActivate: [SecurityGuardService],
    loadChildren: () => import('./views/home/home.module')
                            .then(m => m.HomeModule)
  },
  {
    path: 'library',
    component: MainLayoutComponent,
    canActivate: [SecurityGuardService],
    loadChildren: () => import('./views/library/library.module')
                            .then(m => m.LibraryModule)
  },
  {
    path: 'contracts',
    component: MainLayoutComponent,
    canActivate: [SecurityGuardService],
    loadChildren: () => import('./views/contracts/contracts.module')
                            .then(m => m.ContractsModule)
  },
  {
    path: 'procedures',
    component: MainLayoutComponent,
    canActivate: [SecurityGuardService],
    loadChildren: () => import('./views/procedures/procedures.module')
                            .then(m => m.ProceduresModule)
  },
  {
    path: 'search',
    component: MainLayoutComponent,
    canActivate: [SecurityGuardService],
    loadChildren: () => import('./views/global-search/global-search.module')
                            .then(m => m.GlobalSearchModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./views/security/security-ui.module')
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
