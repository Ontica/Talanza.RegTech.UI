/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, Input }  from '@angular/core';

import { ProjectRef } from '../data-types/project';
import { ActivityService } from '../services/activity.service';

@Component ({
  selector: 'worklists-main-page',
  templateUrl: './worklists-main-page.component.html',
  styleUrls: ['./worklists-main-page.component.scss'],
  providers: [ActivityService]
})

export class WorklistsMainPageComponent {

  public isTaskEditorVisible = false;
  public isVisibleProcedureInfo = false;
  public taskList: any = [];
  public selectedTask:any;
  public procedureUID: string = "";

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

  private getTaskName(task) {
    return task.name;
  }

  private refreshData() {
    this.activitiyService.getActivities(this.project.uid)
     .then((data) => {
       this.taskList = data;       
     });
  }

}
