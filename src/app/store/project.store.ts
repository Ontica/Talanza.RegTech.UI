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

import { Activity, Contract, Project, Stage } from '@app/models/project-management';

import { ColoredTag } from '@app/models/user-interface';


export class ProjectModel {

  project: Project = Empty;
  activities: List<Activity> = List([]);

}


@Injectable()
export class ProjectStore {

  private _selectedProject: BehaviorSubject<ProjectModel> = new BehaviorSubject(new ProjectModel());

  private _projects: BehaviorSubject<List<Project>> = new BehaviorSubject(List([]));

  private _responsibles: BehaviorSubject<List<Project>> = new BehaviorSubject(List([]));

  private _stages: BehaviorSubject<List<Stage>> = new BehaviorSubject(List([]));

  private _tags: BehaviorSubject<ColoredTag[]> = new BehaviorSubject([]);
  private _themes: BehaviorSubject<string[]> = new BehaviorSubject([]);


  constructor(private projectService: ProjectService) {
    this.loadInitialData();
  }


  get contracts(): Observable<Contract[]> {
    return this.projectService.getContracts();
  }


  selectedProject(): Observable<ProjectModel> {
    return this._selectedProject.asObservable();
  }


  selectProject(project: Project) {
    this.updateSelectedProject(project);
  }


  get allResponsibles(): Observable<List<Contact>> {
    return this._responsibles.asObservable();
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


  get themes(): Observable<string[]> {
    return this._themes.asObservable();
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


  getAllActivities(): Observable<Activity[]> {
    return this.projectService.getAllActivities();
  }


  getMasterProject() {
   // this.projectStore;

  }


  getMergedProject(projectUID: string[]) {
    // this.selectedProjects = this.projectStore.findById(projectUID);
  }


  getProject(projectUID: string): Project {
    return this._projects.value.find(x => x.uid === projectUID);
  }


  changeParent(activity: Activity, newParent: Activity): Promise<Activity> {
    return this.projectService.changeParent(activity, newParent)
               .toPromise()
               .then(x => {
                   this.updateSelectedProject(activity.project);
                   return x;
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


  createFromActivityTemplate(project: Project,
                             activityTemplateUID: string,
                             eventDate: Date): Promise<Activity> {
      return this.projectService.createFromActivityTemplate(project, activityTemplateUID, eventDate)
                 .toPromise()
                 .then((x) => {
                  this.updateSelectedProject(project);
                  return x;
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
               .then(x => {
                  this.updateSelectedProject(project);
                  return x;
             });
  }


  moveActivity(activity: Activity, newPosition: number): Promise<Activity> {
    return this.projectService.moveActivity(activity, newPosition)
               .toPromise()
               .then(x => {
                  this.updateSelectedProject(activity.project);
                  return x;
                });
  }


  reactivateActivity(activity: Activity): Promise<Activity> {
    return this.projectService.reactivateActivity(activity)
               .toPromise()
               .then(x => {
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
    this.loadProjectList();
    this.loadResponsibles();
    this.loadTags();
    this.loadThemes();
    this.loadStages();

  }


  private loadProjectList() {
    this.projectService.getProjectList()
        .subscribe(
            data =>
              this._projects.next(List(data))
            ,
            err => console.log('Error reading project data', err)
        );
  }


  private loadResponsibles() {
    this.projectService.getResponsiblesList(undefined)
        .subscribe(
            data =>
              this._responsibles.next(List(data))
            ,
            err => console.log('Error reading responsibles data', err)
        );
  }


  private loadTags() {
    this.projectService.getTags()
        .subscribe(
            data =>
              this._tags.next(data)
            ,
            err => console.log('Error reading tags data', err)
        );
  }


  private loadThemes() {
    this.projectService.getThemesList()
        .subscribe(
            data =>
              this._themes.next(data)
            ,
            err => console.log('Error reading projects themes', err)
        );

  }


  private loadStages() {
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
