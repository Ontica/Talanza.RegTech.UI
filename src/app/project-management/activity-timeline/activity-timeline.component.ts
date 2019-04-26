/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Assertion } from '@app/core';

import { Activity, EmptyActivity } from '@app/models/project-management';

import { GroupByProperty } from './group-activities-by.pipe';

import { TimelineHelper } from '../common/timeline-helper';


@Component({
  selector: 'emp-steps-activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss'],
})
export class ActivityTimelineComponent implements OnChanges {

  @Input() activities: Activity[] = [];
  @Input() groupBy: GroupByProperty = 'timeline';

  @Input() title = 'Please select a contract';
  @Input() hint = 'Timelines';

  @Output() activitySelected = new EventEmitter<Activity>();

  selectedActivity: Activity = EmptyActivity;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['activities']) {
      this.resetSelectedActivity();
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
        return 'Default Timeline';

      case 'deadline':
        return 'By Deadline';

      case 'plannedEndDate':
        return 'By Planned End Date';

      case 'actualStartDate':
        return 'By Actual Start Date';

      case 'responsible':
        return 'By Responsible';

      case 'theme':
        return 'By Theme';

      default:
        throw Assertion.assertNoReachThisCode(`Unrecognized groupBy value '${this.groupBy}'.`);
    }
  }


  onChangeGroupBy(groupBy: GroupByProperty) {
    this.groupBy = groupBy;
  }


  onSearch() {

  }


  onSelectActivity(activity: Activity, emitEvent: boolean = false) {
    this.selectedActivity = activity;

    if (emitEvent) {
      this.activitySelected.emit(activity);
    }
  }


  isSelected(activity: Activity): boolean {
    return (activity.uid === this.selectedActivity.uid);
  }


  // private methods


  private resetSelectedActivity() {
    const found = this.activities.find(x => x.uid === this.selectedActivity.uid);

    if (!found) {
      this.selectedActivity = EmptyActivity;
    }
  }

}
