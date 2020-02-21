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

import { ProjectTemplateStore } from '@app/store/project-template.store';
import { ProjectStore } from '@app/store/project.store';
import { WhatIfService } from '@app/services/project-management';

import { Project, StateChange, WhatIfResult, Activity, ProjectProcess } from '@app/models/project-management';
import { TimelineHelper } from '../common/timeline-helper';


@Component({
  selector: 'emp-steps-check-processes-dialog',
  templateUrl: './check-processes-dialog.component.html',
  styleUrls: ['./check-processes-dialog.component.scss']
})
export class CheckProcessesDialogComponent implements OnInit {

  form: FormGroup;

  project: Project;
  processesList: Observable<ProjectProcess[]> = of([]);
  selectedProcess: ProjectProcess;
  whatIfResult: Observable<WhatIfResult> = of();

  constructor(private projectStore: ProjectStore,
              private templateStore: ProjectTemplateStore,
              private whatIfService: WhatIfService,
              private dialogRef: MatDialogRef<CheckProcessesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }


  ngOnInit() {
    this.projectStore.selectedProject().subscribe (
      x => {
        this.project = x.project;
        this.processesList = this.whatIfService.processesCheckList(this.project);
      }
    );

    this.createFormGroup();

    this.dialogRef.updateSize();
  }


  get timelineHelper() {
    return TimelineHelper;
  }


  isSelected(stateChange: StateChange) {

  }


  loadProcessChangesList() {
    if (!this.form.valid) {
      return;
    }

    this.whatIfResult =
        this.whatIfService.whatIfUpdatedWithLastProcessChanges(this.project, this.selectedProcess);
  }


  close() {
    this.dialogRef.close();
  }


  save() {
    if (!this.form.valid) {
      return;
    }

    const data = this.getFormData();

    this.projectStore.createFromActivityTemplate(this.project, data);

    this.dialogRef.close(this.form.value);
  }


  // private methods


  private createFormGroup() {
    const formGroup = new FormGroup({
      selectedProcessUID: new FormControl('', Validators.required),
    });

    this.form = formGroup;
  }


  private getFormData() {
    const formModel = this.form.value;

    return {
      processUID: formModel.selectedProcessUID
    };
  }

}
