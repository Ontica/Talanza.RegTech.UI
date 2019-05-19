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

  @Output() selected = new EventEmitter<File | null>();

  fileToUpload: File | null = null;


  handleFileInput(files: FileList) {
    const file = files.item(0);

    this.fileToUpload = file;

    console.log('original called', file);

    this.selected.emit(file);
  }


  removeFile() {
    this.fileToUpload = null;    console.log('original called', null);
    this.selected.emit(null);
  }


  onDropFile(event: DragEvent): void {
    console.log('onDrop', event);
    event.stopPropagation();
  }

}
