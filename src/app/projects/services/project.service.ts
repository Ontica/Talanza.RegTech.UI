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

  public getTasksList(projectId: string): Promise<Task[]> {
    const path = `v1/project-management/projects/${projectId}/activities`;

    return this.core.http.get<Task[]>(path).toPromise()

    //  .catch((e) => this.core.http.showAndThrow(e, ProjectServiceErr.GET_ACTIVITIES_ERR));

  }

  get(): Promise<Task[]> {
    let tasks = [
      //{ id: 1, text: "Task #1", start_date: "2017-02-15 00:00", duration: 3, progress: 0.6 },
  
      //{ id: 2, text: "Task #2", start_date: "2017-02-18 00:00", duration: 3, progress: 0.4 }
    { id:1,  text:"Actividad padre fija", start_date:"2017-08-14 00:00",duration: 31, 
       progress:0, type:"ObjectType.ProjectItem.Activity", parent: null}
    ]
    return Promise.resolve(tasks);
  }

}

