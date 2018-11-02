/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { FAQService } from '@app/services/service-desk';

import { Faq } from '@app/models/service-desk';


const OPERATIONS: string[] = [
  'Agregar FAQ',
]


@Component({
  selector: 'faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [FAQService]
})
export class FAQComponent {

  private _faqUID: string = '';
  @Input()
  set faqUID(faqUID: string) {
    this._faqUID = faqUID;

    this.loadFaq();
  }
  get faqUID(): string {
    return this._faqUID;
  }

  public faq: Faq;
  public isOpenFAQEditor = false;
  public operations = OPERATIONS;

  constructor(private faqService: FAQService) { }

  public onOpenFAQEditor(): void {
    this.isOpenFAQEditor = true;
  }

  public onEditedFAQ(): void {
    this.isOpenFAQEditor = false;

    this.loadFaq();
  }

  private loadFaq(): void {
    this.faqService.getFAQ(this.faqUID)
      .subscribe((faq) => { this.faq = faq; });
  }

  public onChangeOperation(operation: string): void {

  }


}
