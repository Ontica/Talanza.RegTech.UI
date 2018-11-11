/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { PostingsService } from '@app/services/knowledge-base';

import { Posting } from '@app/models/knowledge-base';


@Component({
  selector: 'faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FAQsComponent implements OnInit {

  faqs: Posting[] = [];
  pendingFaqs: Posting[] = [];
  activeFaqs: Posting[] = [];
  selectedFaqUID = '';
  isOpenAddFAQWindow = false;
  filter = 'all';

  keywords = '';

  @Output() onSelectedFAQ = new EventEmitter<string>();

  constructor(private faqService: PostingsService) { }

  async ngOnInit() {
    await this.loadFaqs();
  }


  onClickSelectFaq(uid: string): void {
    this.selectedFaqUID = uid;
    this.onSelectedFAQ.emit(this.selectedFaqUID);
  }


  onAddFAQ(): void {
    this.isOpenAddFAQWindow = true;
  }


  search(keywords: string): void {
    this.keywords = keywords;
    this.loadFaqs();
  }


  onFilterBy(filter: string): void {
    this.filter = filter;
  }


  closeAddFAQWindow(): void {
    this.isOpenAddFAQWindow = false;
  }


  private loadFaqs(): void {
    this.faqService.getPostingsList(this.keywords)
      .subscribe((faqs) => {
      this.faqs = faqs;
        this.pendingFaqs = faqs.filter((x) => x.status !== 'Active');
        this.activeFaqs = faqs.filter((x) => x.status === 'Active');

      });
  }

}
