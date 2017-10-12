/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '../../core';

import { ProcessModel } from '../data-types/project';
import { Activity } from '../data-types/project';

export enum ProjectServiceErr {
  GET_ACTIVITIES_ERR =
  '[GET_ACTIVITIES_ERR] No pude leer la lista de actividades del proyecto.',
}

@Injectable()
export class ProcessModelsService {

  public constructor(private core: CoreService) { }

  public getEvents(): Observable<ProcessModel[]> {
    const path = 'v1/projects/process-models/for-events';

    return this.core.http.get<ProcessModel[]>(path);
  }

  public getProcess(): Observable<ProcessModel[]> {
    const path = 'v1/projects/process-models/for-activities';

    return this.core.http.get<ProcessModel[]>(path);
  }

  public addProcessModel(projectUID: string, processModelUID: string,
    activity: Activity): Observable<Activity> {

    const path = `v1/project-management/projects/${projectUID}/create-from-process-model/${processModelUID}`;

    return this.core.http.post<Activity>(path, activity);
  }

}

