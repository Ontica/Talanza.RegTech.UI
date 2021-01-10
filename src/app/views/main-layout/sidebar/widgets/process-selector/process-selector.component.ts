/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProjectTemplate } from '@app/models/project-management';


@Component({
  selector: 'emp-steps-process-selector',
  templateUrl: './process-selector.component.html'
})
export class ProcessSelectorComponent {

  @Input() processes: ProjectTemplate[] = [];

  @Input() selected: ProjectTemplate;

  @Output() selectedProcessChange = new EventEmitter<ProjectTemplate>();

  onSelect(process: ProjectTemplate) {
    this.selectedProcessChange.emit(process);
  }

  isSelected(process: ProjectTemplate) {
    return (this.selected && process.uid === this.selected.uid);
  }

}
