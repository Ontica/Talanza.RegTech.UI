/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, EventEmitter, Output } from '@angular/core';

import { EventInfo } from '@app/core/data-types';
import { DataObject } from '@app/models/data-objects';

import { StepRequirement } from '@app/models/steps';


@Component({
  selector: 'emp-steps-requirements-list',
  templateUrl: './requirements-list.component.html'
})
export class RequirementsListComponent {

  @Input() requirementsList: StepRequirement[] = [];

  @Input() readonly = false;

  @Output() listEvent = new EventEmitter<EventInfo>();

  showTemplateViewer = false;

  selectedDataObject: DataObject;

  onDeleteRequirement(requirement: StepRequirement) {
   const event = {
      type: 'deleteRequirement',
      payload: {
        requirement
      }
    };

    this.listEvent.emit(event);
  }


  onSelectRequirement(requirement: StepRequirement) {
    const event = {
      type: 'selectRequirement',
      payload: {
        requirement
      }
    };

    this.listEvent.emit(event);
  }

  onSelectDataObject(dataObject: DataObject) {
    const event = {
      type: 'dataObjectSelected',
      payload: {
        dataObject
      }
    };

    this.listEvent.emit(event);
  }

  selectTemplate(dataObject: DataObject) {
    this.selectedDataObject = dataObject;
    this.showTemplateViewer = true;
  }

  hideTemplateViewer() {
    this.showTemplateViewer = false;
  }

}
