/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, EventEmitter, Output } from '@angular/core';

import { EventInfo } from '@app/core/data-types';

import { StepRequirement } from '@app/models/steps';


@Component({
  selector: 'emp-steps-requirements-list',
  templateUrl: './requirements-list.component.html',
  styleUrls: ['../../../../styles/list.scss']
})
export class RequirementsListComponent {

  @Input() requirementsList: StepRequirement[] = [];

  @Input() readonly = false;

  @Output() listEvent = new EventEmitter<EventInfo>();


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

}
