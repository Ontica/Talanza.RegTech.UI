/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProjectStore } from '@app/store/project.store';
import { ProjectTemplateStore } from '@app/store/project-template.store';
import { UserInterfaceStore } from '@app/store/ui.store';

import { Project, ProjectTemplate } from '@app/models/project-management';

import { ProjectViewConfig, DefaultProjectViewConfig } from '@app/models/user-interface';


export type ProjectViewType = 'Tree' | 'Gantt' | 'Timeline';


@Component({
  selector: 'emp-ng-view-selector',
  templateUrl: './view-selector.component.html',
  styleUrls: ['./view-selector.component.scss']
})
export class ViewSelectorComponent implements OnInit, OnDestroy {

  layoutType: string;

  viewConfig: ProjectViewConfig = DefaultProjectViewConfig;

  selectedTemplate: ProjectTemplate;

  private subscription: Subscription;

  constructor(protected uiStore: UserInterfaceStore,
              public projectStore: ProjectStore,
              public templateStore: ProjectTemplateStore) { }


  ngOnInit(): void {
    this.subscription = this.uiStore.layoutType.subscribe (
      value => this.layoutType = value
    );
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onChangeView() {
    this.uiStore.setProjectViewConfig(this.viewConfig);
  }


  onSelectTemplate(projectUID) {
    this.selectedTemplate = this.templateStore.findById(projectUID);

    this.templateStore.selectTemplate(this.selectedTemplate);
  }

}
