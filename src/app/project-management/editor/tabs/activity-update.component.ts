/**
* @license
* Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
*
* See LICENSE.txt in the project root for complete license information.
*
*/

import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { TaskRef, EmptyTask, Tag } from '../../data-types/task';

import { PersonRef } from '../../data-types/project';
import { Activity } from '../../data-types/activity';

import { ActivityService } from '../../services/activity.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'task-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.scss'],
  providers: [ActivityService, ProjectService]
})

export class ActivityUpdateComponent {

  public selectedTask: TaskRef = EmptyTask();

  public responsiblesList: PersonRef[] = [];

  public tags: Tag[] = [];
  public selectedTags: Tag[] = [];
  public isTaskClosed = false;

  public isNewTask = false;

  public _task: Activity;
  @Input()
  set activity(task: Activity) {
    this._task = task;

    this.loadInitialValues();

    if (task.uid === '') {
      this.isNewTask = true;
    
    } else {
      this.isNewTask = false;
      this.loadActivityInitialValues();
    }
  }

  get activity(): Activity {
    return this._task;
  }

  @Output() public onCloseEvent = new EventEmitter();
  @Output() public onUpdateActivity = new EventEmitter<Activity>();

  public constructor(private activityService: ActivityService,
                     private projectService: ProjectService) {

  }

  public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public async onUpdateTask() {
    if (!this.validateTargetDate()) {
      return;
    }

    this.setSelectedTags();

    if (this.isNewTask) {
      await this.addTask();
    } else {
      await this.updateTask();
    }
  }

  public async loadInitialValues() {
    await this.loadTags();

    this.loadLists();
  }

  public async loadActivityInitialValues() {
    this.loadSelectedTask();

    await this.loadTags();

    this.loadSelectedTags();

    this.setIsTaskClosed();

    this.loadLists();
  }

  public onSelectedTags(selectedTags: any): void {
    this.selectedTags = selectedTags;
  }

  public parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  public setSelectedDate(date: string): void {
    this.selectedTask.targetDate = this.parseDate(date);
  }

  private loadLists(): void {
    this.loadResponsiblesList();
  }

  private loadSelectedTask(): void {

    this.selectedTask.name = this.activity.name;
    this.selectedTask.notes = this.activity.notes;
    this.selectedTask.responsibleUID = this.activity.responsible.uid;
    this.selectedTask.targetDate = this.activity.targetDate;
    this.selectedTask.requestedTime = this.activity.startDate;
    this.selectedTask.startDate = this.activity.startDate;
    this.selectedTask.ragStatus = this.activity.ragStatus;
    this.selectedTask.tags = this.activity.tags;
  }

  private loadResponsiblesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.projectService.getResponsiblesList(this.activity.project.uid)
      .toPromise()
      .then((x) => this.responsiblesList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private async updateTask() {
    const errMsg = 'Ocurrió un problema al intentar actualizar la actividad.';

    await this.activityService.updateActivity(this.activity.project.uid, this.activity.uid, this.selectedTask)
      .toPromise().then((x) => {
        this.onUpdateActivity.emit(x);
        this.onClose();
      })
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private async addTask() {
    const errMsg = 'Ocurrió un problema al intentar actualizar la actividad.';

    alert("la tarea fue agregada con exito");
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
    this.selectedTask.tags = this.selectedTags.filter(x => x.selected === true)
                                              .map(x => x.name);
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
    if (this.activity.stage === 'Done') {
      this.isTaskClosed = true;
    } else {
      this.isTaskClosed = false;
    }
  }

  private validateTargetDate(): boolean {
    let targetDate = new Date(this.selectedTask.targetDate);
    let dueDate = new Date(this.activity.dueDate);
    let today = new Date();


    if (targetDate > dueDate) {
      alert("La fecha objetivo de la actividad no puede ser posterior a la fecha máxima de entrega.");
      return false;
    }

    return true;
  }

}
