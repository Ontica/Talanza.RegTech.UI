import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ClosedTask, EmptyClosedTask } from '../../data-types/task';
import { WorkListsService } from '../../services/worklists.service';

declare var dhtmlXCalendarObject: any;

@Component({
  selector:'task-close',
  templateUrl: './activity-close.component.html',
  styleUrls:['./activity-close.component.scss'],
  providers:[WorkListsService]
})

export class ActivityCloseComponent implements OnInit{

  public endDate: Date = undefined;

  private closedTask = EmptyClosedTask();
  private dueDateCalendar: any;
  private eventDateCalendar: any;

  private _task: any;
  @Input()
  set task(task: any) {
    this._task = task;
  }
  get task(): any {
    return this._task;
  }

  @Output() public onCloseEvent = new EventEmitter();

  constructor(private workListsService: WorkListsService){}

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

    this.onClose();
   }

   public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  private loadCalendars(): void {
    this.createCalendars();
    this.setCalendarsDateFormat();
  }

  private createCalendars(): void {
    this.dueDateCalendar = new dhtmlXCalendarObject({ input: "dueDateCalendar", button: "dueDateButton" });
  }

  private setCalendarsDateFormat(): void {
    this.dueDateCalendar.setDateFormat("%d/%m/%Y");
  }

  private setDateCalendar(): void {
    this.endDate = this.dueDateCalendar.getDate();
  }

  private validateDueDate(): boolean {
    this.setDateCalendar()
    let dueDate = new Date(this.task.dueDate);
     this.endDate.setHours(0,0,0,0);
     if (this.endDate <= dueDate) {
       return true;
     } else {
      alert("La fecha de término de la actividad no puede ser posterior a la fecha legal.");
      return false;
     }
  }

  private closeTask(): void {
    const errMsg = 'Ocurrió un problema al intentar crear la actividad.';

    this.workListsService.closeTask(this.task.project.uid,this.task.uid, this.closedTask)
                        .toPromise()
                        .then()
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

}
