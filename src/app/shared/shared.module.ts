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

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainMenuComponent } from './main-layout/main-menu/main-menu.component';

import { NavigationHeaderComponent } from './nav-header/nav-header.component';
import { NavigationMenuComponent } from './nav-menu/nav-menu.component';

import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageBoxService } from './message-box/message.box.service';

import { NoContentComponent } from './no-content/no-content.component';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

import { SharedService } from './shared.service';


import { CalendarControl } from './calendar/calendar-control';
import { ModalWindow } from './modal-window/modal-window';
import { PdfViewer } from './pdf-viewer/pdf-viewer';

import { RagStatusControl } from './rag-status/rag-status.control';
import { SearchControl } from './search/search.control';


@NgModule({

  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    AngularMaterialModule
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
    CalendarControl,
    ModalWindow,
    PdfViewer,
    RagStatusControl,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchControl
  ],

  exports: [
    MainLayoutComponent,
    MessageBoxComponent,
    NavigationHeaderComponent,
    NoContentComponent,
    SafeHtmlPipe,
    SpinnerComponent,
    CalendarControl,
    ModalWindow,
    PdfViewer,
    RagStatusControl,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchControl
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
