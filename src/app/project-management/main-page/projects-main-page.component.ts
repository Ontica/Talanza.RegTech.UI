/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';

import { ProjectStore , ProjectModel } from '@app/store/project.store';

import { Activity, Activity_Empty,
         ActivityFilter, DefaultViewConfig,
         Project, ViewConfig } from '@app/models/project-management';

import { MenuItem } from '@app/shared/nav-menu/nav-menu.component';


const mainMenu: MenuItem[] = [
  new MenuItem('Actividades', 'showProjectActivities'),
  new MenuItem('Documentos', 'showProjectDocuments'),
  new MenuItem('Q&A', 'showProjectQ&As'),
];


const projectActivitiesSecondaryMenu: MenuItem[] = [
  new MenuItem('Árbol', 'showTree'),
  new MenuItem('Lista', 'showList'),
  new MenuItem('Gantt', 'showGantt'),
  new MenuItem('Kanban', 'showKanban'),
  new MenuItem('Calendario', 'showCalendar')
];


const projectDocumentsSecondaryMenu: MenuItem[] = [
  new MenuItem('Todos'),
  new MenuItem('En proceso'),
  new MenuItem('Enviados'),
];


const projectQASecondaryMenu: MenuItem[] = [
  new MenuItem('Contestadas'),
  new MenuItem('Pendientes'),
  new MenuItem('Todas')
];

@Component({
  selector: 'projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss']
})
export class ProjectsMainPageComponent implements OnInit {

  mainMenuItems: MenuItem[];

  secondaryMenuItems: MenuItem[];

  selectedProject: ProjectModel;
  selectedActivity = Activity_Empty;

  viewConfig = DefaultViewConfig();

  displayEditor = false;
  toggleEditor = false;

  constructor(private store: ProjectStore) {

  }


  ngOnInit() {

    this.mainMenuItems = mainMenu;

    this.secondaryMenuItems = projectActivitiesSecondaryMenu;

    this.store.selectedProject().subscribe (
      x => this.selectedProject = x
    );
  }

  onAction(action: string) {
    switch (action) {
      case 'showProjectActivities':
        this.secondaryMenuItems = projectActivitiesSecondaryMenu;
        return;
      case 'showProjectDocuments':
        this.secondaryMenuItems = projectDocumentsSecondaryMenu;
        return;
      case 'showProjectQ&As':
        this.secondaryMenuItems = projectQASecondaryMenu;
        return;
      case 'showTree':
        this.viewConfig = this.getViewConfig({ viewType: 'activity-tree' });
        return;
      case 'showList':
        this.viewConfig = this.getViewConfig({ viewType: 'tasks-list' });
        return;
      case 'showGantt':
        this.viewConfig = this.getViewConfig({ viewType: 'gantt' });
        return;
      case 'showKanban':
        this.viewConfig = this.getViewConfig({ viewType: 'kanban' });
        return;
      case 'showCalendar':
        this.viewConfig = this.getViewConfig({ viewType: 'calendar' });
        return;
      default:
        throw new Error(`Unhandled action ${action}.`);
    }
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


  // private methods

  private getViewConfig(newData: Partial<ViewConfig>): ViewConfig {
    return Object.assign(this.viewConfig, newData);
  }

}
