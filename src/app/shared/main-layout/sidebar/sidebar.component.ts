/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserInterfaceStore } from '@app/store/ui.store';
import { ProjectTemplateStore } from '@app/store/project-template.store';
import { ProjectStore } from '@app/store/project.store';

import { Layout } from '@app/models/user-interface';

import { Project, ProjectTemplate } from '@app/models/project-management';
import { Contact } from '@app/models/regulation';


@Component({
  selector: 'emp-ng-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() layout: Layout;

  private subscription: Subscription;

  constructor(public uiStore: UserInterfaceStore,
              public processStore: ProjectTemplateStore,
              public projectStore: ProjectStore) {}


  ngOnInit() {
    this.subscription = this.uiStore.layout.subscribe(
      value => this.layout = value
    );
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

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
        return this.layout.name === 'Processes';

      case 'ProjectSelector':
        return this.layout.name === 'Projects';

      case 'ProjectsListSelector':
        return this.layout.name === 'Home';

      case 'ResponsiblesListSelector':
        return this.layout.name === 'Home' || this.layout.name === 'Projects';

      case 'ThemesListSelector':
        return this.layout.name !== 'Processes';
    }
  }

}
