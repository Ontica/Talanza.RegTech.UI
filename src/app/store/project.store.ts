/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { List } from 'immutable';

import { Contact } from '@app/core/data-types';
import { Activity, Contract, Project, Stage } from '@app/models/project-management';
import { ProjectService } from '@app/services/project-management';
import { ColoredTag } from '@app/core/ui-services';

class ProjectModel {

  project: Project;

  activities: Activity[];

}

@Injectable()
export class ProjectStore {

  private _projects: BehaviorSubject<List<Project>> = new BehaviorSubject(List([]));
  private _activities: BehaviorSubject<List<Activity>> = new BehaviorSubject(List([]));

  private _tags: BehaviorSubject<ColoredTag[]> = new BehaviorSubject([]);
  private _stages: BehaviorSubject<List<Stage>> = new BehaviorSubject(List([]));

  constructor(private projectService: ProjectService) {
    this.loadInitialData();
  }


  get contracts(): Observable<Contract[]> {
    return this.projectService.getContracts();
  }


  get projects(): Observable<List<Project>> {
    return this._projects.asObservable();
  }


  get stages(): Observable<List<Stage>> {
    return this._stages.asObservable();
  }


  get tags(): Observable<ColoredTag[]> {
    return this._tags.asObservable();
  }


  activities(project: Project): Observable<Activity[]> {
    return this.projectService.getActivitiesTree(project);
  }


  responsibles(project: Project): Observable<Contact[]> {
    return this.projectService.getResponsiblesList(project);
  }


  findById(projectUID: string): Project {
    return this._projects.value.find((x) => x.uid === projectUID);
  }


  changeParent(activity: Activity, newParent: Activity): Observable<Activity> {
    return this.projectService.changeParent(activity, newParent);
  }


  deleteActivity(activity: Activity): Observable<void> {
    return this.projectService.deleteActivity(activity);
  }


  insertActivity(project: Project,
                 newActivity: { name: string, position: number }): Observable<Activity> {
    return this.projectService.insertActivity(project, newActivity);
  }


  moveActivity(activity: Activity, newPosition: number): Observable<Activity> {
    return this.projectService.moveActivity(activity, newPosition);
  }


  updateActivity(activity: Activity, updateData: Partial<Activity>): Observable<Activity> {
    return this.projectService.updateActivity(activity, updateData);
  }


  // private methods

  private loadInitialData() {

    this.projectService.getProjectList()
        .subscribe(
            data =>
              this._projects.next(List(data))
            ,
            err => console.log('Error reading project data', err)
        );

    this.projectService.getTags()
        .subscribe(
            data =>
              this._tags.next(data)
            ,
            err => console.log('Error reading tags data', err)
        );

    this.projectService.getStages()
        .subscribe(
            data =>
              this._stages.next(List(data))
            ,
            err => console.log('Error reading stages data', err)
        );
  }

}
