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

import { Task } from '../data-types/task';
import { Activity, ProjectRef, ResourceRef, PersonRef,TaskRef } from '../data-types/project';
import { ProcessModel } from '../data-types/project';

@Injectable()
export class ActivityService {

  public constructor(private core: CoreService) { }

  public getResourcesList(projectUID: string): Observable<ResourceRef[]> {
    const path = `v1/project-management/projects/${projectUID}/resources`;

    return this.core.http.get<ResourceRef[]>(path);
  }

  public getRequestersList(projectUID: string): Observable<PersonRef[]> {
    const path ='v1/project-management/projects/'+ projectUID +'/requesters';

    return this.core.http.get<PersonRef[]>(path);
  }

   public getResponsiblesList(projectUID: string): Observable<PersonRef[]> {
    const path ='v1/project-management/projects/'+ projectUID +'/responsibles';

    return this.core.http.get<PersonRef[]>(path);
  }

  public getTaskManagers(projectUID: string): Observable<PersonRef[]> {
    const path = 'v1/project-management/projects/'+ projectUID + '/task-managers';

    return this.core.http.get<PersonRef[]>(path);
  }   

  public getActivity(itemId: number): Observable<any> {    
    const path = `v1/project-management/activities/${itemId}`;

    return this.core.http.get<any>(path);
  }

  public getTasks(itemId: number): Observable<TaskRef[]> {
    const path =  `v1/project-management/activities/${itemId}/tasks`;

    return this.core.http.get<TaskRef[]>(path);

  }

  public getProcess(): Observable<ProcessModel[]> {
    const path ='v1/projects/process-models/for-activities';

    return this.core.http.get<ProcessModel[]>(path);
  }

  public getEvents(): Observable<ProcessModel[]> {
    const path ='v1/projects/process-models/for-events';
    
    return this.core.http.get<ProcessModel[]>(path);

  }

  public addProcessModel(projectUID: string, processModelUID: string, 
                         activity: Activity): Observable<Activity> {

    const path = `v1/project-management/projects/${projectUID}/create-from-process-model/${processModelUID}`;

    return this.core.http.post<Activity>(path, activity);
  }

  public addManualActivity(projectUID:string, activity:Activity): Observable<any[]> {
    const path = `v1/project-management/projects/${projectUID}/activities`;

    return this.core.http.post<any[]>(path, activity);
  }

  public updateActivity(projectUID:string, activityId: number, activity: Activity): 
                        Observable<Activity> {
    const path = `v1/project-management/projects/${projectUID}/activities/${activityId}`;
    
    return this.core.http.put<Activity>(path,activity);
    
  }

  public searchActivities(projectUID: string, filter: object,
                          orderBy: string, keywords: string): Observable<Task[]> {
  
    const path = `v1/project-management/projects/${projectUID}/activities?filter=${filter}
                          &orderBy=${orderBy}&keywords=${keywords}`;

    return this.core.http.get<Task[]>(path);                      
  }
}

