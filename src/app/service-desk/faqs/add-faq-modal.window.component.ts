/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'emp-kb-add-faq-modal-window',
  templateUrl: './add-faq-modal-window.component.html',
  styleUrls: ['./add-faq-modal-window.component.scss']
})
export class AddFAQModalWindowComponent {

  @Output() close = new EventEmitter();

  onClose(): void {
    this.close.emit();
  }

}
