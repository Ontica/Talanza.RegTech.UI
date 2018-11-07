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

  public faqs: Posting[] = [];
  public pendingFaqs: Posting[] = [];
  public activeFaqs: Posting[] = [];
  public selectedFaqUID = '';
  public isOpenAddFAQWindow = false;
  public filter = 'all';

  public keywords = '';

  @Output() public onSelectedFAQ = new EventEmitter<string>();

  constructor(private faqService: PostingsService) { }

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
    this.faqService.getPostingsList(this.keywords)
      .subscribe((faqs) => {
      this.faqs = faqs;
        this.pendingFaqs = faqs.filter((x) => x.status !== "Active");
        this.activeFaqs = faqs.filter((x) => x.status === "Active");

      });
  }

}
