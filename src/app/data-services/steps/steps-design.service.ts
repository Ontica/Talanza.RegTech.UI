/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@app/core';

import { Process, Step, StepsListFilter } from '@app/models/steps';


@Injectable()
export class StepsDesignService {

  constructor(private http: HttpService) { }

  getStep(stepUID: string): Observable<Step> {
    const path = `v3/steps/processes/${stepUID}`;

    return this.http.get<Step>(path);
  }


  stepsList(filter: StepsListFilter): Observable<Step[]> {
    const filterAsPathString = this.convertStepsFilterToPath(filter);

    const path = `v3/steps/processes/${filterAsPathString}`

    return this.http.get<Step[]>(path);
  }


  // private methods

  private convertStepsFilterToPath(filter: StepsListFilter) {
    let temp = `?keywords=${filter.keywords}&pageSize=200`;

    temp += `&stepsType=${filter.type}`;

    return temp;
  }

}
