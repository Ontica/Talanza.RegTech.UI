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

import { Activity, Project, Stage } from '@app/models/project-management';
import { Entity } from "@app/models/regulation";
import { Empty } from '@app/models/core';


export class ProjectTemplateModel {

  project: Project = Empty;
  activities: List<Activity> = List([]);

}


@Injectable()
export class ProjectTemplateStore {

  private _selectedTemplate: BehaviorSubject<ProjectTemplateModel> = new BehaviorSubject(new ProjectTemplateModel());

  private _templatesList: BehaviorSubject<List<Project>> = new BehaviorSubject(List([]));

  private _stages: BehaviorSubject<List<Stage>> = new BehaviorSubject(List([]));


  constructor(private projectService: ProjectService) {
    this.loadInitialData();
  }


  selectedTemplate(): Observable<ProjectTemplateModel> {
    return this._selectedTemplate.asObservable();
  }


  selectTemplate(template: Project) {
    this.updateSelectedTemplate(template);
  }


  get templates(): Observable<List<Project>> {
    return this._templatesList.asObservable();
  }

  events(): Observable<Activity[]> {
    return this.projectService.getEventsList();
  }


  get stages(): Observable<List<Stage>> {
    return this._stages.asObservable();
  }


  getActivity(activityUID: string): Activity {
    return this._selectedTemplate.value.activities.find( x => x.uid === activityUID);
  }


  activities(): Activity[] {
    return this._selectedTemplate.value.activities.toArray();
  }

  entities(): Observable<Entity[]> {
    return this.projectService.getEntitiesList();
  }


  findById(templateUID: string): Project {
    return this._templatesList.value.find((x) => x.uid === templateUID);
  }


  copyToProject(targetProjectUID: string, activity: Activity): Promise<Activity> {
    return this.projectService.copyToProject(targetProjectUID, activity)
               .toPromise()
               .then( x => {
                  this.updateSelectedTemplate(activity.project);
                  Object.assign(activity, x);

                  return activity;
               });
  }

  changeParent(activity: Activity, newParent: Activity): Promise<Activity> {
    return this.projectService.changeParent(activity, newParent)
               .toPromise()
               .then( x => {
                   this.updateSelectedTemplate(activity.project);
                   Object.assign(activity, x);

                   return activity;
              });
  }


  deleteActivity(activity: Activity): Promise<void> {
    return this.projectService.deleteActivity(activity)
               .toPromise()
               .then(() => {
                  this.updateSelectedTemplate(activity.project);
                  Object.assign(activity, null);
               });
  }


  insertActivity(template: Project,
                 newActivity: { name: string, position: number }): Promise<Activity> {

    return this.projectService.insertActivity(template, newActivity)
               .toPromise()
               .then( x => {
                  this.updateSelectedTemplate(template);

                  return x;
             });
  }


  moveActivity(activity: Activity, newPosition: number): Promise<Activity> {
    return this.projectService.moveActivity(activity, newPosition)
               .toPromise()
               .then( x => {
                  this.updateSelectedTemplate(activity.project);
                  Object.assign(activity, x);

                  return activity;
               });
  }


  moveToProject(targetProjectUID: string, activity: Activity): Promise<Activity> {
    return this.projectService.moveToProject(targetProjectUID, activity)
               .toPromise()
               .then( x => {
                  this.updateSelectedTemplate(activity.project);
                  Object.assign(activity, x);

                  return activity;
               });
  }


  updateActivity(activity: Activity, updateData: Partial<Activity>): Promise<Activity> {
    return this.projectService.updateActivity(activity, updateData)
               .toPromise()
               .then( x => {
                  this.updateSelectedTemplate(activity.project);
                  Object.assign(activity, x);

                  return activity;
               });
  }


  // private methods

  private loadInitialData() {

    this.projectService.getTemplatesList()
        .subscribe(
            data =>
              this._templatesList.next(List(data))
            ,
            err => console.log('Error reading project template data', err)
        );


    this.projectService.getStages()
        .subscribe(
            data =>
              this._stages.next(List(data))
            ,
            err => console.log('Error reading stages data', err)
        );
  }


  private updateSelectedTemplate(project: Project) {
    this.projectService.getActivitiesTree(project).subscribe(
      data => {
        const templateModel = new ProjectTemplateModel();
        templateModel.project = project;
        templateModel.activities = List(data);

        this._selectedTemplate.next(templateModel);
      },
      err => console.log('Error reading project template activities', err)
    );
  }

}
