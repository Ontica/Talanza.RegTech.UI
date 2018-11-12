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
  selector: 'emp-kb-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFAQComponent {

  faq = EmptyPosting();

  @Output() close = new EventEmitter();

  constructor(private faqService: PostingsService) { }


  save() {
    if (!this.validate()) {
      return;
    }
    this.add();
    this.clean();
  }


  onCancel(): void {
    this.close.emit();
  }


  private add(): void {
    this.faqService.createPosting(BASE_OBJECT_UID, this.faq)
      .subscribe(x => this.close.emit());
  }


  private clean(): void {
    this.faq = EmptyPosting();
  }


  private validate(): boolean {
    if (this.faq.title === '') {
      alert('La pregunta se encuentra en blanco.');
      return false;
    }
    if (this.faq.body === '') {
      alert('Requiero se proporcione el texto de la respuesta.');
      return false;
    }
    if (this.faq.accessMode === '') {
      alert('Necesito conocer la visibilidad.');
      return false;
    }
    if (this.faq.status === '') {
      alert('Requiero saber el estado.');
      return false;
    }
    return true;
  }

}
