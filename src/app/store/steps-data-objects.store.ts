/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DataObjectSource, DataObject } from '@app/models/steps';

import { StepsDataObjectsService } from '@app/services/steps';
import { ProjectItem } from '@app/models/project-management';
import { Assertion } from '@app/core';



@Injectable()
export class StepsDataObjectsStore {

  private _dataObjectSources = new BehaviorSubject<DataObjectSource[]>([]);


  constructor(private dataObjectsService: StepsDataObjectsService) {
    this.loadInitialData();
  }


  getDataObjectSources(): Observable<DataObjectSource[]> {
    return this._dataObjectSources.asObservable();
  }


  linkStepWithDataSource(step: ProjectItem, dataSource: DataObjectSource): Promise<DataObject> {
    Assertion.assertValue(step, 'step');
    Assertion.assertValue(dataSource, 'dataSource');

    return this.dataObjectsService.linkStepWithDataSource(step, dataSource)
          .toPromise();
  }


  // private methods


  private loadInitialData() {
    this.loadDataSources();
  }


  private loadDataSources() {
    this.dataObjectsService.getDataSources()
        .subscribe(
            data => {
              this._dataObjectSources.next(data);
            },
            err => console.log('Error reading data sources', err)
        );
  }

}
