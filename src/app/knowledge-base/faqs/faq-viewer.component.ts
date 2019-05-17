/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { PostingsService } from '@app/services/knowledge-base';

import { Posting, BASE_OBJECT_UID } from '@app/models/knowledge-base';


const OPERATIONS: string[] = [
  'Agregar FAQ',
];


@Component({
  selector: 'emp-kb-faq-viewer',
  templateUrl: './faq-viewer.component.html',
  styleUrls: ['./faq-viewer.component.scss']
})
export class FaqViewerComponent {

  @Input() faq: Posting;

  isOpenFAQEditor = false;
  operations = OPERATIONS;


  onOpenFAQEditor(): void {
    this.isOpenFAQEditor = true;
  }

  onEditedFAQ(): void {
    this.isOpenFAQEditor = false;
  }

  onChangeOperation(operation: string): void {

  }


}
