/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector:'activity-editor',
  template:`
    <div class="editor-container editor-container-style">
  <div class="header">
    <div class="close-button right-position" (click)="onClose()">&times;</div>
    <div class="title">Agregar actividad al proyecto: <b></b></div>
    <div class="subtitle">Proyecto el dorado </div>
  </div>
  <br>
  <div class="tab">
    <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='general-info-tab'" (click)="onChangeTab('general-info-tab')">Información general</button>
    <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='assign-tasks-tab'" (click)="onChangeTab('assign-tasks-tab')">Asignar tareas</button>
    <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='control-state-tab'" (click)="onChangeTab('control-state-tab')">Control y estado</button>
  </div>
  <div [ngSwitch]="currentSelectedTab" class="form-frame">
   <activity-edit *ngSwitchCase="'general-info-tab'" (onCloseEvent)="onClose()"></activity-edit>
    <project-assign-tasks *ngSwitchCase="'assign-tasks-tab'" [project]="project"></project-assign-tasks>
    <activity-control-state *ngSwitchCase="'control-state-tab'"></activity-control-state>

  </div>
</div>

  `,
  styleUrls:['./activity-editor.component.scss']

})
export class ActivityEditorComponent {

  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();

  public currentSelectedTab = 'general-info-tab';
  public isDisabled = false;

  public onChangeTab(newSelectedTab: string): void {
    this.currentSelectedTab = newSelectedTab;
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

}