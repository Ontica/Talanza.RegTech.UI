/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService, Assertion } from '@app/core';

import { Identifiable } from '@app/core/data-types';

import { DataObject, DataSource } from '@app/models/data-objects';
import { StepRequirement } from '@app/models/steps';


@Injectable()
export class DataObjectsService {

  constructor(private http: HttpService) { }

  getGraphData() {
    const path = `v3/empiria-steps/data-graph`;

    return this.http.get<DataObject[]>(path)
               .toPromise();
  }


  getSubjectDataRequests(subject: Identifiable): Observable<DataObject[]> {
    Assertion.assertValue(subject, 'subject');

    const path = `v3/empiria-steps/activities/${subject.uid}/data-objects`;

    return this.http.get<DataObject[]>(path);
  }


  toggleSubjectDataRequestStatus(dataObject: DataObject): Observable<DataObject[]> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/activities/${dataObject.subject.uid}/data-objects/${dataObject.uid}/toggle-status`;

    return this.http.post<DataObject[]>(path);
  }


  getStepRequirements(entity: Identifiable): Observable<StepRequirement[]> {
    Assertion.assertValue(entity, 'entity');

    const path = `v3/empiria-steps/steps/${entity.uid}/requirements`;

    return this.http.get<StepRequirement[]>(path);
  }


  removeRequirement(requirement: StepRequirement) {
    Assertion.assertValue(requirement, 'requirement');

    const path = `v3/empiria-steps/requirements/${requirement.uid}`;

    return this.http.delete<any>(path)
               .toPromise();
  }


  getDataSources(): Observable<DataSource[]> {
    const path = `v3/empiria-steps/data-objects/data-sources`;

    return this.http.get<DataSource[]>(path);
  }


  getFileAsBlob(fileUID: string): Observable<Blob> {
    const path = `v3/empiria-steps/files/${fileUID}`;

    return this.http.get<Blob>(path, { observe: 'response', responseType: 'blob' });
  }


  addStepRequirement(entity: Identifiable, requirement: StepRequirement): Promise<DataObject> {
    Assertion.assertValue(entity, 'entity');
    Assertion.assertValue(requirement, 'requirement');

    const path = `v3/empiria-steps/steps/${entity.uid}/requirements`;

    return this.http.post<DataObject>(path, requirement)
               .toPromise();
  }


  linkEntityWithDataSource(entity: Identifiable, dataSource: DataSource): Promise<DataObject> {
    Assertion.assertValue(entity, 'entity');
    Assertion.assertValue(dataSource, 'dataSource');

    const path = `v3/empiria-steps/steps/${entity.uid}/data-objects`;

    const body = {
      dataSourceUID: dataSource.uid
    };

    return this.http.post<DataObject>(path, body)
               .toPromise();
  }


  removeDataObject(dataObject: DataObject): Promise<any> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}`;

    return this.http.delete<any>(path)
               .toPromise();
  }

}
