/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardSettings } from '@app/shared/common-models';

import { EmptyStep, Step } from '@app/models/steps';
import { EventInfo } from '@app/core';


export enum StepsDesignerEventType {
  EDITOR_CLOSED  = 'StepsListComponent.Event.CreateStepClicked',
  STEP_DELETED   = 'StepsListComponent.Event.FilterChanged',
  STEP_UPDATED   = 'StepsListComponent.Event.StepSelected'
}


@Component({
  selector: 'emp-steps-designer',
  templateUrl: './steps-designer.component.html',
  styleUrls: ['./steps-designer.component.scss']
})
export class StepsDesignerComponent {

  @Input() step: Step = EmptyStep;
  @Input() settings = new CardSettings();

  @Output() stepsDesignerEvent = new EventEmitter<EventInfo>();


  onClose() {
    this.sendEvent(StepsDesignerEventType.EDITOR_CLOSED)
  }

  onDelete() {
    this.sendEvent(StepsDesignerEventType.STEP_DELETED)
  }

  onUpdate() {
    this.sendEvent(StepsDesignerEventType.STEP_UPDATED)
  }

  // private methods

  private sendEvent(eventType: StepsDesignerEventType, payload?: any) {
    const event: EventInfo = {
      type: eventType,
      payload
    };

    this.stepsDesignerEvent.emit(event);
  }

}
