/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, OnChanges, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';

import { ProjectModel } from '@app/store/project.store';
import { Activity, EmptyActivity } from '@app/models/project-management';

import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';

import { GroupByProperty } from './group-activities-by.pipe';

import { Assertion } from '@app/core';
import { TimelineHelper } from '../utilities/timeline-helper';


@Component({
  selector: 'emp-steps-activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss'],
})
export class ActivityTimelineComponent implements OnChanges {

  selectedActivity: Activity = EmptyActivity;

  @Input() project: ProjectModel;
  @Input() groupBy: GroupByProperty;

  @Output() activitySelected = new EventEmitter<Activity>();


  constructor(private dialog: MatDialog) { }


  ngOnChanges() {
    if (this.project) {
      if (this.selectedActivity.project.uid !== this.project.project.uid) {
        this.selectedActivity = EmptyActivity;
      }
    }
  }


  get hasSelectedActivities() {
    return (this.selectedActivity.uid !== '');
  }


  get timelineHelper() {
    return TimelineHelper;
  }


  get viewTitle() {
    switch (this.groupBy) {
      case 'timeline':
        return 'Línea de tiempo';

      case 'deadline':
        return 'Fecha máxima de entrega';

      case 'plannedEndDate':
        return 'Fecha objetivo';

      case 'actualStartDate':
        return 'Fecha de inicio';

      case 'responsible':
        return 'Responsables';

      case 'theme':
        return 'Temas';

      default:
        throw Assertion.assertNoReachThisCode(`Unrecognized groupBy value '${this.groupBy}'.`);
    }
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


  isSelected(activity: Activity): boolean {
    return (activity.uid === this.selectedActivity.uid);
  }

}
