/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Assertion, HttpService } from '@app/core';

import { Activity, Contract, Project,
         ProjectProcess, Stage } from '@app/models/project-management';

import { Contact } from '@app/core/data-types';


@Injectable()
export class ProjectService {

  constructor(private http: HttpService) { }

  exportToExcel(project: Project, branch?: Activity): Promise<string> {
    Assertion.assertValue(project, 'project');

    const path = `v3/empiria-steps/projects/${project.uid}/export-to-excel/${branch?.uid || ''}`;

    return this.http.get<string>(path)
      .toPromise();
  }

  getAllActivities(): Observable<Activity[]> {
    const path = `v1/project-management/activities/all-activities`;

    return this.http.get<Activity[]>(path);
  }

  getContracts(): Observable<Contract[]> {
    const CONTRACTS: Contract[] = [ { uid: '576', name: 'Ronda 2.4' } ];

    return of(CONTRACTS);
  }

  getProjectList(): Observable<Project[]> {
    const path = 'v1/project-management/projects';

    return this.http.get<Project[]>(path);
  }

  getRequestersList(projectUID: string): Observable<Contact[]> {
    const path = `v1/project-management/projects/${projectUID}/requesters`;

    return this.http.get<Contact[]>(path);
  }

  getResourcesList(): Observable<string[]> {
    const path = `v1/project-management/resources`;

    return this.http.get<string[]>(path);
  }

  getResponsiblesList(project: Project): Observable<Contact[]> {
    const path = `v1/project-management/projects/166871D7-5CD7-40C7-AA47-618DB5E643B8/responsibles`;

    return this.http.get<Contact[]>(path);
  }

  getStages(): Observable<Stage[]> {
    const STAGES: Stage[] = [
      { uid: 'Transición', name: 'Transición' },
      { uid: 'Evaluación', name: 'Evaluación' },
      { uid: 'Exploración', name: 'Exploración' },
      { uid: 'Desarrollo', name: 'Desarrollo' },
      { uid: 'Producción', name: 'Producción' },
      { uid: 'Abandono', name: 'Abandono' },
      { uid: 'Transversales', name: 'Transversales' }
    ];

    return of(STAGES);
  }

  getTags(): Observable<string[]> {
    const path = `v1/project-management/tags`;

    return this.http.get<string[]>(path);
  }

  getTaskManagers(projectUID: string): Observable<Contact[]> {
    const path = `v1/project-management/projects/${projectUID}/task-managers`;

    return this.http.get<Contact[]>(path);
  }

  getThemesList(): Observable<string[]> {
    const path = `v1/project-management/themes`;

    return this.http.get<string[]>(path);
  }

  getActivitiesTree(project: Project): Observable<Activity[]> {
    const path = `v1/project-management/projects/${project.uid}/as-tree`;

    return this.http.get<Activity[]>(path);
  }

  // update methods

  completeActivity(activity: Activity, updateData?: Partial<Activity>): Observable<Activity> {
    Assertion.assertValue(activity, 'activity');

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}/complete`;

    return this.http.post<Activity>(path, updateData);
  }

  changeParent(activity: Activity, newParent: Activity): Observable<Activity> {
    Assertion.assertValue(activity, 'activity');
    Assertion.assertValue(newParent, 'newParent');

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}/change-parent/${newParent.uid}`;

    return this.http.post<Activity>(path);
  }

  copyToProject(targetProjectUID: string, activity: Activity): any {
    Assertion.assertValue(targetProjectUID, 'targetProjectUID');
    Assertion.assertValue(activity, 'activity');

    const path = `v1/project-management/projects/${activity.project.uid}/activities/` +
                 `${activity.uid}/copyTo/${targetProjectUID}`;

    return this.http.post<Activity>(path);
  }

  createFromActivityTemplate(targetProject: Project,
                             createFromTemplateData: any): Observable<Activity> {
    Assertion.assertValue(targetProject, 'targetProject');
    Assertion.assertValue(createFromTemplateData, 'createFromTemplateData');

    const path = `v1/project-management/projects/${targetProject.uid}/create-from-activity-template`;

    return this.http.post<Activity>(path, createFromTemplateData);
  }

  deleteActivity(activity: Activity): Observable<void> {
    Assertion.assertValue(activity, 'activity');

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}`;

    return this.http.delete<any>(path);
  }

  insertActivity(project: Project,
                 newActivity: { name: string, position: number }): Observable<Activity> {

    Assertion.assertValue(project, 'project');
    Assertion.assertValue(newActivity, 'activity');
    Assertion.assertValue(newActivity.name, 'activity.name');
    Assertion.assert(newActivity.position > 0, 'activity position must be greater than zero.');

    const path = `v1/project-management/projects/${project.uid}/activities`;

    return this.http.post<Activity>(path, newActivity);
  }

  updateDeadlines(project: Project, process: ProjectProcess): Observable<Activity> {
    Assertion.assertValue(project, 'project');
    Assertion.assertValue(process, 'process');

    const path =
        `v1/project-management/projects/${project.uid}/activities/${process.startActivity.uid}/update-deadlines`;

    return this.http.post<Activity>(path);
  }

  mergeProcessChanges(project: Project, process: ProjectProcess): Observable<Activity> {
    Assertion.assertValue(project, 'project');
    Assertion.assertValue(process, 'process');

    const path =
        `v1/project-management/projects/${project.uid}/activities/${process.startActivity.uid}/update-with-last-process-changes`;

    return this.http.post<Activity>(path);
  }

  moveActivity(activity: Activity, newPosition: number): Observable<Activity> {
    Assertion.assertValue(activity, 'activity');
    Assertion.assert(newPosition > 0, 'newPosition must be greater than zero.');

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}/change-position/${newPosition}`;

    return this.http.post<Activity>(path);
  }

  moveToProject(targetProjectUID: string, activity: Activity): any {
    Assertion.assertValue(targetProjectUID, 'targetProjectUID');
    Assertion.assertValue(activity, 'activity');

    const path = `v1/project-management/projects/${activity.project.uid}/activities/` +
                 `${activity.uid}/moveTo/${targetProjectUID}`;

    return this.http.post<Activity>(path);
  }

  reactivateActivity(activity: Activity): Observable<Activity> {
    Assertion.assertValue(activity, 'activity');

    const path =
      `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}/reactivate`;

    return this.http.post<Activity>(path);
  }

  updateActivity(activity: Activity, updateData: Partial<Activity>): Observable<Activity> {
    Assertion.assertValue(activity, 'activity');
    Assertion.assertValue(updateData, 'updateData');

    const path = `v1/project-management/projects/${activity.project.uid}/activities/${activity.uid}`;

    return this.http.patch<Activity>(path, updateData);
  }

}
