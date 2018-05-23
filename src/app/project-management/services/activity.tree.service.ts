/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Assertion } from 'empiria';

import { CoreService } from '../../core/core.service';

import { Activity } from '../data-types';


enum Errors {

  GET_ACTIVITIES_TREE =
  '[GET_ACTIVITIES_TREE] Ocurrió un problema al leer el árbol de actividades del proyecto.',

  CREATE_CHILD_ERR =
  '[CREATE_CHILD_ERR] Ocurrió un problema al agregar la actividad como hija de otra actividad.',

  INSERT_ACTIVITY_ERR =
  '[INSERT_ACTIVITY_ERR] Ocurrió un problema al agregar la actividad en la lista.',

  CHANGE_PARENT =
  '[CHANGE_PARENT] Ocurrió un problema al cambiar el padre de la actividad.',

  MOVE_ACTIVITY =
  '[MOVE_ACTIVITY] Ocurrió un problema al mover la actividad de posición.',

}


@Injectable()
export class ActivityTreeService {

  constructor(private core: CoreService) { }

  getActivitiesTree(projectUID: string): Observable<Activity[]> {
    const path = `v1/project-management/projects/${projectUID}/as-tree`;

    return this.core.http.get<Activity[]>(path)
                         .catch((e) => this.core.http.showAndReturn(e, Errors.GET_ACTIVITIES_TREE, null));
  }


  insertActivity(projectUID: string,
                 newActivity: { name: string, position: number }): Promise<Activity> {

    Assertion.assertValue(projectUID, "projectUID");
    Assertion.assertValue(newActivity, "activity");
    Assertion.assertValue(newActivity.name, "activity.name");
    Assertion.assert(newActivity.position > 0, "activity position must be greater than zero.");

    const path = `v1/project-management/projects/${projectUID}/activities`;

    return this.core.http.post<Activity>(path, newActivity)
                         .catch((e) => this.core.http.showAndReturn(e, Errors.INSERT_ACTIVITY_ERR, null))
                         .toPromise();
  }


  insertAsChild(projectUID: string,
                newActivity: { name: string, parent: Activity }): Promise<Activity> {

    Assertion.assertValue(projectUID, "projectUID");
    Assertion.assertValue(newActivity, "activity");
    Assertion.assertValue(newActivity.name, "activity.name");
    Assertion.assertValue(parent, "activity.parent");

    const path = `v1/project-management/projects/${projectUID}/activities`;

    const body = {
      name: newActivity.name,
      parentUID: newActivity.parent.uid
    };

    return this.core.http.post<Activity>(path, body)
                         .catch((e) => this.core.http.showAndReturn(e, Errors.CREATE_CHILD_ERR, null))
                         .toPromise();
  }


  changeParent(activity: Activity, newParent: Activity): Promise<Activity> {
    Assertion.assertValue(activity, "activity");
    Assertion.assertValue(newParent, "newParent");

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}`;

    const body = {
      parentUID: newParent.uid
    };

    return this.core.http.put<Activity>(path, body)
                         .toPromise();
  }


  moveActivity(activity: Activity, newPosition: number): Promise<Activity> {
    Assertion.assertValue(activity, "activity");
    Assertion.assert(newPosition > 0, "newPosition must be greater than zero.");

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}`;

    const body = {
      position: newPosition
    };

    return this.core.http.put<Activity>(path, body)
                         .toPromise();
  }

} // class ActivityTreeService
