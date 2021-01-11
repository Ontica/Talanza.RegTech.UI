/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcedureService } from '@app/data-services/regulation';

import { BaseProcedure, Entity, Procedure } from '@app/models/regulation';


@Injectable()
export class ProcedureStore {

  private _baseProcedures = new BehaviorSubject<BaseProcedure[]>([]);
  private _fullRetrivedProcedures: Array<Procedure> = [];
  private _entities = new BehaviorSubject<Entity[]>([]);
  private _themes = new BehaviorSubject<string[]>([]);


  constructor(private procedureService: ProcedureService) {
    this.loadInitialData();
  }


  get allEntities(): Observable<string[]> {
    return this._entities.asObservable()
              .pipe(map(x => x.map(item => item.shortName)));
  }

  entities(): Observable<Entity[]> {
    return this._entities.asObservable();
  }


  procedures(): Observable<BaseProcedure[]> {
    return this._baseProcedures.asObservable();
  }


  themes(): Observable<string[]> {
    return this._themes.asObservable();
  }


  getProcedure(procedureUID: string | number): Observable<Procedure> {
    const procedure = this._fullRetrivedProcedures.find(
      x => x.uid === procedureUID || x.id === procedureUID
    );
    if (procedure) {
      return of(procedure);
    }

    return this.procedureService.getProcedure(procedureUID)
      .pipe(
        map(data => {
          this._fullRetrivedProcedures.push(data);

          return data;
        })
      );
  }


  getProceduresFilteredByEntityId(filter: Observable<number>): Observable<BaseProcedure[]> {
    return combineLatest(
      this.entities(),
      this.procedures(),
      filter, (entitiesArray, proceduresArray, filterValue) => {
        const entity = entitiesArray.find(x => x.id === filterValue);
        if (entity) {
          return proceduresArray.filter(x => x.entityName === entity.shortName);
        } else {
        return proceduresArray;
        }
      }
    );
  }

  // private methods

  private loadInitialData() {
    this.loadBaseProcedures();
    this.loadEntities();
    this.loadThemes();
  }


  loadThemes(): any {
    this.procedureService.getThemes()
    .subscribe(
      data => this._themes.next(data)
      ,
      err => console.log('Error reading topics', err)
    );
  }


  loadEntities(): any {
    this.procedureService.getEntities()
      .subscribe(
        data => this._entities.next(data)
        ,
        err => console.log('Error reading entities data', err)
      );
  }


  loadBaseProcedures(): any {
    this.procedureService.getBaseProcedures()
      .subscribe(
        data =>
          this._baseProcedures.next(data)
        ,
        err => console.log('Error reading base procedures data', err)
      );
  }

}
