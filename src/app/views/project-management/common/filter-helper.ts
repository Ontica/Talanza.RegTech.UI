/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { BaseProjectItem, GanttTask, Activity } from '@app/models/project-management';

import { MainSidebarValues } from '@app/views/main-layout';


export class FilterHelper {


  static applyFilter(filter: MainSidebarValues,
                     activities: Activity[], keywords: string): Activity[];

  static applyFilter(filter: MainSidebarValues,
                     activities: GanttTask[], keywords: string): GanttTask[];


  static applyFilter(filter: MainSidebarValues,
                     activities: BaseProjectItem[],  keywords: string): BaseProjectItem[] {
    let filtered = this.applyKeywordsFilter(keywords, activities);

    filtered = this.applyStatusFilter(filter, filtered);

    filtered = this.applyResponsiblesFilter(filter, filtered);

    filtered = this.applyEntitiesFilter(filter, filtered);

    filtered = this.applyThemesFilter(filter, filtered);

    filtered = this.applyTagsFilter(filter, filtered);

    filtered = this.addAncestorTasks(activities, filtered);


    filtered.sort((x, y) => (x.position < y.position) ? -1 : (x.position > y.position ? 1 : 0));

    console.log('filter applied', filtered.length);

    return filtered;
  }


  private static addAncestorTasks(activities: BaseProjectItem[],
                                  filtered: BaseProjectItem[]): BaseProjectItem[] {
    if (!filtered || filtered.length === 0) {
      return [];
    }

    let loopHaltGuard = 0;

    let completeArray = filtered;

    while (true) {
      const parentIDs = completeArray.map(x => typeof x.parent === 'number' ? x.parent : x.parent.uid);
      const parents = activities.filter(x => parentIDs.includes(typeof x.parent === 'number' ? x.id : x.uid));

      if (loopHaltGuard >= 20) {
        console.log('Something was wrong adding tree parents: loop halt guard was reached.', completeArray);
        break;

      } else if (parents.every(x => completeArray.includes(x))) {
        break;

      } else {
        completeArray = this.addParentTasks(activities, completeArray);
        loopHaltGuard++;
      }
    }

    return completeArray;
  }


  private static addParentTasks(activities:  BaseProjectItem[],
                                filtered: BaseProjectItem[]): BaseProjectItem[] {
    const parentUIDs = filtered.map(x => typeof x.parent === 'number' ? x.parent : x.parent.uid);


    const parents = activities.filter(x => parentUIDs.includes(typeof x.parent === 'number' ? x.id : x.uid) &&
                                           !filtered.includes(x));

    return parents.concat(filtered);
  }


  private static applyKeywordsFilter(keywords: string,
                                     source: BaseProjectItem[]): BaseProjectItem[] {
    if (!keywords) {
      return source;
    }

    return source.filter(x => x.name.toLocaleLowerCase().includes(keywords.toLocaleLowerCase()) ||
                        (x.notes && x.notes.toLocaleLowerCase().includes(keywords.toLocaleLowerCase())));
  }


  private static applyResponsiblesFilter(filter: MainSidebarValues,
                                         source: BaseProjectItem[]): BaseProjectItem[] {
    if (!filter.responsibles || filter.responsibles.length === 0) {
      return source;
    }

    const uids = filter.responsibles.map(x => x.uid);

    return source.filter(x => uids.includes(x.responsible.uid));
  }


  private static applyEntitiesFilter(filter: MainSidebarValues,
                                     source: BaseProjectItem[]): BaseProjectItem[] {
    if (!filter.entities || filter.entities.length === 0) {
      return source;
    }

    return source.filter(x => filter.entities.includes(x.entity));
  }


  private static applyStatusFilter(filter: MainSidebarValues,
                                   source: BaseProjectItem[]): BaseProjectItem[] {
    if (!filter.status) {
      return source;
    }

    switch (filter.status) {
      case 'All tasks':
        return source;

      case 'Incomplete':
        return source.filter(x => x.status !== 'Completed');

      case 'Completed':
        return source.filter(x => x.status === 'Completed');
    }
  }


  private static applyTagsFilter(filter: MainSidebarValues,
                                 source: BaseProjectItem[]): BaseProjectItem[] {
    if (!filter.tags || filter.tags.length === 0) {
      return source;
    }

    return source.filter(x => filter.tags.includes(x.tags));
  }


  private static applyThemesFilter(filter: MainSidebarValues,
                                   source: BaseProjectItem[]): BaseProjectItem[] {
    if (!filter.themes || filter.themes.length === 0) {
      return source;
    }

    return source.filter(x => filter.themes.includes(x.theme));
  }

}
