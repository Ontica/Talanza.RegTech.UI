/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { List } from 'immutable';

import { Activity, Project } from '../project-management/data-types';
import { ProjectService } from '../project-management/services';


@Injectable()
export class ProjectStore {

  private _projects: BehaviorSubject<List<Project>> = new BehaviorSubject(List([]));
  private _activities: BehaviorSubject<List<Activity>> = new BehaviorSubject(List([]));

  constructor(private projectService: ProjectService) {
    this.loadInitialData();
  }


  get projects(): Observable<List<Project>> {
    return this._projects.asObservable();
  }


  findById(projectUID: string): Project {
    return this._projects.value.find((x) => x.uid === projectUID);
  }


  // private methods

  private loadInitialData() {

    this.projectService.getProjectList()
        .subscribe(
            data => {
              this._projects.next(List(data));
              console.log('hurray!, data gathering from the server.')
            },
            err => console.log('Error reading project data', err)
        );
  }

}
