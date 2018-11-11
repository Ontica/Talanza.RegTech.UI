/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreService } from '@app/core/core.service';

import { BaseProcedure, Procedure, ProcedureFilter } from '@app/models/regulation';


@Injectable()
export class ProcedureService {

  constructor(private core: CoreService) { }


  getBaseProcedures(): Observable<BaseProcedure[]> {
    const path = `v1/procedures`;

    return this.core.http.get<BaseProcedure[]>(path);
  }


  getProcedure(uid: string | number): Observable<Procedure> {
    const path = `v1/procedures/${uid}`;

    return this.core.http.get<Procedure>(path);
  }


  getProceduresList(filter?: ProcedureFilter | string): Promise<BaseProcedure[]> {
    let filterAsString = '';

    if (filter instanceof ProcedureFilter) {
      filterAsString = filter ? '?filter=' + filter.toString() : '';
      if (filterAsString.length !== 0) {
        filterAsString += '&';
      } else {
        filterAsString = '?';
      }
      if (filter instanceof ProcedureFilter) {
        filterAsString += 'keywords=' + filter.keywords;
      }

    } else {
      filterAsString = filter ? '?filter=' + filter : '';

    }

    const path = `v1/procedures${filterAsString}`;

    return this.core.http.get<BaseProcedure[]>(path)
                         .toPromise();
  }


  createProcedure(procedure: Procedure): Promise<Procedure> {
    return this.core.http.post<Procedure>('v1/procedures', procedure)
                         .toPromise();
  }


  updateProcedure(procedure: Procedure): Promise<Procedure> {
    return this.core.http.put<Procedure>(`v1/procedures/${procedure.uid}`, procedure)
                         .toPromise();
  }

}
