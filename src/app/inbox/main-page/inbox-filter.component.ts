/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EmptyProjectRef, PersonRef, ProjectRef } from '../../project-management/data-types/project';
import { InboxFilter } from '../data-types/inbox-filter';

import { ProjectService } from '../../project-management/services/project.service';
import { ActivityService } from '../../project-management/services/activity.service';

@Component({
  selector: 'inbox-filter',
  templateUrl: './inbox-filter.component.html',
  styleUrls: ['./inbox-filter.component.scss'],
  providers: [ProjectService, ActivityService]
})

export class InboxFilterComponent implements OnInit {

  public isAddActivityEditorWindowVisible = false;

  public projectsList: ProjectRef[] = [];
  public selectedProject: ProjectRef = EmptyProjectRef();
  
  public labelsList: any;
  public responsiblesList: PersonRef[] = [];
 
  public keywords = '';

  public filter: InboxFilter = new InboxFilter();
 
  @Output() onChangeFilter = new EventEmitter<InboxFilter>();
 
  public constructor(private projectService: ProjectService, private activityService: ActivityService) { }

  public ngOnInit() {    
    this.loadProjectList();
    this.loadTags();
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

  public onClickAdd(): void {
    alert('Esta tarea se encuentra en desarrollo ' + '\n\n' + 'Lamentamos las molestias ');   
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
