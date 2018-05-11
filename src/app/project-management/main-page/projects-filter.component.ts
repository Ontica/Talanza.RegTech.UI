/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EmptyProjectRef, PersonRef, ProjectRef, ResourceRef,
         Contract, Stage } from '../data-types/project';
import { ActivityFilter, ViewConfig, DefaultViewConfig } from '../data-types/activity-filter';

import { ProjectService } from '../services/project.service';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'projects-filter',
  templateUrl: './projects-filter.component.html',
  styleUrls: ['./projects-filter.component.scss'],
  providers: [ProjectService, ActivityService]
})

export class ProjectsFilterComponent implements OnInit {

  public projectsList: ProjectRef[] = [];
  public responsiblesList: PersonRef[] = [];
  public labelsList: any;
  public keywords = '';

  public contracts: Contract[] = [];
  public stages: Stage[] = [];

  public selectedProject: ProjectRef = EmptyProjectRef();

  public filter: ActivityFilter = new ActivityFilter();
  public viewConfig: ViewConfig = DefaultViewConfig();

  @Output() onChangeFilter = new EventEmitter<ActivityFilter>();
  @Output() onChangeView = new EventEmitter<ViewConfig>();

  public constructor(private projectService: ProjectService,
                     private activityService: ActivityService) { }

  public ngOnInit() {
    this.loadContracts();
    this.loadProjectList();
    this.loadStages();
    this.loadTags();
    this.changeView();
  }


  public onChangeProjectList(projectUID: string): void {
    if (projectUID === '') {
      this.selectedProject = EmptyProjectRef();

      this.labelsList = [];

      return;
    }

    this.selectedProject = this.projectsList.find((x) => x.uid === projectUID);

    this.filter.project =  this.selectedProject;

    this.loadCombos();

    this.changeFilter();
  }


  public onChangeSelectedTags(tags: any[]) {
    this.filter.tags = tags.map(x => x.name);

    this.changeFilter();
  }


  public onChangeContract(contractUID: string): void {
    if (contractUID === '') {
      return;
    }

    let selectedContract = this.contracts.find((x) => x.uid === contractUID);
    
    this.filter.contract = selectedContract;   
  }


  public onChangeStage(stageUID: string): void {
    if (stageUID === '') {
      return;
    }

    let selectedStage = this.stages.find((x) => x.uid === stageUID);
    
    this.filter.stage = selectedStage;   
         
    this.changeFilter();
  }

  public onChangeResponsible(responsibleUID: string): void {
    if (responsibleUID === '') {
      return;
    }

    let selectedResponsive = this.responsiblesList.find((x) => x.uid === responsibleUID);
    
    this.filter.responsible = selectedResponsive;   
         
    this.changeFilter();
  }


  public changeFilter(): void {    
    this.filter = this.filter.clone();

    this.onChangeFilter.emit(this.filter);
  }


  public changeView(): void {
    this.onChangeView.emit(this.viewConfig);
  }


  public onSearch(): void {
    this.filter.keywords = this.keywords;
    this.changeFilter();
  }


  public cleanFilter(): void {
    this.filter.clean();

    this.loadTags();
  }


  private loadProjectList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de proyectos.';

    this.projectService.getProjectList()
      .toPromise()
      .then((x) => this.projectsList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }


  private loadContracts(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de contratos.';
    
    this.projectService.getContracts()
      .toPromise()
      .then((x) => this.contracts = x)
      .catch((e) => this.exceptionHandler(e, errMsg));    
  }

  private loadStages(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de etapas.';

    this.projectService.getStages()
      .toPromise()
      .then((x) => this.stages = x)
      .catch((e) => this.exceptionHandler(e, errMsg));    
  }


  private loadResponsiblesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.projectService.getResponsiblesList(this.selectedProject.uid)
      .toPromise()
      .then((x) => this.responsiblesList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }


  private loadCombos(): void {
    this.loadResponsiblesList();
  }


  private loadTags(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de etiquetas.';

    this.activityService.getTags()
      .toPromise()
      .then((x) => this.labelsList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }


  private exceptionHandler(error: any, defaultMsg: string): void {
    let errMsg = 'Tengo un problema.\n\n';

    if (typeof(error) === typeof(Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error>error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }

}
