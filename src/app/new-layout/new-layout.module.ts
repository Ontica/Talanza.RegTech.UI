/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { NewLayoutRoutingModule } from './new-layout-routing.module';

import { NewLayoutComponent } from './main-page/new-layout.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [NewLayoutRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [NewLayoutComponent],
  exports: [NewLayoutComponent]
})
export class NewLayoutModule { }
