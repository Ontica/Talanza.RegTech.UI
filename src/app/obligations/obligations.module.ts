/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';

import { ObligationsFilterComponent } from './main-page/obligations-filter.component';
import { ObligationsMainPageComponent } from './main-page/obligations-main-page.component';

import { ObligationsRoutingModule } from './obligations-routing.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    ObligationsRoutingModule
  ],

  declarations: [
    ObligationsFilterComponent,
    ObligationsMainPageComponent
  ],

  exports: []

})
export class ObligationsModule { }
