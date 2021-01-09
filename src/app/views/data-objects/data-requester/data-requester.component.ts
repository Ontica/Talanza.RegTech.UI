/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, EventEmitter, Output } from '@angular/core';

import { EventInfo } from '@app/core/data-types';

import { DataObject } from '@app/models/data-objects';


@Component({
  selector: 'emp-data-requester',
  templateUrl: './data-requester.component.html',
  styleUrls: ['../../../../styles/card.scss']
})
export class DataRequesterComponent {

  @Input() dataObject: DataObject;

  @Output() dataObjectEdition = new EventEmitter<EventInfo>();

  onFormEvent(event: EventInfo) {
    console.log('event', event);
  }

}
