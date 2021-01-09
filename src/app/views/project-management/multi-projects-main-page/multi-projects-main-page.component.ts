/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProjectStore } from '@app/store/project.store';

import { Activity, EmptyActivity } from '@app/models/project-management';

import { View } from '@app/views/main-layout';
import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { MainUIStateSelector } from '@app/core/presentation/presentation-types';

import { MainSidebarValues, DefaultSidebarValues} from '@app/views/main-layout';


@Component({
  selector: 'emp-steps-multi-projects-main-page',
  templateUrl: './multi-projects-main-page.component.html',
  styleUrls: ['./multi-projects-main-page.component.scss']
})
export class MultiProjectsMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;
  toggleEditor = false;
  useForeignLanguage = false;

  selectedActivity = EmptyActivity;

  allActivities: Activity[] = [];

  filter: MainSidebarValues = DefaultSidebarValues;

  private subscriptionHelper: SubscriptionHelper;

  constructor(uiLayer: PresentationLayer,
              private projectStore: ProjectStore) {
    this.subscriptionHelper = uiLayer.createSubscriptionHelper();
  }


  ngOnInit() {
    this.loadAllActivities();

    this.subscriptionHelper.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .subscribe(x => this.currentView = x);

      this.subscriptionHelper.select<MainSidebarValues>(MainUIStateSelector.SIDEBAR_VALUES)
      .subscribe(value => this.filter = value);

      this.subscriptionHelper.select<boolean>(MainUIStateSelector.USE_FOREIGN_LANGUAGE)
      .subscribe(x => this.useForeignLanguage = x);
  }

  ngOnDestroy() {
    this.subscriptionHelper.destroy();
  }

  onActivityUpdated(activity: Activity) {
    this.loadAllActivities()
        .then(() => this.updateSelectedActivity());
  }

  onEditorClosed() {
    this.displayEditor = false;

    this.toggleEditor = !this.toggleEditor;
  }

  showEditor(activity: Activity) {
    if (activity) {
      this.selectedActivity = activity;

      const lastValue = this.displayEditor;

      this.displayEditor = true;

      if (lastValue !== this.displayEditor) {
        this.toggleEditor = !this.toggleEditor;
      }
    }
  }

  // private methods

  private loadAllActivities() {
    return this.projectStore.getAllActivities()
                .toPromise()
                .then(x => this.allActivities = x);
  }

  private updateSelectedActivity() {
    this.displayEditor = false;
    this.selectedActivity = EmptyActivity;
  }

}
