/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';

import { ControlsModule } from '../controls/controls.module';
import { GlobalSearchModule } from '../global-search/global-search.module';

import { CoreModule } from '../core/core.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainMenuComponent } from './main-layout/main-menu/main-menu.component';

import { NavigationHeaderComponent } from './nav-header/nav-header.component';
import { NavigationMenuComponent } from './nav-menu/nav-menu.component';

import { MessageBoxComponent } from './message-box/message-box.component';

import { NoContentComponent } from './no-content/no-content.component';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { MessageBoxService } from './message-box/message.box.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({

  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    AngularMaterialModule,

    ControlsModule,
    GlobalSearchModule,
    CoreModule
  ],

  declarations: [
    MainLayoutComponent,
    MainMenuComponent,
    MessageBoxComponent,
    NavigationHeaderComponent,
    NavigationMenuComponent,

    NoContentComponent,
    SafeHtmlPipe

  ],

  exports: [
    MainLayoutComponent,
    MessageBoxComponent,
    NavigationHeaderComponent,
    NoContentComponent,
    SafeHtmlPipe
  ],

  providers: [
    MessageBoxService
  ],

  entryComponents: [
    MessageBoxComponent
  ]

})
export class SharedModule { }
