import { Component, EventEmitter, Input, OnInit, Output, ElementRef, Renderer2, ViewChild } from '@angular/core';

import { ClosedTask, EmptyClosedTask } from '../../data-types/task';
import { ActivityRef } from '../../data-types/activity';

import { ActivityService } from '../../services/activity.service';

declare var dhtmlXCalendarObject: any;

@Component({
  selector: 'task-close',
  templateUrl: './activity-close.component.html',
  styleUrls: ['./activity-close.component.scss'],
  providers: [ActivityService]
})

export class ActivityCloseComponent implements OnInit {

  public endDate: Date = undefined;
  public isTaskClosed: boolean = false;

  private closedTask = EmptyClosedTask();
  private dueDateCalendar: any;
  private eventDateCalendar: any;

  private _task: any;
  @Input()
  set task(task: any) {
    this._task = task;
    this.setIsTaskClosed();
  }
  get task(): any {
    return this._task;
  }

  @Output()  onCloseEvent = new EventEmitter();
  @Output()  onCloseActivity = new EventEmitter<ActivityRef>();

  @ViewChild('dueDateCalendar') el: ElementRef;

  constructor(private activityService: ActivityService, private rd: Renderer2) { }

  ngOnInit() {
    this.loadCalendars();
  }

  public async onCloseTask() {

    if (!this.validateDueDate()) {
      return;
    }

    this.closedTask.endDate = this.endDate;
    this.closedTask.requestedByUID = this.task.requestedBy.uid;

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

  private loadCalendars(): void {
    this.createCalendars();
    this.setCalendarsDateFormat();
  }

  private createCalendars(): void {
    this.dueDateCalendar = new dhtmlXCalendarObject({ input: "dueDateCalendar", button: "dueDateButton" });
  }

  private setCalendarsDateFormat(): void {
    this.dueDateCalendar.setDateFormat("%d-%m-%Y");
  }

  private setDateCalendar(): void {
    this.dueDateCalendar.setDateFormat("%d-%m-%Y");
    this.endDate = this.dueDateCalendar.getDate();


  }

  private validateDueDate(): boolean {

    //this.setDateCalendar();   
    //this.endDate = new Date(this.el.nativeElement.value);
    //this.endDate.setHours(0,0,0,0);  
    let dueDate = new Date(this.task.dueDate);
    let today = new Date();

    this.endDate = new Date(this.endDate);

    if (this.endDate > today) {
      alert("La fecha de termino no puede ser posterior al día de hoy");
      return false;
    }
    if (this.endDate > dueDate) {
      alert("La fecha de término de la actividad no puede ser posterior a la fecha legal.");
      return false;
    }

    return true;
  }

  private closeTask(): void {
    const errMsg = 'Ocurrió un problema al intentar crear la actividad.';

    this.activityService.closeActivity(this.task.project.uid, this.task.uid, this.closedTask)
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
    if (this.task.stage === 'Done') {
      this.isTaskClosed = true;
    } else {
      this.isTaskClosed = false;
    }
  }

}
