/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Empty, Contact } from '@app/core/data-types';

import { ProjectStore } from '@app/store/project.store';

import { ActivityService, ProjectService } from '@app/services/project-management';

import { ActivityFilter, Contract,
         DefaultViewConfig, Project,
         Resource, Stage, ViewConfig } from '@app/models/project-management';


@Component({
  selector: 'projects-filter',
  templateUrl: './projects-filter.component.html',
  styleUrls: ['./projects-filter.component.scss']
})
export class ProjectsFilterComponent implements OnInit {

  @Output() onChangeFilter = new EventEmitter<ActivityFilter>();
  @Output() onChangeView   = new EventEmitter<ViewConfig>();

  responsiblesList: Contact[] = [];
  labelsList: any;
  keywords = '';

  contracts: Contract[] = [];
  stages: Stage[] = [];

  selectedProject: Project = Empty;

  filter: ActivityFilter = new ActivityFilter();
  viewConfig: ViewConfig = DefaultViewConfig();

  constructor(
    private projectStore: ProjectStore,
    private projectService: ProjectService,
    private activityService: ActivityService) {
  }

  ngOnInit() {
    this.loadContracts();
    this.loadStages();
    this.loadTags();
    this.changeView();
  }


  onChangeProjectList(projectUID: string) {
    if (projectUID === '') {
      this.selectedProject = Empty;

      this.labelsList = [];

      return;
    }

    this.selectedProject = this.projectStore.findById(projectUID);

    this.filter.project =  this.selectedProject;

    this.loadCombos();

    this.changeFilter();
  }


  onChangeSelectedTags(tags: any[]) {
    this.filter.tags = tags.map(x => x.name);

    this.changeFilter();
  }


  onChangeContract(contractUID: string) {
    if (contractUID === '') {
      return;
    }

    let selectedContract = this.contracts.find((x) => x.uid === contractUID);

    this.filter.contract = selectedContract;
  }


  onChangeStage(stageUID: string) {
    if (stageUID === '') {
      return;
    }

    let selectedStage = this.stages.find((x) => x.uid === stageUID);

    this.filter.stage = selectedStage;

    this.changeFilter();
  }


  onChangeResponsible(responsibleUID: string) {
    if (responsibleUID === '') {
      return;
    }

    let selectedResponsive = this.responsiblesList.find((x) => x.uid === responsibleUID);

    this.filter.responsible = selectedResponsive;

    this.changeFilter();
  }


  changeFilter() {
    this.filter = this.filter.clone();

    this.onChangeFilter.emit(this.filter);
  }


  changeView() {
    this.onChangeView.emit(this.viewConfig);
  }


  onSearch() {
    this.filter.keywords = this.keywords;
    this.changeFilter();
  }


  cleanFilter() {
    this.filter.clean();

    this.loadTags();
  }

  // private methods

  private loadContracts() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de contratos.';

    this.projectService.getContracts()
      .toPromise()
      .then( x => this.contracts = x )
  }


  private loadStages() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de etapas.';

    this.projectService.getStages()
      .toPromise()
      .then( x => this.stages = x )
  }


  private loadResponsiblesList() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.projectService.getResponsiblesList(this.selectedProject.uid)
      .toPromise()
      .then( x => this.responsiblesList = x )
  }


  private loadCombos() {
    this.loadResponsiblesList();
  }


  private loadTags() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de etiquetas.';

    this.projectService.getTags()
        .toPromise()
        .then( x => this.labelsList = x )
  }

}
