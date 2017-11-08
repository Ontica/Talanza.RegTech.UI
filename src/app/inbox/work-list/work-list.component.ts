import { Component, OnInit, Input } from '@angular/core';

import { ActivityRef } from '../../project-management/data-types/activity';
import { ActivityFilter } from '../../project-management/data-types/activity-filter';

import { ActivityService } from '../../project-management/services/activity.service';

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

  private _filter: ActivityFilter;
  @Input() 
  set filter(filter: ActivityFilter) {
    this._filter = filter;   
   
    this.loadActivityList();
  }
  get filter(): ActivityFilter {
    return this._filter;
  }

  constructor (private activityService: ActivityService) { }

  ngOnInit() {
  
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

  private loadActivityList(): void {
    const errMsg = 'Ocurrió un problema al intentar buscar la lista de actividades.';
   

    this.activityService.getActivitiesAsWorkList(this.filter)
                        .toPromise()
                        .then((x) => { this.taskList = x; })
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