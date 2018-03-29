/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProceduresModule } from '../procedures/procedures.module';
import { ControlsModule } from '../controls/controls.module';

import { GlobalSearchRoutingModule } from './global-search-routing.module';
import { GlobalSearchMainPageComponent } from './main-page/gs-main-page.component';

import { ProcedureService } from  '../procedures/services/procedure.service';
import { ContractsService } from '../contracts/services/contracts.service';

import { ContractsModule }  from '../contracts/contracts.module';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
	imports: [GlobalSearchRoutingModule, CommonModule, FormsModule, ProceduresModule, ControlsModule],
	declarations: [GlobalSearchMainPageComponent],
	exports: [GlobalSearchMainPageComponent],
	providers:[ProcedureService, ContractsService]
})
export class GlobalSearchModule { }
