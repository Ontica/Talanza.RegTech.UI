/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

import { ProjectService } from '@app/services/project-management';

import { Activity, EmptyActivity } from '@app/models/project-management';
import { MediaFile, FileToUpload, EmptyMediaFile } from '@app/models/knowledge-base';

@Component({
  selector: 'emp-steps-activity-files',
  templateUrl: './activity-files.component.html',
  styleUrls: ['../../../styles/general-styles.scss']
})
export class ActivityFilesComponent implements OnChanges {


  @Input() activity: Activity = EmptyActivity;

  filesList: MediaFile[] = [];

  selectedMediaFile: MediaFile = EmptyMediaFile;

  displayEditor = false;

  constructor(private service: ProjectService) { }


  ngOnChanges() {
    this.selectedMediaFile = EmptyMediaFile;
    this.loadFilesList();
  }


  onClickAttachFile() {
    this.selectedMediaFile = EmptyMediaFile;
    this.showFileEditor();

  }


  onFileSelected(file: MediaFile = EmptyMediaFile) {
    this.selectedMediaFile = file;
    this.showFileEditor();
  }


  hideFileEditor() {
    this.displayEditor = false;
  }

  showFileEditor() {
    this.displayEditor = true;
  }


  uploadFile(fileToUpload: FileToUpload) {
    this.hideFileEditor();

    this.service.uploadFile(this.activity, fileToUpload.file, fileToUpload.metadata)
    .subscribe(() => {
        this.loadFilesList();
      }, error => {
        console.log(error);
      });
  }


  private loadFilesList()  {
    this.service.getFiles(this.activity)
        .toPromise()
        .then (x => this.filesList = x);
  }


}

