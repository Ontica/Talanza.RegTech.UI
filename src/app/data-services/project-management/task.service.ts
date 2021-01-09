/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@app/core';

import { Activity, Task } from '@app/models/project-management';


@Injectable()
export class TaskService {

  constructor(private http: HttpService) { }

  getActivityTasks(activity: Activity): Observable<Task[]> {
    const path = `v1/project-management/activities/${activity.uid}/tasks`;

    return this.http.get<Task[]>(path);
  }

  completeTask(task: Task, data?: Partial<Task>): Observable<Task> {
    const path = `v1/project-management/activities/${task.activity.uid}/tasks/${task.uid}/complete`;

    return this.http.post<Task>(path, data);
  }

  createTask(activity: Activity,
    newTask: { name: string, position?: number }): Observable<Task> {
    const path = `v1/project-management/activities/${activity.uid}/tasks`;

    return this.http.post<Task>(path, newTask);
  }

  deleteTask(task: Task): Observable<Task[]> {
    const path = `v1/project-management/activities/${task.activity.uid}/tasks/${task.uid}`;

    return this.http.delete<Task[]>(path);
  }

  reactivateTask(task: Task): Observable<Task> {
    const path = `v1/project-management/activities/${task.activity.uid}/tasks/${task.uid}/reactivate`;

    return this.http.post<Task>(path);
  }

  updateTask(task: Task, data: Partial<Task>): Observable<Task> {
    const path = `v1/project-management/activities/${task.activity.uid}/tasks/${task.uid}`;

    return this.http.patch<Task>(path, data);
  }

}
