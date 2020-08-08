/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output } from '@angular/core';


export interface ModalWindowConfig {
  height?: string;
  width?: string;
  maxWidth?: string;
  maxHeight?: string;
  disableClose?: boolean;
}


export const DefaultModalWindowConfig: ModalWindowConfig = {
  height: 'auto',
  width: 'auto',
  maxWidth: '90%',
  maxHeight: '90%',
  disableClose: false
};


@Component({
  selector: 'emp-ng-modal-window',
  templateUrl: './modal-window.html',
  styleUrls: ['./modal-window.scss']
})
export class ModalWindowComponent {

  @Input() title = '';

  @Input() config: ModalWindowConfig = DefaultModalWindowConfig;

  @Output() modalWindowClose = new EventEmitter();

  onClose() {
    this.modalWindowClose.emit();
  }


  onClickOverlay() {
    if (!this.config.disableClose) {
      this.modalWindowClose.emit();
    }
  }

}
