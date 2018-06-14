/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, ChangeDetectionStrategy,
         ElementRef, EventEmitter,
         Input, Output,
         OnInit, ViewChild } from "@angular/core";

import { ProjectModel, ProjectStore } from '@app/store/project.store';

import "dhtmlx-gantt";
import { } from "dhtmlxgantt";

import { Activity, ViewConfig, GanttTask } from '@app/models/project-management';

import { GanttService } from '@app/services/project-management';


@Component({
  selector: "gantt",
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
  providers: [GanttService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttComponent implements OnInit {

  @Input()
  get project(): ProjectModel { return this._project };
  set project(value: ProjectModel) {
    this._project = value;
    this.refreshData();
  };
  private _project;


  @Input()
  get config(): ViewConfig { return this._config };
  set config(value: ViewConfig) {
    this._config = value;
    this.setConfiguration();
    this.resetGantt();
  };
  private _config;


  @Input()
  set reset(value: boolean) {
     this.resetGantt();
  }

  @Output() activitySelected = new EventEmitter<Activity>();

  @ViewChild("gantt") ganttContainer: ElementRef;


  private ganttData: GanttTask[] = [];
  private selectedTask: GanttTask;
  private innerReset = false;

  constructor(private store: ProjectStore,
              private ganttService: GanttService) { }


  ngOnInit() {
    this.attachEvents();

    this.resetGantt();
  }


 // Private methods

  private attachEvents() {

    gantt.attachEvent("onTaskSelected", id => {
      if (this.innerReset) {
        this.innerReset = false;
        return;
      }

      this.selectedTask = this.ganttData.find( x => x.id == id );

      const activity = this.store.getActivity(this.selectedTask.uid);

      return this.activitySelected.emit(activity);
    });

  }

  private refreshData() {
    if (this.project.project.uid === '') {
      return;
    }

    this.ganttService.getActivitiesTree(this.project.project)
                     .subscribe( data => {
                        this.ganttData = data;
                        gantt.clearAll();
                        gantt.parse({ data });
                      });
  }

  private resetGantt() {
    gantt.init(this.ganttContainer.nativeElement);

    if (this.selectedTask) {
      this.innerReset = true;
      gantt.selectTask(this.selectedTask.id);
    }
  }


  private setConfiguration() {
    gantt.config.xml_date = "%Y-%m-%d %H:%i";

    gantt.config.keep_grid_width = false;
    gantt.config.show_progress = true;
    gantt.config.drag_progress = false;
    gantt.config.open_tree_initially = true;

    gantt.config.smart_rendering = true;
    gantt.config.drag_progress = false;
    gantt.config.open_tree_initially = true;
    gantt.config.select_task = true;
    gantt.config.readonly = true;
    gantt.config.preserve_scroll = true;

    gantt.config.columns = [
      {name:"text", label:"Actividad", tree: true, resize: true, width:'480' }
    ];

    gantt.config.scale_unit = this.config ? this.config.timeScaleUnit : 'quarter';
  }

}
