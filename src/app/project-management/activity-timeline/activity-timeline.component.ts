/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, OnChanges, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from "@angular/material";

import { ProjectModel } from '@app/store/project.store';
import { Activity, Activity_Empty } from '@app/models/project-management';

import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';

import { GroupByProperty } from './group-activities-by.pipe';
import { Assertion } from '@app/core';


@Component({
  selector: 'activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss'],
})
export class ActivityTimelineComponent implements OnChanges {

  selectedActivity: Activity = Activity_Empty;

  @Input() project: ProjectModel;
  @Input() groupBy: GroupByProperty;

  @Output() activitySelected = new EventEmitter<Activity>();


  constructor(private dialog: MatDialog) { }


  ngOnChanges() {
    if (this.project) {
      if (this.selectedActivity.project.uid !== this.project.project.uid) {
        this.selectedActivity = Activity_Empty;
      }
    }
  }


  get hasSelectedActivities() {
    return (this.selectedActivity.uid !== '');
  }

  get viewTitle() {

    switch (this.groupBy) {
      case 'dueDate':
        return "Fecha máxima de entrega";

      case 'targetDate':
        return "Fecha objetivo";

      case 'startDate':
        return "Fecha de inicio";

      case 'responsible':
        return "Responsables";

      default:
        throw Assertion.assertNoReachThisCode(`Unrecognized groupBy value '${this.groupBy}'.`);
    }

  }

  isActivitySelected(activity: Activity): boolean {
    return (activity.uid === this.selectedActivity.uid);
  }


  onSelectActivity(activity: Activity, emitEvent: boolean = false) {
    this.selectedActivity = activity;

    if (emitEvent) {
      this.activitySelected.emit(activity);
    }
  }


  openAddEventDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px',
    dialogConfig.width = '600px',

    this.dialog.open(AddEventDialogComponent, dialogConfig);
  }

}
