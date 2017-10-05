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

import { Task } from '../../projects/data-types/task';
import { TaskRef } from '../data-types/task';

export enum ProjectServiceErr {
  GET_ACTIVITIES_ERR =
  '[GET_ACTIVITIES_ERR] No pude leer la lista de actividades del proyecto.',
}

@Injectable()
export class WorkListsService {

  public constructor(private core: CoreService) { }
  
  public getTasksList(projectId: string): Promise<Task[]> {
    const path = `v1/project-management/projects/${projectId}/activities`;
                 
    return this.core.http.get<Task[]>(path)
                         .toPromise();

  }

  public updateTasks(projectUID:string, activityUID: string, task: TaskRef): 
  Observable<TaskRef> {
  const path = `v1/project-management/projects/${projectUID}/activities/${activityUID}`;


  return this.core.http.put<TaskRef>(path,task);

}

}

