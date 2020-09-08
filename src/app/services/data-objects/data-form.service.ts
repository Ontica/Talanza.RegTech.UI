/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { HttpService, Assertion } from '@app/core';

import { DataFormField, DataObject } from '@app/models/data-objects';
import { EventInfo } from '@app/core/data-types';


@Injectable()
export class DataFormService {


  constructor(private http: HttpService) { }

  getFormFields(dataObject: DataObject): Observable<DataFormField[]> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/data-form`;

    return this.http.get<DataFormField[]>(path);
  }


  getGridFormDataSource<T>(dataObject: DataObject): Observable<T[]> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/grid-data-source/${dataObject.subject.uid}`;

    return this.http.get<T[]>(path);
  }


  generateAutofillFile(dataObject: DataObject): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/autofill/${dataObject.subject.uid}`;

    return this.http.post<DataObject>(path)
               .toPromise();
  }


  discardAutofillFile(dataObject: DataObject): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/autofill/${dataObject.subject.uid}`;

    return this.http.delete<DataObject>(path)
               .toPromise();
  }

  removeUploadedFile(dataObject: DataObject): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/upload-file/${dataObject.subject.uid}`;

    return this.http.delete<DataObject>(path)
               .toPromise();
  }


  saveFormData(dataObject: DataObject, event: EventInfo): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');
    Assertion.assertValue(event, 'event');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/data-form/${dataObject.subject.uid}`;

    return this.http.post<DataObject>(path, event)
               .toPromise();
  }


  uploadFile(dataObject: DataObject, fileToUpload: File): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');
    Assertion.assertValue(fileToUpload, 'fileToUpload');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/upload-file/${dataObject.subject.uid}`;

    const formData: FormData = new FormData();

    formData.append('media', fileToUpload, fileToUpload.name);

    return this.http.post<DataObject>(path, formData)
               .toPromise();

  }

}
