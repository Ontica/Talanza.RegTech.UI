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

import { Activity, Task } from '@app/models/project-management';


enum Errors {
  GET_ACTIVITY_TASKS =
  '[GET_ACTIVITY_TASKS] Ocurrió un problema al leer las tareas de la actividad.',

  CREATE_TASK =
  '[CREATE_TASK] Ocurrió un problema al guardar la tarea.',

  DELETE_TASK =
  '[DELETE_TASK] Ocurrió un problema al eliminar la tarea.',

  REACTIVATE_TASK =
  '[REACTIVATE_TASK] Ocurrió un problema al reactivar la tarea.',

  UPDATE_TASK =
  '[UPDATE_TASK] Ocurrió un problema al actualizar la tarea.'
}


@Injectable()
export class TaskService {

  constructor(private core: CoreService) { }


  getActivityTasks(activity: Activity): Observable<Task[]> {
    const path = `v1/project-management/activities/${activity.uid}/tasks`;

    return this.core.http.get<Task[]>(path)
      .pipe(
        catchError((e) => this.core.http.throw(e, Errors.GET_ACTIVITY_TASKS))
      );
  }


  completeTask(task: Task, data?: Partial<Task>): Observable<Task> {
    const path = `v1/project-management/activities/${task.activity.uid}/tasks/${task.uid}/complete`;

    return this.core.http.post<Task>(path, data);
  }


  createTask(activity: Activity,
    newTask: { name: string, position?: number }): Observable<Task> {
    const path = `v1/project-management/activities/${activity.uid}/tasks`;

    return this.core.http.post<Task>(path, newTask)
      .pipe(
        catchError((e) => this.core.http.throw(e, Errors.CREATE_TASK))
      );
  }


  deleteTask(task: Task): Observable<Task[]> {
    const path = `v1/project-management/activities/${task.activity.uid}/tasks/${task.uid}`;

    return this.core.http.delete<Task[]>(path)
      .pipe(
        catchError((e) => this.core.http.throw(e, Errors.DELETE_TASK))
      );
  }


  reactivateTask(task: Task): Observable<Task> {
    const path = `v1/project-management/activities/${task.activity.uid}/tasks/${task.uid}/reactivate`;

    return this.core.http.post<Task>(path)
      .pipe(
        catchError((e) => this.core.http.throw(e, Errors.REACTIVATE_TASK))
      );
  }


  updateTask(task: Task, data: Partial<Task>): Observable<Task> {
    const path = `v1/project-management/activities/${task.activity.uid}/tasks/${task.uid}`;

    return this.core.http.patch<Task>(path, data)
      .pipe(
        catchError((e) => this.core.http.throw(e, Errors.UPDATE_TASK))
      );
  }

}
