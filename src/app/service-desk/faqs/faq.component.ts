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
  selector: 'faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent {

  private _faqUID = '';
  @Input()
  set faqUID(faqUID: string) {
    this._faqUID = faqUID;

    this.loadFaq();
  }
  get faqUID(): string {
    return this._faqUID;
  }

  faq: Posting;
  isOpenFAQEditor = false;
  operations = OPERATIONS;

  constructor(private faqService: PostingsService) { }

  onOpenFAQEditor(): void {
    this.isOpenFAQEditor = true;
  }

  onEditedFAQ(): void {
    this.isOpenFAQEditor = false;

    this.loadFaq();
  }

  private loadFaq(): void {
    this.faqService.getPosting(BASE_OBJECT_UID, this.faqUID)
                   .subscribe((faq) => { this.faq = faq; });
  }

  onChangeOperation(operation: string): void {

  }


}
