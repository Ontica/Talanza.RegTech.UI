import { Component, EventEmitter, Input,Output } from '@angular/core';

import { ClosedTask, EmptyClosedTask } from '../../data-types/task';
import { Activity } from '../../data-types/activity';

import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'task-close',
  templateUrl: './activity-close.component.html',
  styleUrls: ['./activity-close.component.scss'],
  providers: [ActivityService]
})

export class ActivityCloseComponent {

  public endDate: Date = undefined;
  public isTaskClosed: boolean = false;

  public calendar: any

  private closedTask = EmptyClosedTask();

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

  public async onCloseTask() {

    if (!this.validateDueDate()) {
      return;
    }

    this.closedTask.endDate = this.endDate;
    this.closedTask.requestedByUID = this.activity.requestedBy.uid;

    await this.closeTask();
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
      alert("La fecha de termino no puede ser posterior al día de hoy");
      return false;
    }

    return true;
  }

  private closeTask(): void {
    const errMsg = 'Ocurrió un problema al intentar crear la actividad.';

    this.activityService.closeActivity(this.activity.project.uid, this.activity.uid, this.closedTask)
      .toPromise()
      .then(x => { this.onCloseActivity.emit(x); 
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
