/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { HttpService, Assertion } from '@app/core';

import { QuestionBase, DataObject } from '@app/models/data-objects';


@Injectable()
export class DataFormService {

  constructor(private http: HttpService) { }

  getFormFields(dataObject: DataObject): Observable<QuestionBase[]> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/data-form`;

    return this.http.get<QuestionBase[]>(path);
  }


  generateAutofillFile(dataObject: DataObject): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/autofill`;

    return this.http.post<DataObject>(path)
               .toPromise();
  }


  discardAutofillFile(dataObject: DataObject): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/autofill`;

    return this.http.delete<DataObject>(path)
               .toPromise();
  }

  removeUploadedFile(dataObject: DataObject): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/upload-file`;

    return this.http.delete<DataObject>(path)
               .toPromise();
  }


  saveFormData(dataObject: DataObject, formData: string): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');
    Assertion.assertValue(formData, 'formData');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/data-form`;

    const body = {
      formData
    };

    return this.http.post<DataObject>(path, body)
               .toPromise();
  }


  uploadFile(dataObject: DataObject, fileToUpload: File): Promise<DataObject> {
    Assertion.assertValue(dataObject, 'dataObject');
    Assertion.assertValue(fileToUpload, 'fileToUpload');

    const path = `v3/empiria-steps/data-objects/${dataObject.uid}/upload-file`;

    const formData: FormData = new FormData();

    formData.append('media', fileToUpload, fileToUpload.name);

    return this.http.post<DataObject>(path, formData)
               .toPromise();

  }

}
