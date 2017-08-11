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
import { Activity, ProjectRef, ResourceRef, PersonRef } from '../data-types/project';

@Injectable()
export class ActivityService {

  public constructor(private core: CoreService) { }

  public getResourcesList(): Observable<ResourceRef[]> {
    const path = 'v1/project-management/resources';

    return this.core.http.get<ResourceRef[]>(path);
  }

  public getRequestersList(projectUID:string): Observable<PersonRef[]> {
    const path ='v1/project-management/projects/'+ projectUID +'/requesters';

    return this.core.http.get<PersonRef[]>(path);
  }

   public getResponsiblesList(projectUID:string): Observable<PersonRef[]> {
    const path ='v1/project-management/projects/'+ projectUID +'/responsibles';

    return this.core.http.get<PersonRef[]>(path);
  }

  public getTaskManagers(projectUID: string): Observable<PersonRef[]> {
    const path = 'v1/project-management/projects/'+ projectUID + '/task-managers';

    return this.core.http.get<PersonRef[]>(path);
  }

  
  public createActivity(projectUID: string, activity: Activity): Observable<Activity> {
    const path = `v1/project-management/projects/${projectUID}/activities`;

    return this.core.http
                    .post<Activity>(path, activity);
  }
}

