/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';

import { ProjectStore } from '@app/store/project.store';
import { WhatIfService } from '@app/services/project-management';

import { ActivityTemplate, StateChange, WhatIfResult, Activity } from '@app/models/project-management';
import { TimelineHelper } from '../common/timeline-helper';
import { DateString } from '@app/models/core';


@Component({
  selector: 'emp-steps-change-date-dialog',
  templateUrl: './change-date-dialog.component.html',
  styleUrls: ['./change-date-dialog.component.scss']
})
export class ChangeDateDialogComponent implements OnInit {

  activity: Activity;
  date: DateString;

  form: FormGroup;

  events: Observable<ActivityTemplate[]> = of([]);
  whatIfResult: Observable<WhatIfResult> = of();

  constructor(private projectStore: ProjectStore,
              private whatIfService: WhatIfService,
              private dialogRef: MatDialogRef<ChangeDateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
     this.activity = data.activity;
     this.date = data.actualEndDate;
  }


  ngOnInit() {
    this.createFormGroup();

    this.whatIfResult =
      this.whatIfService.whatIfCompleted(this.activity, this.form.value.eventDate);

    this.dialogRef.updateSize();
  }


  get timelineHelper() {
    return TimelineHelper;
  }


  isSelected(stateChange: StateChange) {

  }


  loadWhatIfList() {
    if (!this.form.valid) {
      return;
    }

    const data = this.getFormData();

    this.whatIfResult =
              this.whatIfService.whatIfCompleted(this.activity, data.eventDate);
  }


  close() {
    this.dialogRef.close(null);
  }


  save() {
    if (!this.form.valid) {
      return;
    }

    const data = this.getFormData();

    const updateData = {
      actualEndDate: data.eventDate
    };

    this.projectStore.completeActivity(this.activity, updateData);

    this.dialogRef.close(true);
  }


  // private methods


  private createFormGroup() {
    const formGroup = new FormGroup({
      eventDate: new FormControl(this.date, Validators.required),
    });

    this.form = formGroup;
  }


  private getFormData() {
    const formModel = this.form.value;

    return {
      eventDate: formModel.eventDate
    };
  }

}
