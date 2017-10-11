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

@Component({
  selector: 'task-form-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.scss'],  
})

export class ActivityEditorComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  public isCloseTaskEditorVisible = false;

  private _task: any;
  @Input()
  set task(task: any) {
    this._task = task;
  }
  get task(): any {
    return this._task;
  }

  @Output() public onCloseEvent = new EventEmitter();

  public constructor() { }
 
  public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onCloseTask(): void {
    this.isCloseTaskEditorVisible  = true;
  }

  public onCloseTaskEditorIsClosed(): void {
    this.onClose();
  }

  public onShowCloseTaskEditor(): void {
    this. isCloseTaskEditorVisible = true;
  }

}
