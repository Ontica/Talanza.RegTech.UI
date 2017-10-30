import { Component, OnInit } from '@angular/core';

import { ActivityRef } from '../data-types/activity';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss'],
  providers: [ActivityService]
})

export class WorkListComponent implements OnInit {

  public taskList: ActivityRef[] = [];
  public isTaskEditorVisible = false;
  public isVisibleProcedureInfo = false;
  public selectedTask: ActivityRef;
  public procedureUID: string = '';

  constructor (private activityService: ActivityService) { }

  ngOnInit() {
    this.getActivities();
  }

  public onCloseTaskEditorWindow(): void {
    this.isTaskEditorVisible = false;    
  }
 
  public onShowTaskEditor(selectedTask: any): void {
    this.selectedTask = selectedTask;
    this.isTaskEditorVisible = true;
  }

  public onShowProcedureInfo(procedureUID: string): void {
    this.procedureUID = procedureUID;
    this.isVisibleProcedureInfo = true;
  }

  public onCloseProcedureInfoWindow(): void {
    this.isVisibleProcedureInfo = false;
  }

  public onUpdateActivity(activity: ActivityRef): void {
    let index = this.taskList.findIndex(x => x.uid === activity.uid);
    this.taskList[index] = activity;
  }

  private async getActivities() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de actividades.';

    await this.activityService.getActivitiesAsWorkList()
      .toPromise().then((x) => { 
                                 this.taskList = x;
                                 console.log(x);
                               })
                  .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private exceptionHandler(error: any, defaultMsg: string): void {
    let errMsg = 'Tengo un problema.\n\n';

    if (typeof (error) === typeof (Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error>error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }

}