/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';

import { EventInfo } from '@app/core/data-types';

import { DataObject } from '@app/models/data-objects';

import { EmptyActivity, ProjectItem } from '@app/models/project-management';

import { DataObjectsService } from '@app/data-services/data-objects';


@Component({
  selector: 'emp-steps-activity-data-objects-list',
  templateUrl: './activity-data-objects-list.component.html'
})
export class ActivityDataObjectsListComponent implements OnChanges {

  @Input() projectItem: ProjectItem = EmptyActivity;

  @Output() listEvent = new EventEmitter<EventInfo>();

  dataObjects: DataObject[] = [];

  fileToUpload: File = null;

  showTemplateViewer = false;
  templateMode = true;

  selectedDataObject: DataObject;

  constructor(private service: DataObjectsService) { }

  ngOnChanges() {
    this.loadDataObjects();
  }

  onToggleCompleted(dataObject: DataObject) {
    this.service.toggleSubjectDataRequestStatus(dataObject)
    .toPromise()
    .then (x => this.dataObjects = x);
  }

  onSelectDataObject(dataObject: DataObject) {
    const event = {
      type: 'dataObjectSelected',
      payload: {
        dataObject
      }
    };

    this.listEvent.emit(event);
  }

  selectTemplate(dataObject: DataObject, templateMode: boolean) {
    this.selectedDataObject = dataObject;
    this.templateMode = templateMode;
    this.showTemplateViewer = true;
  }

  hideTemplateViewer() {
    this.showTemplateViewer = false;
  }

  removeUploadedFile(dataObject: DataObject) {
    if (!confirm(`Do you want to remove the uploded file for requisite ${dataObject.name}?`)) {
      return;
    }
    this.service.removeDataObject(dataObject)
        .then(() => this.loadDataObjects());
  }


  uploadFile(dataObject: DataObject, files: FileList) {
    if (!files || files.length === 0) {
      return;
    }

    const file = files.item(0);

    this.fileToUpload = file;
    console.log('uploadFile', dataObject, file);

    this.fileToUpload = file;

    this.service.uploadFile(dataObject, this.fileToUpload)
        .then(() => this.loadDataObjects());

  }

  private loadDataObjects() {
    this.service.getSubjectDataRequests(this.projectItem)
    .toPromise()
    .then (x => this.dataObjects = x);
  }

}
