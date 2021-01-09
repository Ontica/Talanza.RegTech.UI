/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ProjectModel, ProjectStore } from '@app/store/project.store';
import { GanttService } from '@app/data-services/project-management';

import { Activity, GanttTask } from '@app/models/project-management';
import { FilterHelper } from '../common/filter-helper';

import { MainSidebarValues, DefaultSidebarValues} from '@app/views/main-layout';


@Component({
  selector: 'emp-steps-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['../../../../styles/card.scss']
})
export class GanttChartComponent implements OnChanges {

  @Input() project: ProjectModel;
  @Input() filter: MainSidebarValues = DefaultSidebarValues;
  @Input() reset = true;
  @Input() useForeignLanguage: false;

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
                     .then((x) => {
                       this.tasks = FilterHelper.applyFilter(this.filter, x);
                       this.tasks = this.tasks.map((y) => this.setForeignLanguageText(y));
                     });
  }


  private setForeignLanguageText(task: GanttTask): GanttTask {
    if (this.useForeignLanguage) {
      task.text = task.nameForeignLang || task.name;
    } else {
      task.text = task.name;
    }
    return task;
  }

}
