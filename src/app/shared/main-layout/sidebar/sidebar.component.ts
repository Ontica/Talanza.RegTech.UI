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

  selectedProjects: Project[] = [];
  selectedResponsibles: Contact[] = [];
  selectedThemes: string[] = [];

  private subs1: Subscription;
  private subs2: Subscription;
  private subs3: Subscription;
  private subs4: Subscription;

  constructor(public uiStore: UserInterfaceStore,
              public processStore: ProjectTemplateStore,
              public projectStore: ProjectStore) {}


  ngOnInit() {
    this.subs1 = this.uiStore.layout.subscribe(
      value => this.layout = value
    );
    this.subs2 = this.uiStore.getValue<Project[]>('Sidebar.Selected.Projects').subscribe(
      value => this.selectedProjects = value
    );
    this.subs3 = this.uiStore.getValue<Contact[]>('Sidebar.Selected.Responsibles').subscribe(
      value => this.selectedResponsibles = value
    );
    this.subs4 = this.uiStore.getValue<string[]>('Sidebar.Selected.Themes').subscribe(
      value => this.selectedThemes = value
    );

  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
    if (this.subs2) {
      this.subs2.unsubscribe();
    }
    if (this.subs3) {
      this.subs3.unsubscribe();
    }
    if (this.subs4) {
      this.subs4.unsubscribe();
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
    this.uiStore.setValue<Project[]>('Sidebar.Selected.Projects', projectList);
  }


  onSelectedResponsibles(responsiblesList: Contact[]) {
    this.uiStore.setValue<Contact[]>('Sidebar.Selected.Responsibles', responsiblesList);
  }


  onSelectedThemes(themesList: string[]) {
    this.uiStore.setValue<string[]>('Sidebar.Selected.Themes', themesList);
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
