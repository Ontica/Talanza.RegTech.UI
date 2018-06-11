/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreService } from '@app/core/core.service';

import { Activity, ActivityFilter, CloseActivityCommand } from '@app/models/project-management';


enum Errors {

  GET_ACTIVITY_ERR =
  '[GET_ACTIVITY_ERR] Ocurrió un problema al leer la actividad.',

  GET_SEARCH_ACTIVITIES_ERR =
  '[GET_SEARCH_ACTIVITIES_ERR] Ocurrió un problema en la busqueda de actividades.',

  GET_ACTIVITIES_ERR =
  '[GET_ACTIVITIES_ERR] Ocurrió un problema al leer la lista de actividades.',

  PATCH_ACTIVITY =
  '[PATCH_ACTIVITY] Ocurrió un problema al actualizar la actividad.',

  POST_ADD_MANUAL_ACTIVITY_ERR =
  '[POST_ADD_MANUAL_ACTIVITY_ERR] Ocurrió un problema al guardar la actividad manual.',

  POST_CLOSE_ACTIVITY_ERR =
  '[POST_CLOSE_ACTIVITY_ERR] Ocurrió un problema al cerrar la actividad.',

  GET_ACTIVITIES_AS_WORKLIST_ERR =
  '[GET_ACTIVITIES_AS_WORKLIST_ERR] Ocurrió un problema al leer la lista de actividades como lista de trabajo.',


}


@Injectable()
export class ActivityService {

  constructor(private core: CoreService) { }

  searchActivities(projectUID: string, filter: object,
                   orderBy: string, keywords: string): Observable<Activity[]> {

    const path = `v1/project-management/projects/${projectUID}/activities?filter=${filter}
                                                                          &orderBy=${orderBy}
                                                                          &keywords=${keywords}`;

    return this.core.http.get<Activity[]>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndReturn(e, Errors.GET_SEARCH_ACTIVITIES_ERR, null))
               );
  }


  getActivities(projectUID: string): Promise<Activity[]> {
    const path = `v1/project-management/projects/${projectUID}/as-tree`;

    return this.core.http.get<Activity[]>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndReturn(e, Errors.GET_ACTIVITIES_ERR, null))
               )
               .toPromise();

  }

  closeActivity(projectUID: string,
                activityUID: string, closeTask: CloseActivityCommand): Observable<Activity> {
    const path = `v1/project-management/projects/${projectUID}/activities/${activityUID}/close`;

    return this.core.http.post<Activity>(path, closeTask)
               .pipe(
                  catchError(e => this.core.http.showAndThrow(e, Errors.POST_CLOSE_ACTIVITY_ERR))
               );
  }


  getActivitiesAsWorkList(filter?: ActivityFilter): Observable<Activity[]> {
    let filterAsString = '';

    if (filter instanceof ActivityFilter) {
      filterAsString = '?' + filter.toString();
    }

    const path = `v1/project-management/projects/as-work-list${filterAsString}`;

    return this.core.http.get<Activity>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndReturn(e, Errors.GET_ACTIVITIES_AS_WORKLIST_ERR, null))
               );
  }

  // private methods

}
