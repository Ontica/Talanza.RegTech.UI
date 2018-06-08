/**
* @license
* Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
*
* See LICENSE.txt in the project root for complete license information.
*
*/

import {
  Component, EventEmitter, HostBinding, Input,
  Output
} from '@angular/core';

import { Activity } from '@app/models/project-management';

@Component({
  selector: 'old-activity-editor',
  templateUrl: './old-activity-editor.component.html',
  styleUrls: ['./old-activity-editor.component.scss'],
})

export class OldActivityEditorComponent {

  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  private _activity: Activity;
  @Input()
  set activity(activity: Activity) {
    this._activity = activity;

    this.setCloseActivityLabel();
  }
  get activity(): Activity {
    return this._activity;
  }

  @Output() public onCloseEvent = new EventEmitter();
  @Output() public onUpdateActivity = new EventEmitter<Activity>();

  public selectedTab: string = 'generalInfo';
  public closeActivityLabel = '';

  public constructor() { }

  public selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public updateActivity(activity: Activity): void {
    this.onUpdateActivity.emit(activity);

    this.onClose();
  }

  private setCloseActivityLabel(): void {
    if (this.activity.stage === 'Done') {
      this.closeActivityLabel = '<i class="fa fa-check-circle" aria-hidden="true"></i> Tarea concluida';

    } else {
      this.closeActivityLabel = 'Concluir tarea';
    }

  }

}
