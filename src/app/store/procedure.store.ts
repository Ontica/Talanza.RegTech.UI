/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcedureService } from '@app/services/regulation';

import { BaseProcedure, Procedure } from '@app/models/regulation';


@Injectable()
export class ProcedureStore {

  private _baseProcedures: BehaviorSubject<BaseProcedure[]> = new BehaviorSubject([]);
  private _procedures: Array<Procedure> = [];

  constructor(private procedureService: ProcedureService) {
    this.loadInitialData();
  }


  baseProcedures(): Observable<BaseProcedure[]> {
    return this._baseProcedures.asObservable();
  }


  getProcedure(procedureUID: string | number): Observable<Procedure> {
    const procedure = this._procedures.find(
      x => x.uid === procedureUID || x.id === procedureUID
    );
    if (procedure) {
      return of(procedure);
    }

    return this.procedureService.getProcedure(procedureUID)
      .pipe(
        map(data => {
          this._procedures.push(data);

          return data;
        })
      );
  }


  // private methods

  private loadInitialData() {
    this.procedureService.getBaseProcedures()
      .subscribe(
        data =>
          this._baseProcedures.next(data)
        ,
        err => console.log('Error reading base procedures data', err)
      );
  }

}
