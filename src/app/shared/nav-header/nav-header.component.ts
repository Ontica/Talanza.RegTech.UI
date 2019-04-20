/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuItem } from '../nav-menu/nav-menu.component';

import { ProjectStore } from '@app/store/project.store';
import { ProjectTemplateStore } from '@app/store/project-template.store';

import { Project, ProjectTemplate, ViewConfig, DefaultViewConfig } from '@app/models/project-management';


export type ProjectViewType = 'Tree' | 'Gantt' | 'Timeline';


@Component({
  selector: 'emp-ng-navigation-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavigationHeaderComponent implements OnChanges, OnDestroy {

  title = 'Select a contract';

  // breadcrumb = 'All contracts » Shell » Ronda 2.4 » Salina Area 28';
  breadcrumb = '';

  selectedProject: Project;
  selectedTemplate: ProjectTemplate;
  viewConfig: ViewConfig = DefaultViewConfig();

  private subs1: Subscription;
  private subs2: Subscription;

  @Output() action = new EventEmitter<string>();

  @Input() layoutType: string;

  @Input() mainMenuItems: MenuItem[];

  @Input() secondaryMenuItems: MenuItem[];

  constructor(protected projectStore: ProjectStore,
              protected templateStore: ProjectTemplateStore) {}


  ngOnChanges() {
    this.setLayout();
  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
    if (this.subs2) {
      this.subs2.unsubscribe();
    }
  }


  onClickMenu(menuItem: MenuItem) {
    this.action.emit(menuItem.action);
  }


  onChangeView() {
    this.projectStore.selectView(this.viewConfig);
  }


  // onSelectProject(projectUID: string) {
  //   this.selectedProject = this.projectStore.getProject(projectUID);

  //   this.projectStore.selectProject(this.selectedProject);
  // }


  onSelectTemplate(projectUID) {
    this.selectedTemplate = this.templateStore.findById(projectUID);

    this.templateStore.selectTemplate(this.selectedTemplate);
  }


  cleanProjectActivities() {
    // showYesNo
    // executeIfYes
  }


  openCreateProjectTemplateDialog() {
    // open dialog (ask for name)
  }


  // private methods

  private setLayout() {
    switch (this.layoutType) {
      case 'Projects':
        this.setProjectsLayout();
        return;

      case 'Timelines':
        this.setTimelinesLayout();
        return;


      case 'ProjectsTemplates':
        this.setTemplatesDesignerLayout();
        return;

      default:
        this.setDefaultLayout();
    }
  }

  private setProjectsLayout() {
    this.breadcrumb = 'Contract management';

    this.mainMenuItems =  [
      new MenuItem('Activities List', undefined, '/contract-management/activities'),
      new MenuItem('Timelines', undefined, '/contract-management/timelines', false),
      new MenuItem('Documents', undefined, '/contract-management/documents', false)
    ];

    this.subs1 = this.projectStore.selectedProject().subscribe (
      next => {
        this.selectedProject = next.project;
        this.title = this.selectedProject.uid ? this.selectedProject.name : 'Select a contract';
      }
    );

  }


  private setTimelinesLayout() {
    this.breadcrumb = 'Home page';

    this.mainMenuItems =  [
      new MenuItem('My Tasks', undefined, '/home/my-tasks', false),
      new MenuItem('Timelines', undefined, '/home/timelines', false),
      new MenuItem('Documents', undefined, '/home/documents', false)
    ];

    this.subs1 = this.projectStore.selectedProject().subscribe (
      next => {
        this.selectedProject = next.project;
        this.title = this.selectedProject.uid ? this.selectedProject.name : 'All contracts';
      }
    );

  }

  private setTemplatesDesignerLayout() {
    this.breadcrumb = 'Regulatory processes designer';

    this.mainMenuItems =  [
      new MenuItem('Processes', undefined, '/regulatory-processes'),
    ];

    this.subs2 = this.templateStore.selectedTemplate().subscribe (
      next => {
        this.selectedTemplate = next.project;
        this.title = this.selectedTemplate.uid ?
                              this.selectedTemplate.name : 'Select a regulatory process design';
      }
    );

  }

  private setDefaultLayout() {
    this.breadcrumb = '';
    this.mainMenuItems =  [];
    this.title = '';
  }

}
