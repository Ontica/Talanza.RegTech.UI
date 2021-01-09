/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@app/core';

import { BaseProcedure, Entity, Procedure, ProcedureFilter } from '@app/models/regulation';


@Injectable()
export class ProcedureService {

  constructor(private http: HttpService) { }

  getBaseProcedures(): Observable<BaseProcedure[]> {
    const path = `v1/procedures`;

    return this.http.get<BaseProcedure[]>(path);
  }


  getEntities(): Observable<Entity[]> {
    const path = 'v1/modeling/entities';

    return this.http.get<Entity[]>(path);
  }


  getProcedure(uid: string | number): Observable<Procedure> {
    const path = `v1/procedures/${uid}`;

    return this.http.get<Procedure>(path);
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

    return this.http.get<BaseProcedure[]>(path)
      .toPromise();
  }


  getThemes(): Observable<string[]> {
    const path = 'v1/catalogues/procedure-themes';

    return this.http.get<string[]>(path);
  }


  createProcedure(procedure: Procedure): Promise<Procedure> {
    return this.http.post<Procedure>('v1/procedures', procedure)
      .toPromise();
  }


  updateProcedure(procedure: Procedure): Promise<Procedure> {
    return this.http.put<Procedure>(`v1/procedures/${procedure.uid}`, procedure)
      .toPromise();
  }

}
