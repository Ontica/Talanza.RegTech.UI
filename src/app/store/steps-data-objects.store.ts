/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DataSource } from '@app/models/steps';

import { StepsDataObjectsService } from '@app/services/steps';


@Injectable()
export class StepsDataObjectsStore {

  private _dataSources = new BehaviorSubject<DataSource[]>([]);

  constructor(private service: StepsDataObjectsService) {
    this.loadInitialData();
  }


  getDataSources(): Observable<DataSource[]> {
    return this._dataSources.asObservable();
  }


  // private methods


  private loadInitialData() {
    this.loadDataSources();
  }


  private loadDataSources() {
    this.service.getDataSources()
        .subscribe(
            data => {
              this._dataSources.next(data);
            },
            err => console.log('Error reading data sources', err)
        );
  }

}
