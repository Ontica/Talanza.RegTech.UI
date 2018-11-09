/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Assertion } from '@app/core';

import { Activity } from '@app/models/project-management';
import { DateString } from '@app/models/core';


const EMPTY_RESPONSIBLE_GROUP = 'Actividades sin asignar';

export type GroupByDateProperty = 'dueDate' | 'targetDate' | 'startDate';
export type GroupByProperty = GroupByDateProperty | 'responsible';

@Pipe({
  name: 'groupActivitiesBy'
})
export class GroupActivitiesByPipe implements PipeTransform  {

  transform(data: Array<Activity>, groupByProperty: GroupByProperty): Array<{key, value}> {
    if (!data) {
      return null;
    }

    switch(groupByProperty) {
      case 'dueDate':
        return this.groupByYearMonth(data, 'dueDate');

      case 'targetDate':
        return this.groupByYearMonth(data, 'targetDate');

      case 'startDate':
        return this.groupByYearMonth(data, 'startDate');

      case 'responsible':
        return this.groupByResponsible(data);

      default:
        throw Assertion.assertNoReachThisCode(`GroupActivitiesByPipe not implemented for groupBy value '${groupByProperty}'.`);
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


      if(!previous[responsibleName]) {
        previous[responsibleName] = [current];

      } else {
        previous[responsibleName].push(current);

        previous[responsibleName].sort( (a, b) => this.compareDateAndPosition(a, b, 'dueDate') );
      }

      return previous;

    }, {});

    return Object.keys(groups).map( key => ({ key, value: groups[key] }) )
                                   .sort( (a, b) => this.compareResponsibleNames(a.key, b.key));
  }


  private groupByYearMonth(data: Array<Activity>, dateProperty: GroupByDateProperty): Array<{key, value}> {
    const groups = data.reduce((previous, current) => {

      const yearMonth = this.getYearMonthGroupName(current[dateProperty], dateProperty);

      if(!previous[yearMonth]) {
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

  private getYearMonthGroupName(dateValue: DateString, dateProperty: GroupByDateProperty) {
    if (dateValue) {
      return new Date(dateValue).getFullYear() + '-' +
            (new Date(dateValue).getMonth() + 1).toString().padStart(2, "0");

    } else if (dateProperty === 'dueDate') {
      return 'Sin fecha máxima de entrega';

    } else if (dateProperty === 'targetDate') {
      return 'Sin fecha objetivo';

    } else if (dateProperty === 'startDate') {
      return 'Sin fecha de inicio';

    } else {
      Assertion.assertNoReachThisCode(`Method not implemented for dateProperty '${dateProperty}'.`);

    }
  }

}
