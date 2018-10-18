/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Assertion } from '@app/core';

import { CoreService } from '@app/core/core.service';

import { Contact } from '@app/core/data-types';
import { ColoredTag } from '@app/core/ui-services';

import { Activity, Contract, Project, Resource, Stage } from '@app/models/project-management';
import { Procedure } from '@app/procedures/data-types/procedure';
import { Entity } from '@app/procedures/data-types/entity';


enum Errors {

  DELETE_ACTIVITY =
  '[DELETE_ACTIVITY] Ocurrió un problema al intentar eliminar la actividad.',

  GET_ACTIVITIES_ERR =
  '[GET_ACTIVITIES_ERR] No pude leer la lista de actividades del proyecto.',

  GET_ACTIVITIES_TREE =
  '[GET_ACTIVITIES_TREE] Ocurrió un problema al leer el árbol de actividades del proyecto.',

  INSERT_ACTIVITY =
  '[INSERT_ACTIVITY] Ocurrió un problema al agregar la actividad en la lista.',

  MOVE_ACTIVITY =
  '[MOVE_ACTIVITY] Ocurrió un problema al intentar mover la actividad.',

  UPDATE_ACTIVITY =
  '[UPDATE_ACTIVITY] Ocurrió un problema al actualizar la actividad.',

  CREATE_FROM_EVENT =
  '[CREATE_FROM_EVENT] Ocurrió un problema al agregar la obligacion al proyecto.',
}


@Injectable()
export class ProjectService {

  constructor(private core: CoreService) { }


  getContracts(): Observable<Contract[]> {

    const CONTRACTS: Contract[] = [ { uid:'576', name:'Ronda 2.4' } ];

    return of(CONTRACTS);
  }


  getProjectList(): Observable<Project[]> {
    const path = 'v1/project-management/projects';

    return this.core.http.get<Project[]>(path);
  }


  getTemplatesList(): Observable<Project[]> {
    const path = 'v1/project-management/templates';

    return this.core.http.get<Project[]>(path);
  }

  getEventsList(): Observable<Activity[]> {
    const path = 'v1/project-management/templates/events';

    return this.core.http.get<Activity[]>(path);
  }

  getRequestersList(projectUID: string): Observable<Contact[]> {
    const path = `v1/project-management/projects/${projectUID}/requesters`;

    return this.core.http.get<Contact[]>(path);
  }


  getResourcesList(projectUID: string): Observable<Resource[]> {
    const path = `v1/project-management/projects/${projectUID}/resources`;

    return this.core.http.get<Resource[]>(path);
  }


  getResponsiblesList(project: Project): Observable<Contact[]> {
    Assertion.assertValue(project, "project");

    const path = `v1/project-management/projects/${project.uid}/responsibles`;

    return this.core.http.get<Contact[]>(path);
  }


  getProceduresList(): Observable<Procedure[]> {
    const path = `v1/procedures`;

    return this.core.http.get<Procedure[]>(path);
  }


  getEntitiesList(): Observable<Entity[]> {
    const path = `v1/modeling/entities`;

    return this.core.http.get<Entity[]>(path);
  }


  getStages(): Observable<Stage[]> {

    const STAGES: Stage[] = [
      { uid:'Transición', name:'Transición' },
      { uid:'Evaluación', name:'Evaluación' },
      { uid:'Exploración', name:'Exploración' },
      { uid:'Desarrollo', name:'Desarrollo' },
      { uid:'Producción', name:'Producción' },
      { uid:'Abandono', name:'Abandono' },
      { uid:'Transversales', name:'Transversales' }
    ];

    return of(STAGES);
  }


  getTags(): Observable<ColoredTag[]> {
    const path = `v1/project-management/tags`;

    return this.core.http.get<any[]>(path);
  }


  getTaskManagers(projectUID: string): Observable<Contact[]> {
    const path = `v1/project-management/projects/${projectUID}/task-managers`;

    return this.core.http.get<Contact[]>(path);
  }


  getActivitiesTree(project: Project): Observable<Activity[]> {
    const path = `v1/project-management/projects/${project.uid}/as-tree`;

    return this.core.http.get<Activity[]>(path)
                         .pipe(
                            catchError((e) => this.core.http.throw(e, Errors.GET_ACTIVITIES_TREE))
                         );
  }


  changeParent(activity: Activity, newParent: Activity): Observable<Activity> {
    Assertion.assertValue(activity, "activity");
    Assertion.assertValue(newParent, "newParent");

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}`;

    const body = {
      parentUID: newParent.uid
    };

    return this.core.http.put<Activity>(path, body);
  }



  deleteActivity(activity: Activity): Observable<void> {
    Assertion.assertValue(activity, "activity");

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}`;

    return this.core.http.delete<any>(path)
                         .pipe(
                            catchError((e) => this.core.http.throw(e, Errors.DELETE_ACTIVITY))
                         );
  }


  createFromEvent(project: Project, data: { eventUID: string, targetDate: Date }) {
    Assertion.assertValue(project, "project");
    Assertion.assertValue(data, "data");

    const path = `v1/project-management/projects/${project.uid}/create-from-event`;

    return this.core.http.post<Activity>(path, data)
                         .pipe(
                            catchError((e) => this.core.http.throw(e, Errors.CREATE_FROM_EVENT))
                         );
  }

  insertActivity(project: Project,
                 newActivity: { name: string, position: number }): Observable<Activity> {

    Assertion.assertValue(project, "project");
    Assertion.assertValue(newActivity, "activity");
    Assertion.assertValue(newActivity.name, "activity.name");
    Assertion.assert(newActivity.position > 0, "activity position must be greater than zero.");

    const path = `v1/project-management/projects/${project.uid}/activities`;

    return this.core.http.post<Activity>(path, newActivity)
                         .pipe(
                            catchError((e) => this.core.http.throw(e, Errors.INSERT_ACTIVITY))
                         );
  }


  moveActivity(activity: Activity, newPosition: number): Observable<Activity> {
    Assertion.assertValue(activity, "activity");
    Assertion.assert(newPosition > 0, "newPosition must be greater than zero.");

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}`;

    const body = {
      position: newPosition
    };

    return this.core.http.put<Activity>(path, body)
                         .pipe(
                            catchError((e) => this.core.http.throw(e, Errors.MOVE_ACTIVITY))
                         );
  }


  updateActivity(activity: Activity, updateData: Partial<Activity>): Observable<Activity> {
    Assertion.assertValue(activity, "activity");
    Assertion.assertValue(updateData, "updateData");

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}`;

    return this.core.http.patch<Activity>(path, updateData)
                         .pipe(
                            catchError(e => this.core.http.showAndThrow(e, Errors.UPDATE_ACTIVITY))
                         );

  }

}
