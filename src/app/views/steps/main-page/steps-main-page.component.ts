/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { View } from '@app/views/main-layout';

import { EmptyStep, EmptyStepsListFilter, Step } from '@app/models/steps';

import { MainUIStateSelector,
         StepsMainPageAction, StepsMainPageSelector } from '@app/core/presentation/presentation-types';

import { StepsListEventType } from '../list/steps-list.component';
import { Assertion, EventInfo, isEmpty } from '@app/core';
import { StepsDesignerEventType } from '../designer/steps-designer.component';


@Component({
  selector: 'emp-steps-main-page',
  templateUrl: './steps-main-page.component.html',
  styleUrls: ['./steps-main-page.component.scss']
})
export class StepsMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;

  stepsList: Step[] = [];

  selectedStep = EmptyStep;

  private subscriptionHelper: SubscriptionHelper;

  constructor(private uiLayer: PresentationLayer) {
    this.subscriptionHelper = uiLayer.createSubscriptionHelper();
  }

  ngOnInit() {
    this.subscriptionHelper.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .subscribe(x => this.onCurrentViewChanged(x));

    this.subscriptionHelper.select<Step[]>(StepsMainPageSelector.STEPS_LIST)
      .subscribe(x => this.stepsList = x);

    this.subscriptionHelper.select<Step>(StepsMainPageSelector.SELECTED_STEP)
      .subscribe(x => this.showEditor(x));

  }

  ngOnDestroy() {
    this.subscriptionHelper.destroy();
  }

  onStepsListEvent(event: EventInfo): void {
    switch (event.type as StepsListEventType) {

      case StepsListEventType.CREATE_STEP_CLICKED:
        return;

      case StepsListEventType.FILTER_CHANGED:
        return this.applyStepsListFilter(event.payload);

      case StepsListEventType.STEP_SELECTED:
        return this.uiLayer.dispatch(StepsMainPageAction.SELECT_STEP, {'step': event.payload.step});

      default:
        throw Assertion.assertNoReachThisCode(`Unhandled StepsListEventType '${event.type}'.`);
    }
  }

  onStepsDesignerEvent(event: any) {
    switch (event.type as StepsDesignerEventType) {

      case StepsDesignerEventType.EDITOR_CLOSED:
        this.displayEditor = false;
        this.selectedStep = EmptyStep;
        return;

      case StepsDesignerEventType.STEP_DELETED:
        return

      case StepsDesignerEventType.STEP_UPDATED:
        return

      default:
        throw Assertion.assertNoReachThisCode(`Unhandled StepsListEventType '${event.type}'.`);
    }
  }

  // private methods

  private applyStepsListFilter(filter?: { keywords: string }) {

    if (!filter) {
      filter = EmptyStepsListFilter;
    }

    this.uiLayer.dispatch(StepsMainPageAction.SET_LIST_FILTER, { filter });

    // const currentKeywords =
    //     this.uiLayer.selectValue<TransactionFilter>(TransactionStateSelector.LIST_FILTER).keywords;

    // const filter: TransactionFilter = {
    //   stage: mapTransactionStageFromViewName(this.currentView.name),
    //   status: mapTransactionStatusFromViewName(this.currentView.name),
    //   keywords: data ? data.keywords : currentKeywords,
    // };

    // this.isLoading = true;

    // this.uiLayer.dispatch(TransactionAction.SET_LIST_FILTER, { filter });
  }

  private onCurrentViewChanged(newView: View) {
    this.currentView = newView;
    this.applyStepsListFilter();
  }

  private showEditor(step: Step) {
    if (!isEmpty(step)) {
      this.selectedStep = step;
      this.displayEditor = true;
    }
  }

}
