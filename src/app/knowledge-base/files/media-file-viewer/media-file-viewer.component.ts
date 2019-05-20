/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MediaFile, FileToUpload } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-media-file-viewer',
  templateUrl: './media-file-viewer.component.html',
  styleUrls: ['../../../../styles/card.scss']

})
export class MediaFileViewerComponent {

  @Input() mediaFile: MediaFile;

  @Output() save = new EventEmitter<FileToUpload>();

  @Output() close = new EventEmitter<void>();


  onClose() {
    this.close.emit();
  }


  onUpload(fileToUpload: FileToUpload) {
    this.save.emit(fileToUpload);
  }

}
