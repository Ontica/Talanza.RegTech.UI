/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { MediaFile, FileToUpload } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-media-file-viewer',
  templateUrl: './media-file-viewer.component.html',
  styleUrls: ['../../../../styles/card.scss']

})
export class MediaFileViewerComponent implements AfterViewInit {

  @Input() mediaFile: MediaFile;

  @Output() mediaFileViewerInit = new EventEmitter<void>();

  @Output() mediaFileViewerSave = new EventEmitter<FileToUpload>();

  @Output() mediaFileViewerClose = new EventEmitter<void>();


  ngAfterViewInit() {
    this.mediaFileViewerInit.emit();
  }


  onClose() {
    this.mediaFileViewerClose.emit();
  }


  onUpload(fileToUpload: FileToUpload) {
    this.mediaFileViewerSave.emit(fileToUpload);
  }

}
