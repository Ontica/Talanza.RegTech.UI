/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { AngularFlexLayoutModule } from '@app/shared/angular-flex-layout.module';

import { WidgetsModule } from './widgets/widgets.module';

import { SidebarComponent } from './sidebar.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,

    AngularMaterialModule,
    AngularFlexLayoutModule,
    WidgetsModule,
  ],

  declarations: [
    SidebarComponent
  ],

  exports: [
    SidebarComponent,
    WidgetsModule
  ],

  providers: []

})
export class SidebarModule { }
