/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { PostingsService } from '@app/services/knowledge-base';

import { DocumentFilter } from '@app/models/regulation';
import { Posting, BASE_OBJECT_UID } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-main-page',
  templateUrl: './kb-main-page.component.html',
  styleUrls: ['./kb-main-page.component.scss']
})
export class KnowledgeBaseMainPageComponent implements OnInit {

  displayEditor = false;
  selectedDocument: Posting;

  documentsList: Posting[] = [];
  filter = new DocumentFilter();

  constructor(private faqService: PostingsService) { }


  ngOnInit() {
    this.loadDocumentsList();
  }


  onChangeFilter() {
    this.loadDocumentsList();
  }


  onCloseEditor() {
    this.displayEditor = false;
    this.selectedDocument = null;
  }


  selectDocument(document: Posting) {
    this.selectedDocument = document;
    this.displayEditor = true;
    console.log('selectedDocument', this.selectedDocument);
  }


  private loadDocumentsList() {
    this.faqService.getPostingsList(BASE_OBJECT_UID, this.filter.keywords)
    .toPromise()
    .then(x => this.documentsList = x);
  }

}
