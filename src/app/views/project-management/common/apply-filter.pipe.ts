/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { ProjectItem } from '@app/models/project-management';

import { MainSidebarValues, DefaultSidebarValues} from '@app/views/main-layout';


@Pipe({
  name: 'applyFilter'
})
export class ApplyFilterPipe implements PipeTransform {

  filter: MainSidebarValues = DefaultSidebarValues;

  transform(data: ProjectItem[], filter: MainSidebarValues): ProjectItem[] {
    this.filter = filter || DefaultSidebarValues;

    if (!data) {
      return [];
    }
    return this.applyFilter(data);
  }


  // private methods


  private applyFilter(data: ProjectItem[]) {
    let filtered = this.applyProjectsFilter(data);

    filtered = this.applyResponsiblesFilter(filtered);
    filtered = this.applyEntitiesFilter(filtered);
    filtered = this.applyTagsFilter(filtered);
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


  private applyEntitiesFilter(source: ProjectItem[]): ProjectItem[] {
    if (!this.filter.entities || this.filter.entities.length === 0) {
      return source;
    }

    return source.filter(x => x.entity && this.filter.entities.includes(x.entity));
  }


  private applyResponsiblesFilter(source: ProjectItem[]): ProjectItem[] {
    if (!this.filter.responsibles || this.filter.responsibles.length === 0) {
      return source;
    }

    const uids = this.filter.responsibles.map(x => x.uid);

    return source.filter(x => uids.includes(x.responsible.uid));
  }


  private applyTagsFilter(source: ProjectItem[]): ProjectItem[] {
    if (!this.filter.tags || this.filter.tags.length === 0) {
      return source;
    }

    return source.filter(x => this.filter.tags.includes(x.tags));
  }


  private applyThemesFilter(source: ProjectItem[]): ProjectItem[] {
    if (!this.filter.themes || this.filter.themes.length === 0) {
      return source;
    }

    return source.filter(x => this.filter.themes.includes(x.theme));
  }

}
