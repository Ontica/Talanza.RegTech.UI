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
                     .then(x => this.tasks = this.applyFilter(x));
  }


  private applyFilter(tasks: GanttTask[]): GanttTask[] {
    let filtered = this.applyResponsiblesFilter(tasks);

    filtered = this.applyThemesFilter(filtered);
    filtered = this.applyTagsFilter(filtered);

    return this.addAncestorTasks(tasks, filtered);
  }


  private addAncestorTasks(tasks: GanttTask[], filtered: GanttTask[]): GanttTask[] {
    let loopHaltGuard = 0;

    let completeArray = filtered;

    while (true) {
      const parentIDs = completeArray.map(x => x.parent);
      const parents = tasks.filter(x => parentIDs.includes(x.id));

      if (loopHaltGuard >= 20) {
        console.log('Something was wrong adding tree parents: loop halt guard was reached.', completeArray);
        break;

      } else if (parents.every(x => completeArray.includes(x))) {
        break;

      } else {
        completeArray = this.addParentTasks(tasks, completeArray);
        loopHaltGuard++;
      }
    }

    return completeArray;
  }


  private addParentTasks(tasks: GanttTask[], filtered: GanttTask[]): GanttTask[] {
    const parentUIDs = filtered.map(x => x.parent);

    const parents = tasks.filter(x => parentUIDs.includes(x.id) &&
                                      !filtered.includes(x));

    return parents.concat(filtered);
  }


  private applyResponsiblesFilter(source: GanttTask[]): GanttTask[] {
    if (!this.filter.responsibles || this.filter.responsibles.length === 0) {
      return source;
    }

    const uids = this.filter.responsibles.map(x => x.uid);

    return source.filter(x => uids.includes(x.responsible.uid));
  }


  private applyTagsFilter(source: GanttTask[]): GanttTask[] {
    if (!this.filter.tags || this.filter.tags.length === 0) {
      return source;
    }

    return source.filter(x => this.filter.tags.includes(x.tags));
  }


  private applyThemesFilter(source: GanttTask[]): GanttTask[] {
    if (!this.filter.themes || this.filter.themes.length === 0) {
      return source;
    }

    return source.filter(x => this.filter.themes.includes(x.theme));
  }

}
