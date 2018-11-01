/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { CoreService } from '@app/core/core.service';

import { Document, DocumentFilter } from '@app/models/regulation';


@Injectable()
export class DocumentService {

  public constructor(private core: CoreService) { }

  public getDocuments(filter: DocumentFilter): Promise<Document[]> {
    const qs = filter.isEmpty ? "" : "/?" + filter.toQueryString();

    return this.core.http.get<Document[]>(`v1/documents${qs}`)
                         .toPromise();
  }

}
