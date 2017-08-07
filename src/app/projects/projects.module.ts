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

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { GanttComponent } from './components/gantt.component';


import { ProjectsRoutingModule } from './projects-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ProjectsRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [ProjectsMainPageComponent, GanttComponent],
  exports: [ProjectsMainPageComponent]
})
export class ProjectsModule { }
