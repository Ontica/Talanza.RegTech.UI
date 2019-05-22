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

import { Project, ProjectTemplate,
         ProjectItemFilter, EmptyProjectItemFilter } from '@app/models/project-management';

import { Contact } from '@app/models/regulation';


@Component({
  selector: 'emp-ng-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() layout: Layout;

  selectedProjects: Project[] = [];
  selectedResponsibles: Contact[] = [];
  selectedThemes: string[] = [];

  filter: ProjectItemFilter = EmptyProjectItemFilter;

  private subs1: Subscription;
  private subs2: Subscription;

  constructor(public uiStore: UserInterfaceStore,
              public processStore: ProjectTemplateStore,
              public projectStore: ProjectStore) {}


  ngOnInit() {
    this.subs1 = this.uiStore.layout.subscribe(
      value => this.layout = value
    );

    this.subs2 = this.uiStore.getValue<ProjectItemFilter>('Sidebar.ProjectFilter').subscribe(
      value => this.filter = value
    );

  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
    if (this.subs2) {
      this.subs2.unsubscribe();
    }
  }


  onProcessChange(process: ProjectTemplate) {
    this.processStore.selectTemplate(process);
  }


  onProjectChange(project: Project) {
    if (project && project.uid) {
      this.projectStore.selectProject(project);
    }
  }


  onProjectsChange(projectList: Project[]) {
    this.filter = {...this.filter, projects: projectList };

    this.uiStore.setValue<ProjectItemFilter>('Sidebar.ProjectFilter', this.filter);
  }


  onResponsiblesChange(responsibleList: Contact[]) {
    this.filter = {...this.filter, responsibles: responsibleList };

    this.uiStore.setValue<ProjectItemFilter>('Sidebar.ProjectFilter', this.filter);
  }


  onThemesChange(themesList: string[]) {
    this.filter = {...this.filter, themes: themesList };

    this.uiStore.setValue<ProjectItemFilter>('Sidebar.ProjectFilter', this.filter);
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
