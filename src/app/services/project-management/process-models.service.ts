/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '@app/core/core.service';

import { Activity, ProcessModel } from '@app/models/project-management';


enum ProjectServiceErr {

  GET_ACTIVITIES_ERR =
  '[GET_ACTIVITIES_ERR] No pude leer la lista de actividades del proyecto.',

}


@Injectable()
export class ProcessModelsService {

  constructor(private core: CoreService) { }


  addProcessModel(projectUID: string,
                  processModelUID: string,
                  activity: Activity): Observable<Activity> {

  const path = `v1/project-management/projects/${projectUID}/create-from-process-model/${processModelUID}`;

  return this.core.http.post<Activity>(path, activity);
}


  getEvents(): Observable<ProcessModel[]> {
    const path = 'v1/projects/process-models/for-events';

    return this.core.http.get<ProcessModel[]>(path);
  }


  getProcess(): Observable<ProcessModel[]> {
    const path = 'v1/projects/process-models/for-activities';

    return this.core.http.get<ProcessModel[]>(path);
  }

}
