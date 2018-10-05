/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output, OnInit } from '@angular/core';

import { MenuItem } from '../nav-menu/nav-menu.component';

import { ProjectStore } from '@app/store/project.store';
import { Project } from '@app/models/project-management';

@Component({
  selector: 'navigation-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit {

  title = 'Seleccionar un proyecto';

  //breadcrumb = 'Todos los proyectos » Shell » Ronda 2.4 » Salina Area 28';
  breadcrumb = 'Todos los proyectos';

  selectedProject: Project;

  @Output() action = new EventEmitter<string>();

  @Input() layoutType: string;

  @Input() mainMenuItems: MenuItem[];

  @Input() secondaryMenuItems: MenuItem[];

  constructor(private projectStore: ProjectStore) {}

  ngOnInit() {

    this.mainMenuItems =  [
      new MenuItem('Tareas', undefined, '/inbox/main'),
      new MenuItem('Actividades', undefined, '/projects/main'),
      new MenuItem('Archivos', undefined, undefined, true),
      new MenuItem('Regulación', undefined, '/knowledge-base/main'),
    ];

    // this.secondaryMenuItems =  [
    //   new MenuItem('Árbol'),
    //   new MenuItem('Lista'),
    //   new MenuItem('Gantt'),
    //   new MenuItem('Kanban'),
    //   new MenuItem('Calendario')
    // ];

    this.projectStore.selectedProject().subscribe (
      x => { this.selectedProject = x.project;
             this.title = this.selectedProject.uid ? this.selectedProject.name : 'Seleccionar un proyecto'; }
    );

  }

  onClickMenu(menuItem: MenuItem) {
    this.action.emit(menuItem.action);
  }

  onSelectProject(projectUID: string) {
    this.selectedProject = this.projectStore.findById(projectUID);

    this.projectStore.selectProject(this.selectedProject);

  }

}
