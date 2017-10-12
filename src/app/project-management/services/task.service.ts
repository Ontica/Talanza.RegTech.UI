/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '../../core';

import { TaskRef } from '../data-types/project';

@Injectable()
export class TaskService {

  public constructor(private core: CoreService) { }

  public getTasks(itemId: number): Observable<TaskRef[]> {
    const path =  `v1/project-management/activities/${itemId}/tasks`;

    return this.core.http.get<TaskRef[]>(path);
  }

}