/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DataObject } from '@app/models/steps';


@Component({
  selector: 'emp-steps-step-data-object-designer',
  templateUrl: './step-data-object-designer.component.html',
  styleUrls: ['../../../styles/card.scss']
})
export class StepDataObjectDesignerComponent {

  @Input() dataObject: DataObject;

  @Output() designerClose = new EventEmitter();


  onClose() {
    this.designerClose.emit();
  }

}
