/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { HttpService } from '@app/core';

import { Document, DocumentFilter } from '@app/models/regulation';


@Injectable()
export class DocumentService {

  constructor(private http: HttpService) { }

  getDocuments(filter: DocumentFilter): Promise<Document[]> {
    const qs = filter.isEmpty ? '' : '/?' + filter.toQueryString();

    return this.http.get<Document[]>(`v1/documents${qs}`)
      .toPromise();
  }

}
