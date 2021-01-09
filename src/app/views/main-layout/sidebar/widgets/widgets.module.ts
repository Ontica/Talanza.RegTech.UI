/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../../../../shared/angular-material.module';

import { ProcessSelectorComponent } from './process-selector/process-selector.component';
import { ProjectSelectorComponent } from './project-selector/project-selector.component';
import { ProjectsListSelectorComponent } from './projects-list-selector/projects-list-selector.component';
import {
  ResponsiblesListSelectorComponent
} from './responsibles-list-selector/responsibles-list-selector.component';
import { ThemesListSelectorComponent } from './themes-list-selector/themes-list-selector.component';
import { TagsListSelectorComponent } from './tags-list-selector/tags-list-selector.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    AngularMaterialModule
  ],

  declarations: [
    ProcessSelectorComponent,
    ProjectSelectorComponent,
    ProjectsListSelectorComponent,
    ResponsiblesListSelectorComponent,
    TagsListSelectorComponent,
    ThemesListSelectorComponent,
  ],

  exports: [
    ProcessSelectorComponent,
    ProjectSelectorComponent,
    ProjectsListSelectorComponent,
    ResponsiblesListSelectorComponent,
    TagsListSelectorComponent,
    ThemesListSelectorComponent
  ]

})
export class WidgetsModule { }
