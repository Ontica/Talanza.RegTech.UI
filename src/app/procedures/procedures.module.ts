/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { SharedModule } from '@app/shared/shared.module';

import { ProceduresMainPageComponent } from './main-page/procedures-main-page.component';
import { ProcedureFilterComponent } from './main-page/procedures-filter.component';
import { ProcedureViewerComponent } from './viewer/procedure-viewer.component';
import { PVGeneralInfoComponent } from './viewer/sections/pv-general-info.component';
import { PVRequirementsComponent } from './viewer/sections/pv-requirements.component';
import { ProceduresTableViewComponent } from './views/procedures-table-view.component';

import { ProceduresRoutingModule } from './procedures-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,

    AngularMaterialModule,
    SharedModule,

    ProceduresRoutingModule
  ],

  declarations: [
    ProcedureFilterComponent,
    ProceduresMainPageComponent,
    ProceduresTableViewComponent,
    ProcedureViewerComponent,
    PVGeneralInfoComponent,
    PVRequirementsComponent
  ],

  exports: [
    ProceduresMainPageComponent,
    ProceduresTableViewComponent,
    ProcedureViewerComponent
  ]

})
export class ProceduresModule { }
