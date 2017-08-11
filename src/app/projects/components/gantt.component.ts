import { Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";

import "dhtmlx-gantt";
import { } from "@types/dhtmlxgantt";

import { ProjectService } from '../services/project.service';
import { ProjectRef } from '../data-types/project';

@Component({
  selector: "gantt",
  styles: [
    `
        :host{
            display: block;
            height: 600px;
            position: relative;
            width: 100%;
        }
    `],
  template: `<div #gantt_here style='width: 100%; height: 100%;'></div>
                <div *ngIf="isActivityEditorWindowVisible" class="popup">
                  <project-editor [project]="project" [parentId]="parentId" (onCloseEvent)="onCloseActivityEditorWindow()"></project-editor>                    
                </div>
                `,
  providers: [ProjectService]
})

export class GanttComponent implements OnChanges {
  @ViewChild("gantt_here") ganttContainer: ElementRef;

  @Input() public project: ProjectRef;
  @Input() public config: string;

  public isActivityEditorWindowVisible = false;
  public isStartActivityEditorWindowVisible = false;
  public parentId: number;

  constructor(private projectService: ProjectService) { }

  ngOnChanges() {

    this.initConfig();

    gantt.init(this.ganttContainer.nativeElement);

    this.attachEvents();

    this.refreshData();
  }

  public onCloseActivityEditorWindow(): void {
    this.isActivityEditorWindowVisible = false;
    this.refreshData();
  }


  // Private methods

  private attachEvents() {
    gantt.attachEvent("onTaskCreated", (id, item) => {
      if (!id.parent) {
        this.parentId = null;
      } else {
        this.parentId = id.parent;
      }
      this.isActivityEditorWindowVisible = true;

    });

    gantt.attachEvent("onTaskDblClick", (id, item) => {
      this.isActivityEditorWindowVisible = true;
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
    switch (this.config) {
      case 'ganttWeeks':
        gantt.config.scale_unit = 'week';
        return;
      case 'ganttMonths':
        gantt.config.scale_unit = 'month';
        return;
      case 'ganttQuarters':
        gantt.config.scale_unit = 'quarter';
        return;
      default:
        gantt.config.scale_unit = 'month';
        return;
    }
  }

  private refreshData() {
    this.projectService.getTasksList(this.project.uid)
      .then((data) => {
        gantt.clearAll();
        gantt.parse({ data });
      });
  }

}
