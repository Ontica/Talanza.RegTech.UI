/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from 'immutable';

import { ProjectTemplateService } from '@app/services/project-management';

import { ActivityTemplate, Project,
        ProjectTemplate, EmptyProjectTemplate } from '@app/models/project-management';


export class ProjectTemplateModel {

  project: ProjectTemplate = EmptyProjectTemplate;
  activities: List<ActivityTemplate> = List([]);

}


@Injectable()
export class ProjectTemplateStore {

  private _selectedTemplate = new BehaviorSubject(new ProjectTemplateModel());

  private _templatesList = new BehaviorSubject(List([]));

  constructor(private projectTemplateService: ProjectTemplateService) {
    this.loadInitialData();
  }


  selectedTemplate(): Observable<ProjectTemplateModel> {
    return this._selectedTemplate.asObservable();
  }


  selectTemplate(template: ProjectTemplate) {
    this.updateSelectedTemplate(template);
  }


  get templates(): Observable<List<ProjectTemplate>> {
    return this._templatesList.asObservable();
  }


  startEvents(project: Project): Observable<ActivityTemplate[]> {
    return this.projectTemplateService.getStartEvents(project);
  }


  getActivityTemplate(activityTemplateUID: string): ActivityTemplate {
    return this._selectedTemplate.value.activities.find(x => x.uid === activityTemplateUID);
  }


  activities(): ActivityTemplate[] {
    return this._selectedTemplate.value.activities.toArray();
  }


  findById(activityTemplateUID: string): ProjectTemplate {
    return this._templatesList.value.find(x => x.uid === activityTemplateUID);
  }


  copyTo(activityTemplate: ActivityTemplate,
         targetProjectTemplateUID: string): Promise<ActivityTemplate> {
    return this.projectTemplateService.copyTo(activityTemplate, targetProjectTemplateUID)
               .toPromise()
               .then(x => {
                  this.updateSelectedTemplate(activityTemplate.project);
                  // Object.assign(activityTemplate, x);

                  return x;
               });
  }


  changeParent(activityTemplate: ActivityTemplate, newParent: ActivityTemplate): Promise<ActivityTemplate> {
    return this.projectTemplateService.changeParent(activityTemplate, newParent)
               .toPromise()
               .then(x => {
                   this.updateSelectedTemplate(activityTemplate.project);

                   return x;
              });
  }


  delete(activityTemplate: ActivityTemplate): Promise<void> {
    return this.projectTemplateService.delete(activityTemplate)
               .toPromise()
               .then(() => {
                  this.updateSelectedTemplate(activityTemplate.project);
                  Object.assign(activityTemplate, null);
               });
  }


  exportToExcel(project: ProjectTemplate, branch?: ActivityTemplate): Promise<string> {
    return this.projectTemplateService.exportToExcel(project, branch);
  }


  insert(projectTemplate: ProjectTemplate,
         newActivityTemplate: { name: string, position: number }): Promise<ActivityTemplate> {
    return this.projectTemplateService.insert(projectTemplate, newActivityTemplate)
               .toPromise()
               .then(x => {
                  this.updateSelectedTemplate(projectTemplate);

                  return x;
             });
  }


  move(activityTemplate: ActivityTemplate, newPosition: number): Promise<ActivityTemplate> {
    return this.projectTemplateService.move(activityTemplate, newPosition)
               .toPromise()
               .then(x => {
                  this.updateSelectedTemplate(activityTemplate.project);
               //   Object.assign(activityTemplate, x);

                  return x;
               });
  }


  moveTo(activityTemplate: ActivityTemplate, targetProjectTemplateUID: string): Promise<ActivityTemplate> {
    return this.projectTemplateService.moveTo(activityTemplate, targetProjectTemplateUID)
               .toPromise()
               .then(x => {
                  this.updateSelectedTemplate(activityTemplate.project);
                  // Object.assign(activityTemplate, x);

                  return x;
               });
  }


  translate(text: string): Promise<string> {
    return this.projectTemplateService.translate(text)
               .toPromise();
  }


  update(activityTemplate: ActivityTemplate,
         updateData: Partial<ActivityTemplate>): Promise<ActivityTemplate> {
    return this.projectTemplateService.update(activityTemplate, updateData)
               .toPromise()
               .then(x => {
                  this.updateSelectedTemplate(activityTemplate.project);
                  // Object.assign(activityTemplate, x);

                  return x;
               });
  }


  // private methods

  private loadInitialData() {
    this.projectTemplateService.getProjectTemplatesList()
        .subscribe(
            data =>
              this._templatesList.next(List(data))
            ,
            err => console.log('Error reading project template data', err)
        );
  }


  private updateSelectedTemplate(projectModel: ProjectTemplate) {
    this.projectTemplateService.getTreeStructure(projectModel).subscribe(
      data => {
        const templateModel = new ProjectTemplateModel();

        templateModel.project = projectModel;
        templateModel.activities = List(data);

        this._selectedTemplate.next(templateModel);
      },
      err => console.log('Error reading project template activities', err)
    );
  }

}
