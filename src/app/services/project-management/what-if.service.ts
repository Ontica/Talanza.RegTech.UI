/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assertion, HttpService } from '@app/core';

import { DateString } from '@app/models/core';

import { Activity, Project, WhatIfResult } from '@app/models/project-management';


@Injectable()
export class WhatIfService {

  constructor(private http: HttpService) { }


  whatIfCompleted(activity: Activity, completedDate: DateString): Observable<WhatIfResult> {
    Assertion.assertValue(activity, 'activity');

    const path =
      `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}/what-if-completed`;

    const body = {
      completedDate: completedDate
    };

    return this.http.post<WhatIfResult>(path, body);
  }


  whatIfCreatedFromEvent(targetProject: Project,
                         activityTemplateUID: string,
                         eventDate: Date): Observable<WhatIfResult> {
    Assertion.assertValue(targetProject, 'targetProject');
    Assertion.assertValue(activityTemplateUID, 'activityTemplateUID');

    const path = `v1/project-management/projects/${targetProject.uid}/what-if-created-from-event`;

    const body = {
      activityTemplateUID: activityTemplateUID,
      eventDate: eventDate
    };

    return this.http.post<WhatIfResult>(path, body);
  }


  whatIfReactivated(activity: Activity): Observable<WhatIfResult> {
    Assertion.assertValue(activity, 'activity');

    const path =
      `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}/what-if-reactivated`;

    return this.http.get<WhatIfResult>(path);
  }


}
