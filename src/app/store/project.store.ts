/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from 'immutable';

import { ProjectService } from '@app/services/project-management';

import { Contact, Empty } from '@app/models/core';

import { Activity, Contract, Project,
         Stage, ViewConfig, DefaultViewConfig } from '@app/models/project-management';

import { ColoredTag } from '@app/models/user-interface';


export class ProjectModel {

  project: Project = Empty;
  activities: List<Activity> = List([]);

}


@Injectable()
export class ProjectStore {

  private _selectedProject: BehaviorSubject<ProjectModel> = new BehaviorSubject(new ProjectModel());

  private _selectedView: BehaviorSubject<ViewConfig> = new BehaviorSubject(DefaultViewConfig());

  private _projects: BehaviorSubject<List<Project>> = new BehaviorSubject(List([]));

  private _tags: BehaviorSubject<ColoredTag[]> = new BehaviorSubject([]);
  private _stages: BehaviorSubject<List<Stage>> = new BehaviorSubject(List([]));


  constructor(private projectService: ProjectService) {
    this.loadInitialData();
  }


  get contracts(): Observable<Contract[]> {
    return this.projectService.getContracts();
  }


  selectedProject(): Observable<ProjectModel> {
    return this._selectedProject.asObservable();
  }


  selectedView(): Observable<ViewConfig> {
    return this._selectedView.asObservable();
  }


  selectProject(project: Project) {
    this.updateSelectedProject(project);
  }


  selectView(viewConfig: ViewConfig) {
    this._selectedView.next(viewConfig);
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


  getActivity(activityUID: string): Activity {
    return this._selectedProject.value.activities.find(x => x.uid === activityUID);
  }


  activities(): Activity[] {
    return this._selectedProject.value.activities.toArray();
  }


  responsibles(project: Project): Observable<Contact[]> {
    return this.projectService.getResponsiblesList(project);
  }


  findById(projectUID: string): Project {
    return this._projects.value.find(x => x.uid === projectUID);
  }


  changeParent(activity: Activity, newParent: Activity): Promise<Activity> {
    return this.projectService.changeParent(activity, newParent)
               .toPromise()
               .then( x => {
                   this.updateSelectedProject(activity.project);
                   Object.assign(activity, x);

                   return activity;
              });
  }


  completeActivity(activity: Activity, updateData: Partial<Activity>): Promise<Activity> {
    return this.projectService.completeActivity(activity, updateData)
               .toPromise()
               .then( x => {
                   this.updateSelectedProject(activity.project);
                   Object.assign(activity, x);

                   return activity;
              });
  }


  deleteActivity(activity: Activity): Promise<void> {
    return this.projectService.deleteActivity(activity)
               .toPromise()
               .then(() => {
                  this.updateSelectedProject(activity.project);
                  Object.assign(activity, null);
               });
  }


  insertActivity(project: Project,
                 newActivity: { name: string, position: number }): Promise<Activity> {

    return this.projectService.insertActivity(project, newActivity)
               .toPromise()
               .then( x => {
                  this.updateSelectedProject(project);

                  return x;
             });
  }


  moveActivity(activity: Activity, newPosition: number): Promise<Activity> {
    return this.projectService.moveActivity(activity, newPosition)
               .toPromise()
               .then( x => {
                  this.updateSelectedProject(activity.project);
                  Object.assign(activity, x);

                  return activity;
               });
  }


  updateActivity(activity: Activity, updateData: Partial<Activity>): Promise<Activity> {
    return this.projectService.updateActivity(activity, updateData)
               .toPromise()
               .then( x => {
                  this.updateSelectedProject(activity.project);
                  Object.assign(activity, x);

                  return activity;
               });
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


  private updateSelectedProject(project: Project) {
    this.projectService.getActivitiesTree(project).subscribe(
      data => {
        const projectModel = new ProjectModel();
        projectModel.project = project;
        projectModel.activities = List(data);

        this._selectedProject.next(projectModel);
      },
      err => console.log('Error reading project activities', err)
    );
  }

}
