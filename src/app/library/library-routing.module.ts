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

import { LibraryMainPageComponent } from './main-page/library-main-page.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'library', component: MainLayoutComponent,
        canActivate: [SecurityGuardService], data: { layoutType: 'Library' },
        children: [
          { path: '', component: LibraryMainPageComponent, data: { layoutType: 'Library.Main' }}
        ]
      }
    ])],

  exports: [RouterModule]

})
export class LibraryRoutingModule { }
