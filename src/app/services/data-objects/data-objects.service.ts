/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService, Assertion } from '@app/core';

import { Identifiable } from '@app/models/core';

import { DataObject, DataSource } from '@app/models/data-objects';


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


  getEntityDataObjects(entity: Identifiable): Observable<DataObject[]> {
    Assertion.assertValue(entity, 'entity');

    const path = `v3/empiria-steps/steps/${entity.uid}/data-objects`;

    return this.http.get<DataObject[]>(path);
  }


  getDataSources(): Observable<DataSource[]> {
    const path = `v3/empiria-steps/data-objects/data-sources`;

    return this.http.get<DataSource[]>(path);
  }


  getFileAsBlob(fileUID: string): Observable<Blob> {
    const path = `v3/empiria-steps/files/${fileUID}`;

    return this.http.get<Blob>(path, { responseType: 'blob' });
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
