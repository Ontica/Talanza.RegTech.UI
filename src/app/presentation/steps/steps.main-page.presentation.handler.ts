/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, Command } from '@app/core';

import { AbstractPresentationHandler, StateValues } from '@app/core/presentation/presentation.handler';

import { StepsDesignService } from '@app/data-services/steps';

import { EmptyStep, EmptyStepsListFilter, StepsListFilter } from '@app/models/steps';


export enum ActionType {
  SELECT_STEP = 'Steps.StepsMainPage.Action.SelectStep',
  SET_LIST_FILTER = 'Steps.StepsMainPage.Action.SetListFilter',
  UNSELECT_STEP = 'Steps.StepsMainPage.Action.UnselectStep'
}


export enum CommandType {
  NONE = '',
}


export enum EffectType {
  SET_LIST_FILTER = ActionType.SET_LIST_FILTER
}


export enum SelectorType {
  STEPS_LIST = "Steps.StepsMainPage.Selectors.StepsList",
  LIST_FILTER = 'Steps.StepsMainPage.Selectors.ListFilter',
  SELECTED_STEP = 'Steps.StepsMainPage.Selectors.SelectedStep'
}


const initialState: StateValues = [
  { key: SelectorType.LIST_FILTER, value: EmptyStepsListFilter },
  { key: SelectorType.SELECTED_STEP, value: EmptyStep },
  { key: SelectorType.STEPS_LIST, value: [] }
];


@Injectable()
export class StepsMainPagePresentationHandler extends AbstractPresentationHandler {

  constructor(private data: StepsDesignService) {
    super({
      initialState,
      selectors: SelectorType,
      actions: ActionType,
      effects: EffectType
    });
  }


  select<U>(selectorType: SelectorType, params?: any): Observable<U> {
    switch (selectorType) {

      case SelectorType.STEPS_LIST:
        return super.select<U>(selectorType);

      case SelectorType.LIST_FILTER:
        return super.select<U>(selectorType);

      case SelectorType.SELECTED_STEP:
        return super.select<U>(selectorType);

      default:
        return super.select<U>(selectorType, params);

    }
  }


  applyEffects(effectType: EffectType, params?: any): void {
    switch (effectType) {

      case EffectType.SET_LIST_FILTER:
        const filter = this.getValue<StepsListFilter>(SelectorType.LIST_FILTER);

        const stepsList = this.data.stepsList(filter);

        this.setValue(SelectorType.STEPS_LIST, stepsList);

        this.dispatch(ActionType.UNSELECT_STEP);

        return;
      default:
        throw this.unhandledCommandOrActionType(effectType);
    }
  }


  execute<T>(command: Command): Promise<T> {
    throw this.unhandledCommand(command);
  }


  dispatch(actionType: ActionType, params?: any): void {
    switch (actionType) {

      case ActionType.SELECT_STEP:
        Assertion.assertValue(params.step.uid, 'params.step.uid');

        const step = this.data.getStep(params.step.uid);

        this.setValue(SelectorType.SELECTED_STEP, step);

        return;

      case ActionType.UNSELECT_STEP:
        this.setValue(SelectorType.SELECTED_STEP, EmptyStep);

        return;

      case ActionType.SET_LIST_FILTER:
        Assertion.assertValue(params.filter, 'params.filter');

        const filter = Object.assign({}, this.getValue(SelectorType.LIST_FILTER), params.filter);

        this.setValue(SelectorType.LIST_FILTER, filter);

        return;

      default:
        throw this.unhandledCommandOrActionType(actionType);
    }
  }

}
