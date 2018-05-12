/**
* @license
* Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
*
* See LICENSE.txt in the project root for complete license information.
*
*/

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Assertion } from 'empiria';

import { Activity } from '../../data-types/activity';
import { CloseActivityCommand } from '../../data-types/commands';

import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'close-activity',
  templateUrl: './close-activity.component.html',
  styleUrls: ['./close-activity.component.scss'],
  providers: [ActivityService]
})

export class CloseActivityComponent {

  public endDate: Date = undefined;
  public isTaskClosed: boolean = false;

  public calendar: any

  private closeCommand: CloseActivityCommand;

  private _task: any;
  @Input()
  set activity(task: any) {
    this._task = task;
    this.setIsTaskClosed();
  }
  get activity(): any {
    return this._task;
  }

  @Output() onCloseEvent = new EventEmitter();
  @Output() onCloseActivity = new EventEmitter<Activity>();

  constructor(private activityService: ActivityService) { }

  public onCloseTask() {

    if (!this.validateDueDate()) {
      return;
    }

    this.closeCommand.endDate = this.endDate;
    this.closeCommand.requestedByUID = this.activity.requestedBy.uid;

    this.closeTask();
  }

  public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onReopenTask(): void {
    alert('Por el momento no es posible reabrir tareas una vez que han sido cerradas, pero el administrador del sistema puede hacerlo.');
  }

  private validateDueDate(): boolean {
    let dueDate = new Date(this.activity.dueDate);
    let today = new Date();

    this.endDate = new Date(this.endDate);

    if (this.endDate > today) {
      alert("La fecha de termino no puede ser posterior al día de hoy.");
      return false;
    }

    return true;
  }

  private closeTask(): void {
    Assertion.assertValue(this.closeCommand, "this.closeCommand");

    const errMsg = 'Ocurrió un problema al intentar cerrar la actividad.';

    this.activityService.closeActivity(this.activity.project.uid, this.activity.uid, this.closeCommand)
      .toPromise()
      .then(x => {
        this.onCloseActivity.emit(x);
        this.onClose();
      })
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private exceptionHandler(error: any, defaultMsg: string): void {
    let errMsg = 'Tengo un problema al cerrar la tarea.\n\n';

    if (typeof (error) === typeof (Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error>error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }

  private setIsTaskClosed(): void {
    if (this.activity.stage === 'Done') {
      this.isTaskClosed = true;
    } else {
      this.isTaskClosed = false;
    }
  }

}
