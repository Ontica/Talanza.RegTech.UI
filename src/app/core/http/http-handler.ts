/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Assertion } from 'empiria';

import { SessionService } from '../general/session.service';

import { Service, HttpMethod, HttpClientOptions, DefaultHttpClientOptions } from './common-types';
import { Principal } from '../security/principal';

@Injectable()
export class HttpHandler {

  constructor(private http: HttpClient,
              private session: SessionService) {

  }

  public get<T>(path: string,
                options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.GET, path, undefined, options, service);
  }

  public post<T>(path: string, body: any,
                 options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.POST, path, body, options, service);
  }

  public delete<T>(path: string,
                   options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.DELETE, path, undefined, options, service);
  }

  public put<T>(path: string, body: any,
                options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.PUT, path, body, options, service);
  }

  public patch<T>(path: string, body: any,
                  options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.PATCH, path, body, options, service);
  }

  public head<T>(path: string,
                 options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.HEAD, path, undefined, options, service);
  }

  public options<T>(path: string,
                    options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.OPTIONS, path, undefined, options, service);
  }

  // Private methods

  private invokeHttpCall<T>(method: HttpMethod, path: string, body: any,
                            callerOptions: HttpClientOptions,
                            service: Service): Observable<T> {
    const url = this.buildUrl(path, service);

    const payloadDataField = this.getPayloadDataField(path, callerOptions, service);

    const requestOptions = DefaultHttpClientOptions();

    requestOptions.headers = this.getHeaders(method, path, callerOptions, service);

    if (body) {
      requestOptions.body = body;
    }

    return this.http.request(HttpMethod[method].toString(), url, requestOptions)
                    .map((response) => (payloadDataField ? response.body[payloadDataField] : response) as T);
  }

  // Helpers

  private buildUrl(path: string, service?: Service): string {
    const settings = this.session.getSettings();

    if (service) {
      return service.baseAddress + service.path;

    } else if (path.includes('http://') || path.includes('https://') ) {
      return path;

    } else {
      return settings.httpApiBaseAddress + path;

    }
  }

  private getHeaders(method: HttpMethod, path: string,
                     options?: HttpClientOptions,
                     service?: Service): HttpHeaders {
    const settings = this.session.getSettings();
    const principal = this.session.getPrincipal();

    let headers = new HttpHeaders();
    if (service && service.isProtected && principal.isAuthenticated) {
      headers = headers.set('Authorization', 'bearer ' + principal.sessionToken.access_token);

    } else if (service && service.isProtected && !principal.isAuthenticated) {
      throw 'Unauthenticated user';

    } else if (service && !service.isProtected) {
      headers = headers.set('ApplicationKey', settings.applicationKey);

    } else if (path.includes('http://') || path.includes('https://') ) {
      // no-op

    } else if (principal.isAuthenticated) {
      headers = headers.set('Authorization', 'bearer ' + principal.sessionToken.access_token);

    } else {
      headers = headers.set('ApplicationKey', settings.applicationKey);
    }

    return headers;
  }

  private getPayloadDataField(path: string,
                              options: HttpClientOptions, service: Service): string {
    if (options && options.dataField) {
      return options.dataField;

    } else if (service && service.payloadDataField) {
      return service.payloadDataField;

    } else if (path.includes('http://') || path.includes('https://')) {
      return '';

    } else {
      return 'data';

    }
  }

}
