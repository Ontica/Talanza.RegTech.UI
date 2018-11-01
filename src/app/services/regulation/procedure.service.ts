/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { CoreService } from '@app/core/core.service';

import { BaseProcedure, Procedure, ProcedureFilter } from "@app/models/regulation";


@Injectable()
export class ProcedureService {

  public constructor(private core: CoreService) { }

  public getProcedure(uid: string): Promise<Procedure> {
    return this.core.http.get<Procedure>(`v1/procedures/${uid}`)
                         .toPromise();
  }

  public getProceduresList(filter?: ProcedureFilter | string): Promise<BaseProcedure[]> {
    let filterAsString = '';

    if (filter instanceof ProcedureFilter) {
      filterAsString = filter ? '?filter=' + filter.toString() : '';
      if (filterAsString.length != 0) {
        filterAsString += "&";
      } else {
        filterAsString = "?";
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

  public createProcedure(procedure: Procedure): Promise<Procedure> {
    return this.core.http.post<Procedure>('v1/procedures', procedure)
                         .toPromise();
  }

  public updateProcedure(procedure: Procedure): Promise<Procedure> {
    return this.core.http.put<Procedure>(`v1/procedures/${procedure.uid}`, procedure)
                         .toPromise();
  }

}
