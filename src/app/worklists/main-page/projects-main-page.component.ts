/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { EmptyProjectRef, ProjectRef, ResourceRef } from '../data-types/project';

@Component({
  selector: 'projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss'],
  providers: [ProjectService]
})

export class ProjectsMainPageComponent implements OnInit {

  public isAddActivityEditorWindowVisible = false;
  public isGanttGraphVisible = false;
  public projectsList: ProjectRef[] = [];
  public selectedProject: ProjectRef = EmptyProjectRef();
  public ganttConfig = 'ganttWeeks';
  public selectedView = 'tasksList';
  public resourcesList: ResourceRef[] = [];

  public isRefreshWorkList = false;

  public constructor(private projectService: ProjectService) { }

  public ngOnInit() {
    this.loadProjectList();

  }

  public onCloseAddActivityEditorWindow(): void {
    this.isAddActivityEditorWindowVisible = false;    
    this.showGanttGraph();
    this.isRefreshWorkList = true;
  }

  public onChangeProjectList(projectUID: string): void {
    if (projectUID === '') {
      this.selectedProject = EmptyProjectRef();
      this.hideGanttGraph();
      this.resourcesList = [];
      return;
    }

    this.selectedProject = this.projectsList.find((x) => x.uid === projectUID);
    
    this.showGanttGraph(); 

    this.loadResources();    
  }

  public onClickAddActivity(): void {       
    if (this.selectedProject.uid === '') {
      alert("Requiero se seleccione el proyecto al cual se le agregará la actividad.");
      return;
    }
    this.hideGanttGraph();
    this.isAddActivityEditorWindowVisible = true;
    
  }

  private loadProjectList(): void {
    this.projectService.getProjectList()
                       .toPromise()
                       .then((x) => this.projectsList = x);
  }
  
  private loadResources(): void {
    this.projectService.getResources(this.selectedProject.uid)
                       .toPromise()
                       .then((x) => this.resourcesList = x);

  }

  private showGanttGraph(): void {
    this.isGanttGraphVisible = true;
  }

  private hideGanttGraph(): void {
    this.isGanttGraphVisible = false;
  }

}
