/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MediaFile } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['../../../../../styles/list.scss']
})
export class FileListComponent {

  @Input() files: MediaFile[] = [];

  @Output() fileSelect = new EventEmitter<MediaFile>();

  selectedFile: MediaFile;


  isSelected(file: MediaFile) {
    return (this.selectedFile && file.uid === this.selectedFile.uid);
  }

  onSelect(file: MediaFile) {
    this.selectedFile = file;
    this.fileSelect.emit(file);
  }

}
