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

import { AngularMaterialModule } from '../angular-material.module';

import { ProjectSelectorComponent } from './project-selector/project-selector.component';
import { ProjectsListSelectorComponent } from './projects-list-selector/projects-list-selector.component';
import { ResponsiblesListSelectorComponent } from './responsibles-list-selector/responsibles-list-selector.component';

import { ThemesListSelectorComponent } from './themes-list-selector/themes-list-selector.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    AngularMaterialModule
  ],

  declarations: [
    ProjectSelectorComponent,
    ProjectsListSelectorComponent,
    ResponsiblesListSelectorComponent,
    ThemesListSelectorComponent
  ],

  exports: [
    ProjectSelectorComponent,
    ProjectsListSelectorComponent,
    ResponsiblesListSelectorComponent,
    ThemesListSelectorComponent
  ]

})
export class WidgetsModule { }
