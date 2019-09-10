/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

import { ProjectFilesService } from '@app/services/project-management';

import { EmptyActivity, ProjectItem } from '@app/models/project-management';
import { MediaFile, FileToUpload, EmptyMediaFile } from '@app/models/knowledge-base';
import { FileStore } from '@app/store/file.store';


@Component({
  selector: 'emp-steps-activity-files',
  templateUrl: './activity-files.component.html',
  styleUrls: ['../../../styles/general-styles.scss']
})
export class ActivityFilesComponent implements OnChanges {


  @Input() projectItem: ProjectItem = EmptyActivity;

  filesList: MediaFile[] = [];

  selectedMediaFile: MediaFile = EmptyMediaFile;

  displayEditor = false;

  constructor(private store: FileStore, private service: ProjectFilesService) { }


  ngOnChanges() {
    this.selectedMediaFile = EmptyMediaFile;
    this.loadFilesList();
  }


  onClickAttachFile() {
    this.selectedMediaFile = EmptyMediaFile;
    this.showFileEditor();

  }


  onFileSelect(file: MediaFile = EmptyMediaFile) {
    this.selectedMediaFile = file;
    this.showFileEditor();
  }


  hideFileEditor() {
    this.displayEditor = false;
  }

  showFileEditor() {
    this.displayEditor = true;
  }


  deleteFile() {
    this.service.deleteProjectItemFile(this.projectItem, this.selectedMediaFile)
      .subscribe(() => {
        this.displayEditor = false;
        this.store.refreshAllFiles();
        this.loadFilesList();
      });
  }

  uploadFile(fileToUpload: FileToUpload) {
    this.hideFileEditor();

    this.service.uploadProjectItemFile(this.projectItem,
                                       fileToUpload.file,
                                       fileToUpload.metadata)
    .subscribe(() => {
        this.store.refreshAllFiles();
        this.loadFilesList();

      }, error => {
        console.log(error);
      });
  }


  private loadFilesList()  {
    this.service.getProjectItemFiles(this.projectItem)
        .toPromise()
        .then (x => this.filesList = x);
  }


}

