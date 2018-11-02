/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output } from '@angular/core';

import { FAQService } from '@app/services/service-desk';

import { EmptyFaq } from '@app/models/service-desk';


@Component({
  selector: 'add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss'],
  providers: [FAQService]
})
export class AddFAQComponent {

  public faq = EmptyFaq();

  @Output() public onAddFaq = new EventEmitter();

  constructor(private faqService: FAQService) { }


  public async onSaveFAQ() {
    if (!this.validate()) {
      return;
    }
    await this.addFAQ();

    this.cleanFAQ();
  }


  private validate(): boolean {
    if (this.faq.question === '') {
      alert('Uts!!!, la pregunta se encuentra en blanco...');
      return false;
    }
    if (this.faq.answer === '') {
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
    this.faqService.addFAQ(this.faq)
      .subscribe((x) => {
        alert("!Se agregó la pregunta!");
        this.onAddFaq.emit();
      });
  }


  private cancel(): void {
    this.onAddFaq.emit();
  }


  private cleanFAQ(): void {
    this.faq = EmptyFaq();
  }

}
