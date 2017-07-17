/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { CoreService } from '../../core';

import { Procedure } from '../data-types/procedure';
import { SmallProcedureInterface } from '../data-types/small-procedure.interface';

@Injectable()
export class ProcedureService {

  public constructor(private core: CoreService) { }

  public getProcedure(uid: string): Promise<Procedure> {
    return this.core.http.get<Procedure>('v1/procedures/' + uid)
                         .toPromise();
  }

  public getProceduresList(filter?: string): Promise<SmallProcedureInterface[]> {
    const path = 'v1/procedures' + (filter ? '?filter=' + filter : '');

    return this.core.http.get<SmallProcedureInterface[]>(path)
                         .toPromise();
  }

  public createProcedure(procedure: Procedure): Promise<Procedure> {
    return this.core.http.post<Procedure>('v1/procedures', procedure)
                         .toPromise();
  }

  public updateProcedure(procedure: Procedure): Promise<Procedure> {
    return this.core.http.put<Procedure>('v1/procedures/' + procedure.uid, procedure)
                         .toPromise();
  }

}
