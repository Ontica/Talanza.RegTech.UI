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

// Procedure viewer components

import { ProcedureViewerComponent } from './viewer/procedure-viewer.component';
import { PVGeneralInfoComponent } from './viewer/sections/pv-general-info.component';
import { PVRequirementsComponent } from './viewer/sections/pv-requirements.component';

// Procedure edition components

import { AddRequirementListTabComponent } from './editor/tabs/add-requirement-list-tab.component';
import { AddRequirementTabComponent } from './editor/tabs/add-requirement-tab.component';
import { FilingConditionsTabComponent } from './editor/tabs/filing-conditions-tab.component';
import { FilingFeeTabComponent } from './editor/tabs/filing-fee-tab.component';
import { GeneralInfoTabComponent } from './editor/tabs/general-info-tab.component';
import { PERequirementsComponent } from './editor/sections/pe-requirements.component';
import { ProcedureEditorComponent } from './editor/procedure-editor.component';

import { RequirementGridComponent } from './editor/requirement-grid.component';
import { RequirementsTabComponent } from './editor/tabs/requirements-tab.component';
import { RequirementTabComponent } from './editor/tabs/requirement-tab.component';
import { StatusTabComponent } from './editor/tabs/status-tab.component';

// Procedures main page components

import { ProceduresMainPageComponent } from './main-page/procedures-main-page.component';
import { ProcedureFilterComponent } from './main-page/procedures-filter.component';
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
    ProcedureViewerComponent,
    PVGeneralInfoComponent,
    PVRequirementsComponent,

    AddRequirementListTabComponent,
    AddRequirementTabComponent,
    FilingConditionsTabComponent,
    FilingFeeTabComponent,
    GeneralInfoTabComponent,
    PERequirementsComponent,
    ProcedureEditorComponent,
    ProcedureFilterComponent,

    ProceduresMainPageComponent,
    ProceduresTableViewComponent,
    RequirementGridComponent,
    RequirementsTabComponent,
    RequirementTabComponent,
    StatusTabComponent
  ],

  exports: [
    ProcedureViewerComponent,

    PERequirementsComponent,
    ProceduresMainPageComponent,
    ProceduresTableViewComponent
  ]

})
export class ProceduresModule { }
