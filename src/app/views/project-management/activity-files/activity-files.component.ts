/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EventInfo } from '@app/core/data-types';

import { EmptyActivity, ProjectItem } from '@app/models/project-management';

import { MediaFile, FileToUpload, EmptyMediaFile } from '@app/models/knowledge-base';
import { DataObject } from '@app/models/data-objects';

import { FileStore } from '@app/store/file.store';

import { ProjectFilesService } from '@app/data-services/project-management';
import { PresentationLayer } from '@app/core/presentation';
import { MainUIStateSelector } from '@app/core/presentation/presentation-types';


@Component({
  selector: 'emp-steps-activity-files',
  templateUrl: './activity-files.component.html',
  styleUrls: ['../../../../styles/general-styles.scss']
})
export class ActivityFilesComponent implements OnChanges {

  @Input() projectItem: ProjectItem = EmptyActivity;

  filesList: MediaFile[] = [];

  selectedDataObject: DataObject;
  selectedMediaFile: MediaFile = EmptyMediaFile;

  displayDataObjectEditor = false;
  displayFileEditor = false;

  reportingTools: Observable<boolean> = of(false);

  uploading = false;

  constructor(uiLayer: PresentationLayer,
              private store: FileStore,
              private service: ProjectFilesService) {
    this.reportingTools = uiLayer.select<boolean>(MainUIStateSelector.REPORTING_TOOLS);
  }

  ngOnChanges() {
    this.selectedMediaFile = EmptyMediaFile;
    this.loadFilesList();
  }

  onClickAttachFile() {
    this.hideEditors();
    this.selectedMediaFile = EmptyMediaFile;
    this.displayFileEditor = true;
  }

  onDataObjectsListEvent(event: EventInfo) {
    this.hideEditors();
    this.selectedDataObject = event.payload.dataObject;
    this.displayDataObjectEditor = true;
  }

  onFileSelect(file: MediaFile = EmptyMediaFile) {
    this.hideEditors();
    this.selectedMediaFile = file;
    this.displayFileEditor = true;
  }

  hideEditors() {
    this.displayDataObjectEditor = false;
    this.displayFileEditor = false;
  }

  deleteFile() {
    this.service.deleteProjectItemFile(this.projectItem, this.selectedMediaFile)
      .subscribe(() => {
        this.displayFileEditor = false;
        this.store.refreshAllFiles();
        this.loadFilesList();
      });
  }

  uploadFile(fileToUpload: FileToUpload) {
    if (this.uploading) {
      return;
    }

    this.uploading = true;
    this.service.uploadProjectItemFile(this.projectItem,
                                       fileToUpload.file,
                                       fileToUpload.metadata)
    .subscribe(() => {
        this.store.refreshAllFiles();
        this.uploading = false;
        this.loadFilesList();
        this.hideEditors();
      }, error => {
        this.uploading = false;
        alert(`There was a problem uploading the file ${fileToUpload.file.name}` );
        console.log(error);
      });
  }

  private loadFilesList()  {
    this.service.getProjectItemFiles(this.projectItem)
        .toPromise()
        .then (x => this.filesList = x);
  }

}
