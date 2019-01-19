/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assertion, HttpService } from '@app/core';

import { Activity, ActivityTemplate, Project, ProjectTemplate } from '@app/models/project-management';

import { Entity } from '@app/models/regulation';


@Injectable()
export class ProjectTemplateService {

  constructor(private http: HttpService) { }

  // GET methods

  getEntitiesList(): Observable<Entity[]> {
    const path = 'v1/modeling/entities';

    return this.http.get<Entity[]>(path);
  }


  getProjectTemplatesList(): Observable<Project[]> {
    const path = 'v1/project-management/project-templates';

    return this.http.get<Project[]>(path);
  }


  getStartEvents(): Observable<ActivityTemplate[]> {
    const path = 'v1/project-management/project-templates/start-events';

    return this.http.get<ActivityTemplate[]>(path);
  }


  getTreeStructure(projectTemplate: ProjectTemplate): Observable<ActivityTemplate[]> {
    Assertion.assertValue(projectTemplate, 'projectTemplate');

    const path = `v1/project-management/project-templates/${projectTemplate.uid}/as-tree`;

    return this.http.get<ActivityTemplate[]>(path);
  }

  // SET methods

  changeParent(activityTemplate: ActivityTemplate,
               newParent: ActivityTemplate): Observable<ActivityTemplate> {
    Assertion.assertValue(activityTemplate, 'activityTemplate');
    Assertion.assertValue(newParent, 'newParent');

    const path = this.getActivityTemplateEndpoint(activityTemplate);

    const body = {
      parentUID: newParent.uid
    };

    return this.http.put<ActivityTemplate>(path, body);
  }


  copyTo(activityTemplate: ActivityTemplate,
         targetProjectTemplateUID: string): Observable<ActivityTemplate> {
    Assertion.assertValue(activityTemplate, 'activityTemplate');
    Assertion.assertValue(targetProjectTemplateUID, 'targetProjectTemplateUID');


    const path = this.getActivityTemplateEndpoint(activityTemplate) + `/copyTo/${targetProjectTemplateUID}`;

    return this.http.post<ActivityTemplate>(path, {});
  }


  createFromActivityTemplate(targetProject: Project,
                             activityTemplateUID: string, eventDate: Date): Observable<Activity> {
    Assertion.assertValue(targetProject, 'targetProject');
    Assertion.assertValue(activityTemplateUID, 'activityTemplateUID');


    const path = `v1/project-management/projects/${targetProject.uid}/create-from-activity-template`;

    const body = {
      activityTemplateUID: activityTemplateUID,
      eventDate: eventDate
    };

    return this.http.post<Activity>(path, body);
  }


  delete(activityTemplate: ActivityTemplate): Observable<void> {
    Assertion.assertValue(activityTemplate, 'activityTemplate');

    const path = this.getActivityTemplateEndpoint(activityTemplate);

    return this.http.delete<any>(path);
  }


  insert(projectTemplate: ProjectTemplate,
         newActivityTemplate: { name: string, position: number }): Observable<ActivityTemplate> {

    Assertion.assertValue(projectTemplate, 'projectTemplate');
    Assertion.assertValue(newActivityTemplate, 'newActivityTemplate');
    Assertion.assertValue(newActivityTemplate.name, 'newActivityTemplate.name');
    Assertion.assert(newActivityTemplate.position > 0,
                     'activity template position must be greater than zero.');

    const path = `v1/project-management/project-templates/${projectTemplate.uid}/activities`;

    return this.http.post<ActivityTemplate>(path, newActivityTemplate);
  }


  move(activityTemplate: ActivityTemplate,
       newPosition: number): Observable<ActivityTemplate> {
    Assertion.assertValue(activityTemplate, 'activityTemplate');
    Assertion.assert(newPosition > 0, 'newPosition must be greater than zero.');

    const path = this.getActivityTemplateEndpoint(activityTemplate);

    const body = {
      position: newPosition
    };

    return this.http.put<ActivityTemplate>(path, body);
  }


  moveTo(activityTemplate: ActivityTemplate,
         targetProjectTemplateUID: string): Observable<ActivityTemplate> {
    Assertion.assertValue(activityTemplate, 'activityTemplate');
    Assertion.assertValue(targetProjectTemplateUID, 'targetProjectTemplateUID');

    const path = this.getActivityTemplateEndpoint(activityTemplate) +
                 `/moveTo/${targetProjectTemplateUID}`;

    return this.http.post<ActivityTemplate>(path, {});
  }


  update(activityTemplate: ActivityTemplate,
         updateData: Partial<ActivityTemplate>): Observable<ActivityTemplate> {
    Assertion.assertValue(activityTemplate, 'activityTemplate');
    Assertion.assertValue(updateData, 'updateData');

    const path = this.getActivityTemplateEndpoint(activityTemplate);

    return this.http.patch<ActivityTemplate>(path, updateData);
  }

  // private methods

  private getActivityTemplateEndpoint(activityTemplate: ActivityTemplate): string {
    return  `v1/project-management/project-templates/${activityTemplate.project.uid}` +
            `/activities/${activityTemplate.uid}`;
  }

}
