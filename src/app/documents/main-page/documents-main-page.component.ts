/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { DocumentService } from '../services/document.service';
import { Document, DocumentFilter } from '../data-types/document';

@Component({
  selector:'documents-main-page',
  templateUrl:'./documents-main-page.component.html',
  styleUrls: ['./documents-main-page.component.scss'],
  providers: [DocumentService]
})
export class DocumentsMainPageComponent implements OnInit {

  public documentsList: Document[] = [];
  public filter = new DocumentFilter();

  constructor(private documentService: DocumentService) { }

  public ngOnInit() {
    this.loadDocumentsList();
  }

  public onChangeFilter() {
    this.loadDocumentsList()
  }

  public onResetFilter() {
    this.filter = new DocumentFilter();

    this.loadDocumentsList();
  }

  public openExternalWindow(url:string): void {
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }

  private loadDocumentsList() {
    this.documentService.getDocuments(this.filter)
                        .then((list) => this.documentsList = list);
  }

}
