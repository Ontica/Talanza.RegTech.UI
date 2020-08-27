/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';

import { EventInfo } from '@app/core/data-types';

import { DataObject } from '@app/models/steps';
import { EmptyActivity, ProjectItem } from '@app/models/project-management';


import { StepsDataObjectsService } from '@app/services/steps';

@Component({
  selector: 'emp-steps-activity-data-objects-list',
  templateUrl: './activity-data-objects-list.component.html',
  styleUrls: ["../../../styles/list.scss"]
})
export class ActivityDataObjectsListComponent implements OnChanges {

  @Input() projectItem: ProjectItem = EmptyActivity;

  @Output() listEvent = new EventEmitter<EventInfo>();

  dataObjects: DataObject[] = []

  constructor(private service: StepsDataObjectsService) { }


  ngOnChanges() {
    this.loadDataObjects();
  }


  onSelectDataObject(dataObject: DataObject) {
    const event = {
      type: 'dataObjectSelected',
      payload: {
        dataObject
      }
    }

    this.listEvent.emit(event);
  }


  private loadDataObjects() {
    this.service.getActivityDataObjects(this.projectItem.uid)
    .toPromise()
    .then (x => this.dataObjects = x);
  }

}
