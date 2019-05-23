/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Project, EmptyProject } from '@app/models/project-management';


@Component({
  selector: 'emp-steps-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['../widgets.scss']
})
export class ProjectSelectorComponent {

  @Input() projects: Project[];

  @Input() selected: Project = EmptyProject;

  @Output() change = new EventEmitter<Project>();


  onSelectProject(projectUID: string) {
    const project = this.projects.find(x => x.uid === projectUID);

    if (project) {
      this.change.emit(project);
    }
  }

}
