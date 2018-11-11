/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output } from '@angular/core';

import { PostingsService } from '@app/services/knowledge-base';

import { EmptyPosting, BASE_OBJECT_UID } from '@app/models/knowledge-base';


@Component({
  selector: 'add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFAQComponent {

  faq = EmptyPosting();

  @Output() onAddFaq = new EventEmitter();

  constructor(private faqService: PostingsService) { }


  async onSaveFAQ() {
    if (!this.validate()) {
      return;
    }
    await this.addFAQ();

    this.cleanFAQ();
  }


  private validate(): boolean {
    if (this.faq.title === '') {
      alert('Uts!!!, la pregunta se encuentra en blanco...');
      return false;
    }
    if (this.faq.body === '') {
      alert('Uts!!!, la respuesta se encuentra en blanco...');
      return false;
    }
    if (this.faq.accessMode === '') {
      alert('Uts!!!, No has seleccionado la visibilidad');
      return false;
    }
    if (this.faq.status === '') {
      alert('Uts!!!, No has seleccionado el status');
      return false;
    }
    return true;
  }


  private addFAQ(): void {
    this.faqService.createPosting(BASE_OBJECT_UID, this.faq)
      .subscribe((x) => {
        this.onAddFaq.emit();
      });
  }


  private cancel(): void {
    this.onAddFaq.emit();
  }


  private cleanFAQ(): void {
    this.faq = EmptyPosting();
  }

}
