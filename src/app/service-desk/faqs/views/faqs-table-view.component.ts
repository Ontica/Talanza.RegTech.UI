/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Posting } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-faqs-table-view',
  templateUrl: './faqs-table-view.component.html',
  styleUrls: ['./faqs-table-view.component.scss']
})
export class FAQsTableViewComponent {

  @Input() FAQs: Posting[] = [];

  @Output() select = new EventEmitter<string>();

  selectedFAQUID = '';


  selectFAQ(uid: string): void {
    this.selectedFAQUID = uid;
    this.select.emit(uid);
  }

}
