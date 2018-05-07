/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '../../core/core.service';

import { ClosedTask, Task, TaskRef } from '../data-types/task';
import { Activity, ProjectRef, ResourceRef } from '../data-types/project';
import { ActivityFilter } from '../data-types/activity-filter';

import { ActivityRef } from '../data-types/activity';

export enum ActivityServiceErr {
  POST_ADD_MANUAL_ACTIVITY_ERR =
        '[POST_ADD_MANUAL_ACTIVITY_ERR] Ocurrió un problema al guardar la actividad manual.', 
  POST_ADD_MINIMAL_ACTIVITY_ERR =
        '[POST_ADD_MINIMAL_ACTIVITY_ERR] Ocurrió un problema al guardar la actividad.',
  GET_ACTIVITY_ERR =
        '[GET_ACTIVITY_ERR] Ocurrió un problema al leer la actividad.',        
  GET_SEARCH_ACTIVITIES_ERR =
        '[GET_SEARCH_ACTIVITIES_ERR] Ocurrió un problema en la busqueda de actividades.', 
  GET_ACTIVITIES_LIST_AS_GANTT_ERR =
        '[GET_ACTIVITIES_LIST_AS_GANTT_ERR] Ocurrió un problema al leer la lista de actividades como gantt.',
  GET_ACTIVITIES_ERR =
        '[GET_ACTIVITIES_ERR] Ocurrió un problema al leer la lista de actividades.', 
  PUT_UPDATE_ACTIVITY_ERR = 
        '[PUT_UPDATE_ACTIVITY_ERR] Ocurrió un problema al actualizar la actividad.', 
  POST_CLOSE_ACTIVITY_ERR =
        '[POST_CLOSE_ACTIVITY_ERR] Ocurrió un problema al cerrar la actividad.',              
  GET_TAGS_ERR =
        '[GET_TAGS_ERR] Ocurrió un problema al leer la lista de etiquetas.',
  GET_ACTIVITIES_AS_WORKLIST_ERR =
        '[GET_ACTIVITIES_AS_WORKLIST_ERR] Ocurrió un problema al leer la lista de actividades como lista de trabajo.',    
}

@Injectable()
export class ActivityService {

  public constructor(private core: CoreService) { }

  public addManualActivity(projectUID: string, activity: Activity): Observable<any[]> {
    const path = `v1/project-management/projects/${projectUID}/activities`;

    return this.core.http.post<any[]>(path, activity)
                        .catch((e) => 
                            this.core.http.showAndReturn(e, ActivityServiceErr.POST_ADD_MANUAL_ACTIVITY_ERR, null));
  }

  public addActivity(projectUID: string, activity:{name: string, position: number} ): Observable<any> {
                              
    const path = `v1/project-management/projects/${projectUID}/activities`;

    return this.core.http.post<any>(path, activity)
                         .catch((e) => 
                            this.core.http.showAndReturn(e, ActivityServiceErr.POST_ADD_MINIMAL_ACTIVITY_ERR, null));
  }

  public getActivity(itemId: number): Observable<any> {
    const path = `v1/project-management/activities/${itemId}`;

    return this.core.http.get<any>(path)
                        .catch((e) => 
                            this.core.http.showAndReturn(e, ActivityServiceErr.GET_ACTIVITY_ERR, null));
  }

  public searchActivities(projectUID: string, filter: object,
                          orderBy: string, keywords: string): Observable<Task[]> {

    const path = `v1/project-management/projects/${projectUID}/activities?filter=${filter}
                                                                          &orderBy=${orderBy}
                                                                          &keywords=${keywords}`;

    return this.core.http.get<Task[]>(path)
                         .catch((e) => 
                            this.core.http.showAndReturn(e, ActivityServiceErr.GET_SEARCH_ACTIVITIES_ERR, null));
  }

  public getActivitiesListAsGantt(projectUID: string): Promise<Task[]> {
    const path = `v1/project-management/projects/${projectUID}/as-gantt`;

    return this.core.http.get<Task[]>(path)
                        .catch((e) => 
                          this.core.http.showAndReturn(e, ActivityServiceErr.GET_ACTIVITIES_LIST_AS_GANTT_ERR, null))
                        .toPromise();

  }

  public getActivities(projectUID: string): Promise<ActivityRef[]> {
    const path = `v1/project-management/projects/${projectUID}/as-tree`;

    return this.core.http.get<ActivityRef[]>(path)
                          .catch((e) => 
                            this.core.http.showAndReturn(e, ActivityServiceErr.GET_ACTIVITIES_ERR , null))
                          .toPromise();

  }

  public updateActivity(projectUID: string,
                        activityUID: string, task: TaskRef): Observable<ActivityRef> {
                              
    const path = `v1/project-management/projects/${projectUID}/activities/${activityUID}`;


    return this.core.http.put<ActivityRef>(path, task)
                         .catch((e) => 
                            this.core.http.showAndReturn(e, ActivityServiceErr.PUT_UPDATE_ACTIVITY_ERR, null));
  }

  public closeActivity(projectUID: string,
                      activityUID: string, closeTask: ClosedTask): Observable<ActivityRef> {
    const path = `v1/project-management/projects/${projectUID}/activities/${activityUID}/close`;

    return this.core.http.post<ActivityRef>(path, closeTask)
                         .catch((e) => 
                            this.core.http.showAndReturn(e, ActivityServiceErr.POST_CLOSE_ACTIVITY_ERR, null));
  }

  public getTags(): Observable<any[]> {
    const path = `v1/project-management/tags`;

    return this.core.http.get<any[]>(path)
                         .catch((e) => 
                            this.core.http.showAndReturn(e, ActivityServiceErr.GET_TAGS_ERR, null));
  }

  public getActivitiesAsWorkList(filter?: ActivityFilter): Observable<ActivityRef[]> {

    let filterAsString = '';

    if (filter instanceof ActivityFilter) {
      filterAsString = '?' + filter.toString();
    }

    const path = `v1/project-management/projects/as-work-list${filterAsString}`;

    return this.core.http.get<any>(path)
                          .catch((e) => 
                            this.core.http.showAndReturn(e, ActivityServiceErr.GET_ACTIVITIES_AS_WORKLIST_ERR, null));
  }

  public deleteActivity(projectUID: string, activityUID: string): Observable<any> {
          
      const path = `v1/project-management/projects/${projectUID}/activities/${activityUID}`;
  
      return this.core.http.delete<any>(path)
                            .catch((e) => 
                              this.core.http.showAndReturn(e, ActivityServiceErr.GET_ACTIVITIES_AS_WORKLIST_ERR, null));
  }

  public moveActivity(projectUID: string,
      activityUID: string, position: number): Observable<ActivityRef> {
            
      const path = `v1/project-management/projects/${projectUID}/activities/${activityUID}`;
      const body = {
            position: position
      }

      return this.core.http.put<ActivityRef>(path, body)
       .catch((e) => 
          this.core.http.showAndReturn(e, ActivityServiceErr.PUT_UPDATE_ACTIVITY_ERR, null));
 }

 

}
