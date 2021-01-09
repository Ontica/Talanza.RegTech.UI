/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { ProjectItemFilter, BaseProjectItem, GanttTask, Activity } from '@app/models/project-management';


export class FilterHelper {


  static applyFilter(filter: ProjectItemFilter,
                     activities: Activity[]): Activity[];

  static applyFilter(filter: ProjectItemFilter,
                     activities: GanttTask[]): GanttTask[];


  static applyFilter(filter: ProjectItemFilter,
                     activities: BaseProjectItem[]): BaseProjectItem[] {
    let filtered = this.applyStatusFilter(filter, activities);

    filtered = this.applyResponsiblesFilter(filter, filtered);

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


  private static applyResponsiblesFilter(filter: ProjectItemFilter,
                                         source: BaseProjectItem[]): BaseProjectItem[] {
    if (!filter.responsibles || filter.responsibles.length === 0) {
      return source;
    }

    const uids = filter.responsibles.map(x => x.uid);

    return source.filter(x => uids.includes(x.responsible.uid));
  }

  private static applyStatusFilter(filter: ProjectItemFilter,
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


  private static applyTagsFilter(filter: ProjectItemFilter,
                                 source: BaseProjectItem[]): BaseProjectItem[] {
    if (!filter.tags || filter.tags.length === 0) {
      return source;
    }

    return source.filter(x => filter.tags.includes(x.tags));
  }


  private static applyThemesFilter(filter: ProjectItemFilter,
                                   source: BaseProjectItem[]): BaseProjectItem[] {
    if (!filter.themes || filter.themes.length === 0) {
      return source;
    }

    return source.filter(x => filter.themes.includes(x.theme));
  }

}
