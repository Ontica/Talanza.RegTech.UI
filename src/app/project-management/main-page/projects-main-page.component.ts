/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { Empty } from '../../core/data-types';

import { ActivityService, ProjectService } from '../services';

import {
  Activity,
  Activity_Empty,
  ActivityFilter,
  DefaultViewConfig,
  Project,
  ViewConfig
} from '../data-types';


@Component({
  selector: 'projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss']
})
export class ProjectsMainPageComponent {

  viewConfig = DefaultViewConfig();
  filter = new ActivityFilter();

  selectedProject: Project = Empty;
  taskList: Activity[] = [];
  selectedActivity = Activity_Empty;

  displayEditor = false;

  constructor(private projectService: ProjectService,
              private activityService: ActivityService) {

  }

  onActivityUpdated(activity: Activity) {

  }

  onEditorClosed() {
    this.displayEditor = false;
  }

  onFilterChanged(receivedFilter: ActivityFilter) {
    this.filter = receivedFilter;
  }

  onViewChanged(viewConfig: ViewConfig) {
    this.viewConfig = viewConfig;
  }

  showEditor(activity: Activity) {
    if (activity) {
      this.selectedActivity = activity;

      this.displayEditor = true;
    }
  }

}
