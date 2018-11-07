/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreService } from '@app/core/core.service';

import { Posting } from '@app/models/knowledge-base';


export enum PostingsServiceErr {
  GET_POSTINGS_LIST_ERR =
  '[GET_POSTINGS_LIST_ERR] No pude leer la lista de postings.',

  GET_POSTING_ERR =
  '[GET_POSTING_ERR] Ocurrió un problema al leer el posting.',

  CREATE_POSTING_ERR =
  '[CREATE_POSTING_ERR] Ocurrió un problema al crear el posting.',

  DELETE_POSTING_ERR =
  '[DELETE_POSTING_ERR] Ocurrió un problema al eliminar el posting.',

  UPDATE_POSTING_ERR =
  '[UPDATE_POSTING_ERR] Ocurrió un problema al modificar el posting.'
}


@Injectable()
export class PostingsService {

  constructor(private core: CoreService) { }


  getPosting(objectUID: string, postingUID: string): Observable<Posting> {
    const path = `/v1/postings/${objectUID}/${postingUID}`;

    return this.core.http.get<Posting>(path)
      .pipe(
        catchError((e) => this.core.http.showAndReturn(e, PostingsServiceErr.GET_POSTING_ERR, null))
      );
  }


  getPostingsList(objectUID: string, keywords?: string): Observable<Posting[]> {
    let path = `v1/postings/${objectUID}`;

    if (keywords) {
      path += `/?keywords=${keywords}`;
    }

    return this.core.http.get<Posting[]>(path)
      .pipe(
        catchError((e) => this.core.http.showAndReturn(e, PostingsServiceErr.GET_POSTINGS_LIST_ERR, null))
      );
  }


  createPosting(objectUID: string, data: Posting): Observable<Posting> {
    const path = `/v1/postings/${objectUID}`;

    return this.core.http.post<Posting>(path, data)
      .pipe(
        catchError((e) => this.core.http.showAndReturn(e, PostingsServiceErr.CREATE_POSTING_ERR, null))
      );
  }


  deletePosting(objectUID: string, postingUID: string): Observable<Posting[]> {
    const path = `/v1/postings/${objectUID}/${postingUID}`;

    return this.core.http.delete<Posting[]>(path)
      .pipe(
        catchError((e) => this.core.http.showAndReturn(e, PostingsServiceErr.UPDATE_POSTING_ERR, null))
      );

  }


  updatePosting(objectUID: string, data: Posting): Observable<Posting> {
    const path = `/v1/postings/${objectUID}/${data.uid}`;

    return this.core.http.put<Posting>(path, data)
      .pipe(
        catchError((e) => this.core.http.showAndReturn(e, PostingsServiceErr.UPDATE_POSTING_ERR, null))
      );

  }

}
