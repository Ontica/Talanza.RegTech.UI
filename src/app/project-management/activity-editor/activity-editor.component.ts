/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, Output } from '@angular/core';

import { Activity, Activity_Empty } from '@app/models/project-management';
import { CardSettings } from '@app/models/user-interface';


@Component({
  selector: 'activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.scss']
})
export class ActivityEditorComponent implements OnChanges {

  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter<Activity>();

  @Input() activity: Activity = Activity_Empty;

  readonly childrenSettings = new CardSettings();

  ngOnChanges() {
    if (!this.activity) {
      this.activity = Activity_Empty;
    }
    this.childrenSettings.showTitle = false;
    this.childrenSettings.readonly = true;
    this.childrenSettings.flat = true;
  }


  onClose() {
    this.close.emit();
  }


  onUpdateActivity() {
    this.update.emit(this.activity);
  }

}
