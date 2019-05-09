/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { DateStringLibrary } from '@app/models/core';

import { Activity } from '@app/models/project-management';


enum COLORS {
  green = '#009900',
  amber = '#ff9900',
  red = '#cc0000',
  gray = '#9a9a9a',
  ghost_color = '#ececec',
  default_color = '#3dbab3',
  empty = ''
}


enum DEFAULT_BOUNDS {
  green_bound = 28,
  amber_bound = 14,
  red_bound = 7
}


const USE_WEEKS_AND_MONTHS_FORMAT = false;


export type InboxType = 'upcoming-tasks' | 'active-tasks' | 'all-tasks';


export class TimelineHelper {


  static actualEndDateVsDeadlineDays(activity: Activity) {
    const actualEarnedDays = DateStringLibrary.daysBetween(activity.actualEndDate, activity.deadline);

    const label = this.daysDifferenceLabel(actualEarnedDays, USE_WEEKS_AND_MONTHS_FORMAT);

    return this.applyTextColorBasedOnDays(actualEarnedDays, label);
  }


  static applyInboxTypeFilter(source: Activity[], inboxType: InboxType): Activity[] {
    switch (inboxType) {
      case 'upcoming-tasks':
        return TimelineHelper.filterUpcomingTasks(source);

      case 'active-tasks':
        return TimelineHelper.filterActiveTasks(source);

      default:
        return source;
    }
  }


  static displayPlannedEndDate(activity: Activity) {
    return activity.plannedEndDate && !this.isCompleted(activity) &&
           !this.samePlannedDateAndDeadline(activity);
  }


  static filterActiveTasks(source: Activity[]) {
    return source.filter(x => x.status !== 'Completed' &&
                        (x.deadline || x.plannedEndDate || x.actualStartDate || x.actualEndDate));
  }


  static filterUpcomingTasks(source: Activity[]) {
    let filtered = source.filter(x => x.status !== 'Completed');

    const colored = [COLORS.red, COLORS.amber, COLORS.green];

    filtered = filtered.filter(x =>
                  colored.includes(TimelineHelper.getTimelineColor(x, x.deadline.toString(), 'border')));

    return filtered;
  }


  static getGroupName(groupKey: string): string {
    if (!groupKey) {
      return '';
    }

    const groupKeyParts = groupKey.split('-');

    if (groupKeyParts.length !== 2) {
      return groupKey;
    }

    if (isNaN(Number(groupKeyParts[0])) || isNaN(Number(groupKeyParts[1]))) {
      return groupKey;
    }

    return groupKeyParts[0] + '-' + DateStringLibrary.shortMonthName(Number(groupKeyParts[1]) - 1, 'en');
  }


  static getTimelineColor(activity: Activity, date: string, use: 'border' | 'date' | 'title') {
    if (this.isCompleted(activity)) {
      return use === 'border' ? COLORS.gray : COLORS.empty;
    }

    if (activity.warnType === 'NA') {
      return COLORS.empty;
    }

    const remainingDays = DateStringLibrary.daysBetween(DateStringLibrary.today(), date);

    if (use === 'title') {
      return remainingDays <= 0 ? COLORS.red : COLORS.empty;
    }

    let warnDaysFactor = 1;

    if (activity.warnDays >= DEFAULT_BOUNDS.green_bound) {
      warnDaysFactor = activity.warnDays / DEFAULT_BOUNDS.green_bound;

    } else if (activity.warnDays >= 1) {
      warnDaysFactor = activity.warnDays / DEFAULT_BOUNDS.red_bound;

    }


    if (remainingDays <= DEFAULT_BOUNDS.red_bound * warnDaysFactor) {
      return COLORS.red;

    } else if (remainingDays <= DEFAULT_BOUNDS.amber_bound * warnDaysFactor) {
      return COLORS.amber;

    } else if (remainingDays <= DEFAULT_BOUNDS.green_bound * warnDaysFactor) {
      return COLORS.green;

    } else if (use === 'border') {
      return date ? COLORS.default_color : COLORS.ghost_color;

    } else {
      return COLORS.empty;
    }
  }


  static isCompleted(activity: Activity) {
    return activity.status === 'Completed';
  }


  static plannedEndDateVsDeadlineDays(activity: Activity) {
    const plannedEarnedDays = DateStringLibrary.daysBetween(activity.plannedEndDate, activity.deadline);

    return this.daysDifferenceLabel(plannedEarnedDays, USE_WEEKS_AND_MONTHS_FORMAT);
  }


  // private methods


  private static applyTextColorBasedOnDays(days: number, text: string)  {
    if (days > 0) {
      return `<span style="color:${COLORS.green}">${text}</span>`;

    } else if (days < 0) {
      return `<span style="color:${COLORS.red}">${text}</span>`;

    } else {
      return `${text}`;
    }
  }


  private static daysDifferenceLabel(days: number, useWeeksAndMonths = true) {
    if (!days || days === 0) {
      return '';
    }

    const months = days / 30.5;
    const weeks = days / 7;

    if (useWeeksAndMonths) {
      if (weeks > 8) {
        return `${months.toFixed(1).replace('.0', '')} months before`;

      } else if (weeks < -8) {
        return `${Math.abs(months).toFixed(1).replace('.0', '')} months after`;
      }

      if (weeks >= 4) {
        return `${weeks.toFixed(1).replace('.0', '')} weeks before`;

      } else if (weeks <= -4) {
        return `${Math.abs(weeks).toFixed(1).replace('.0', '')} weeks after`;
      }
    }

    if (days === 1) {
      return 'One day before';

    } else if (days > 1) {
      return `${days} days before`;

    } else if (days === -1) {
      return `One day after`;

    } else if (days < -1) {
      return `${Math.abs(days)} days after`;

    } else {
      return '';

    }
  }


  private static samePlannedDateAndDeadline(activity: Activity) {
    return activity.plannedEndDate.toString() === activity.deadline.toString();
  }

}
