/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PostingsService } from '@app/services/knowledge-base';

import { Posting, EmptyPosting, BASE_OBJECT_UID } from '@app/models/knowledge-base';


@Component({
  selector: 'update-faq',
  templateUrl: './update-faq.component.html',
  styleUrls: ['./update-faq.component.scss']
})
export class UpdateFAQComponent {

  private _faq = EmptyPosting();

  @Input()
  set faq(faq: Posting) {
    this._faq = faq;
  }
  get faq(): Posting {
    return this._faq;
  }

  @Output() public onClose = new EventEmitter();


  constructor(private faqService: PostingsService) { }


  public async onUpdateFAQ() {
    if (!this.validate()) {
      return;
    }

    this.updateFAQ();

    this.cleanFAQ();
  }


  private validate(): boolean {

    if (this.faq.title === '') {
      alert('Requiero el título de la pregunta.');
      return false;
    }
    if (this.faq.body === '') {
      alert('Requiero el texto de la respuesta.');
      return false;
    }
    if (this.faq.accessMode === '') {
      alert('Requiero se seleccione de la lista la visibilidad que tendrá la pregunta dentro de la base de conocimiento.');
      return false;
    }
    if (this.faq.status === '') {
      alert('Para llevar un buen control, necesito se proporcione el estado de la pregunta.');
      return false;
    }

    return true;
  }


  private updateFAQ(): void {
    this.faqService.updatePosting(BASE_OBJECT_UID, this.faq)
      .subscribe((x) => this.onClose.emit());
  }


  private close(): void {
    this.onClose.emit();
  }


  private cleanFAQ(): void {
    this.faq = EmptyPosting();
  }

}
