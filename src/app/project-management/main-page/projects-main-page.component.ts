/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProjectStore , ProjectModel } from '@app/store/project.store';

import { Activity, EmptyActivity, ActivityOperation,
         DefaultViewConfig, ViewConfig } from '@app/models/project-management';

import { Exception } from '@app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'emp-steps-projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss']
})
export class ProjectsMainPageComponent implements OnInit, OnDestroy {

  selectedProject: ProjectModel;
  selectedActivity = EmptyActivity;

  viewConfig = DefaultViewConfig();

  displayEditor = false;
  toggleEditor = false;

  private subs1: Subscription;
  private subs2: Subscription;

  constructor(private store: ProjectStore) { }


  ngOnInit() {
    this.subs1 = this.store.selectedProject().subscribe(
                    x => {
                      if (this.selectedProject &&
                          this.selectedProject.project.uid !== x.project.uid) {
                        this.selectedActivity = EmptyActivity;
                        this.displayEditor = false;
                      }
                      this.selectedProject = x;
                    }
                  );

    this.subs2 = this.store.selectedView().subscribe(
      x => this.viewConfig = x
    );
  }


  ngOnDestroy() {
    this.subs1.unsubscribe();
    this.subs2.unsubscribe();
  }


  onActivityUpdated(activity: Activity) {

  }


  onActivityTreeEdited(event: ActivityOperation) {
    switch (event.operation) {

      case 'insertActivity':
        this.store.insertActivity(this.selectedProject.project, event.activity)
                  .then(x => this.selectedActivity = x)
                  .catch(response => console.log(response.error.message));
        return;

      case 'moveActivity':
        this.store.moveActivity(event.activity as Activity, event.newPosition)
                  .then(x => this.selectedActivity = x)
                  .catch(response => console.log(response.error.message));
        return;

      case 'changeParent':
        this.store.changeParent(event.activity as Activity, event.newParent)
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


  // temporal view controller methods


  onAction(action: string) {
    switch (action) {
      case 'showTree':
        this.viewConfig = this.getViewConfig({ viewType: 'activity-tree' });
        return;
      case 'showList':
        this.viewConfig = this.getViewConfig({ viewType: 'tasks-list' });
        return;
      case 'showGantt':
        this.viewConfig = this.getViewConfig({ viewType: 'gantt' });
        return;
      case 'showKanban':
        this.viewConfig = this.getViewConfig({ viewType: 'kanban' });
        return;
      case 'showCalendar':
        this.viewConfig = this.getViewConfig({ viewType: 'calendar' });
        return;


      case 'showRegulations':
        // this.router.navigate(['/documents/search'])
        return;

      default:
        throw new Error(`Unhandled action ${action}.`);
    }
  }


  onViewChanged(viewConfig: ViewConfig) {
    this.viewConfig = viewConfig;
  }


  private getViewConfig(newData: Partial<ViewConfig>): ViewConfig {
    return Object.assign(this.viewConfig, newData);
  }

}
