/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { CoreService } from '../../core/core.service';

import { Task } from '../data-types/task';
import { ProjectRef, ResourceRef, PersonRef, Contract, Stage } from '../data-types/project';

export enum ProjectServiceErr {
  GET_ACTIVITIES_ERR =
  '[GET_ACTIVITIES_ERR] No pude leer la lista de actividades del proyecto.',
}

@Injectable()
export class ProjectService {

  public constructor(private core: CoreService) { }

  public getProjectList(): Observable<any[]> {
    const path = 'v1/project-management/projects';

    return this.core.http.get<any[]>(path);
  }

  public getResourcesList(projectUID: string): Observable<ResourceRef[]> {
    const path = `v1/project-management/projects/${projectUID}/resources`;

    return this.core.http.get<ResourceRef[]>(path);
  }

  public getRequestersList(projectUID: string): Observable<PersonRef[]> {
    const path = `v1/project-management/projects/${projectUID}/requesters`;

    return this.core.http.get<PersonRef[]>(path);
  }

  public getResponsiblesList(projectUID: string): Observable<PersonRef[]> {
    const path = `v1/project-management/projects/${projectUID}/responsibles`;

    return this.core.http.get<PersonRef[]>(path);
  }

  public getTaskManagers(projectUID: string): Observable<PersonRef[]> {
    const path = `v1/project-management/projects/${projectUID}/task-managers`;

    return this.core.http.get<PersonRef[]>(path);
  }

  public getContracts(): Observable<Contract[]> {

    const CONTRACTS: Contract[] = [ { uid:'576', name:'Ronda 2.4' },
                                    { uid:'458', name:'Ronda 2.5' }];
    
    return of(CONTRACTS);  
  }

  public getStages(): Observable<Stage[]> {
    
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

}

