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

import { ObligationsFilterComponent } from './main-page/obligations-filter.component';
import { ObligationsMainPageComponent } from './main-page/obligations-main-page.component';

import { ObligationsRoutingModule } from './obligations-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
	imports: [ObligationsRoutingModule, SharedModule, CommonModule, FormsModule],
	declarations: [ObligationsMainPageComponent, ObligationsFilterComponent],
	exports: []
})
export class ObligationsModule { }
