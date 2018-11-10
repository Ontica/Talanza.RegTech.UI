/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ProjectService } from '@app/services/project-management';

import { Empty, Contact } from '@app/models/core';
import { Project } from '@app/models/project-management';
import { InboxFilter } from '@app/models/inbox';


@Component({
  selector: 'inbox-filter',
  templateUrl: './inbox-filter.component.html',
  styleUrls: ['./inbox-filter.component.scss']
})
export class InboxFilterComponent implements OnInit {

  @Output() onChangeFilter = new EventEmitter<InboxFilter>();

  isAddActivityEditorWindowVisible = false;

  projectsList: Project[] = [];
  selectedProject: Project = Empty;

  labelsList: any;
  responsiblesList: Contact[] = [];

  keywords = '';

  filter: InboxFilter = new InboxFilter();


  constructor(private projectService: ProjectService) { }


  ngOnInit() {
    this.loadProjectList();
    this.loadTags();
    this.loadResponsiblesList();
  }


  onChangeProjectList(projectUID: string) {
    if (projectUID === '') {
      this.selectedProject = Empty;

      this.labelsList = [];

      return;
    }

    this.selectedProject = this.projectsList.find((x) => x.uid === projectUID);

    this.loadCombos();
    this.changeFilter();
  }


  onChangeSelectedTags(tags: any[]) {
    this.filter.tags = tags.map(x => x.name);
    this.changeFilter();
  }


  changeFilter() {

    this.filter = this.filter.clone();

    this.onChangeFilter.emit(this.filter);
  }


  onClickAdd() {
    alert('Esta tarea se encuentra en desarrollo.');
  }


  onSearch() {
    this.filter.keywords = this.keywords;
    this.changeFilter();
  }


  cleanFilter() {
    this.filter.clean();
    this.loadTags();
  }


  private loadProjectList() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de proyectos.';

    this.projectService.getProjectList()
      .toPromise()
      .then((x) => this.projectsList = x)
  }

  private loadResponsiblesList() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.projectService.getResponsiblesList(this.selectedProject)
      .toPromise()
      .then((x) => this.responsiblesList = x)
  }

  private loadCombos() {
    this.loadResponsiblesList();
  }

  private loadTags() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de etiquetas.';

    this.projectService.getTags()
      .toPromise()
      .then((x) => this.labelsList = x)
  }

}
