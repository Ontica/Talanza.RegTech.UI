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

import { Activity, EmptyActivity, ActivityOperation } from '@app/models/project-management';

import { MenuItem, NavigationHeader } from '@app/models/user-interface';

import { Exception } from '@app/core';

import { isEmpty } from '@app/models/core';


@Component({
  selector: 'emp-steps-projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss']
})
export class ProjectsMainPageComponent implements OnInit, OnDestroy {

  currentView: string;
  displayEditor = false;
  toggleEditor = false;

  selectedProject: ProjectModel;
  selectedActivity = EmptyActivity;

  private subs1: Subscription;
  private subs2: Subscription;


  constructor(private projectStore: ProjectStore,
              private uiStore: UserInterfaceStore)  { }


  ngOnInit() {
    this.subs1 = this.uiStore.currentView.subscribe(
      x => this.currentView = x
    );

    this.setNavigationHeader();

    this.subs2 = this.projectStore.selectedProject().subscribe(
      x => this.onSelectedProjectChanged(x)
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
      this.uiStore.setMainTitle(this.selectedProject.project.name);
    }
  }


  private setNavigationHeader() {
    const header: NavigationHeader = {
      title: 'Please select a contract',
      hint: 'Contract management',
      mainMenu: [
        new MenuItem('Activities List', undefined, '/contract-management/activities'),
        new MenuItem('Gantt chart', undefined, '/contract-management/gantt'),
        new MenuItem('Timelines', undefined, '/contract-management/timelines', false),
        new MenuItem('Documents', undefined, '/contract-management/documents', false)
      ]
    };

    this.uiStore.setNavigationHeader(header);
  }

}
