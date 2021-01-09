/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@app/core';

import { GanttTask, Project } from '@app/models/project-management';


@Injectable()
export class GanttService {

  constructor(private http: HttpService) { }

  getActivitiesTree(project: Project): Observable<GanttTask[]> {
    const path = `v1/project-management/projects/${project.uid}/as-gantt`;

    return this.http.get<GanttTask[]>(path);
  }

}
