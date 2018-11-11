/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Document } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-documents-table-view',
  templateUrl: './documents-table-view.component.html',
  styleUrls: ['./documents-table-view.component.scss']
})
export class DocumentsTableViewComponent {

  selectedDocumentUID = '';

  @Input() documentsList: Document[] = [];

  @Output() select = new EventEmitter<Document>();


  setSelectedDocument(document: Document): void {
    this.selectedDocumentUID = document.uid;
    this.select.emit(document);
  }

}
