/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { Assertion } from '@app/core';

import { Activity, EmptyActivity } from '@app/models/project-management';

import { GroupByProperty } from './group-activities-by.pipe';

import { InboxType, TimelineHelper } from '../common/timeline-helper';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ReportSomethingDialogComponent } from '../report-something-dialog/report-something-dialog.component';

@Component({
  selector: 'emp-steps-activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['../../../../styles/activity.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityTimelineComponent implements OnChanges {

  @Input() activities: Activity[] = [];
  @Input() inboxType: InboxType = 'upcoming-tasks';
  @Input() groupBy: GroupByProperty = 'timeline';
  @Input() title = '';
  @Input() useForeignLanguage: false;

  @Output() activitySelect = new EventEmitter<Activity>();

  selectedActivity: Activity = EmptyActivity;

  filteredActivities: Activity[] = [];

  keywords: '';

  constructor(private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activities']) {
      this.resetSelectedActivity();
      this.applyFilters();
    }
  }

  get hasSelectedActivities() {
    return (this.selectedActivity.uid !== '');
  }

  get timelineHelper() {
    return TimelineHelper;
  }

  get groupByTitle() {
    switch (this.groupBy) {
      case 'timeline':
        return 'Default Timeline';

      case 'deadline':
        return 'By Deadline';

      case 'plannedEndDate':
        return 'By Planned End Date';

      case 'actualStartDate':
        return 'By Actual Start Date';

      case 'resource':
        return 'By Resource';

      case 'responsible':
        return 'By Responsible';

      case 'tag':
        return 'By Tag';

      case 'theme':
        return 'By Topic';

      default:
        throw Assertion.assertNoReachThisCode(`Unrecognized groupBy value '${this.groupBy}'.`);
    }
  }

  get inboxTypeTitle() {
    switch (this.inboxType) {
      case 'upcoming-tasks':
        return 'Upcoming Tasks';

      case 'active-tasks':
        return 'Defined Tasks';

      case 'all-tasks':
        return 'All Tasks';

      default:
        return 'Tasks';
    }
  }

  getActivityName(activity: Activity) {
    if (this.useForeignLanguage) {
      return activity.foreignLanguage.name || activity.name;
    } else {
      return activity.name;
    }
  }


  getCardHint(): string {
    const counter = this.filteredActivities.length;

    if (counter !== 1) {
      return `${counter} tasks found.`;
    } else {
      return `One task found.`;
    }
  }

  getCardTitle(): string {
    if (this.title) {
      return this.title;
    }
    return this.inboxTypeTitle;
  }

  onChangeGroupBy(groupBy: GroupByProperty) {
    this.groupBy = groupBy;
  }

  onChangeInboxType(inboxType: InboxType) {
    this.inboxType = inboxType;
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  onSelectActivity(activity: Activity, emitEvent: boolean = false) {
    this.selectedActivity = activity;

    if (emitEvent) {
      this.activitySelect.emit(activity);
    }
  }

  openReportSomethingDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px',
    dialogConfig.width = '600px',

    this.dialog.open(ReportSomethingDialogComponent, dialogConfig);
  }

  isSelected(activity: Activity): boolean {
    return (activity.uid === this.selectedActivity.uid);
  }

  // private methods

  private applyFilters() {
    this.filteredActivities =
              TimelineHelper.applyInboxTypeFilter(this.activities, this.inboxType, this.keywords);
  }

  private resetSelectedActivity() {
    const found = this.activities.find(x => x.uid === this.selectedActivity.uid);

    if (!found) {
      this.selectedActivity = EmptyActivity;
    }
  }

}
