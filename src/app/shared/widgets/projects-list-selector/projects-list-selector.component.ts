/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '@app/models/project-management';


@Component({
  selector: 'emp-steps-projects-list-selector',
  templateUrl: './projects-list-selector.component.html',
  styleUrls: ['../widgets.scss']
})
export class ProjectsListSelectorComponent {

  selectedOptions: string[] = ['all'];


  @Input() projects: Project[];

  @Input()
  set selected(value: Project[]) {
    if (!value || value.length === 0) {
      this.selectedOptions = ['all'];
    } else {
      this.selectedOptions = value.map(x => x.uid);
    }
  }

  @Output() change = new EventEmitter<Project[]>();


  onSelected(value: string) {
    if (this.selectedOptions.length === 0) {
      value = 'all';
    }
    if (value === 'all') {
      this.selectedOptions = ['all'];

      this.change.emit([]);

      return;
    }

    this.selectedOptions = this.selectedOptions.filter(x => x !== 'all');

    const array = this.selectedOptions.map(x => this.projects.find(y => y.uid === x));

    this.change.emit(array);
  }

}
