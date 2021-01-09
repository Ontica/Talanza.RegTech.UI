/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { StepsDesignService } from '@app/data-services/steps';

import { Process } from '@app/models/steps';


@Injectable()
export class StepsStore {

  private _processList = new BehaviorSubject([]);


  constructor(private stepsDesignService: StepsDesignService) {
    this.loadInitialData();
  }


  processList(): Observable<Process[]> {
    return this._processList.asObservable();
  }


  // private methods


  private loadInitialData() {
    this.loadProcessList();
  }


  private loadProcessList() {
    this.stepsDesignService.processList()
        .subscribe(
            data => {
              this._processList.next(data);
            },
            err => console.log('Error reading process list', err)
        );
  }

}
