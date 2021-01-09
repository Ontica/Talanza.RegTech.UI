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

import { Activity, Project, ProjectProcess, WhatIfResult } from '@app/models/project-management';


@Injectable()
export class WhatIfService {

  constructor(private http: HttpService) { }

  processesCheckList(project: Project): Observable<ProjectProcess[]> {
    Assertion.assertValue(project, 'project');

    const path = `v1/project-management/projects/${project.uid}/processes-check-list`;

    return this.http.get<ProjectProcess[]>(path);
  }

  whatIfDeadlinesUpdated(project: Project, process: ProjectProcess): Observable<WhatIfResult> {
    Assertion.assertValue(project, 'project');
    Assertion.assertValue(process, 'process');

    const path =
      `v1/project-management/projects/${project.uid}/activities/${process.startActivity.uid}/what-if-deadlines-updated`;

    return this.http.get<WhatIfResult>(path);
  }

  whatIfUpdatedWithLastProcessChanges(project: Project, process: ProjectProcess): Observable<WhatIfResult> {
    Assertion.assertValue(project, 'project');
    Assertion.assertValue(process, 'process');

    const path =
      `v1/project-management/projects/${project.uid}/activities/${process.startActivity.uid}/what-if-updated-with-last-process-changes`;

    return this.http.get<WhatIfResult>(path);
  }

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
