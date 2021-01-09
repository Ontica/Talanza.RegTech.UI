/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@app/core';

import { Posting } from '@app/models/knowledge-base';


@Injectable()
export class PostingsService {

  constructor(private http: HttpService) { }

  getPosting(objectUID: string, postingUID: string): Observable<Posting> {
    const path = `v1/postings/${objectUID}/${postingUID}`;

    return this.http.get<Posting>(path);
  }

  getPostingsList(objectUID: string, keywords?: string): Observable<Posting[]> {
    let path = `v1/postings/${objectUID}`;

    if (keywords) {
      path += `/?keywords=${keywords}`;
    }

    return this.http.get<Posting[]>(path);
  }

  createPosting(objectUID: string, data: Posting): Observable<Posting> {
    const path = `v1/postings-new/${objectUID}`;

    return this.http.post<Posting>(path, data);
  }

  deletePosting(objectUID: string, postingUID: string): Observable<Posting[]> {
    const path = `v1/postings/${objectUID}/${postingUID}`;

    return this.http.delete<Posting[]>(path);
  }

  updatePosting(objectUID: string, data: Posting): Observable<Posting> {
    const path = `v1/postings/${objectUID}/${data.uid}`;

    return this.http.put<Posting>(path, data);
  }

}
