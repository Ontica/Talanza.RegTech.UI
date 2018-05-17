/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";

import "dhtmlx-gantt";
import { } from "@types/dhtmlxgantt";

import {
  ActivityFilter,
  Project,
  ViewConfig
} from '../data-types';

import { GanttService } from './gantt.service';


@Component({
  selector: "gantt",
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
  providers: [GanttService]
})
export class GanttComponent implements OnChanges {

  @ViewChild("gantt_here") ganttContainer: ElementRef;

  @Input() config: ViewConfig;

  @Input()
  get filter(): ActivityFilter { return this._filter; }

  set filter(filter: ActivityFilter) {
    this._filter = filter;

    this.projectUID = filter.project.uid;

    this.refreshData();
  }
  private _filter: ActivityFilter;


  isActivityAddEditorWindowVisible = false;
  isActivityEditorWindowVisible = false;
  isStartActivityEditorWindowVisible = false;
  parentId = -1;
  activityId = -1;
  projectUID = '';

  constructor(private ganttService: GanttService) { }

  ngOnChanges() {

    this.initConfig();

    gantt.init(this.ganttContainer.nativeElement);

    this.attachEvents();

    this.refreshData();
  }

  onCloseActivityAddEditorWindow() {
    this.isActivityAddEditorWindowVisible = false;
    this.refreshData();

  }

  onCloseActivityEditorWindow() {
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
        // ToDo: ??
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


  private refreshData() {
    this.ganttService.getActivitiesTree(this.projectUID)
                      .then( data => {
                        gantt.clearAll();
                        gantt.parse({ data });
                      });
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

}
