/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output, OnChanges } from '@angular/core';

import { MenuItem } from '../nav-menu/nav-menu.component';

import { ProjectStore } from '@app/store/project.store';
import { ProjectTemplateStore } from '@app/store/project-template.store';

import { Project } from '@app/models/project-management';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'navigation-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavigationHeaderComponent implements OnChanges {

  title = 'Seleccionar un proyecto';

  //breadcrumb = 'Todos los proyectos » Shell » Ronda 2.4 » Salina Area 28';
  breadcrumb = '';

  selectedProject: Project;
  selectedTemplate: Project;

  @Output() action = new EventEmitter<string>();

  @Input() layoutType: string;

  @Input() mainMenuItems: MenuItem[];

  @Input() secondaryMenuItems: MenuItem[];

  constructor(private projectStore: ProjectStore,
              private templateStore: ProjectTemplateStore) {}


  ngOnChanges() {
    this.setLayout();
  }


  onClickMenu(menuItem: MenuItem) {
    this.action.emit(menuItem.action);
  }


  onSelectProject(projectUID: string) {
    this.selectedProject = this.projectStore.findById(projectUID);

    this.projectStore.selectProject(this.selectedProject);
  }


  onSelectTemplate(projectUID) {
    this.selectedTemplate = this.templateStore.findById(projectUID);

    this.templateStore.selectTemplate(this.selectedTemplate);
  }


  private setLayout() {
    switch (this.layoutType) {
      case 'Projects':
        this.setProjectsLayout();
        return;

      case 'ProjectsTemplates':
        this.setTemplatesDesignerLayout();
        return;

      default:
        this.setDefaultLayout();
    }
  }


  private setProjectsLayout() {

    this.breadcrumb = 'Todos los proyectos';

    this.mainMenuItems =  [
      new MenuItem('Bandeja de tareas', undefined, '/inbox/main', true),
      new MenuItem('Actividades', undefined, '/projects/main'),
      new MenuItem('Archivos', undefined, undefined, true)
    ];

    // this.secondaryMenuItems =  [
    //   new MenuItem('Árbol'),
    //   new MenuItem('Lista'),
    //   new MenuItem('Gantt'),
    //   new MenuItem('Kanban'),
    //   new MenuItem('Calendario')
    // ];

    this.projectStore.selectedProject().subscribe (
      next => {
        this.selectedProject = next.project;
        this.title = this.selectedProject.uid ? this.selectedProject.name : 'Seleccionar un proyecto';
      }
    );

  }

  private setTemplatesDesignerLayout() {

    this.breadcrumb = 'Todos los patrones';

    this.mainMenuItems =  [
      new MenuItem('Patrones', undefined, '/projects-templates/main'),
    ];

    this.templateStore.selectedTemplate().subscribe (
      next => {
        this.selectedTemplate = next.project;
        this.title = this.selectedTemplate.uid ? this.selectedTemplate.name : 'Seleccionar un patrón';
      }
    );

  }

  private setDefaultLayout() {
    this.breadcrumb = '';
    this.mainMenuItems =  [];
    this.title = '';
  }

}
