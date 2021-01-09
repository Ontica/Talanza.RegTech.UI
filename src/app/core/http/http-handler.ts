/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { SessionService } from '../general/session.service';

import {
  DefaultHttpClientOptions, HttpClientOptions,
  HttpMethod, Service
} from './common-types';


@Injectable()
export class HttpHandler {

  constructor(private http: HttpClient,
              private session: SessionService) { }

  get<T>(path: string, options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.GET, path, undefined, options, service);
  }


  post<T>(path: string, body?: any, options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.POST, path, body, options, service);
  }


  delete<T>(path: string, options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.DELETE, path, undefined, options, service);
  }


  put<T>(path: string, body: any, options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.PUT, path, body, options, service);
  }


  patch<T>(path: string, body: any, options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.PATCH, path, body, options, service);
  }


  head<T>(path: string, options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.HEAD, path, undefined, options, service);
  }


  options<T>(path: string, options?: HttpClientOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.OPTIONS, path, undefined, options, service);
  }


  // Private methods

  private invokeHttpCall<T>(method: HttpMethod, path: string, body: any,
                            callerOptions: HttpClientOptions,
                            service: Service): Observable<T> {

    const payloadDataField = this.getPayloadDataField(path, callerOptions, service);

    const requestOptions = DefaultHttpClientOptions();

    if (body) {
      requestOptions.body = body;
    }

    return forkJoin([
      this.getUrl(path, service),
      this.getHeaders(path, service)
    ]).pipe(
      mergeMap(([url, headers]) => {

        requestOptions.headers = headers;

        return this.http.request(HttpMethod[method].toString(), url, requestOptions)
                   .pipe(
                      map(response => (payloadDataField ? response.body[payloadDataField] : response) as T)
                    );
      })
    );
  }


  // Helpers

  private async getUrl(path: string, service?: Service): Promise<string> {
    const settings = await this.session.getSettings();

    if (service) {
      return Promise.resolve(service.baseAddress + service.path);

    } else if (path.includes('http://') || path.includes('https://')) {
      return Promise.resolve(path);

    } else {
      return Promise.resolve(settings.httpApiBaseAddress + path);

    }
  }


  private async getHeaders(path: string, service?: Service): Promise<HttpHeaders> {
    const settings = await this.session.getSettings();
    const principal = this.session.getPrincipal();

    let headers = new HttpHeaders();
    if (service && service.isProtected && principal.isAuthenticated) {
      headers = headers.set('Authorization', 'bearer ' + principal.sessionToken.accessToken);

    } else if (service && service.isProtected && !principal.isAuthenticated) {
      throw new Error('Unauthenticated user');

    } else if (service && !service.isProtected) {
      headers = headers.set('ApplicationKey', settings.applicationKey);

    } else if (path.includes('http://') || path.includes('https://')) {
      // no-op

    } else if (principal.isAuthenticated) {
      headers = headers.set('Authorization', 'bearer ' + principal.sessionToken.accessToken);

    } else {
      headers = headers.set('ApplicationKey', settings.applicationKey);
    }

    return Promise.resolve(headers);
  }


  private getPayloadDataField(path: string, options: HttpClientOptions, service: Service): string {
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
