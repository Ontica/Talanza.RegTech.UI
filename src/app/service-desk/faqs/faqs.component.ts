/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { FAQService } from '@app/services/service-desk';

import { Faq } from '@app/models/service-desk';


@Component({
  selector: 'faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  providers: [FAQService]
})
export class FAQsComponent implements OnInit {

  public faqs: Faq[] = [];
  public pendingFaqs: Faq[] = [];
  public activeFaqs: Faq[] = [];
  public selectedFaqUID = '';
  public isOpenAddFAQWindow = false;
  public filter = 'all';

  public keywords = '';

  @Output() public onSelectedFAQ = new EventEmitter<string>();

  constructor(private faqService: FAQService) { }

  async ngOnInit() {
    await this.loadFaqs();
  }


  public onClickSelectFaq(uid: string): void {
    this.selectedFaqUID = uid;
    this.onSelectedFAQ.emit(this.selectedFaqUID);
  }


  public onAddFAQ(): void {
    this.isOpenAddFAQWindow = true;
  }


  public search(keywords: string): void {
    this.keywords = keywords;
    this.loadFaqs();
  }


  public onFilterBy(filter: string): void {
    this.filter = filter;
  }


  public closeAddFAQWindow(): void {
    this.isOpenAddFAQWindow = false;
  }


  private loadFaqs(): void {
    this.faqService.getFAQs(this.keywords)
      .subscribe((faqs) => {
      this.faqs = faqs;
        this.pendingFaqs = faqs.filter((x) => x.status !== "Active");
        this.activeFaqs = faqs.filter((x) => x.status === "Active");

      });
  }

}
