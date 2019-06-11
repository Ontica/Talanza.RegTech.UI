/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ProjectTemplateStore } from '@app/store/project-template.store';
import { Activity, ActivityOperation, Project } from '@app/models/project-management';


@Component({
  selector: 'emp-steps-move-activity-dialog',
  templateUrl: './move-activity-dialog.component.html',
  styleUrls: ['./move-activity-dialog.component.scss']
})
export class MoveActivityDialogComponent {

  templates: Observable<List<Project>>;

  selectedActivity: Activity;
  targetProjectUID = '';

  constructor(protected templateStore: ProjectTemplateStore,
              private dialogRef: MatDialogRef<MoveActivityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {

    this.selectedActivity = data as Activity;

    this.templates = templateStore.templates;
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
