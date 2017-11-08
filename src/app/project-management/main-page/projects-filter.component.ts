/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EmptyProjectRef, PersonRef, ProjectRef, ResourceRef } from '../data-types/project';
import { ActivityFilter } from '../data-types/activity-filter';

import { ProjectService } from '../services/project.service';
import { ActivityService } from '../services/activity.service';

export class DisplayFilter {
  selectedView: string;
  ganttConfig: string;
  selectedScale: string;
}

@Component({
  selector: 'projects-filter',
  templateUrl: './projects-filter.component.html',
  styleUrls: ['./projects-filter.component.scss'],
  providers: [ProjectService, ActivityService]
})

export class ProjectsFilterComponent implements OnInit {

  public isAddActivityEditorWindowVisible = false;

  public projectsList: ProjectRef[] = [];
  public selectedProject: ProjectRef = EmptyProjectRef();
  
  public labelsList: any;
  public responsiblesList: PersonRef[] = [];
 
  public keywords = '';

  public filter: ActivityFilter = new ActivityFilter();
  public displayFilter: DisplayFilter = new DisplayFilter();

  @Output() onChangeFilter = new EventEmitter<ActivityFilter>();
  @Output() onChangeDisplayFilter = new EventEmitter<DisplayFilter>();
  @Output() onAddActivity = new EventEmitter<boolean>();
  @Output() onRefreshWorkList =  new EventEmitter<boolean>();

  public constructor(private projectService: ProjectService, private activityService: ActivityService) { }

  public ngOnInit() {
    this.displayFilter.selectedView = 'project-explorer';
    this.displayFilter.ganttConfig = 'ganttWeeks';
    this.displayFilter.selectedScale = 'quarters';
    this.loadProjectList();
    this.loadTags();
  }

  public onCloseAddActivityEditorWindow(): void {
    this.isAddActivityEditorWindowVisible = false;
    this.onAddActivity.emit(false);
   
    this.onRefreshWorkList.emit(true);
  }

  public onChangeProjectList(projectUID: string): void {
    if (projectUID === '') {
      this.selectedProject = EmptyProjectRef();
     
      this.labelsList = [];

      return;
    }

    this.selectedProject = this.projectsList.find((x) => x.uid === projectUID);

    this.loadCombos();
    this.changeFilter();
  }

  public onChangeSelectedTags(tags: any[]) {

    this.filter.tags = tags.map(x => x.name);
    this.changeFilter();   
  }

  public changeFilter(): void {

    this.filter = this.filter.clone();

    this.onChangeFilter.emit(this.filter);
  }

  public onClickAddActivity(): void {
    if (this.selectedProject.uid === '') {
      alert("Requiero se seleccione el proyecto al cual se le agregará la actividad.");
      return;
    }
    this.onAddActivity.emit(true);
  
    this.isAddActivityEditorWindowVisible = true;
  }

  public changeDislpayFilter(): void {
    this.onChangeDisplayFilter.emit(this.displayFilter);
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

    if (typeof (error) === typeof (Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error>error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }

}
