/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';

import { ActivityService } from '../services/activity.service';
import {
  ProjectRef, ResourceRef, PersonRef,
  Activity, EmptyActivity, TaskRef
} from '../data-types/project';

declare var dhtmlXCalendarObject: any;

@Component({
  selector: 'project-start-activity',
  templateUrl: './project-start-activity.component.html',
  styleUrls: ['./project-start-activity.component.scss'],
  providers: [ActivityService]
})

export class ProjectStartActivityComponent implements OnInit {

  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';
  @Output() public onCloseEvent = new EventEmitter();
  @Input() public project: ProjectRef;

  public resourceList: ResourceRef[] = [];
  public requestersList: PersonRef[] = [];
  public responsiblesList: PersonRef[] = [];
  public taskManagersList: PersonRef[] = [];
  public activity: Activity = EmptyActivity();
  public taksList: TaskRef[];

  private requestedDateCalendar: any;
  private startDateCalendar: any;
  private endDateCalendar: any;

  public constructor(private activityService: ActivityService) { }

  ngOnInit() {
    
    this.loadCalendars();
    this.loadLists();    
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

  private loadResourcesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de recursos.';

    this.activityService.getResourcesList().toPromise()
      .then((x) => this.resourceList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));      
  }

  private loadRequestersList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de solicitantes.';

    this.activityService.getRequestersList(this.project.uid)
      .toPromise()
      .then((x) => this.requestersList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private loadResponsiblesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.activityService.getResponsiblesList(this.project.uid)
      .toPromise()
      .then((x) => this.responsiblesList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

   private loadTaskManagers(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de personas alas cuales seles asigna alguna tarea.';

    this.activityService.getTaskManagers(this.project.uid)
      .toPromise()
      .then((x) => this.taskManagersList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }



  private loadCalendars(): void {
    this.requestedDateCalendar = new dhtmlXCalendarObject({ input: "requestedDateCalendar", button: "requestedDateButton" });
    this.startDateCalendar = new dhtmlXCalendarObject({ input: "startDateCalendar", button: "startDateCalendarButton" });
    this.endDateCalendar = new dhtmlXCalendarObject({ input: "endDateCalendar", button: "endDateCalendarButton" });
  }

  private loadLists(): void {
    this.loadResourcesList();
    this.loadRequestersList();
    this.loadResponsiblesList();
    this.loadTaskManagers();
  }

  private setDatePropertiesValueFromCalendars(): void {
    this.activity.requestedTime = this.requestedDateCalendar.getDate();
    this.activity.estimatedStart = this.startDateCalendar.getDate();
    this.activity.estimatedEnd = this.endDateCalendar.getDate();
  }

  private validate(): boolean {
    if (this.activity.name === '') {
      alert("Seleccionar la actividad de la lista.");
      return false;
    }
    if (this.activity.resourceUID === '') {
      alert("Seleccionar asociado a de la lista.");
      return false;
    }
    if (this.activity.requestedByUID === '') {
      alert("Seleccionar solicitado por de la lista.");
      return false;
    }    
    if (this.activity.responsibleUID === '') {
      alert("Seleccionar el responsable de la lista.");
      return false;
    }

    return true;
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
