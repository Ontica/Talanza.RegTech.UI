/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '../../core/core.service';

import { CloseActivityCommand, UpdateActivityCommand } from '../data-types/commands';
import { ActivityFilter } from '../data-types/activity-filter';
import { Activity } from '../data-types/activity';
import { Assertion } from 'empiria';

enum Errors {

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

  POST_ADD_MANUAL_ACTIVITY_ERR =
  '[POST_ADD_MANUAL_ACTIVITY_ERR] Ocurrió un problema al guardar la actividad manual.',

  POST_CLOSE_ACTIVITY_ERR =
  '[POST_CLOSE_ACTIVITY_ERR] Ocurrió un problema al cerrar la actividad.',

  GET_ACTIVITIES_AS_WORKLIST_ERR =
  '[GET_ACTIVITIES_AS_WORKLIST_ERR] Ocurrió un problema al leer la lista de actividades como lista de trabajo.',
}

@Injectable()
export class ActivityService {

  public constructor(private core: CoreService) { }

  public searchActivities(projectUID: string, filter: object,
                          orderBy: string, keywords: string): Observable<Activity[]> {

    const path = `v1/project-management/projects/${projectUID}/activities?filter=${filter}
                                                                          &orderBy=${orderBy}
                                                                          &keywords=${keywords}`;

    return this.core.http.get<Activity[]>(path)
                         .catch((e) => this.core.http.showAndReturn(e, Errors.GET_SEARCH_ACTIVITIES_ERR, null));
  }


  public getActivities(projectUID: string): Promise<Activity[]> {
    const path = `v1/project-management/projects/${projectUID}/as-tree`;

    return this.core.http.get<Activity[]>(path)
      .catch((e) =>
        this.core.http.showAndReturn(e, Errors.GET_ACTIVITIES_ERR, null))
      .toPromise();

  }



  public updateActivity(activity: Activity): Observable<Activity> {
    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}`;

    const updateCommand = this.buildUpdateCommand(activity);

    return this.core.http.put<Activity>(path, updateCommand)
                         .catch(e => this.core.http.showAndReturn(e, Errors.PUT_UPDATE_ACTIVITY_ERR, null));
  }


  public closeActivity(projectUID: string,
                       activityUID: string, closeTask: CloseActivityCommand): Observable<Activity> {
    const path = `v1/project-management/projects/${projectUID}/activities/${activityUID}/close`;

    return this.core.http.post<Activity>(path, closeTask)
                         .catch(e => this.core.http.showAndThrow(e, Errors.POST_CLOSE_ACTIVITY_ERR));
  }


  getActivitiesAsWorkList(filter?: ActivityFilter): Observable<Activity[]> {
    let filterAsString = '';

    if (filter instanceof ActivityFilter) {
      filterAsString = '?' + filter.toString();
    }

    const path = `v1/project-management/projects/as-work-list${filterAsString}`;

    return this.core.http.get<Activity>(path)
      .catch((e) =>
        this.core.http.showAndReturn(e, Errors.GET_ACTIVITIES_AS_WORKLIST_ERR, null));
  }

  // private methods

  private buildUpdateCommand(activity: Activity): UpdateActivityCommand {
    const command = new UpdateActivityCommand();

    command.name = activity.name;
    command.notes = activity.notes;
    command.responsibleUID = activity.responsible.uid;
    command.targetDate = activity.targetDate;
    command.startDate = activity.startDate;
    command.ragStatus = activity.ragStatus;
    command.tags = activity.tags;

    return command;
  }

}
