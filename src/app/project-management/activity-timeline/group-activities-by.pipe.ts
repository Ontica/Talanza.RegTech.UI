/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Assertion } from '@app/core';

import { Activity } from '@app/models/project-management';
import { DateString, DateStringLibrary } from '@app/models/core';

export type GroupByDateProperty = 'actualEndDate' | 'plannedEndDate' | 'deadline' | 'actualStartDate';
export type GroupByProperty = 'timeline' | 'responsible' | GroupByDateProperty;

const DATES_ORDERING_ARRAY:
            GroupByDateProperty[] = ['actualEndDate', 'plannedEndDate', 'deadline', 'actualStartDate'];

const EMPTY_RESPONSIBLE_GROUP = 'Actividades sin asignar';

@Pipe({
  name: 'groupActivitiesBy'
})
export class GroupActivitiesByPipe implements PipeTransform  {

  transform(data: Array<Activity>, groupByProperty: GroupByProperty): Array<{key, value}> {
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

      case 'responsible':
        return this.groupByResponsible(data);

      default:
        throw Assertion.assertNoReachThisCode(`GroupActivitiesByPipe not implemented for
                                               groupBy value '${groupByProperty}'.`);
    }

  }


  // private methods


  private groupByResponsible(data: Array<Activity>): Array<{key, value}> {
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

        previous[responsibleName].sort( (a, b) => this.compareDateAndPosition(a, b, 'deadline') );
      }

      return previous;

    }, {});

    return Object.keys(groups).map( key => ({ key, value: groups[key] }) )
                              .sort( (a, b) => this.compareResponsibleNames(a.key, b.key));
  }


  private groupByTimeline(data: Array<Activity>): Array<{key, value}> {
    const groups = data.reduce((previous, current) => {

      const yearMonth = this.getTimelineYearMonthGroupName(current);

      if (!previous[yearMonth]) {
        previous[yearMonth] = [current];

      } else {
        previous[yearMonth].push(current);

        previous[yearMonth].sort( (a, b) => this.compareTimelineDates(a, b) );
      }

      return previous;

    }, {});

    return Object.keys(groups).map( key => ({ key, value: groups[key] }) )
                              .sort( (a, b) => a.key.localeCompare(b.key) );
  }


  private groupByYearMonth(data: Array<Activity>, dateProperty: GroupByDateProperty): Array<{key, value}> {
    const groups = data.reduce((previous, current) => {

      const yearMonth = this.getYearMonthGroupName(current[dateProperty], dateProperty);

      if (!previous[yearMonth]) {
        previous[yearMonth] = [current];

      } else {
        previous[yearMonth].push(current);

        if (current[dateProperty]) {
          previous[yearMonth].sort( (a, b) => this.compareDateAndPosition(a, b, dateProperty) );
        } else {
          previous[yearMonth].sort( (a, b) => a.position - b.position );
        }

      }

      return previous;

    }, {});

    return Object.keys(groups).map( key => ({ key, value: groups[key] }) )
                              .sort( (a, b) => a.key.localeCompare(b.key) );
  }


  // comparison methods


  private compareTimelineDates(a: Activity, b: Activity): number {
    for (let a_fieldIndex = 0; a_fieldIndex < DATES_ORDERING_ARRAY.length; a_fieldIndex++) {

      for (let b_fieldIndex = 0; b_fieldIndex < DATES_ORDERING_ARRAY.length; b_fieldIndex++) {

        const a_dateValue = a[DATES_ORDERING_ARRAY[a_fieldIndex]];
        const b_dateValue = b[DATES_ORDERING_ARRAY[b_fieldIndex]];

        if (!a_dateValue || !b_dateValue) {
          continue;
        }

        const compare = DateStringLibrary.compareDates(a_dateValue, b_dateValue);

        if (compare !== 0) {
          return compare;
        }

      }  // for a_fieldIndex

    }  // for b_fieldIndex

    return a.position - b.position;
  }


  private compareDateAndPosition(a: any, b: any, dateProperty: string): number {
    if (a[dateProperty] && b[dateProperty]) {
      return a[dateProperty].localeCompare(b[dateProperty]);

    } else if (a[dateProperty] && !b[dateProperty]) {
      return -1;

    } else if (!a[dateProperty] && b[dateProperty]) {
      return 1;

    } else if (!a[dateProperty] && !b[dateProperty]) {
      return a.position - b.position;

    }
  }


  private compareResponsibleNames(a: string, b: string): number {
    if (a === EMPTY_RESPONSIBLE_GROUP && b === EMPTY_RESPONSIBLE_GROUP) {
      return 0;

    } else if (a === EMPTY_RESPONSIBLE_GROUP && b !== EMPTY_RESPONSIBLE_GROUP) {
      return 1;

    } else if (a !== EMPTY_RESPONSIBLE_GROUP && b === EMPTY_RESPONSIBLE_GROUP) {
      return -1;

    } else {
      return a.localeCompare(b);
    }
  }


  // other auxiliary methods


  getTimelineYearMonthGroupName(activity: Activity): any {
    for (let fieldIndex = 0; fieldIndex < DATES_ORDERING_ARRAY.length; fieldIndex++) {
      const dateField = DATES_ORDERING_ARRAY[fieldIndex];

      if (activity[dateField]) {
        return this.getYearMonthGroupName(activity[dateField], dateField);
      }
    }
    return 'Sin ninguna fecha asignada';
  }


  private getYearMonthGroupName(dateValue: DateString, dateProperty: GroupByDateProperty) {
    if (dateValue) {
      return DateStringLibrary.yearMonth(dateValue);

    } else if (dateProperty === 'deadline') {
      return 'Sin fecha máxima de entrega';

    } else if (dateProperty === 'plannedEndDate') {
      return 'Sin fecha objetivo';

    } else if (dateProperty === 'actualStartDate') {
      return 'Sin fecha de inicio';

    } else {
      Assertion.assertNoReachThisCode(`Method not implemented for dateProperty '${dateProperty}'.`);

    }
  }

}
