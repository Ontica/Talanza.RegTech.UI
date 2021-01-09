/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { ProjectTemplateStore } from '@app/store/project-template.store';
import { ProjectStore } from '@app/store/project.store';

import { Project, ProjectTemplate } from '@app/models/project-management';

import { Contact } from '@app/models/regulation';

import { DefaultSidebarValues, Layout, MainSidebarValues } from '../common-models';

import { MainUIStateAction, MainUIStateSelector } from '@app/core/presentation/presentation-types';


@Component({
  selector: 'emp-ng-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() layout: Layout;

  filter: MainSidebarValues = DefaultSidebarValues;

  private subscriptionHelper: SubscriptionHelper;

  constructor(private uiLayer: PresentationLayer,
              public processStore: ProjectTemplateStore,
              public projectStore: ProjectStore) {
    this.subscriptionHelper = uiLayer.createSubscriptionHelper();
  }

  ngOnInit() {
    this.subscriptionHelper.select<Layout>(MainUIStateSelector.LAYOUT)
      .subscribe(value => this.layout = value);

    this.subscriptionHelper.select<MainSidebarValues>(MainUIStateSelector.SIDEBAR_VALUES)
      .subscribe(values => this.filter = values);
  }

  ngOnDestroy() {
    this.subscriptionHelper.destroy();
  }

  onProcessChange(process: ProjectTemplate) {
    this.processStore.selectTemplate(process);
  }

  onMultiProjectsChange(multiProjectsList: Project[]) {
    this.filter = {...this.filter, projects: multiProjectsList };

    this.uiLayer.dispatch(MainUIStateAction.SET_SIDEBAR_VALUES, this.filter);
  }

  onProjectChange(project: Project) {
    if (project && project.uid) {
      this.filter = {...this.filter, selectedProject: project };
      this.uiLayer.dispatch(MainUIStateAction.SET_SIDEBAR_VALUES, this.filter);
      this.projectStore.selectProject(project);
    }
  }


  onResponsiblesChange(responsibleList: Contact[]) {
    this.filter = {...this.filter, responsibles: responsibleList };

    this.uiLayer.dispatch(MainUIStateAction.SET_SIDEBAR_VALUES, this.filter);
  }


  onTagsChange(tagsList: string[]) {
    this.filter = {...this.filter, tags: tagsList };

    this.uiLayer.dispatch(MainUIStateAction.SET_SIDEBAR_VALUES, this.filter);
  }


  onThemesChange(themesList: string[]) {
    this.filter = {...this.filter, themes: themesList };

    this.uiLayer.dispatch(MainUIStateAction.SET_SIDEBAR_VALUES, this.filter);
  }


  showWidget(widgetName: string) {
    switch (widgetName) {
      case 'ProcessSelector':
        return this.layout.name === 'Processes';

      case 'ProjectSelector':
        return this.layout.name === 'Projects';

      case 'ProjectsListSelector':
        return this.layout.name === 'Home' ||
               this.layout.name === 'Dashboard' ||
               this.layout.name === 'Data';

      case 'ResponsiblesListSelector':
        return this.layout.name === 'Home' ||
               this.layout.name === 'Projects';

      case 'TagsListSelector':
        return this.layout.name === 'Home' ||
               this.layout.name === 'Projects';

      case 'ThemesListSelector':
        return this.layout.name !== 'Processes' &&
               this.layout.name !== 'Dashboard' &&
               this.layout.name !== 'Data';
    }
  }

}
