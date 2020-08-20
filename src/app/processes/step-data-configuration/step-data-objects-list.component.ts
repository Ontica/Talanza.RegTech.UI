/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, EventEmitter, Output } from '@angular/core';

import { EventInfo } from '@app/core/data-types';

import { DataObject } from '@app/models/steps';


@Component({
  selector: 'emp-steps-step-data-objects-list',
  templateUrl: './step-data-objects-list.component.html',
  styleUrls: ["../../../styles/list.scss"]
})
export class StepDataObjectsListComponent {

  @Input() dataObjects: DataObject[] = [];

  @Output() listEvent = new EventEmitter<EventInfo>();


  onDeleteDataObject(dataObject: DataObject) {
   const event = {
      type: 'deleteDataObject',
      payload: {
        dataObject
      }
    };

    this.listEvent.emit(event);
  }


  onSelectDataObject(dataObject: DataObject) {
    const event = {
      type: 'selectDataObject',
      payload: {
        dataObject
      }
    };

    this.listEvent.emit(event);
  }

}
