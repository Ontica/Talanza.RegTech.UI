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

import { ProjectManagerLayoutComponent } from '../project-manager/main-page/project-manager-layout.component';

import { ProjectManagerRoutingModule } from './project-manager-routing.module';
import { KanbanComponent } from './kanban/kanban.component';
import { KanbanTaskBoxComponent } from './kanban/kanban-task-box.component';

import { TreeViewProjectsComponent } from './editor/tree-view-projects.component';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ProjectManagerRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [ProjectManagerLayoutComponent, KanbanComponent, KanbanTaskBoxComponent,
                TreeViewProjectsComponent],
  exports: [ProjectManagerLayoutComponent]
})
export class ProjectManagerModule { }
