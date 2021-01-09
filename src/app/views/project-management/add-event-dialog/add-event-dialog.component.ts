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
import { map, startWith } from 'rxjs/operators';

import { ProjectTemplateStore } from '@app/store/project-template.store';
import { ProjectStore } from '@app/store/project.store';
import { WhatIfService } from '@app/data-services/project-management';

import { Activity, ActivityTemplate, Project,
        StateChange, WhatIfResult } from '@app/models/project-management';

import { TimelineHelper } from '../common/timeline-helper';
import { isEmpty } from '@app/core/data-types';


@Component({
  selector: 'emp-steps-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {

  filteredEvents: Observable<ActivityTemplate[]>;

  form: FormGroup;

  project: Project;
  events: ActivityTemplate[] = [];
  whatIfResult: Observable<WhatIfResult> = of();
  insertionPoint: Activity;

  constructor(private projectStore: ProjectStore,
              private templateStore: ProjectTemplateStore,
              private whatIfService: WhatIfService,
              private dialogRef: MatDialogRef<AddEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.insertionPoint = data.insertionPoint;
  }


  ngOnInit() {
    this.projectStore.selectedProject().subscribe(
      x => {
        this.project = x.project;
         this.templateStore.startEvents(this.project)
          .toPromise().then((y) => this.events = y);
      }
    );

    this.createFormGroup();

    this.dialogRef.updateSize();

    this.filteredEvents = this.form.get('selectedEvent').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  private _filter(value: string | ActivityTemplate): ActivityTemplate[] {
    const filterValue = value && typeof value === 'string' ? value.toLowerCase() : '';

    console.log('count events', this.events.length);

    return this.events.filter(x => x.name.toLowerCase().includes(filterValue));
  }

  displayFn(value: ActivityTemplate): string {
    return value && value.name ? value.name : '';
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

    if (isEmpty(this.insertionPoint)) {
      return {
        activityTemplateUID: formModel.selectedEvent.uid,
        eventDate: formModel.eventDate
      };
    }
    return {
      activityTemplateUID: formModel.selectedEvent.uid,
      eventDate: formModel.eventDate,
      insertionPointUID: this.insertionPoint.uid,
      insertionPosition: formModel.position
    };
  }

}
