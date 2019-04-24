/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ProjectModel, ProjectStore } from '@app/store/project.store';
import { GanttService } from '@app/services/project-management';

import { Activity, GanttTask } from '@app/models/project-management';


@Component({
  selector: 'emp-steps-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnChanges {

  @Input() project: ProjectModel;

  @Input() reset = true;

  @Output() activitySelected = new EventEmitter<Activity>();

  tasks: GanttTask[] = [];

  contractName = '';

  timeScaleUnit = 'quarter';

  constructor(private projectStore: ProjectStore,
              private ganttService: GanttService) { }


  onChangeScale() {
    console.log('scale changed');
  }

  ngOnChanges(): void {
    if (!this.project ||
        !this.project.project ||
        !this.project.project.uid) {
     return;
   }
   this.contractName = this.project.project.name;
   this.loadGanttTasks();
  }

  onSearch() {

  }

  onActivitySelected(task: GanttTask) {
    const activity = this.projectStore.getActivity(task.uid);

    return this.activitySelected.emit(activity);
  }

  private loadGanttTasks() {
    this.ganttService.getActivitiesTree(this.project.project)
                     .toPromise()
                     .then(x => this.tasks = x);
  }

}