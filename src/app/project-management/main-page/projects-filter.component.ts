/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Empty, Contact } from '@app/core/data-types';
import { ColoredTag } from '@app/core/ui-data-types';

import { ProjectStore } from '@app/store/project.store';

import { ActivityFilter, Contract, DefaultViewConfig,
         Project, Resource, Stage, ViewConfig } from '@app/models/project-management';


@Component({
  selector: 'projects-filter',
  templateUrl: './projects-filter.component.html',
  styleUrls: ['./projects-filter.component.scss']
})
export class ProjectsFilterComponent implements OnInit {

  @Output() onChangeFilter = new EventEmitter<ActivityFilter>();
  @Output() onChangeView   = new EventEmitter<ViewConfig>();

  responsiblesList: Observable<Contact[]> = Observable.of([]);

  keywords = '';


  selectedProject: Project = Empty;

  filter: ActivityFilter = new ActivityFilter();
  viewConfig: ViewConfig = DefaultViewConfig();

  constructor(private projectStore: ProjectStore) {}

  ngOnInit() {
    this.changeView();
  }


  onChangeProjectList(projectUID: string) {
    if (projectUID === '') {
      this.selectedProject = Empty;

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

    this.projectStore.contracts.map(data => {
      this.filter.contract = data.find(x => x.uid === contractUID),
      this.changeFilter();
   });
  }


  onChangeStage(stageUID: string) {
    if (stageUID === '') {
      return;
    }

    this.projectStore.stages.map(data => {
      this.filter.stage = data.find(x => x.uid === stageUID),
      this.changeFilter();
   });
  }


  onChangeResponsible(responsibleUID: string) {
    if (responsibleUID === '') {
      return;
    }

    this.responsiblesList.map(data => {
      this.filter.responsible = data.find(x => x.uid === responsibleUID),
      this.changeFilter();
   });
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
  }

  // private methods


  private loadResponsiblesList() {
    this.responsiblesList = this.projectStore.responsibles(this.selectedProject);
  }


  private loadCombos() {
    this.loadResponsiblesList();
  }

}
