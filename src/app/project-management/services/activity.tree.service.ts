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
import { Assertion } from 'empiria';

import { Activity } from '../data-types/activity';

enum Errors {
  
  CREATE_CHILD_ERR =
  '[CREATE_CHILD_ERR] Ocurrió un problema al agregar la actividad como hija de otra actividad.',

  INSERT_ACTIVITY_ERR =
  '[INSERT_ACTIVITY_ERR] Ocurrió un problema al agregar la actividad en la lista.',

}

@Injectable()
export class ActivityTreeService {

  public constructor(private core: CoreService) { }

  public createChild(projectUID: string,
                     activity: { name: string, parent: Activity }): Observable<any> {

    Assertion.assertValue(projectUID, "projectUID");
    Assertion.assertValue(activity, "activity");
    Assertion.assertValue(activity.name, "activity.name");
    Assertion.assertValue(parent, "activity.parent");

    const path = `v1/project-management/projects/${projectUID}/activities`;

    return this.core.http.post<any>(path, { name, parentUID : activity.parent.uid } )
    .catch((e) =>
    this.core.http.showAndReturn(e, Errors.CREATE_CHILD_ERR, null));
}

  public insertActivity(projectUID: string,
                        activity: { name: string, position: number }): Observable<any> {

    Assertion.assertValue(projectUID, "projectUID");
    Assertion.assertValue(activity, "activity");
    Assertion.assertValue(activity.name, "activity.name");
    Assertion.assert(activity.position > 0, "activity position must be greater than zero.");
    
    const path = `v1/project-management/projects/${projectUID}/activities`;

    return this.core.http.post<any>(path, activity)
                         .catch((e) => this.core.http.showAndReturn(e, Errors.INSERT_ACTIVITY_ERR, null));
  }

} // class ActivityTreeService

