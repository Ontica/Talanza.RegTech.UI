/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Posting } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['../../../../styles/grid.scss']
})
export class FaqListComponent {

  @Input() FAQs: Posting[] = [];

  @Output() faqSelect = new EventEmitter<Posting>();

  selectedFAQ: Posting;

  selectFAQ(faq: Posting): void {
    this.selectedFAQ = faq;
    this.faqSelect.emit(faq);
  }

}
