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

import { GanttTask, Project } from '@app/models/project-management';


enum Errors {

  GET_GANTT_TREE =
  '[GET_GANTT_TREE] Ocurrió un problema al leer la lista de actividades para el diagrama gantt.',

}

@Injectable()
export class GanttService {

  constructor(private core: CoreService) { }

  getActivitiesTree(project: Project): Observable<GanttTask[]> {
    const path = `v1/project-management/projects/${project.uid}/as-gantt`;

    return this.core.http.get<GanttTask[]>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, Errors.GET_GANTT_TREE))
               );
  }

}
