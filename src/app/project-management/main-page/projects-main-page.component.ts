/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { EmptyProjectRef, PersonRef, ProjectRef, ResourceRef } from '../data-types/project';
import { ActivityFilter, ViewConfig, DefaultViewConfig } from '../data-types/activity-filter';
import { Activity, EmptyActivity } from '../data-types/activity';

import { ProjectService } from '../services/project.service';
import { ActivityService } from '../services/activity.service';


@Component({
  selector: 'projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss'],
  providers: [ProjectService, ActivityService]
})

export class ProjectsMainPageComponent {

  public viewConfig: ViewConfig = DefaultViewConfig();
  public filter: ActivityFilter = new ActivityFilter();

  public selectedProject: ProjectRef = EmptyProjectRef();
  public taskList: Activity[] = [];
  public selectedActivity = EmptyActivity();

  public masterContainerClass = 'centered-container';
  public displayEditor = false;

  public constructor(private projectService: ProjectService,
                     private activityService: ActivityService) {

  }


  public onChangeFilter(receivedFilter: ActivityFilter) {
    this.filter = receivedFilter;
  }


  public onChangeView(viewConfig: ViewConfig): void {
    this.viewConfig = viewConfig;
  }

  public showEditor(activity: Activity): void {
    if (activity) {
      this.selectedActivity = activity;

      this.masterContainerClass = 'block-container';

      this.displayEditor = true;
    }
  }

  public closeEditor(): void {
    this.masterContainerClass = 'centered-container';

    this.displayEditor = false;
  }

}
