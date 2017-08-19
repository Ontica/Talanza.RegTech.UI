/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

import { Activity, EmptyActivity, ProjectRef } from '../data-types/project';

import { ActivityService } from '../services/activity.service';

@Component({
  selector:'activity-editor',
  template:`
    <div class="editor-container editor-container-style">
  <div class="header">
    <div class="close-button right-position" (click)="onClose()">&times;</div>
    <div class="title">Modificación de medidores </div>
    <div class="subtitle"><b>{{project.name}}</b> <div class="right-position">Inicio planeado: 22 Ago 2017</div></div>
  </div>
  <br>
  <div class="tab">
    <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='general-info-tab'" (click)="onChangeTab('general-info-tab')">Información general</button>
    <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='assign-tasks-tab'" (click)="onChangeTab('assign-tasks-tab')">Asignar tareas</button>
    <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='control-state-tab'" (click)="onChangeTab('control-state-tab')">Control y estado</button>
  </div>
  <div [ngSwitch]="currentSelectedTab" class="form-frame">   
 
  <activity-general-info *ngSwitchCase="'general-info-tab'" (onCloseEvent)="onClose()"></activity-general-info>
  <activity-assing-task *ngSwitchCase="'assign-tasks-tab'"></activity-assing-task>
  <activity-control-and-state *ngSwitchCase="'control-state-tab'"></activity-control-and-state>
  </div>
</div>

  `,
  styleUrls:['./activity-editor.component.scss'],
  providers:[ActivityService]

})
export class ActivityEditorComponent implements OnInit {

  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();
  @Input() public project: ProjectRef;
  @Input() public activityId: number;

  public activity: Activity = EmptyActivity();

  public currentSelectedTab = 'general-info-tab';  

  constructor(private activityService: ActivityService){}

  ngOnInit() {    
    //this.loadActivity(this.activityId);
  }

  public onChangeTab(newSelectedTab: string): void {
    this.currentSelectedTab = newSelectedTab;
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  private loadActivity(itemId: number): void {
    const errMsg = 'Ocurrió un problema al intentar leer la actividad.';

    this.activityService.getActivity(itemId)
                        .toPromise()
                        .then((x) =>{ this.activity = x; console.log(this.activity); })
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

}