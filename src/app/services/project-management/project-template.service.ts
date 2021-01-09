/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assertion, HttpService } from '@app/core';

import { ActivityTemplate, Project, ProjectTemplate } from '@app/models/project-management';


@Injectable()
export class ProjectTemplateService {


  constructor(private http: HttpService) { }

  // GET methods

  exportToExcel(process: ProjectTemplate, branch?: ActivityTemplate): Promise<string> {
    Assertion.assertValue(process, 'process');

    const path = `v3/empiria-steps/processes/${process.uid}/export-to-excel/${branch?.uid || ''}`;

    return this.http.get<string>(path)
               .toPromise();
  }

  getProjectTemplate(projectTemplateID: string): Observable<ActivityTemplate> {
    Assertion.assertValue(projectTemplateID, 'projectTemplateID');

    const path = `v1/project-management/project-templates/${projectTemplateID}`;

    return this.http.get<ActivityTemplate>(path);
  }

  getProjectTemplatesList(): Observable<Project[]> {
    const path = 'v1/project-management/project-templates';

    return this.http.get<Project[]>(path);
  }

  getStartEvents(project: Project): Observable<ActivityTemplate[]> {
    const path = `v1/project-management/project-templates/start-events/${project.uid}`;

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

    const path = this.getActivityTemplateEndpoint(activityTemplate) + `/change-parent/${newParent.uid}`;

    return this.http.post<ActivityTemplate>(path);
  }

  copyTo(activityTemplate: ActivityTemplate,
         targetProjectTemplateUID: string): Observable<ActivityTemplate> {
    Assertion.assertValue(activityTemplate, 'activityTemplate');
    Assertion.assertValue(targetProjectTemplateUID, 'targetProjectTemplateUID');

    const path = this.getActivityTemplateEndpoint(activityTemplate) + `/copyTo/${targetProjectTemplateUID}`;

    return this.http.post<ActivityTemplate>(path);
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

    const path = this.getActivityTemplateEndpoint(activityTemplate) + `/change-position/${newPosition}`;

    return this.http.post<ActivityTemplate>(path);
  }

  moveTo(activityTemplate: ActivityTemplate,
         targetProjectTemplateUID: string): Observable<ActivityTemplate> {
    Assertion.assertValue(activityTemplate, 'activityTemplate');
    Assertion.assertValue(targetProjectTemplateUID, 'targetProjectTemplateUID');

    const path = this.getActivityTemplateEndpoint(activityTemplate) +
                 `/moveTo/${targetProjectTemplateUID}`;

    return this.http.post<ActivityTemplate>(path);
  }

  translate(text: string): Observable<string> {
    const path = 'v3/steps/services/translator/to-english';

    const body = { text };

    return this.http.post<string>(path, body);
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
