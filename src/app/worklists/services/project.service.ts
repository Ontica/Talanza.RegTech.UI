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

import { Task } from '../data-types/task';
import {  ProjectRef } from '../data-types/project';

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

  public getActivitiesListAsGantt(projectId: string): Promise<Task[]> {
    const path = `v1/project-management/projects/${projectId}/activities/as-gantt`;    

    return this.core.http.get<Task[]>(path)
                         .toPromise();

  }

}

