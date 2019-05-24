/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { EmptyProjectItemFilter,
         ProjectItem, ProjectItemFilter } from '@app/models/project-management';


@Pipe({
  name: 'applyFilter'
})
export class ApplyFilterPipe implements PipeTransform {

  filter: ProjectItemFilter = EmptyProjectItemFilter;


  transform(data: ProjectItem[], filter: ProjectItemFilter): ProjectItem[] {
    this.filter = filter || EmptyProjectItemFilter;

    if (!data) {
      return [];
    }
    return this.applyFilter(data);
  }


  // private methods


  private applyFilter(data: ProjectItem[]) {
    let filtered = this.applyProjectsFilter(data);

    filtered = this.applyResponsiblesFilter(filtered);
    filtered = this.applyThemesFilter(filtered);

    return filtered;
  }


  private applyProjectsFilter(source: ProjectItem[]): ProjectItem[] {
    if (!this.filter.projects || this.filter.projects.length === 0) {
      return source;
    }

    const uids = this.filter.projects.map(x => x.uid);

    return source.filter(x => uids.includes(x.project.uid));
  }


  private applyResponsiblesFilter(source: ProjectItem[]): ProjectItem[] {
    if (!this.filter.responsibles || this.filter.responsibles.length === 0) {
      return source;
    }

    const uids = this.filter.responsibles.map(x => x.uid);

    return source.filter(x => uids.includes(x.responsible.uid));
  }


  private applyThemesFilter(source: ProjectItem[]): ProjectItem[] {
    if (!this.filter.themes || this.filter.themes.length === 0) {
      return source;
    }

    return source.filter(x => this.filter.themes.includes(x.theme));
  }

}
