/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Assertion } from '@app/core';

import { Activity } from '@app/models/project-management';
import { DateString, DateStringLibrary } from '@app/core/data-types';

export type GroupByDateProperty = 'actualEndDate' | 'plannedEndDate' | 'deadline' | 'actualStartDate';
export type GroupByProperty = 'timeline' | 'responsible' | 'tag' | 'theme' | 'resource' | GroupByDateProperty;


const TIMELINE_DATES_ARRAY: GroupByDateProperty[] = ['actualEndDate', 'plannedEndDate', 'deadline'];
const DEFAULT_DATES_ORDERING_ARRAY: GroupByDateProperty[] = ['actualEndDate', 'deadline', 'plannedEndDate'];


@Pipe({
  name: 'groupActivitiesBy'
})
export class GroupActivitiesByPipe implements PipeTransform  {

  transform(data: Array<Activity>, groupByProperty: GroupByProperty): Array<{key: string, value}> {
    if (!data) {
      return null;
    }

    switch (groupByProperty) {
      case 'timeline':
        return this.groupByTimeline(data);

      case 'deadline':
        return this.groupByYearMonth(data, 'deadline');

      case 'plannedEndDate':
        return this.groupByYearMonth(data, 'plannedEndDate');

      case 'actualStartDate':
        return this.groupByYearMonth(data, 'actualStartDate');

      case 'resource':
        return this.groupByResource(data);

      case 'responsible':
        return this.groupByResponsible(data);

      case 'tag':
        return this.groupByTag(data);

      case 'theme':
        return this.groupByTheme(data);

      default:
        throw Assertion.assertNoReachThisCode(`GroupActivitiesByPipe not implemented for
                                               groupBy value '${groupByProperty}'.`);
    }

  }


  // private methods


  private groupByResponsible(data: Array<Activity>): Array<{key, value}> {
    const EMPTY_RESPONSIBLE_GROUP = 'Activities without responsible';

    const groups = data.reduce((previous, current) => {

      let responsibleName: string;

      if (current['responsible'].uid !== 'Empty') {
        responsibleName = current['responsible'].name;
      } else {
        responsibleName = EMPTY_RESPONSIBLE_GROUP;
      }

      if (!previous[responsibleName]) {
        previous[responsibleName] = [current];

      } else {
        previous[responsibleName].push(current);

        previous[responsibleName].sort((a, b) => this.compareTimelineDates(a, b));
      }

      return previous;

    }, {});

    return Object.keys(groups).map(key => ({ key, value: groups[key] }))
                              .sort((a, b) => this.compareStringValues(a.key, b.key,
                                                                       EMPTY_RESPONSIBLE_GROUP));
  }


  private groupByResource(data: Array<Activity>): Array<{key, value}> {
    const EMPTY_RESOURCE_GROUP = 'No resource';
    const groups = data.reduce((previous, current) => {

      let resourceName: string;

      if (current['resource'] !== '') {
        resourceName = current['resource'];
      } else {
        resourceName = EMPTY_RESOURCE_GROUP;
      }

      if (!previous[resourceName]) {
        previous[resourceName] = [current];

      } else {
        previous[resourceName].push(current);

        previous[resourceName].sort((a, b) => this.compareTimelineDates(a, b));
      }

      return previous;

    }, {});

    return Object.keys(groups).map(key => ({ key, value: groups[key] }))
                              .sort((a, b) => this.compareStringValues(a.key, b.key,
                                              EMPTY_RESOURCE_GROUP));

  }


  private groupByTimeline(data: Array<Activity>): Array<{key, value}> {
    const groups = data.reduce((previous, current) => {

      const yearMonth = this.getTimelineYearMonthGroupName(current);

      if (!previous[yearMonth]) {
        previous[yearMonth] = [current];

      } else {
        previous[yearMonth].push(current);

        previous[yearMonth].sort((a, b) => this.compareTimelineDates(a, b));
      }

      return previous;

    }, {});

    return Object.keys(groups).map(key => ({ key, value: groups[key] }))
                              .sort((a, b) => a.key.localeCompare(b.key));
  }


  private groupByTag(data: Array<Activity>): Array<{key, value}> {
    const EMPTY_TAG_GROUP = 'Activities without tag';

    const groups = data.reduce((previous, current) => {

      let tag: string;

      if (current['tags'] !== '') {
        tag = current['tags'];
      } else {
        tag = EMPTY_TAG_GROUP;
      }

      if (!previous[tag]) {
        previous[tag] = [current];

      } else {
        previous[tag].push(current);

        previous[tag].sort((a, b) => this.compareTimelineDates(a, b));
      }

      return previous;

    }, {});

    return Object.keys(groups).map(key => ({ key, value: groups[key] }))
                              .sort((a, b) => this.compareStringValues(a.key, b.key,
                                                                       EMPTY_TAG_GROUP));
  }


  private groupByTheme(data: Array<Activity>): Array<{key, value}> {
    const EMPTY_THEME_GROUP = 'Activities without topic';

    const groups = data.reduce((previous, current) => {

      let theme: string;

      if (current['theme'] !== '') {
        theme = current['theme'];
      } else {
        theme = EMPTY_THEME_GROUP;
      }

      if (!previous[theme]) {
        previous[theme] = [current];

      } else {
        previous[theme].push(current);

        previous[theme].sort((a, b) => this.compareTimelineDates(a, b));
      }

      return previous;

    }, {});

    return Object.keys(groups).map(key => ({ key, value: groups[key] }))
                              .sort((a, b) => this.compareStringValues(a.key, b.key,
                                                                       EMPTY_THEME_GROUP));
  }


  private groupByYearMonth(data: Array<Activity>, dateProperty: GroupByDateProperty): Array<{key, value}> {
    const groups = data.reduce((previous, current) => {

      const yearMonth = this.getYearMonthGroupName(current[dateProperty], dateProperty);

      if (!previous[yearMonth]) {
        previous[yearMonth] = [current];

      } else {
        previous[yearMonth].push(current);

        previous[yearMonth].sort((a, b) =>
                      this.compareDatesOrPosition(a, b, [dateProperty].concat(DEFAULT_DATES_ORDERING_ARRAY)));

      }

      return previous;

    }, {});

    return Object.keys(groups).map(key => ({ key, value: groups[key] }))
                              .sort((a, b) => a.key.localeCompare(b.key));
  }


  // comparison methods


  private compareDatesOrPosition(a: Activity, b: Activity, comparisionFields: GroupByDateProperty[]): number {
    const compare  = this.compareDateValues(a, b, comparisionFields);

    if (compare !== 0) {
      return compare;
    }

    return a.position - b.position;
  }


  private compareDateValues(a: Activity, b: Activity, comparisonFields: GroupByDateProperty[]): number {
    for (let fieldIndex = 0; fieldIndex < comparisonFields.length; fieldIndex++) {
      const dateField = comparisonFields[fieldIndex];

      const compare = DateStringLibrary.compareDates(a[dateField], b[dateField]);

      if (compare !== 0) {
        return compare;
      }
    }

    return 0;
  }


  private compareFirstNotNullDates(a: Activity, b: Activity,
                                   comparisonFields: GroupByDateProperty[]): number {
    const a_FirstNotNullDate = this.getFirstNotNullDate(a, comparisonFields);
    const b_FirstNotNullDate = this.getFirstNotNullDate(b, comparisonFields);

    if (!a_FirstNotNullDate && !b_FirstNotNullDate) {
      return a.position - b.position;
    } else if (!a_FirstNotNullDate  && b_FirstNotNullDate) {
      return 1;
    } else if (a_FirstNotNullDate && !b_FirstNotNullDate) {
      return -1;
    }

    return DateStringLibrary.compareDates(a_FirstNotNullDate, b_FirstNotNullDate);
  }


  private compareStringValues(a: string, b: string, emptyGroupValue: string): number {
    if (a === emptyGroupValue && b === emptyGroupValue) {
      return 0;

    } else if (a === emptyGroupValue && b !== emptyGroupValue) {
      return 1;

    } else if (a !== emptyGroupValue && b === emptyGroupValue) {
      return -1;

    } else {
      return a.localeCompare(b);
    }
  }


  private compareTimelineDates(a: Activity, b: Activity): number {
    let compare = this.compareFirstNotNullDates(a, b, TIMELINE_DATES_ARRAY);

    if (compare !== 0) {
      return compare;
    }

    compare = this.compareDateValues(a, b, DEFAULT_DATES_ORDERING_ARRAY);

    if (compare !== 0) {
      return compare;
    }

    return a.position - b.position;
  }


  // other auxiliary methods


  private getFirstNotNullDate(activity: Activity, comparisonFields: GroupByDateProperty[]): DateString {
    for (let fieldIndex = 0; fieldIndex < comparisonFields.length; fieldIndex++) {
      const dateField = comparisonFields[fieldIndex];

      if (activity[dateField]) {
        return activity[dateField];
      }
    }
    return '';
  }


  private getTimelineYearMonthGroupName(activity: Activity): any {
    for (let fieldIndex = 0; fieldIndex < TIMELINE_DATES_ARRAY.length; fieldIndex++) {
      const dateField = TIMELINE_DATES_ARRAY[fieldIndex];

      if (activity[dateField]) {
        return this.getYearMonthGroupName(activity[dateField], dateField);
      }
    }
    return 'Activities with no assigned dates';
  }


  private getYearMonthGroupName(dateValue: DateString, dateProperty: GroupByDateProperty) {
    if (dateValue) {
      return DateStringLibrary.yearMonth(dateValue);

    } else if (dateProperty === 'deadline') {
      return 'Activities with no deadline';

    } else if (dateProperty === 'plannedEndDate') {
      return 'Activities with no planned end date';

    } else if (dateProperty === 'actualStartDate') {
      return 'Activities with no start date';

    } else {
      Assertion.assertNoReachThisCode(`Method not implemented for dateProperty '${dateProperty}'.`);

    }
  }

}
