/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ProjectTemplateStore } from '@app/store/project-template.store';
import { Activity, ActivityOperation } from '@app/models/project-management';


@Component({
  selector: 'move-activity-dialog',
  templateUrl: './move-activity-dialog.component.html',
  styleUrls: ['./move-activity-dialog.component.scss']
})
export class MoveActivityDialogComponent {

  selectedActivity: Activity;
  targetProjectUID = '';

  constructor(protected templateStore: ProjectTemplateStore,
              private dialogRef: MatDialogRef<MoveActivityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {

    this.selectedActivity = data as Activity;

  }


  close() {
    this.dialogRef.close();
  }


  copyActivity() {
    const operation: ActivityOperation = {
      operation: 'copyToProject',
      activity: this.selectedActivity,
      targetProjectUID: this.targetProjectUID
    };

    this.dialogRef.close(operation);
  }


  moveActivity() {
    const operation: ActivityOperation = {
      operation: 'moveToProject',
      activity: this.selectedActivity,
      targetProjectUID: this.targetProjectUID
    };

    this.dialogRef.close(operation);
  }

}
