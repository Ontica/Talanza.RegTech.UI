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

import { CalendarControl } from './calendar/calendar-control';
import { ModalWindow } from './modal-window/modal-window';
import { PdfViewer } from './pdf-viewer/pdf-viewer';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url/safe-url.pipe';
import { RagStatusControl } from './rag-status/rag-status.control';
import { SearchControl } from './search/search.control';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],

  declarations: [
    CalendarControl,
    ModalWindow,
    PdfViewer,
    RagStatusControl,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchControl
  ],

  exports: [
    CalendarControl,
    ModalWindow,
    PdfViewer,
    RagStatusControl,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchControl
  ]

})
export class ControlsModule { }
