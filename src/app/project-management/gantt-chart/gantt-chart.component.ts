/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ProjectModel, ProjectStore } from '@app/store/project.store';
import { GanttService } from '@app/services/project-management';

import { Activity, GanttTask, ProjectItemFilter, EmptyProjectItemFilter } from '@app/models/project-management';
import { FilterHelper } from '../common/filter-helper';


@Component({
  selector: 'emp-steps-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnChanges {

  @Input() project: ProjectModel;

  @Input() filter: ProjectItemFilter = EmptyProjectItemFilter;

  @Input() reset = true;

  @Output() activitySelect = new EventEmitter<Activity>();

  tasks: GanttTask[] = [];

  contractName = '';

  timeScaleUnit = 'quarter';

  constructor(private projectStore: ProjectStore,
              private ganttService: GanttService) { }


  onChangeScale(value: string) {
    this.timeScaleUnit = value;
  }

  scaleName() {
    switch (this.timeScaleUnit) {
      case 'year':
        return 'Annual';
      case 'quarter':
        return 'Quarterly';
      case 'month':
        return 'Monthly';
      case 'week':
        return 'Weekly';
      default:
        return `Undefined scale ${this.timeScaleUnit}.`;
    }
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

    return this.activitySelect.emit(activity);
  }

  private loadGanttTasks() {
    this.ganttService.getActivitiesTree(this.project.project)
                     .toPromise()
                     .then(x => this.tasks = FilterHelper.applyFilter(this.filter, x));
  }

}
