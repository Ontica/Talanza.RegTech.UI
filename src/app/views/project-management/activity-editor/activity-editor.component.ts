/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, Output } from '@angular/core';

import { Activity, EmptyActivity } from '@app/models/project-management';

import { CardSettings } from '@app/shared/common-models';


@Component({
  selector: 'emp-steps-activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['../../../../styles/card.scss']
})
export class ActivityEditorComponent implements OnChanges {

  @Output() activityEditorClose = new EventEmitter();
  @Output() activityChange = new EventEmitter<Activity>();

  @Input() activity: Activity = EmptyActivity;
  @Input() useForeignLanguage: false;

  readonly childrenSettings = new CardSettings();

  ngOnChanges() {
    if (!this.activity) {
      this.activity = EmptyActivity;
    }
    this.childrenSettings.showTitle = false;
    this.childrenSettings.readonly = true;
    this.childrenSettings.flat = true;
  }

  get activityName() {
    if (this.useForeignLanguage) {
      return this.activity.foreignLanguage.name || this.activity.name;
    } else {
      return this.activity.name;
    }
  }

  onClose() {
    this.activityEditorClose.emit();
  }

  onUpdateActivity() {
    this.activityChange.emit(this.activity);
  }

}
