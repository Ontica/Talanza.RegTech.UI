/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Assertion } from 'empiria';

import { DirectoryService, Service } from './directory.service';
import { HttpMethod } from './common-types';

@Injectable()
export class HttpHandler {

  constructor(private http: Http) {

  }

  public get<T>(path: string, options?: RequestOptionsArgs, service?: Service): Observable<T> {
    return this.invokeHttpCall(HttpMethod.GET, path, '', options, service);
  }

  public post<T>(path: string, body: any,
                 options?: RequestOptionsArgs, service?: Service): Observable<T> {
    return this.invokeHttpCall(HttpMethod.POST, path, body, options, service);
  }

  public delete<T>(path: string, options?: RequestOptionsArgs, service?: Service): Observable<T> {
    return this.invokeHttpCall(HttpMethod.DELETE, path, '', options, service);
  }

  public put<T>(path: string, body: any,
                options?: RequestOptionsArgs, service?: Service): Observable<T> {
    return this.invokeHttpCall(HttpMethod.PUT, path, body, options, service);
  }

  public patch<T>(path: string, body: any,
                  options?: RequestOptionsArgs, service?: Service): Observable<T> {
    return this.invokeHttpCall(HttpMethod.PATCH, path, body, options, service);
  }

  public head<T>(path: string, options?: RequestOptionsArgs, service?: Service): Observable<T> {
    return this.invokeHttpCall(HttpMethod.HEAD, path, '', options, service);
  }

  public options<T>(path: string, options?: RequestOptionsArgs, service?: Service): Observable<T> {
    return this.invokeHttpCall(HttpMethod.OPTIONS, path, '', options, service);
  }

  // Private methods

  private buildUrl(path: string, service?: Service): string {
    return path;
  }

  private buildRequestOptions(options?: RequestOptionsArgs, service?: Service): RequestOptionsArgs {
    return options;
  }

  private invokeHttpCall<T>(method: HttpMethod, path: string, body: any,
                            options: RequestOptionsArgs, service: Service): Observable<T> {

    const url = this.buildUrl(path, service);
    const requestOptions = this.buildRequestOptions(options, service);
    const payloadDataField = (service && service.payloadDataField) || '';

    return this.getHttpResponse(method, url, body, requestOptions)
               .map((response) => (payloadDataField ?
                                     response.json()[payloadDataField] : response.json()) as T);
  }

  private getHttpResponse(method: HttpMethod, url: string,
                          body: any, options: RequestOptionsArgs): Observable<Response> {
    switch (method) {

      case HttpMethod.GET:
        return this.http.get(url, options);

      case HttpMethod.POST:
        return this.http.post(url, body, options);

      case HttpMethod.DELETE:
        return this.http.delete(url, options);

      case HttpMethod.PUT:
        return this.http.put(url, body, options);

      case HttpMethod.PATCH:
        return this.http.patch(url, body, options);

      case HttpMethod.HEAD:
        return this.http.head(url, options);

      case HttpMethod.OPTIONS:
        return this.http.options(url, options);

      default:
        throw Assertion.assertNoReachThisCode(`Unrecognized HttpMethod: '${method}'.`);
    }
  }

}
