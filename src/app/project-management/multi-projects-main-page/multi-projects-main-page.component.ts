/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProjectStore } from '@app/store/project.store';
import { UserInterfaceStore } from '@app/store/ui.store';

import { Activity, EmptyActivity,
         ProjectItemFilter, EmptyProjectItemFilter } from '@app/models/project-management';

import { View } from '@app/models/user-interface';


@Component({
  selector: 'emp-steps-multi-projects-main-page',
  templateUrl: './multi-projects-main-page.component.html',
  styleUrls: ['./multi-projects-main-page.component.scss']
})
export class MultiProjectsMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;
  toggleEditor = false;

  selectedActivity = EmptyActivity;

  allActivities: Activity[] = [];

  filter: ProjectItemFilter = EmptyProjectItemFilter;

  private subs1: Subscription;
  private subs2: Subscription;

  constructor(private projectStore: ProjectStore,
              private uiStore: UserInterfaceStore)  { }


  ngOnInit() {
    this.loadAllActivities();

    this.subs1 = this.uiStore.currentView.subscribe(
      x => this.currentView = x
    );

    this.subs2 = this.uiStore.getValue<ProjectItemFilter>('Sidebar.ProjectFilter').subscribe(
      value => this.filter = value
    );
  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
    if (this.subs2) {
      this.subs2.unsubscribe();
    }
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
