/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, OnChanges, Output } from '@angular/core';

import { Activity, Activity_Empty } from '@app/models/project-management';


@Component({
  selector: 'activity-designer',
  templateUrl: './activity-designer.component.html',
  styleUrls: ['./activity-designer.component.scss']
})
export class ActivityDesignerComponent implements OnChanges {

  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter<Activity>();

  @Input() activity: Activity = Activity_Empty;


  ngOnChanges() {
    if (!this.activity) {
      this.activity = Activity_Empty;
    }
  }


  onClose() {
    this.close.emit();
  }


  onDeleteActivity() {
    this.onClose();
  }


  onUpdateActivity() {
    this.update.emit(this.activity);
  }

}
