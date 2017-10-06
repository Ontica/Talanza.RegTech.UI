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
  templateUrl:'./activity-editor.component.html',
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

  async ngOnInit() {  
  
    await this.loadActivity(this.activityId);
   
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