/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProjectItemFile } from '@app/models/project-management';

@Component({
  selector: 'emp-steps-files-grid',
  templateUrl: './files-grid.component.html',
  styleUrls: ['../../../styles/list.scss']
})
export class FilesGridComponent {

  @Input() files: ProjectItemFile[] = [];

  @Output() select = new EventEmitter<ProjectItemFile>();


  selectedFile: ProjectItemFile;


  isSelected(file: ProjectItemFile) {
    return (this.selectedFile && file.uid === this.selectedFile.uid);
  }


  onSelect(file: ProjectItemFile) {
    this.selectedFile = file;
    this.select.emit(file);
  }

}

