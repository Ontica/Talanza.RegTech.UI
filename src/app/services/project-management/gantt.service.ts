/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Assertion } from 'empiria';

import { CoreService } from '@app/core/core.service';

import { GanttTask } from '@app/models/project-management';


enum Errors {

  GET_GANTT_TREE =
  '[GET_GANTT_TREE] Ocurrió un problema al leer la lista de actividades para el diagrama gantt.',

}

@Injectable()
export class GanttService {

  constructor(private core: CoreService) { }

  getActivitiesTree(projectUID: string): Promise<GanttTask[]> {
    const path = `v1/project-management/projects/${projectUID}/as-gantt`;

    return this.core.http.get<GanttTask[]>(path)
      .catch((e) =>
        this.core.http.showAndReturn(e, Errors.GET_GANTT_TREE, null))
      .toPromise();

  }

}
