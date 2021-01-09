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
import { WhatIfService } from '@app/data-services/project-management';

import { ActivityTemplate, Project, StateChange, WhatIfResult, Activity } from '@app/models/project-management';
import { TimelineHelper } from '../common/timeline-helper';
import { isEmpty } from '@app/core/data-types';


@Component({
  selector: 'emp-steps-report-something-dialog',
  templateUrl: './report-something-dialog.component.html',
  styleUrls: ['./report-something-dialog.component.scss']
})
export class ReportSomethingDialogComponent implements OnInit {

  form: FormGroup;

  project: Project;
  events: Observable<ActivityTemplate[]> = of([]);
  whatIfResult: Observable<WhatIfResult> = of();

  constructor(private projectStore: ProjectStore,
              private templateStore: ProjectTemplateStore,
              private whatIfService: WhatIfService,
              private dialogRef: MatDialogRef<ReportSomethingDialogComponent>) { }


  ngOnInit() {
    this.projectStore.selectedProject().subscribe (
      x => {
        this.project = x.project;
        this.events = this.templateStore.startEvents(this.project);
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


  loadWhatIfList() {
    if (!this.form.valid) {
      return;
    }

    const data = this.getFormData();

    this.whatIfResult =
        this.whatIfService.whatIfCreatedFromEvent(this.project, data.activityTemplateUID, data.eventDate);
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
      selectedEvent: new FormControl('', Validators.required),
      eventDate: new FormControl('', Validators.required),
      position: new FormControl('AsTreeRootAtStart', Validators.required)
    });

    this.form = formGroup;
  }


  private getFormData() {
    const formModel = this.form.value;

    return {
      activityTemplateUID: formModel.selectedEvent,
      eventDate: formModel.eventDate
    };
  }

}
