/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EventInfo } from '@app/core/data-types';

import { DataObject } from '@app/models/data-objects';


@Component({
  selector: 'emp-steps-activity-data-object',
  templateUrl: './activity-data-object.component.html',
  styleUrls: ['../../../styles/card.scss']
})
export class ActivityDataObjectComponent {

  @Input() dataObject: DataObject;

  @Output() designerClose = new EventEmitter();


  onClose() {
    this.designerClose.emit();
  }

  onDataObjectEdition(event: EventInfo) {
    console.log('onDataObjectEdition', event);
  }

}
