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
  selector: 'emp-kb-update-faq',
  templateUrl: './faq-editor.component.html',
  styleUrls: ['./faq-editor.component.scss']
})
export class FaqEditorComponent {

  @Input()
  set faq(faq: Posting) {
    this._faq = faq;
  }
  get faq(): Posting {
    return this._faq;
  }
  private _faq = EmptyPosting();

  @Output() close = new EventEmitter();


  constructor(private faqService: PostingsService) { }


  onClose() {
    this.close.emit();
  }


  onUpdate() {
    if (!this.validate()) {
      return;
    }

    this.update();

    this.clean();
  }


  private clean() {
    this.faq = EmptyPosting();
  }


  private update() {
    this.faqService.updatePosting(BASE_OBJECT_UID, this.faq)
      .subscribe((x) => this.close.emit());
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
      alert('Requiero se seleccione de la lista la visibilidad que tendrá ' +
            'la pregunta dentro de la base de conocimiento.');
      return false;
    }
    if (this.faq.status === '') {
      alert('Para llevar un buen control, necesito se proporcione el estado de la pregunta.');
      return false;
    }

    return true;
  }

}
