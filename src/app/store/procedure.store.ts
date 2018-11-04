/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from 'immutable';

import { ProcedureService } from '@app/services/regulation';

import { Procedure } from "@app/models/regulation";


@Injectable()
export class ProcedureStore {

  private _procedures: BehaviorSubject<List<Procedure>> = new BehaviorSubject(List([]));

  constructor(private procedureService: ProcedureService) {
    this.loadInitialData();
  }


  procedures(): Observable<List<Procedure>> {
    return this._procedures.asObservable();
  }


  getProcedure(procedureUID: string | number): Procedure {
    return this._procedures.value.find(
      x => x.uid === procedureUID || x.id == procedureUID
    );
  }


  // private methods

  private loadInitialData() {
    this.procedureService.getProcedures()
      .subscribe(
        data =>
          this._procedures.next(List(data))
        ,
        err => console.log('Error reading procedures data', err)
      );
  }

}
