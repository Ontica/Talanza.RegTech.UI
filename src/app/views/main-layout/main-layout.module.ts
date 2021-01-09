/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { AngularFlexLayoutModule } from '@app/shared/angular-flex-layout.module';

import { SharedModule } from '@app/shared/shared.module';

// import { SharedFormControlsModule } from '@app/shared/form-controls/shared-form-controls.module';
// import { SharedIndicatorsModule } from '@app/shared/indicators/shared-indicators.module';

import { MainLayoutComponent } from './main-layout.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { NavigationHeaderComponent } from './nav-header/nav-header.component';
import { NavigationMenuComponent } from './nav-menu/nav-menu.component';
import { NoContentComponent } from './no-content.component';
import { SidebarModule } from './sidebar/sidebar.module';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,

    AngularMaterialModule,
    AngularFlexLayoutModule,

    SharedModule,

    SidebarModule

    // SharedIndicatorsModule,
    // SharedFormControlsModule
  ],

  declarations: [
    MainLayoutComponent,
    MainMenuComponent,
    NavigationHeaderComponent,
    NavigationMenuComponent,
    NoContentComponent,
  ],

  exports: [
    MainLayoutComponent,
    NoContentComponent
  ],

  providers: []

})
export class MainLayoutModule { }
