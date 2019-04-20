/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { ProjectStore } from '@app/store/project.store';
import { Project } from '@app/models/project-management';
import { Contact } from '@app/models/regulation';


@Component({
  selector: 'emp-ng-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() layoutType: string;


  constructor(public projectStore: ProjectStore) {}


  onSelectProject(project: Project) {
    if (project && project.uid) {
      this.projectStore.selectProject(project);
    }
  }


  onSelectedProjects(projectList: Project[]) {
    console.log('onSelectedProjects', projectList);
  }


  onSelectedResponsibles(responsiblesList: Contact[]) {
    console.log('onSelectedResponsibles', responsiblesList);
  }


  onSelectedThemes(themesList: string[]) {
    console.log('onSelectedThemes', themesList);
  }

}
