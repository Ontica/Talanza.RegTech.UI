/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */
import { Component, OnInit } from '@angular/core';

import { DocumentService } from '@app/services/regulation';
import { Document, DocumentFilter } from '@app/models/regulation';

@Component({
  selector: 'emp-gov-documents-main-page',
  templateUrl: './documents-main-page.component.html',
  styleUrls: ['./documents-main-page.component.scss']
})
export class DocumentsMainPageComponent implements OnInit {

  displayEditor = false;
  selectedDocument: Document;

  documentsList: Document[] = [];
  filter = new DocumentFilter();

  constructor(private documentService: DocumentService) { }


  ngOnInit() {
    this.loadDocumentsList();
  }


  onChangeFilter() {
    this.loadDocumentsList();
  }


  onResetFilter() {
    this.filter = new DocumentFilter();

    this.loadDocumentsList();
  }


  onCloseEditor() {
    this.displayEditor = false;
    this.selectedDocument = null;
  }


  selectDocument(document: Document): void {
    // window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
    this.selectedDocument = document;
    this.displayEditor = true;
  }


  private loadDocumentsList() {
    this.documentService.getDocuments(this.filter)
      .then((list) => this.documentsList = list);
  }

}
