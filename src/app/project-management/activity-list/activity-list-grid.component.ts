/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, Input }  from '@angular/core';

import { ProjectRef } from '../data-types/project';
import { ActivityRef } from '../data-types/activity';
import { ActivityService } from '../services/activity.service';

@Component ({
  selector: 'activity-list-grid',
  templateUrl: './activity-list-grid.component.html',
  styleUrls: ['./activity-list-grid.component.scss'],
  providers: [ActivityService]
})

export class ActivityListGridComponent {

  public isTaskEditorVisible = false;
  public isVisibleProcedureInfo = false;
  public taskList: ActivityRef[] = [];//any = [];
  public selectedTask:any;
  public procedureUID: string = '';
  public expanOrCollapseIcon = 'fa fa-minus-circle';

  private _project: ProjectRef;
  @Input()
   set project(project: ProjectRef) {
     this._project = project;
     this.refreshData();

   }
   get project(): ProjectRef {
    return this._project;
   }

   private _refresh: boolean;
   @Input()
    set refresh(refresh: boolean) {
      if (refresh) {
        this.refreshData();
      }
      this._refresh = refresh;
    }


  constructor (private activitiyService: ActivityService) { }

  public onCloseTaskEditorWindow(): void {
    this.isTaskEditorVisible = false;
    this.refreshData();
  }

  public onClickAddActivity():void {
    alert("Esta operación se encuentra en desarrollo...");

  }

  public onShowTaskEditor(selectedTask: any): void {
    this.selectedTask = selectedTask;
    this.isTaskEditorVisible = true;
  }

  public setSummaryCSSClass(level: number) : string {
    switch (level) {
      case -1:
        return 'no-summary';

      case 1:
        return 'summary-level1';

      case 2:
        return 'summary-level2';

      case 3:
        return 'summary-level3';

      default:
        return 'summary-level3';
    }

  }

  public onShowProcedureInfo(procedureUID: string): void {
    this.procedureUID = procedureUID;
    this.isVisibleProcedureInfo = true;
  }

  public onCloseProcedureInfoWindow(): void {
    this.isVisibleProcedureInfo = false;
  }

  public expandOrCollapse(parentUID: string): void {
   let index = this.taskList.findIndex((e) => e.parent.uid === parentUID) - 1;

   if (this.taskList[index].visible === 'collapse') {
    this.taskList[index].visible = 'expand';
    this.changeExpandOrCollapseIcon('visible');
    this.changeVisibility(parentUID, 'visible')
   } else {
    this.taskList[index].visible = 'collapse';
    this.changeExpandOrCollapseIcon('collapse');
    this.changeVisibility(parentUID, 'none');
   }

  }

  private changeExpandOrCollapseIcon(changeVisibility: string) {
    if (changeVisibility === 'collapse') {
      this.expanOrCollapseIcon = 'fa fa-plus-circle';
    } else {
      this.expanOrCollapseIcon = 'fa fa-minus-circle';
    }
  }

  private changeVisibility(parentUID, visibibility: string): void {
    this.taskList.forEach((e)=>{
      if (e.parent.uid === parentUID) {
        if (e.type === 'ObjectType.ProjectObject.Summary') {
          this.changeVisibility(e.uid, visibibility);
        }
        e.visible = visibibility;
      }
    });
  }

  private getTaskName(task) {
    return task.name;
  }

  private refreshData() {
    this.activitiyService.getActivities(this.project.uid)
     .then((data) => {
       this.taskList = data;
       this.taskList.forEach(function(e) { if (e.type ==='ObjectType.ProjectObject.Summary'){ e.visible = 'expand'} else {e.visible ='visible'} });
     });
  }

}
