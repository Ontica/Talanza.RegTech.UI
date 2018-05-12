/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";

import "dhtmlx-gantt";
import { } from "@types/dhtmlxgantt";

import { Project } from '../data-types/project';
import { ActivityFilter, ViewConfig } from '../data-types/activity-filter';

import { GanttService } from './gantt.service';

@Component({
  selector: "gantt",
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
  providers: [GanttService]
})

export class GanttComponent implements OnChanges {

  @ViewChild("gantt_here") ganttContainer: ElementRef;

  private _filter: ActivityFilter;
  @Input()
  set filter(filter: ActivityFilter) {
    this._filter = filter;

    this.projectUID = filter.project.uid;

    this.refreshData();
  }
  get filter(): ActivityFilter {
    return this._filter;
  }

  @Input() public config: ViewConfig;

  public isActivityAddEditorWindowVisible = false;
  public isActivityEditorWindowVisible = false;
  public isStartActivityEditorWindowVisible = false;
  public parentId: number = -1;
  public activityId: number = -1;
  public projectUID: string = '';

  constructor(private ganttService: GanttService) { }

  ngOnChanges() {

    this.initConfig();

    gantt.init(this.ganttContainer.nativeElement);

    this.attachEvents();

    this.refreshData();
  }

  public onCloseActivityAddEditorWindow() {
    this.isActivityAddEditorWindowVisible = false;
    this.refreshData();

  }

  public onCloseActivityEditorWindow(): void {
    this.isActivityEditorWindowVisible = false;
    this.refreshData();
  }


  // Private methods

  private attachEvents() {
    gantt.attachEvent("onTaskCreated", (id, item) => {
      this.parentId = id.parent || -1;
      this.activityId = -1;
      this.isActivityAddEditorWindowVisible = true;
    });

    gantt.attachEvent("onTaskDblClick", (id, item) => {
      this.activityId = id;

      this.isActivityEditorWindowVisible = true;
    });

    gantt.attachEvent("onAfterTaskDrag", function (id, mode, e) {
      let modes = gantt.config.drag_mode;
      if (mode === modes.resize) {
        var modifiedTask = gantt.getTask(id);
        //alert("movio la tarea" + id);
        //alert("fecha de inicio: " + modifiedTask.start_date);
        //alert("Fecha de termino: " + modifiedTask.end_date);
      }
    });

  }

  private initConfig() {
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.grid_resize = true;
    gantt.config.keep_grid_width = false;
    gantt.config.smart_rendering = true;
    gantt.config.show_progress = true;
    gantt.config.drag_progress = false;
    gantt.config.open_tree_initially = true;

    this.setScaleUnit();
  }

  private setScaleUnit() {
    switch (this.config.timeScaleUnit) {
      case 'weeks':
        gantt.config.scale_unit = 'week';
        return;
      case 'months':
        gantt.config.scale_unit = 'month';
        return;
      case 'quarters':
        gantt.config.scale_unit = 'quarter';
        return;
      default:
        gantt.config.scale_unit = 'month';
        return;
    }
  }

  private refreshData() {
    this.ganttService.getActivitiesTree(this.projectUID)
      .then((data) => {
        gantt.clearAll();
        gantt.parse({ data });
      });
  }

}
