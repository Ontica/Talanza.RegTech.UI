/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Document } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['../../../styles/card.scss']
})
export class DocumentEditorComponent {

  @Input() document: Document;

  @Output() documentEditorClose = new EventEmitter();


  onClose() {
    this.documentEditorClose.emit();
  }

}
