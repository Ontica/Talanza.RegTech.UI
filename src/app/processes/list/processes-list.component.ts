/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProjectTemplate } from '@app/models/project-management';


@Component({
  selector: 'emp-steps-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss']
})
export class ProcessesListComponent {

  @Input() processes: ProjectTemplate[] = [];

  @Output() processSelected = new EventEmitter<ProjectTemplate>();

  selectedProcess: ProjectTemplate;


  onSelect(process: ProjectTemplate) {
    this.selectedProcess = process;

    this.processSelected.emit(process);
  }


  isSelected(process: ProjectTemplate) {
    return (this.selectedProcess && process.uid === this.selectedProcess.uid);
  }

}
