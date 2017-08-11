/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';

import { ActivityService } from '../../services/activity.service';
import {
  ProjectRef, ResourceRef, PersonRef,
  Activity, EmptyActivity, TaskRef } from '../../data-types/project';

declare var dhtmlXCalendarObject: any;

@Component({
  selector: 'project-assign-tasks',
  templateUrl: './project-assign-tasks.component.html',
  styleUrls: ['./project-assign-tasks.component.scss'],
  providers: [ActivityService]
})

export class ProjectAssignTasksComponent implements OnInit {

 @Output() public onCloseEvent = new EventEmitter();
  @Input() public project: ProjectRef;
 
  public taskManagersList: PersonRef[] = [];
  public activity: Activity = EmptyActivity();
  public taksList: TaskRef[];

 
  public constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.loadActivity(4);
    this.loadTasks(3);
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onClickCancel(): void {
    this.onClose();
  }

  public async onClickAddActivity() {    
    this.onClose();
  }


 
 

   private loadTaskManagers(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de personas alas cuales seles asigna alguna tarea.';

    this.activityService.getTaskManagers(this.project.uid)
      .toPromise()
      .then((x) => this.taskManagersList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }



 

 
  private loadActivity(itemId: number): void {
    const errMsg = 'Ocurrió un problema al intentar leer la actividad.';

    this.activityService.getActivity(itemId)
                        .toPromise()
                        .then((x) =>{ this.activity = x; })
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private loadTasks(itemId: number): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de tareas.';

    this.activityService.getTasks(itemId)
                        .toPromise()  
                        .then((x) => {console.log(x); this.taksList = x;})
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
