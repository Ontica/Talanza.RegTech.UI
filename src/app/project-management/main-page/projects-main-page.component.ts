/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';

import { ProjectStore , ProjectModel } from '@app/store/project.store';

import { Activity, Activity_Empty,
         ActivityFilter, DefaultViewConfig,
         Project, ViewConfig } from '@app/models/project-management';


@Component({
  selector: 'projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss']
})
export class ProjectsMainPageComponent implements OnInit {

  selectedProject: ProjectModel;
  selectedActivity = Activity_Empty;

  viewConfig = DefaultViewConfig();

  displayEditor = false;
  toggleEditor = false;

  constructor(private store: ProjectStore) {

  }


  ngOnInit() {
    this.store.selectedProject().subscribe (
      x => this.selectedProject = x
    );
  }

  onActivityUpdated(activity: Activity) {

  }


  onEditorClosed() {
    this.displayEditor = false;

    this.toggleEditor = !this.toggleEditor;
  }


  onFilterChanged(receivedFilter: ActivityFilter) {
    this.store.selectProject(receivedFilter.project);
  }


  onViewChanged(viewConfig: ViewConfig) {
    this.viewConfig = viewConfig;
  }


  showEditor(activity: Activity) {
    if (activity) {
      this.selectedActivity = activity;

      const lastValue = this.displayEditor;

      this.displayEditor = true;

      if (lastValue !== this.displayEditor) {
        this.toggleEditor = !this.toggleEditor;
      }
    }
  }

}
