/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ControlsModule } from '../controls/controls.module';
import { GlobalSearchModule } from '../global-search/global-search.module';

import { CoreModule } from '../core/core.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';

import { NavbarComponent } from './navbar/navbar.component';
import { NoContentComponent } from './no-content/no-content.component';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule, ControlsModule, GlobalSearchModule, CoreModule],
  declarations: [MainLayoutComponent, NavbarComponent, NoContentComponent],
  exports: [MainLayoutComponent, NoContentComponent],

})
export class SharedModule { }
