/**
* @license
* Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
*
* See LICENSE.txt in the project root for complete license information.
*
*/

import { Component, EventEmitter, HostBinding, Input,
         Output, OnInit } from '@angular/core';

import { TaskRef, EmptyTask } from '../data-types/task';
import { WorkListsService } from '../services/worklists.service';

import { PersonRef } from '../data-types/project';
import { ActivityService } from '../services/activity.service';

declare var dhtmlXCalendarObject: any;

@Component({
  selector: 'task-form-editor',
  templateUrl: './task-form-editor.component.html',
  styleUrls: ['./task-form-editor.component.scss'],
  providers: [ActivityService, WorkListsService]
})

export class TaskFormEditorComponent implements OnInit {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  public selectedTask: TaskRef = EmptyTask();

  public responsiblesList: PersonRef[] = [];
  public isCloseTaskEditorVisible = false;

  private eventDateCalendar: any;
  private endDateCalendar: any;

  private _task: any;
  @Input()
  set task(task: any) {
    this._task = task;
    this.loadSelectedTask();
    this.loadLists();
  }
  get task(): any {
    return this._task;
  }

  @Output() public onCloseEvent = new EventEmitter();

  public constructor(private activityService: ActivityService,
                     private workListsService: WorkListsService ) { }

  ngOnInit() {
    this.loadCalendars();
  }

  public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public async onUpdateTask() {
    this.setDateCalendar();
    await this.updateTask();
    this.onClose();
  }

  public onCloseTask(): void {
    this.isCloseTaskEditorVisible  = true;
  }

  public onCloseTaskEditorIsClosed(): void {
    this.onClose();
  }

  private loadLists(): void {
    this.loadResponsiblesList();
  }

  private loadSelectedTask(): void {
    this.selectedTask.name = this.task.name;
    this.selectedTask.notes = this.task.notes;
    this.selectedTask.requestedByUID = this.task.requestedBy.uid;
    this.selectedTask.responsibleUID = this.task.responsible.uid;
    this.selectedTask.resourceUID = this.task.resource.uid;
    this.selectedTask.targetDate = this.task.targetDate;
    this.selectedTask.requestedTime = this.task.startDate;
    this.selectedTask.startDate = this.task.startDate;
    this.selectedTask.progress = this.task.progress;
  }


  private loadResponsiblesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.activityService.getResponsiblesList(this.task.project.uid)
                        .toPromise()
                        .then((x) => this.responsiblesList = x)
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private async updateTask() {
    const errMsg = 'Ocurrió un problema al intentar actualizar la actividad.';

    await this.workListsService.updateTasks(this.task.project.uid, this.task.uid, this.selectedTask)
                              .toPromise()
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

  private loadCalendars(): void {
    this.createCalendars();
    this.setCalendarsDateFormat();
  }

  private createCalendars(): void {
    this.endDateCalendar = new dhtmlXCalendarObject({ input: "endDateCalendar", button: "endDateCalendarButton" });
  }

  private setCalendarsDateFormat(): void {
    this.endDateCalendar.setDateFormat("%d-%m-%Y");
  }

  private setDateCalendar(): void {
    this.selectedTask.targetDate = this.endDateCalendar.getDate();
  }

}
