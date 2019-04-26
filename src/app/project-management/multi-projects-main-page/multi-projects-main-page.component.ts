/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProjectStore , ProjectModel } from '@app/store/project.store';
import { UserInterfaceStore } from '@app/store/ui.store';

import { Activity, EmptyActivity, Project } from '@app/models/project-management';

import { View } from '@app/models/user-interface';

import { isEmpty } from '@app/models/core';


@Component({
  selector: 'emp-steps-multi-projects-main-page',
  templateUrl: './multi-projects-main-page.component.html',
  styleUrls: ['./multi-projects-main-page.component.scss']
})
export class MultiProjectsMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;
  toggleEditor = false;

  selectedProject: ProjectModel;
  selectedActivity = EmptyActivity;

  private subs1: Subscription;
  private subs2: Subscription;
  private subs3: Subscription;

  constructor(private projectStore: ProjectStore,
              private uiStore: UserInterfaceStore)  { }


  ngOnInit() {

    this.subs1 = this.uiStore.currentView.subscribe(
      x => this.currentView = x
    );

    this.subs2 = this.projectStore.selectedProject().subscribe(
      x => this.onSelectedProjectChanged(x)
    );

    this.subs3 = this.uiStore.getValue<Project[]>('Sidebar.Selected.Projects').subscribe(
      x => console.log('Sidebar projects changed', x)
    );
  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
    if (this.subs2) {
      this.subs2.unsubscribe();
    }
    if (this.subs3) {
      this.subs3.unsubscribe();
    }
  }


  onActivityUpdated(activity: Activity) {

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
      this.uiStore.setMainTitle(this.currentView.title);
    }
  }


}
