/**
* @license
* Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
*
* See LICENSE.txt in the project root for complete license information.
*
*/

import { Component, EventEmitter, HostBinding, Input,
         Output } from '@angular/core';

import { TaskRef } from '../data-types/task';

import { ActivityRef } from '../data-types/activity';

@Component({
  selector: 'activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.scss'],  
})

export class ActivityEditorComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  private _task: ActivityRef;
  @Input()
  set task(task: ActivityRef) {
    this._task = task;
   
    this.setConcludedTaskLabel();
  }
  get task(): ActivityRef {
    return this._task;
  }

  @Output() public onCloseEvent = new EventEmitter();
  @Output() public onUpdateActivity = new EventEmitter<ActivityRef>();

  public selectedTask: string = 'generalInfo';  
  public concluededTaskLabel = '';

  public constructor() { }
  
  public setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;  
  }

  public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  } 

  public updateActivity(acitivity: ActivityRef): void {    
    this.onUpdateActivity.emit(acitivity);
    this.onClose();
  }

  private setConcludedTaskLabel(): void {
    if (this.task.stage === 'Done') {
      this.concluededTaskLabel = '<i class="fa fa-check-circle" aria-hidden="true"></i> Tarea concluida';
    } else {
      this.concluededTaskLabel = 'Concluir tarea';
    }

  }

}
