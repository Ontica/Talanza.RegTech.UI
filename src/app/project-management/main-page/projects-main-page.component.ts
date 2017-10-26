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
  contractUID: string;
  projectUID: string;
  stage: string;
  labels: string;
  responsibleUID: string;
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
  public labelsList: any;
  public responsiblesList: PersonRef[] = [];
  public orderBy = '';
  public keywords = '';

  public isRefreshWorkList = false;

  private filter: Filter;

  public constructor(private projectService: ProjectService, private activityService: ActivityService) { }

  public ngOnInit() {
    this.loadProjectList();
    this.loadTags();
  }

  public onCloseAddActivityEditorWindow(): void {
    this.isAddActivityEditorWindowVisible = false;
    this.showGanttGraph();
    this.isRefreshWorkList = true;
  }

  public onChangeContractList(contractUID: string): void {
    this.filter.contractUID = contractUID;
  }

  public onChangeProjectList(projectUID: string): void {
    if (projectUID === '') {
      this.selectedProject = EmptyProjectRef();
      this.hideGanttGraph();
      this.labelsList = [];
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

  public onChangeLabelsList(labels: string): void {
    this.filter.labels = labels;
  }

  public onChangeResponsible(responsibleUID: string): void {
    if (responsibleUID === "") {
      return;
    }

    this.filter.responsibleUID = responsibleUID;
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


  private loadLabelsList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de etiquetas.';

    this.projectService.getResourcesList(this.selectedProject.uid)
                       .toPromise()
                       .then((x) => this.labelsList = x)
                       .catch((e) => this.exceptionHandler(e, errMsg));

  }

  private loadResponsiblesList(): void {
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
    this.loadLabelsList();
    this.loadResponsiblesList();
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

  private cleanFilter(): void {

  }

  private loadTags(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de etiquetas.';

    this.activityService.getTags()
                        .toPromise()
                        .then((x) => this.labelsList = x)
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }

}
