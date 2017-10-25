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

import { ClosedTask, Task, TaskRef } from '../data-types/task';
import { Activity, ProjectRef, ResourceRef } from '../data-types/project';

import { ActivityRef } from '../data-types/activity';

@Injectable()
export class ActivityService {

  public constructor(private core: CoreService) { }

  public addManualActivity(projectUID: string, activity: Activity): Observable<any[]> {
    const path = `v1/project-management/projects/${projectUID}/activities`;

    return this.core.http.post<any[]>(path, activity);
  }

  public getActivity(itemId: number): Observable<any> {
    const path = `v1/project-management/activities/${itemId}`;

    return this.core.http.get<any>(path);
  }

  public searchActivities(projectUID: string, filter: object,
    orderBy: string, keywords: string): Observable<Task[]> {

    const path = `v1/project-management/projects/${projectUID}/activities?filter=${filter}
                          &orderBy=${orderBy}&keywords=${keywords}`;

    return this.core.http.get<Task[]>(path);
  }

  public getActivitiesListAsGantt(projectId: string): Promise<Task[]> {
    const path = `v1/project-management/projects/${projectId}/activities/as-gantt`;

    return this.core.http.get<Task[]>(path)
      .toPromise();

  }

  public getActivities(projectId: string): Promise<ActivityRef[]> {
    const path = `v1/project-management/projects/${projectId}/activities`;

    return this.core.http.get<ActivityRef[]>(path)
      .toPromise();

  }

  public updateActivity(projectUID: string, activityUID: string, task: TaskRef):
    Observable<TaskRef> {
    const path = `v1/project-management/projects/${projectUID}/activities/${activityUID}`;


    return this.core.http.put<TaskRef>(path, task);
  }

  public closeActivity(projectUID: string, activityUID: string, closeTask: ClosedTask): Observable<any[]> {
    const path = `v1/project-management/projects/${projectUID}/activities/${activityUID}/close`;

    return this.core.http.post<any[]>(path, closeTask);
  }

  public getTags(): Observable<any[]> {
    const path = `v1/project-management/tags`;

    return this.core.http.get<any[]>(path);
  }

}

