/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Posting } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-item-editor',
  templateUrl: './kb-item-editor.component.html',
  styleUrls: ['../../../styles/card.scss']
})
export class KBItemEditorComponent {

  @Input() document: Posting;

  @Output() kbItemEditorClose = new EventEmitter();


  onClose() {
    this.kbItemEditorClose.emit();
  }

}
