/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Exception } from '@app/core';
import { EventInfo } from '@app/core/data-types';

import { ProjectItem } from '@app/models/project-management';

import { DataObject, DataSource } from '@app/models/data-objects';

import { DataObjectsService } from '@app/services/data-objects';


@Component({
  selector: 'emp-steps-step-data-configuration',
  templateUrl: './step-data-configuration.component.html',
  styleUrls: ["../../../styles/general-styles.scss"]
})
export class StepDataConfigurationComponent implements OnChanges {

  @Input() step: ProjectItem;

  dataObjects: Observable<DataObject[]> = of([]);

  displayEditor =  false;

  selectedDataObject: DataObject;

  constructor(private service: DataObjectsService) {};


  ngOnChanges() {
    this.loadStepDataObjects();
  }


  hideEditor() {
    this.displayEditor = false;
  }


  linkStepToDataSource(dataSource: DataSource) {
    this.selectedDataObject = null;
    this.displayEditor = false;

    this.service.linkEntityWithDataSource(this.step, dataSource)
      .then(() => this.loadStepDataObjects());
  }


  onDataObjectsListEvent(event: EventInfo) {
    switch (event.type) {
      case 'selectDataObject':
        this.showStepDataObjectDesigner(event.payload.dataObject);
        return;

      case 'deleteDataObject':
        this.removeDataObjectLink(event.payload.dataObject);
        return;

      default:
        throw new Exception(`Unrecognized event type ${event.type}`);
    }
  }


  showDataSourceSelector() {
    this.selectedDataObject = null;
    this.displayEditor = true;
  }


  // private methods

  private loadStepDataObjects() {
    this.dataObjects = this.service.getEntityDataObjects(this.step);
  }


  private removeDataObjectLink(dataObject: DataObject) {
    if (!confirm(`¿Do you want to remove the format or document ${dataObject.name}?`)) {
      return;
    }
    this.service.removeDataObject(dataObject)
                .then(() => this.loadStepDataObjects());
  }


  private showStepDataObjectDesigner(dataObject: DataObject) {
    this.selectedDataObject = dataObject;
    this.displayEditor = true;
  }

}
