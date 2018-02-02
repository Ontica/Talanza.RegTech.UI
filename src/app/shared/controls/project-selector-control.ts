/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { ProjectSelectorService } from './project-selector.service';

const PROJECTS: any[] = [
    { uid: 'asfa0',  name: 'Todos los proyectos', level:0 },
    { uid: 'afas1',  name: 'Ronda 2.2', level: 1 },
    { uid: '2asdf',  name: 'Pozo Tampico', level:2 },
    { uid: 'ed3de',  name: 'Pozo Salvatierra', level:3 },
    { uid: 'cft4d',  name: 'Ronda 2.3', level: 1 },
    { uid: '554e4',  name: 'Pozo Tabasco', level:2 },
    { uid: '6eart',  name: 'Pozo cd del Carmen', level:3 },
  ]
  
@Component ({
    selector: 'project-selector',
    template: '<select-control [items]="projects" [selectedUID]="selectedProjectUID" (onSelectedItem)="onChangeProject($event)"></select-control>', 
  
})

export class ProjectSelectorControl implements OnInit {

    public projects = PROJECTS;
    public selectedProjectUID: string;

    constructor (private projectSelectorService: ProjectSelectorService ){}

    ngOnInit() {
        this.selectedProjectUID = this.projectSelectorService.selectedProjectUID;        
    }

    public onChangeProject(project: any): void {
        this.projectSelectorService.selectedProjectUID = project.uid;
        this.selectedProjectUID =  project.uid;                   
    }
    
}