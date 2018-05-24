/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { CoreService } from '../../core/core.service';

import { Contact } from '../../core/data-types';

import {
  Contract,
  Project,
  Resource,
  Stage
} from '../data-types';


enum ProjectServiceErr {

  GET_ACTIVITIES_ERR =
  '[GET_ACTIVITIES_ERR] No pude leer la lista de actividades del proyecto.',

}


@Injectable()
export class ProjectService {

  constructor(private core: CoreService) { }


  getContracts(): Observable<Contract[]> {

    const CONTRACTS: Contract[] = [ { uid:'576', name:'Ronda 2.4' } ];

    return of(CONTRACTS);
  }


  getProjectList(): Observable<Project[]> {
    const path = 'v1/project-management/projects';

    return this.core.http.get<Project[]>(path);
  }


  getRequestersList(projectUID: string): Observable<Contact[]> {
    const path = `v1/project-management/projects/${projectUID}/requesters`;

    return this.core.http.get<Contact[]>(path);
  }


  getResourcesList(projectUID: string): Observable<Resource[]> {
    const path = `v1/project-management/projects/${projectUID}/resources`;

    return this.core.http.get<Resource[]>(path);
  }


  getResponsiblesList(projectUID: string): Observable<Contact[]> {
    const path = `v1/project-management/projects/${projectUID}/responsibles`;

    return this.core.http.get<Contact[]>(path);
  }


  getStages(): Observable<Stage[]> {

    const STAGES: Stage[] = [
      { uid:'Transición', name:'Transición' },
      { uid:'Evaluación', name:'Evaluación' },
      { uid:'Exploración', name:'Exploración' },
      { uid:'Desarrollo', name:'Desarrollo' },
      { uid:'Producción', name:'Producción' },
      { uid:'Abandono', name:'Abandono' },
      { uid:'Transversales', name:'Transversales' }
    ];

    return of(STAGES);
  }


  getTags(): Observable<any[]> {
    const path = `v1/project-management/tags`;

    return this.core.http.get<any[]>(path);
  }


  getTaskManagers(projectUID: string): Observable<Contact[]> {
    const path = `v1/project-management/projects/${projectUID}/task-managers`;

    return this.core.http.get<Contact[]>(path);
  }

}
