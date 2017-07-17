/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Assertion } from 'empiria';

import { SessionService } from '../general/session.service';

import { Service, HttpMethod, HttpRequestOptions } from './common-types';
import { Principal } from '../security/principal';

@Injectable()
export class HttpHandler {

  constructor(private http: Http,
              private session: SessionService) {

  }

  public get<T>(path: string,
                options?: HttpRequestOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.GET, path, '', options, service);
  }

  public post<T>(path: string, body: any,
                 options?: HttpRequestOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.POST, path, body, options, service);
  }

  public delete<T>(path: string,
                   options?: HttpRequestOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.DELETE, path, '', options, service);
  }

  public put<T>(path: string, body: any,
                options?: HttpRequestOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.PUT, path, body, options, service);
  }

  public patch<T>(path: string, body: any,
                  options?: HttpRequestOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.PATCH, path, body, options, service);
  }

  public head<T>(path: string,
                 options?: HttpRequestOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.HEAD, path, '', options, service);
  }

  public options<T>(path: string,
                    options?: HttpRequestOptions, service?: Service): Observable<T> {
    return this.invokeHttpCall<T>(HttpMethod.OPTIONS, path, '', options, service);
  }

  // Private methods

  private invokeHttpCall<T>(method: HttpMethod, path: string, body: any,
                            options: HttpRequestOptions, service: Service): Observable<T> {
    const url = this.buildUrl(path, service);
    const requestOptions = this.buildRequestOptionsArgs(method, path, options, service);
    const payloadDataField = this.getPayloadDataField(path, options, service);

    return this.getHttpResponse(method, url, body, requestOptions)
               .map((response) => (payloadDataField ? response.json()[payloadDataField]
                                                    : response.json()) as T);
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

  private buildRequestOptionsArgs(method: HttpMethod, path: string,
                                  options?: HttpRequestOptions,
                                  service?: Service): RequestOptionsArgs {
    const settings = this.session.getSettings();
    const principal = this.session.getPrincipal();

    let headers = new Headers();
    if (service && service.isProtected && principal.isAuthenticated) {
      headers.append('Authorization', 'bearer ' + principal.sessionToken.access_token);

    } else if (service && service.isProtected && !principal.isAuthenticated) {
      throw 'Unauthenticated user';

    } else if (service && !service.isProtected) {
      headers.append('ApplicationKey', settings.applicationKey);

    } else if (path.includes('http://') || path.includes('https://') ) {
      // no-op

    } else if (principal.isAuthenticated) {
      headers.append('Authorization', 'bearer ' + principal.sessionToken.access_token);

    } else {
      headers.append('ApplicationKey', settings.applicationKey);
    }

    return { headers };
  }

  private getPayloadDataField(path: string,
                              options: HttpRequestOptions, service: Service): string {
    if (options && options.payloadDataField) {
      return options.payloadDataField;

    } else if (service && service.payloadDataField) {
      return service.payloadDataField;

    } else if (path.includes('http://') || path.includes('https://')) {
      return '';

    } else {
      return 'data';

    }
  }

}
