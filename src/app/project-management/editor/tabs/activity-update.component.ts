/**
* @license
* Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
*
* See LICENSE.txt in the project root for complete license information.
*
*/

import {
  Component, EventEmitter, HostBinding, Input,
  Output, OnInit
} from '@angular/core';

import { TaskRef, EmptyTask, Tag } from '../../data-types/task';

import { PersonRef } from '../../data-types/project';

import { ActivityService } from '../../services/activity.service';
import { ProjectService } from '../../services/project.service';

declare var dhtmlXCalendarObject: any;



@Component({
  selector: 'task-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.scss'],
  providers: [ActivityService, ProjectService]
})

export class ActivityUpdateComponent implements OnInit {

  public selectedTask: TaskRef = EmptyTask();

  public responsiblesList: PersonRef[] = [];

  public calendar: any

  public tags: Tag[] = [];
  public selectedTags: Tag[] = [];
  public isTaskClosed = false;

  public _task: any;
  @Input()
  set task(task: any) {
    this._task = task;
    this.loadInitialValues();  
  }
  get task(): any {
    return this._task;
  }

  @Output() public onCloseEvent = new EventEmitter();

  public constructor(private activityService: ActivityService,
                     private projectService: ProjectService) { }

  ngOnInit() {
    this.loadCalendar();  
    
  }

  public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public async onUpdateTask() {    
    this.setDateCalendar();
    this.setSelectedTags();   
  
    await this.updateTask();
    alert("La tarea se actualizo correctamente");
    
    this.onClose();

  }  

  public async loadInitialValues() {
    await this.loadSelectedTask();
    await this.loadTags();
    this.loadSelectedTags();
    this.loadLists();
    this.setIsTaskClosed();
  }

  public onSelectedTags(selectedTags: any): void {
    this.selectedTags = selectedTags;
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
    this.selectedTask.ragStatus = this.task.ragStatus;
    this.selectedTask.tags = this.task.tags;
  }

  private loadResponsiblesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.projectService.getResponsiblesList(this.task.project.uid)
      .toPromise()
      .then((x) => this.responsiblesList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private async updateTask() {
    const errMsg = 'Ocurrió un problema al intentar actualizar la actividad.';

    await this.activityService.updateActivity(this.task.project.uid, this.task.uid, this.selectedTask)
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

  private loadCalendar(): void {
    this.createCalendar();
    this.setCalendarsDateFormat();
  }

  private createCalendar(): void {
    this.calendar = new dhtmlXCalendarObject({ input: "calendar", button: "calendarButton" });
  }

  private setCalendarsDateFormat(): void {
    this.calendar.setDateFormat("%d-%m-%Y");
  }

  private setDateCalendar(): void {
    this.selectedTask.targetDate = this.calendar.getDate();
  }

  private async loadTags() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de etiquetas.';

   await this.activityService.getTags()
                        .toPromise()
                        .then((x) => {
                          this.tags = x;
                          this.tags.forEach((x) => {         
                               x.selected = false;                            
                           });
                        })
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private setSelectedTags(): void {
     this.selectedTask.tags = this.selectedTags.filter(x => x.selected === true).map(x => x.name);
  }                                            

  private loadSelectedTags(): void {
  this.selectedTask.tags.forEach(x => {
    this.selectedTag(x);
  });

  this.selectedTags = this.tags.filter(x => x.selected === true);  
  }
  
  private selectedTag(tag: string): void {    
    let index = this.tags.findIndex((x) => x.name === tag);    
     this.tags[index].selected = true;
  }
  private setIsTaskClosed(): void {
    if (this.task.stage === 'Done') {
      this.isTaskClosed = true;
    } else {
      this.isTaskClosed = false;
    }
  }

}
