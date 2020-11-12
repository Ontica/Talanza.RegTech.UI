/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { WidgetsModule } from '@app/shared/widgets/widgets.module';

import { SharedModule } from '@app/shared/shared.module';

import { FaqEditorComponent } from './faqs/faq-editor.component';
import { FaqListComponent } from './faqs/faq-list.component';
import { FaqViewerComponent } from './faqs/faq-viewer.component';

import { FileEditorComponent } from './files/file-editor/file-editor.component';
import { FileListComponent } from './files/file-list/file-list.component';
import { MediaFileViewerComponent } from './files/media-file-viewer/media-file-viewer.component';

import { PostingsListComponent } from './postings/postings-list.component';
import { PostingsEditorComponent } from './postings/postings-editor.component';

import { KnowledgeBaseMainPageComponent } from './main-page/kb-main-page.component';
import { KBItemEditorComponent } from './editor/kb-item-editor.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,
    WidgetsModule
  ],

  declarations: [
    FaqEditorComponent,
    FaqListComponent,
    FaqViewerComponent,

    FileEditorComponent,
    FileListComponent,
    MediaFileViewerComponent,

    KnowledgeBaseMainPageComponent,
    PostingsEditorComponent,
    PostingsListComponent,

    KBItemEditorComponent
  ],

  exports: [
    FaqListComponent,
    FaqViewerComponent,

    FileEditorComponent,
    FileListComponent,
    MediaFileViewerComponent,

    PostingsEditorComponent,
    PostingsListComponent,
    KBItemEditorComponent,

  ],

  entryComponents: [
    FileEditorComponent
  ]

})
export class KnowledgeBaseModule { }
