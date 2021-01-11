/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { DefaultSidebarValues, MainSidebarValues, View } from '@app/views/main-layout';

import { EmptyStep, EmptyStepsListFilter, Step, StepsListFilter, StepsListType } from '@app/models/steps';

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

  allStepsList: Step[] = [];

  stepsList: Step[] = [];

  selectedStep = EmptyStep;

  private subscriptionHelper: SubscriptionHelper;

  sidebarFilter: MainSidebarValues = DefaultSidebarValues;

  filter: StepsListFilter;

  constructor(private uiLayer: PresentationLayer) {
    this.subscriptionHelper = uiLayer.createSubscriptionHelper();
  }

  ngOnInit() {
    this.subscriptionHelper.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .subscribe(x => this.onCurrentViewChanged(x));

    this.subscriptionHelper.select<MainSidebarValues>(MainUIStateSelector.SIDEBAR_VALUES)
      .subscribe(x => {
        this.sidebarFilter = x;
        this.applySidebarFiltersToStepsList();
      });

    this.subscriptionHelper.select<Step[]>(StepsMainPageSelector.STEPS_LIST)
      .subscribe(x => {
        this.allStepsList = x;
        this.applySidebarFiltersToStepsList();
      });

    this.subscriptionHelper.select<Step>(StepsMainPageSelector.SELECTED_STEP)
      .subscribe(x => this.showEditor(x));

    this.subscriptionHelper.select<StepsListFilter>(StepsMainPageSelector.LIST_FILTER)
      .subscribe(x => this.filter = x);
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

  private applySidebarFiltersToStepsList(): void {
    let filteredSteps = this.allStepsList;

    filteredSteps = this.applyTopicsFilter(filteredSteps);
    filteredSteps = this.applyEntitiesFilter(filteredSteps);

    this.stepsList = filteredSteps;
  }

  private applyEntitiesFilter(source: Step[]): Step[] {
    if (!this.sidebarFilter.entities || this.sidebarFilter.entities.length === 0) {
      return source;
    }

    return source.filter(x => this.sidebarFilter.entities.includes(x.entity));
  }

  private applyTopicsFilter(source: Step[]): Step[] {
    if (!this.sidebarFilter.themes || this.sidebarFilter.themes.length === 0) {
      return source;
    }

    return source.filter(x => this.sidebarFilter.themes.includes(x.topics));
  }

  private applyStepsListFilter(filter?: StepsListFilter) {
    if (!filter) {
      filter = EmptyStepsListFilter;
    }

    this.uiLayer.dispatch(StepsMainPageAction.SET_LIST_FILTER, { filter });
  }

  private getStepsListTypeForView(view: View): StepsListType {
    switch (view.name) {
      case 'Steps.ProcessesList':
        return StepsListType.Processes;

      case 'Steps.ActivitiesList':
        return StepsListType.Activities;

      case 'Steps.EventsList':
        return StepsListType.Events;

      case 'Steps.All':
        return StepsListType.All;

      default:
        throw Assertion.assertNoReachThisCode(`Unhandled view name '${view.name}'.`);
    }
  }

  private onCurrentViewChanged(newView: View) {
    this.currentView = newView;

    const stepsListType = this.getStepsListTypeForView(newView);

    const filter: StepsListFilter = {
      type: stepsListType
    };

    this.applyStepsListFilter(filter);
  }

  private showEditor(step: Step) {
    if (!isEmpty(step)) {
      this.selectedStep = step;
      this.displayEditor = true;
    }
  }

}
