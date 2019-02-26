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
import { DateStringLibrary } from '@app/models/core';


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

  get viewTitle() {

    switch (this.groupBy) {
      case 'deadline':
        return 'Fecha máxima de entrega';

      case 'plannedEndDate':
        return 'Fecha objetivo';

      case 'actualStartDate':
        return 'Fecha de inicio';

      case 'responsible':
        return 'Responsables';

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


  isCompleted(activity: Activity) {
    return activity.status === 'Completed';
  }


  isSelected(activity: Activity): boolean {
    return (activity.uid === this.selectedActivity.uid);
  }


  displayPlannedDate(activity: Activity) {
    return activity.plannedEndDate && !this.isCompleted(activity) &&
           !this.samePlannedDateAndDeadline(activity);
  }


  samePlannedDateAndDeadline(activity: Activity) {
    return activity.plannedEndDate.toString() === activity.deadline.toString();
  }

  actualEndDateVsDeadlineDays(activity: Activity) {
    const actualEarnedDays = DateStringLibrary.daysBetween(activity.actualEndDate, activity.deadline);

    const label = this.daysDifferenceLabel(actualEarnedDays);

    return this.applyTextColorBasedOnDays(actualEarnedDays, label);
  }


  plannedEndDateVsDeadlineDays(activity: Activity) {
    const plannedEarnedDays = DateStringLibrary.daysBetween(activity.plannedEndDate, activity.deadline);

    return this.daysDifferenceLabel(plannedEarnedDays);
  }


  getTimelineColor(activity: Activity, date: string, use: 'border' | 'date' | 'title') {
    const gray = '#9a9a9a';
    const green = '#009900';
    const amber = '#ff9900';
    const red = '#cc0000';
    const default_color = '#3dbab3';
    const ghost_color = '#ECECEC';

    const green_bound = 28;
    const amber_bound = 14;
    const red_bound = 7;

    if (this.isCompleted(activity)) {
      return use === 'border' ? gray : '';
    }

    if (activity.warnType === 'NA') {
      return '';
    }

    const remainingDays = DateStringLibrary.daysBetween(DateStringLibrary.today(), date);

    if (use === 'title') {
      return remainingDays <= 0 ? red : '';
    }

    let warnDaysFactor = 1;

    if (activity.warnDays >= green_bound) {
      warnDaysFactor = activity.warnDays / green_bound;
    } else if (activity.warnDays >= 1) {
      warnDaysFactor = activity.warnDays / red_bound;
    }

    if (remainingDays <= red_bound * warnDaysFactor) {
      return red;
    } else if (remainingDays <= amber_bound * warnDaysFactor) {
      return amber;
    } else if (remainingDays <= green_bound * warnDaysFactor) {
      return green;
    } else if (use === 'border') {
      return date ? default_color : ghost_color;
    } else {
      return '';
    }
  }


  applyTextColorBasedOnDays(days: number, text: string)  {
    const green = '#009900';
    const red = '#cc0000';

    if (days > 0) {
      return `<span style="color:${green}">${text}</span>`;
    } else if (days < 0) {
      return `<span style="color:${red}">${text}</span>`;
    } else {
      return `${text}`;
    }
  }


  private daysDifferenceLabel(days: number) {
    if (!days || days === 0) {
      return '';
    }

    const months = days / 30.5;
    const weeks = days / 7;

    if (weeks > 8) {
      return `${months.toFixed(1).replace('.0', '')} meses antes`;

    } else if (weeks < -8) {
      return `${Math.abs(months).toFixed(1).replace('.0', '')} meses después`;
    }

    if (weeks >= 4) {
      return `${weeks.toFixed(1).replace('.0', '')} semanas antes`;

    } else if (weeks <= -4) {
      return `${Math.abs(weeks).toFixed(1).replace('.0', '')} semanas después`;
    }

    if (days === 1) {
      return 'Un día antes';

    } else if (days > 1) {
      return `${days} días antes`;

    } else if (days === -1) {
      return `Un día después`;

    } else if (days < -1) {
      return `${Math.abs(days)} días después`;

    } else {
      return '';

    }
  }

}
