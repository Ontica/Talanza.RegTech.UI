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

import { DatepickerComponent } from './datepicker/datepicker.component';
import { FileControlComponent } from './file-control/file-control.component';

import { CardComponent } from './card/card.component';

import { ContactsPickerComponent } from './contacts-picker/contacts-picker.component';
import { InlineEditorComponent } from './inline-editor/inline-editor.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ModalWindowComponent } from './modal-window';
import { ObjectComponent } from './object/object.component';
import { RagStatusComponent } from './rag-status/rag-status.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SearchBoxComponent } from './search-box/search-box.component';

import { AngularMaterialModule } from './angular-material.module';

import { MessageBoxService } from './message-box/message.box.service';
import { SharedService } from './shared.service';

import { SharedIndicatorsModule } from './indicators/shared-indicators.module';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    AngularMaterialModule,

    SharedIndicatorsModule
  ],

  declarations: [
    DatepickerComponent,
    FileControlComponent,

    CardComponent,
    ContactsPickerComponent,
    InlineEditorComponent,
    MessageBoxComponent,
    ModalWindowComponent,
    ObjectComponent,
    RagStatusComponent,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchBoxComponent
  ],

  exports: [
    SharedIndicatorsModule,

    CardComponent,
    DatepickerComponent,
    ContactsPickerComponent,
    FileControlComponent,
    InlineEditorComponent,
    MessageBoxComponent,
    ModalWindowComponent,
    ObjectComponent,
    RagStatusComponent,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchBoxComponent
  ],

  providers: [
    MessageBoxService,
    SharedService
  ],

  entryComponents: [
    MessageBoxComponent
  ]

})
export class SharedModule { }
