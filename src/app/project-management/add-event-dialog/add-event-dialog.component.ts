/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Inject, OnInit } from '@angular/core';

import {
  FormBuilder, FormControl,
  FormGroup, Validators
} from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { Observable, of } from 'rxjs';

import { ProjectTemplateStore } from '@app/store/project-template.store';
import { Activity, Project } from '@app/models/project-management';
import { ProjectStore } from '@app/store/project.store';


@Component({
  selector: 'add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {

  form: FormGroup;

  project: Project;
  events: Observable<Activity[]> = of([]);

  constructor(private projectStore: ProjectStore,
              private templateStore: ProjectTemplateStore,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {

  }

  ngOnInit() {

    this.projectStore.selectedProject().subscribe (
      x => { this.project = x.project }
    );

    this.events = this.templateStore.events();

    this.createFormGroup();

  }


  save() {

    if (!this.form.valid) {
      return;
    }

    const data = this.getFormData();

    this.projectStore.createFromEvent(this.project, data);

    this.dialogRef.close(this.form.value);
  }


  close() {
    this.dialogRef.close();
  }


  // private methods

  private createFormGroup() {
    const formGroup = new FormGroup({

      selectedEvent: new FormControl('', Validators.required),

      targetDate: new FormControl('', Validators.required),

    });

    this.form = formGroup;
  }


  private getFormData() {
    const formModel = this.form.value;

    return {

      eventUID: formModel.selectedEvent,
      targetDate: formModel.targetDate,

    }
  }

}
