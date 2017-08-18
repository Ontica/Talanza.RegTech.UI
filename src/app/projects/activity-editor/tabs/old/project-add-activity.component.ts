/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';

import { ActivityService } from '../../../services/activity.service';
import {
  ProjectRef, ResourceRef, PersonRef,
  Activity, EmptyActivity } from '../../../data-types/project';

declare var dhtmlXCalendarObject: any;

@Component({
  selector: 'project-add-activity',
  templateUrl: './project-add-activity.component.html',
  styleUrls: ['./project-add-activity.component.scss'],
  providers: [ActivityService]
})

export class ProjectAddActivityComponent implements OnInit {

  @Output() public onCloseEvent = new EventEmitter();
  @Input() public project: ProjectRef;
  @Input() public parentId: number;
  @Input() public activityId: number;

  public resourceList: ResourceRef[] = [];
  public requestersList: PersonRef[] = [];
  public responsiblesList: PersonRef[] = [];
  public taskManagersList: PersonRef[] = [];
  public activity: Activity = EmptyActivity();

  private requestedDateCalendar: any;
  private startDateCalendar: any;
  private endDateCalendar: any;

  public constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.loadCalendars();
    this.loadLists(); 
    if (!this.isNewActivity()) {
      this.loadActivity(this.activityId);
    }
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onClickCancel(): void {
    this.onClose();
  }

  public async onClickAddActivity() {
    this.setDatePropertiesValueFromCalendars();    
    if (!this.validate()) {
      return;
    }
    
    this.activity.parentId = this.parentId;    
    await this.addActivity();
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

  private loadCalendars(): void {
    this.createCalendars();
    this.setCalendarsDateFormat();
  }

  private createCalendars(): void {
    this.requestedDateCalendar = new dhtmlXCalendarObject({ input: "requestedDateCalendar", button: "requestedDateButton" });
    this.startDateCalendar = new dhtmlXCalendarObject({ input: "startDateCalendar", button: "startDateCalendarButton" });
    this.endDateCalendar = new dhtmlXCalendarObject({ input: "endDateCalendar", button: "endDateCalendarButton" });
  }

  private setCalendarsDateFormat(): void {
    this.requestedDateCalendar.setDateFormat("%d-%m-%Y");
    this.startDateCalendar.setDateFormat("%d-%m-%Y");
    this.endDateCalendar.setDateFormat("%d-%m-%Y");
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

  private addActivity(): void {
    const errMsg = 'Ocurrió un problema al intentar crear la actividad.';

    this.activityService.createActivity(this.project.uid, this.activity)
      .toPromise()
      .then()
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private loadActivity(itemId: number): void {
    const errMsg = 'Ocurrió un problema al intentar leer la actividad.';

    this.activityService.getActivity(itemId)
                        .toPromise()
                        .then((x) =>{ this.activity = x; console.log(this.activity); })
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
