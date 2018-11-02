/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Faq } from '@app/models/service-desk';


@Component({
  selector: 'faqs-table-view',
  templateUrl: './faqs-table-view.component.html',
  styleUrls: ['./faqs-table-view.component.scss']
})
export class FAQsTableViewComponent {

  @Input() FAQs: Faq[] = [];

  @Output() public onSelectFAQ = new EventEmitter<string>();

  public selectedFAQUID = '';


  public selectFAQ(uid: string): void {
    this.selectedFAQUID = uid;
    this.onSelectFAQ.emit(uid);
  }

}
