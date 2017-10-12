/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { ActivityService } from '../services/activity.service';

import { EmptyProjectRef, PersonRef, ProjectRef, ResourceRef } from '../data-types/project';

export class Filter {
  ResponsibleUId: string;
  ResourceUId: string;
 
}

@Component({
  selector: 'projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss'],
  providers: [ProjectService, ActivityService]
})

export class ProjectsMainPageComponent implements OnInit {

  public isAddActivityEditorWindowVisible = false;
  public isGanttGraphVisible = false;
  public projectsList: ProjectRef[] = [];
  public selectedProject: ProjectRef = EmptyProjectRef();
  public ganttConfig = 'ganttWeeks';
  public selectedView = 'tasksList';
  public selectedScale = 'quarters';
  public resourcesList: ResourceRef[] = [];
  public responsiblesList: PersonRef[] = [];
  public orderBy = '';
  public keywords = '';

  public isRefreshWorkList = false;

  private filter: Filter;

  public constructor(private projectService: ProjectService, private activityService: ActivityService) { }

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

    this.loadCombos();    
  }

  public onClickAddActivity(): void {       
    if (this.selectedProject.uid === '') {
      alert("Requiero se seleccione el proyecto al cual se le agregará la actividad.");
      return;
    }
    this.hideGanttGraph();
    this.isAddActivityEditorWindowVisible = true;
    
  }

  public onChangeOrderBy(orderBy: string): void {  
    this.orderBy = orderBy;
  }

  public onChangeResource(resourceUID: string): void {
   if (resourceUID === "") {
     return;
   }

   this.filter.ResourceUId = resourceUID;
  }

  public onChangeResponsible(responsibleUID: string): void {
    if (responsibleUID === "") {
      return;
    }

    this.filter.ResponsibleUId = responsibleUID;
  }

  public onSearch(): void {   
     this.search();
  }


  private loadProjectList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de proyectos.';

    this.projectService.getProjectList()
                       .toPromise()
                       .then((x) => this.projectsList = x)
                       .catch((e) => this.exceptionHandler(e, errMsg));
  }
  
  private loadResources(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de recursos.';

    this.projectService.getResourcesList(this.selectedProject.uid)
                        .toPromise()
                        .then((x) => this.resourcesList = x)
                        .catch((e) => this.exceptionHandler(e, errMsg));

  }

  private loadResponsibles(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.projectService.getResponsiblesList(this.selectedProject.uid)
                        .toPromise()
                        .then((x) => this.responsiblesList = x)
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private search(): void {
    const errMsg = 'Ocurrió un problema al intentar buscar la lista de actividades.';

    this.activityService.searchActivities(this.selectedProject.uid, this.filter,
                                          this.orderBy, this.keywords)
                        .toPromise()
                        .then((x) => console.log(x))
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private showGanttGraph(): void {
    this.isGanttGraphVisible = true;
  }

  private hideGanttGraph(): void {
    this.isGanttGraphVisible = false;
  }

  private loadCombos(): void  {
    this.loadResources();
    this.loadResponsibles();
  }

  private exceptionHandler(error: any, defaultMsg: string): void {
    let errMsg = 'Tengo un problema.\n\n';

    if (typeof (error) === typeof (Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error>error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }

}
