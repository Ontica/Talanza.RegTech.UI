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
  Activity, EmptyActivity } from '../data-types/project';

declare var dhtmlXCalendarObject: any;

@Component({
  selector: 'activity-info',
  templateUrl: './activity-Info.component.html',
  styleUrls: ['./activity-Info.component.scss'],
  providers: [ActivityService]
})

export class ActivityInfoComponent implements OnInit {
  
  @Input() public project: ProjectRef;
  @Input() public parentId: number = null;
  @Input() public activityId: number = -1;
  @Input() public processModelUID: string;

  @Output() public onCloseEvent = new EventEmitter();
  
  public resourceList: ResourceRef[] = [];
  public requestersList: PersonRef[] = [];
  public responsiblesList: PersonRef[] = [];
  public taskManagersList: PersonRef[] = [];
  public activity: Activity = EmptyActivity();
  public isEvent: boolean = false;

  private requestedDateCalendar: any;
  private startDateCalendar: any;
  private endDateCalendar: any;
  private eventDateCalendar: any;

  private _activityType = '';
  @Input()
  set activityType(activityType: string) {
    this._activityType = activityType;  
    this.setActivityType();
  }
  get activityType(): string {
    return this._activityType;
  }

  private _operation = "";  
  @Input() 
  set operation(operation:string) {
    this._operation = operation;
    this.doOperation();
  }
  get operation():string {
    return this._operation;
  }

  public constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.loadCalendars();
    this.loadLists(); 
    if (!this.isNewActivity()) {
      this.loadActivity(this.activityId);
    }  

  } 

  public async add() {    
    this.setDatePropertiesValueFromCalendars();    
    if (!this.validate()) {
      return;
    }
    this.activity.parentId = this.parentId;        
    await this.addProcessModel();
    this.onCloseEvent.emit();
  }

  public async addManual() {    
    this.setDatePropertiesValueFromCalendars();    
    if (!this.validate()) {
      return;
    }
    this.activity.parentId = this.parentId;        
    await this.addManualActivity();
    this.onCloseEvent.emit();
  }

  public doOperation(): void {   
    switch(this.operation) {
      case 'save': this.add(); break;
      case 'saveManual': this.addManual();
    }  
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

  private loadCalendars(): void {
    this.createCalendars();
    this.setCalendarsDateFormat();
  }

  private createCalendars(): void {
    this.requestedDateCalendar = new dhtmlXCalendarObject({ input: "requestedDateCalendar", button: "requestedDateButton" });
    this.startDateCalendar = new dhtmlXCalendarObject({ input: "startDateCalendar", button: "startDateCalendarButton" });
    this.endDateCalendar = new dhtmlXCalendarObject({ input: "endDateCalendar", button: "endDateCalendarButton" });
    this.eventDateCalendar = new dhtmlXCalendarObject({ input: "eventDateCalendar", button: "eventDateCalendarButton" });
        
  }

  private setCalendarsDateFormat(): void {  
    this.eventDateCalendar.setDateFormat("%d/%m/%Y");
    }

  private loadLists(): void {
    this.loadResourcesList();
    this.loadRequestersList();
    this.loadResponsiblesList();
  }

  private setDatePropertiesValueFromCalendars(): void {
    this.activity.requestedTime = this.requestedDateCalendar.getDate(true);
    this.activity.estimatedStart = this.startDateCalendar.getDate(true);
    this.activity.estimatedEnd = this.endDateCalendar.getDate(true);
   
  }

  private isNewActivity(): boolean {
    if (this.activityId === -1){
      return true;
    }
    return false;
  }

  private setActivityType(): void {
    if (this.activityType === 'event') {
      this.isEvent = true;
    } else{
      this.isEvent = false;     
    }

  }

  private validate(): boolean {
    if (this.activity.name === '') {
      alert("El nombre de la actividad o evento se encuentra en blanco.");
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
                        .then((x) =>{ this.activity = x; console.log(this.activity); })
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }


private addManualActivity(): void {
  const errMsg = 'Ocurrió un problema al intentar crear la actividad.';

  this.activityService.addManualActivity(this.project.uid, this.activity)
    .toPromise()
    .then()
    .catch((e) => this.exceptionHandler(e, errMsg));
}

  private addProcessModel(): void {
    const errMsg = 'Ocurrió un problema al intentar guardar.';

    this.activityService.addProcessModel(this.project.uid,this.processModelUID,this.activity)
      .toPromise()
      .then()
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
