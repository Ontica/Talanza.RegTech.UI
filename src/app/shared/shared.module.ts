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

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainMenuComponent } from './main-layout/main-menu/main-menu.component';

import { NavigationHeaderComponent } from './nav-header/nav-header.component';
import { NavigationMenuComponent } from './nav-menu/nav-menu.component';

import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageBoxService } from './message-box/message.box.service';

import { NoContentComponent } from './no-content/no-content.component';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

import { SharedService } from './shared.service';


@NgModule({

  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    AngularMaterialModule,

    ControlsModule
  ],

  declarations: [
    MainLayoutComponent,
    MainMenuComponent,
    MessageBoxComponent,
    NavigationHeaderComponent,
    NavigationMenuComponent,
    NoContentComponent,
    SafeHtmlPipe,
    SpinnerComponent,
  ],

  exports: [
    MainLayoutComponent,
    MessageBoxComponent,
    NavigationHeaderComponent,
    NoContentComponent,
    SafeHtmlPipe,
    SpinnerComponent
  ],

  providers: [
    MessageBoxService,
    SharedService,
    SpinnerService
  ],

  entryComponents: [
    MessageBoxComponent
  ]

})
export class SharedModule { }
