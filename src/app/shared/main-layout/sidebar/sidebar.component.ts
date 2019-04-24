/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { ProjectTemplateStore } from '@app/store/project-template.store';
import { ProjectStore } from '@app/store/project.store';

import { Project, ProjectTemplate } from '@app/models/project-management';
import { Contact } from '@app/models/regulation';
import { LayoutType } from '@app/models/user-interface';



@Component({
  selector: 'emp-ng-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() layoutType: LayoutType;


  constructor(public processStore: ProjectTemplateStore,
              public projectStore: ProjectStore) {}


  onSelectProcess(process: ProjectTemplate) {
    this.processStore.selectTemplate(process);
  }


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


  showWidget(widgetName: string) {
    switch (widgetName) {
      case 'ProcessSelector':
        return this.layoutType === 'Processes';

      case 'ProjectSelector':
        return this.layoutType === 'Projects';

      case 'ProjectsListSelector':
        return this.layoutType === 'Home';

      case 'ResponsiblesListSelector':
        return this.layoutType === 'Home' || this.layoutType === 'Projects';

      case 'ThemesListSelector':
        return this.layoutType !== 'Processes';
    }
  }

}
