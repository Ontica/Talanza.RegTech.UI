/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProjectStore } from '@app/store/project.store';
import { ProjectTemplateStore } from '@app/store/project-template.store';
import { UserInterfaceStore } from '@app/store/ui.store';

import { MenuItem, NavigationHeader,
         ProjectViewConfig, DefaultProjectViewConfig } from '@app/models/user-interface';

import { Project, ProjectTemplate } from '@app/models/project-management';


export type ProjectViewType = 'Tree' | 'Gantt' | 'Timeline';


@Component({
  selector: 'emp-ng-navigation-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {

  @Input() layoutType: string;

  @Output() action = new EventEmitter<string>();

  navigationHeader: NavigationHeader;

  viewConfig: ProjectViewConfig = DefaultProjectViewConfig;

  selectedProject: Project;
  selectedTemplate: ProjectTemplate;

  private subscription: Subscription;

  constructor(protected uiStore: UserInterfaceStore,
              protected projectStore: ProjectStore,
              protected templateStore: ProjectTemplateStore) {}


  ngOnInit(): void {
    this.subscription = this.uiStore.navigationHeader.subscribe (
      value => this.navigationHeader = value
    );
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onClickMenu(menuItem: MenuItem) {
    this.action.emit(menuItem.action);
  }


  onChangeView() {
    this.uiStore.setProjectViewConfig(this.viewConfig);
  }


  onSelectTemplate(projectUID) {
    this.selectedTemplate = this.templateStore.findById(projectUID);

    this.templateStore.selectTemplate(this.selectedTemplate);
  }


  // private methods


  private setHomeLayout() {
    // this.breadcrumb = 'Home page';

    // this.mainMenuItems =  [
    //   new MenuItem('My Tasks', undefined, '/home/my-tasks', false),
    //   new MenuItem('Timelines', undefined, '/home/timelines', false),
    //   new MenuItem('Documents', undefined, '/home/documents', false)
    // ];

  }

}
