/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

import { TaskService } from '@app/services/project-management/task.service';

import { Activity, EmptyActivity, Task, EmptyTask } from '@app/models/project-management';
import { TransitionCheckState } from '@angular/material';


@Component({
  selector: 'activity-tasks',
  templateUrl: './activity-tasks.component.html',
  styleUrls: ['./activity-tasks.component.scss']
})
export class ActivityTasksComponent implements OnChanges {

  @Input() activity: Activity = EmptyActivity;

  _displayEditor = false;

  tasksList: Task[] = [];
  selectedTask: Task = EmptyTask;

  constructor(private store: TaskService) {}


  ngOnChanges() {
    // this._displayEditor = (this.tasksList.length === 0);
    if (!this.activity) {
      return;
    }
    this.store.getActivityTasks(this.activity)
      .subscribe(
        x => this.tasksList = x
      );
  }


  onInsert(taskName: string) {
    if (!taskName) {
      return;
    }

    this.store.createTask(this.activity, { name: taskName })
      .subscribe(
        x => this.tasksList.push(x)
      );
  }


  toggleSelectedTask(task: Task) {
    if (!this.selectedTask) {
      this.selectedTask = task;
      return;
    }
    if (this.selectedTask.uid === task.uid) {
      this.selectedTask = EmptyTask;
    } else {
      this.selectedTask = task;
    }
  }


  displayEditor(value: boolean) {
    this._displayEditor = value;
  }

  refreshTasksList() {
    this.store.getActivityTasks(this.activity)
    .subscribe(
      x => this.tasksList = x
    );
    this.selectedTask = EmptyTask;
  }

}
