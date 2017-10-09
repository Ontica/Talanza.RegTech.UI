/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { ProjectRef, EmptyProjectRef } from '../data-types/project';

@Component({
  selector: 'projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss'],
  providers: [ProjectService]
})

export class ProjectsMainPageComponent implements OnInit {

  public isAddActivityEditorWindowVisible = false;
  public isGanttGraphVisible = false;
  public projectList: ProjectRef[] = [];
  public selectedProject: ProjectRef = EmptyProjectRef();
  public ganttConfig = 'ganttWeeks';
  public selectedView = 'tasksList';

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
      return;
    }

    this.selectedProject = this.projectList.find((x) => x.uid === projectUID);
    
    this.showGanttGraph();    
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
                       .then((x) => this.projectList = x);
  }

  private showGanttGraph(): void {
    this.isGanttGraphVisible = true;
  }

  private hideGanttGraph(): void {
    this.isGanttGraphVisible = false;
  }

}
