/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */
import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'emp-ng-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.scss']
})
export class FileControlComponent {

  @Output() fileControlChange = new EventEmitter<File | null>();

  fileToUpload: File | null = null;


  handleFileInput(files: FileList) {
    if (!files || files.length === 0) {
      return;
    }

    const file = files.item(0);

    this.fileToUpload = file;

    this.fileControlChange.emit(file);
  }


  removeFile() {
    this.fileToUpload = null;
    this.fileControlChange.emit(null);
  }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    event.stopPropagation();
  }


  onDropFile(event: DragEvent): void {
    event.preventDefault();

    this.handleFileInput(event.dataTransfer.files);
    event.stopPropagation();
  }

}
