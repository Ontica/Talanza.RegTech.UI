/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@app/core';

import { Process } from '@app/models/steps';


@Injectable()
export class StepsDesignService {

  constructor(private http: HttpService) { }


  processList(): Observable<Process[]> {
    const path = `v3/steps/processes/?keywords=cnh&pageSize=50`;

    return this.http.get<Process[]>(path);
  }

}
