/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { ProjectStore , ProjectModel } from '@app/store/project.store';

import { Activity, EmptyActivity, ActivityOperation,
         DefaultViewConfig, ViewConfig } from '@app/models/project-management';

import { MenuItem } from '@app/shared/nav-menu/nav-menu.component';


const mainMenu: MenuItem[] = [
  new MenuItem('Tareas', 'showProjectTasks'),
  new MenuItem('Diseño', 'showProjectActivities'),
  new MenuItem('Reuniones', 'showProjectMeetings'),
  new MenuItem('Documentos', 'showProjectDocuments'),
  new MenuItem('KB', 'showProjectKB'),
  new MenuItem('Dashboard', 'showProjectDashboard'),
];


const projectActivitiesSecondaryMenu: MenuItem[] = [
  new MenuItem('Árbol', 'showTree'),
  new MenuItem('Lista', 'showList'),
  new MenuItem('Gantt', 'showGantt'),
  new MenuItem('Kanban', 'showKanban'),
  new MenuItem('Calendario', 'showCalendar')
];


const projectMeetingsSecondaryMenu: MenuItem[] = [
  new MenuItem('Lista', 'showMeetingsList'),
  new MenuItem('Calendario', 'showMeetingsCalendar'),
];


const projectDocumentsSecondaryMenu: MenuItem[] = [
  new MenuItem('Todos'),
  new MenuItem('En proceso'),
  new MenuItem('Enviados'),
];


const projectKBSecondaryMenu: MenuItem[] = [
  new MenuItem('Todo'),
  new MenuItem('Q&A'),
  new MenuItem('Regulaciones', 'showRegulations'),
  new MenuItem('Procesos'),
  new MenuItem('Trámites'),
  new MenuItem('Contratos'),
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
  selectedActivity = EmptyActivity;

  viewConfig = DefaultViewConfig();

  displayEditor = false;
  toggleEditor = false;

  constructor(private store: ProjectStore) { }


  ngOnInit() {
    this.mainMenuItems = mainMenu;

    this.store.selectedProject().subscribe(
      x => {
        if (this.selectedProject &&
            this.selectedProject.project.uid !== x.project.uid) {
          this.selectedActivity = EmptyActivity;
          this.displayEditor = false;
        }
        this.selectedProject = x;
      }
    );

    this.store.selectedView().subscribe(
      x => this.viewConfig = x
    );
  }


  onActivityUpdated(activity: Activity) {

  }


  onActivityTreeEdited(event: ActivityOperation) {
    switch (event.operation) {

      case 'createActivity':

        this.store.insertActivity(this.selectedProject.project, event.activity)
                  .then( x => this.selectedActivity = x )
                  .catch( response => console.log(response.error.message) );

        return;

      case 'moveActivity':

        this.store.moveActivity(event.activity as Activity, event.newPosition)
                  .catch( response => console.log(response.error.message) );

        return;

      case 'changeParent':

        this.store.changeParent(event.activity as Activity, event.newParent)
                  .catch( response => console.log(response.error.message) );

        return;

      default:

        console.log('Unhandled operation name', event.operation);

    }

  }


  onEditorClosed() {
    this.displayEditor = false;

    this.toggleEditor = !this.toggleEditor;
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


  // temporal view controller methods


  onAction(action: string) {
    switch (action) {
      case 'showProjectActivities':
        this.secondaryMenuItems = projectActivitiesSecondaryMenu;
        return;
      case 'showProjectDocuments':
        this.secondaryMenuItems = projectDocumentsSecondaryMenu;
        return;
      case 'showProjectMeetings':
        this.secondaryMenuItems = projectMeetingsSecondaryMenu;
        return;
      case 'showProjectKB':
        this.secondaryMenuItems = projectKBSecondaryMenu;
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


      case 'showRegulations':
        // this.router.navigate(['/documents/search'])
        return;

      default:
        throw new Error(`Unhandled action ${action}.`);
    }
  }


  onViewChanged(viewConfig: ViewConfig) {
    this.viewConfig = viewConfig;
  }


  private getViewConfig(newData: Partial<ViewConfig>): ViewConfig {
    return Object.assign(this.viewConfig, newData);
  }

}
