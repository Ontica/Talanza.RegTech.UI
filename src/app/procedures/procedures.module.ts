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

import { ProcedureFilterComponent } from './main-page/procedures-filter.component';
import { ProceduresMainPageComponent } from './main-page/procedures-main-page.component';

import { ProcedureEditorComponent } from './editor/procedure-editor.component';
import { GeneralInfoTabComponent } from './editor/tabs/general-info-tab.component';
import { RequirementsTabComponent } from './editor/tabs/requirements-tab.component';
import { FilingConditionsTabComponent } from './editor/tabs/filing-conditions-tab.component';
import { FilingFeeTabComponent } from './editor/tabs/filing-fee-tab.component';
import { StatusTabComponent } from './editor/tabs/status-tab.component';
import { AddRequirementTabComponent } from './editor/tabs/add-requirement-tab.component';
import { AddRequirementListTabComponent } from './editor/tabs/add-requirement-list-tab.component';
import { RequirementTabComponent } from './editor/tabs/requirement-tab.component';
import { RequirementGridComponent } from './editor/requirement-grid.component';

import { ProcedureViewerComponent } from './viewer/procedure-viewer.component';
import { PVGeneralInfoComponent } from './viewer/sections/pv-general-info.component';
import { PVRequirementsComponent } from './viewer/sections/pv-requirements.component';

import { PERequirementsComponent } from './editor/sections/pe-requirements.component';

import { ProceduresRoutingModule } from './procedures-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
	imports: [ProceduresRoutingModule, SharedModule, CommonModule, FormsModule],
	declarations: [ProceduresMainPageComponent, ProcedureFilterComponent, ProcedureEditorComponent,
								 GeneralInfoTabComponent, RequirementsTabComponent, FilingConditionsTabComponent,
								 FilingFeeTabComponent, StatusTabComponent, AddRequirementTabComponent,
								 AddRequirementListTabComponent, RequirementTabComponent,  RequirementGridComponent,
								 ProcedureViewerComponent, PVGeneralInfoComponent, PVRequirementsComponent],
	exports: [ProceduresMainPageComponent, ProcedureViewerComponent]
})
export class ProceduresModule { }
