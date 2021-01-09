/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { ProjectStore , ProjectModel } from '@app/store/project.store';

import { Activity, ActivityOperation, EmptyActivity } from '@app/models/project-management';

import { View } from '@app/views/main-layout';

import { Exception } from '@app/core';
import { isEmpty } from '@app/core/data-types';

import { MainUIStateAction, MainUIStateSelector } from '@app/core/presentation/presentation-types';

import { MainSidebarValues, DefaultSidebarValues} from '@app/views/main-layout';


@Component({
  selector: 'emp-steps-projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss']
})
export class ProjectsMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;
  toggleEditor = false;
  useForeignLanguage = false;

  selectedProject: ProjectModel;
  selectedActivity = EmptyActivity;

  filter: MainSidebarValues = DefaultSidebarValues;

  private subs: Subscription;

  private subscriptionHelper: SubscriptionHelper;

  constructor(private uiLayer: PresentationLayer,
              private projectStore: ProjectStore) {
    this.subscriptionHelper = uiLayer.createSubscriptionHelper();
  }

  ngOnInit() {
    this.subscriptionHelper.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .subscribe(x => this.onViewChanged(x));

    this.subscriptionHelper.select<MainSidebarValues>(MainUIStateSelector.SIDEBAR_VALUES)
      .subscribe(x => this.filter = x);

    this.subscriptionHelper.select<boolean>(MainUIStateSelector.USE_FOREIGN_LANGUAGE)
      .subscribe(x => this.useForeignLanguage = x);

    this.subs = this.projectStore.selectedProject()
      .subscribe(x => this.onSelectedProjectChanged(x));
  }


  ngOnDestroy() {
    this.subscriptionHelper.destroy();
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onActivityUpdated(activity: Activity) {

  }

  onActivityTreeEdited(event: ActivityOperation) {
    switch (event.operation) {

      case 'insertActivity':
        this.projectStore.insertActivity(this.selectedProject.project, event.activity)
                  .then(x => this.selectedActivity = x)
                  .catch(response => console.log(response.error.message));
        return;

      case 'moveActivity':
        this.projectStore.moveActivity(event.activity as Activity, event.newPosition)
                  .then(x => this.selectedActivity = x)
                  .catch(response => console.log(response.error.message));
        return;

      case 'changeParent':
        this.projectStore.changeParent(event.activity as Activity, event.newParent)
                  .then(x => this.selectedActivity = x)
                  .catch(response => console.log(response.error.message));
        return;

      default:
        throw new Exception(`Unhandled operation name '${event.operation}'.`);

    }

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

  private onSelectedProjectChanged(value: ProjectModel) {
    if (this.selectedProject &&
        this.selectedProject.project.uid !== value.project.uid) {
      this.selectedActivity = EmptyActivity;
      this.displayEditor = false;
    }

    this.selectedProject = value;

    if (!isEmpty(this.selectedProject.project)) {
      this.uiLayer.dispatch(MainUIStateAction.SET_MAIN_TITLE,this.currentView.title);
    }
  }

  private onViewChanged(view: View) {
    this.currentView = view;

    if (!this.selectedProject) {
      this.uiLayer.dispatch(MainUIStateAction.SET_MAIN_TITLE, 'Please select a contract');
    } else {
      this.uiLayer.dispatch(MainUIStateAction.SET_MAIN_TITLE, this.selectedProject.project.name);
    }
  }

}
