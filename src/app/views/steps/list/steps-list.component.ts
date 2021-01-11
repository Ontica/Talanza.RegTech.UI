/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EventInfo } from '@app/core';

import { Step, EmptyStep } from '@app/models/steps';


export enum StepsListEventType {
  CREATE_STEP_CLICKED  = 'StepsListComponent.Event.CreateStepClicked',
  FILTER_CHANGED       = 'StepsListComponent.Event.FilterChanged',
  STEP_SELECTED        = 'StepsListComponent.Event.StepSelected'
}


@Component({
  selector: 'emp-steps-list',
  templateUrl: './steps-list.component.html'
})
export class StepsListComponent {

  @Input() stepsList: Step[] = [];

  @Input() keywords: '';

  @Output() stepsListEvent = new EventEmitter<EventInfo>();

  private selectedStep: Step = EmptyStep;

  isLoading: false;


  isSelected(step: Step): boolean {
    return (step.uid === this.selectedStep.uid);
  }

  onChangeFilter() {
    this.sendEvent(StepsListEventType.FILTER_CHANGED, { keywords: this.keywords });
  }

  onClickNew() {
    this.sendEvent(StepsListEventType.CREATE_STEP_CLICKED);
  }

  onSelect(step: Step) {
    this.selectedStep = step;
    this.sendEvent(StepsListEventType.STEP_SELECTED, { step });
  }

  // private methods

  private sendEvent(eventType: StepsListEventType, payload?: any) {
    const event: EventInfo = {
      type: eventType,
      payload
    };

    this.stepsListEvent.emit(event);
  }

}
