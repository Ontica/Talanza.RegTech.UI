/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { EmptyProjectItemFilter,
         ProjectItemFilter, ProjectItemFile } from '@app/models/project-management';


@Pipe({
  name: 'applyFilesFilter'
})
export class ApplyFilesFilterPipe implements PipeTransform {

  filter: ProjectItemFilter = EmptyProjectItemFilter;


  transform(data: ProjectItemFile[], filter: ProjectItemFilter): ProjectItemFile[] {
    this.filter = filter || EmptyProjectItemFilter;

    if (!data) {
      return [];
    }
    return this.applyFilter(data);
  }


  // private methods


  private applyFilter(data: ProjectItemFile[]) {
    let filtered = this.applyProjectsFilter(data);

    filtered = this.applyResponsiblesFilter(filtered);
    filtered = this.applyThemesFilter(filtered);

    return filtered;
  }


  private applyProjectsFilter(source: ProjectItemFile[]): ProjectItemFile[] {
    if (!this.filter.projects || this.filter.projects.length === 0) {
      return source;
    }

    const uids = this.filter.projects.map(x => x.uid);

    return source.filter(x => uids.includes(x.projectItem.project.uid));
  }


  private applyResponsiblesFilter(source: ProjectItemFile[]): ProjectItemFile[] {
    if (!this.filter.responsibles || this.filter.responsibles.length === 0) {
      return source;
    }

    const uids = this.filter.responsibles.map(x => x.uid);

    return source.filter(x => uids.includes(x.projectItem.responsible.uid));
  }


  private applyThemesFilter(source: ProjectItemFile[]): ProjectItemFile[] {
    if (!this.filter.themes || this.filter.themes.length === 0) {
      return source;
    }

    return source.filter(x => this.filter.themes.includes(x.projectItem.theme));
  }

}
