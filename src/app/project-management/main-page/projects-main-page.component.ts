/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProjectStore , ProjectModel } from '@app/store/project.store';
import { GanttService } from '@app/services/project-management';

import { Activity, EmptyActivity, ActivityOperation,
         DefaultViewConfig, ViewConfig, GanttTask } from '@app/models/project-management';

import { Exception } from '@app/core';


@Component({
  selector: 'emp-steps-projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss']
})
export class ProjectsMainPageComponent implements OnInit, OnDestroy {

  selectedProject: ProjectModel;
  selectedActivity = EmptyActivity;
  ganttTasks = [];

  viewConfig: ViewConfig = DefaultViewConfig();

  displayEditor = false;
  toggleEditor = false;

  private subs1: Subscription;
  private subs2: Subscription;

  constructor(private store: ProjectStore,
              private ganttService: GanttService)  { }


  ngOnInit() {
    this.subs1 = this.store.selectedProject().subscribe(
                    x => {
                      if (this.selectedProject &&
                          this.selectedProject.project.uid !== x.project.uid) {
                        this.selectedActivity = EmptyActivity;
                        this.displayEditor = false;
                      }
                      this.selectedProject = x;
                      if (this.viewConfig.viewType === 'ganttView') {
                        this.loadGanttTasks();
                      }
                    }
                  );

    this.subs2 = this.store.selectedView().subscribe(
      x => {
        this.viewConfig = x;
        if (this.viewConfig.viewType === 'ganttView') {
          this.loadGanttTasks();
        }
      }
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


  showEditorFromGanttTask(task: GanttTask) {
    const activity = this.store.getActivity(task.uid);
    this.showEditor(activity);
  }


  // private methods


  private loadGanttTasks() {
    if (!this.selectedProject ||
       !this.selectedProject.project ||
       !this.selectedProject.project.uid) {
      return;
    }

    this.ganttService.getActivitiesTree(this.selectedProject.project)
                     .toPromise()
                     .then(x => this.ganttTasks = x);
  }

}
